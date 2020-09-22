/*
*   getData
*     在需要时生成时间戳，并获取到对应时间戳的  csrftoken，以及公钥并与时间戳一起返回
*     csrftoken 无用
*     还需存储获取数据时的session
* */

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const http = require('http');

let returnData = {};

function getData(endCallback) {
  const curTime = new Date().getTime();

  new Promise((resolve) => {
    returnData.curTime = curTime;
    getPubKey(curTime,resolve);
  }).then(()=>{
    // 获取csrftoken
    new Promise(resolve => {
      getCsrftoken(curTime,resolve);
    }).then(()=>{
      //结束获取，返回数据
      endCallback(returnData);
    });
  });
}

// 获取公钥及session
function getPubKey(curTime,resolve){
  let parsedData={};

  // 获取公钥　传入时间戳
  const messageURL = "http://www.zfjw.xupt.edu.cn/jwglxt/xtgl/login_getPublicKey.html?time=" + curTime;
  http.get(messageURL,(res)=>{
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    let error;
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
          `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error('Invalid content-type.\n' +
          `Expected application/json but received ${contentType}`);
    }
    if (error) {
      console.error(error.message);
      // consume response data to free up memory
      res.resume();
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        //获取数据
        parsedData = JSON.parse(rawData);
        returnData.publicKey = parsedData;

        //获取session
        returnData.session = resolveSession(res.headers['set-cookie']);
        resolve();
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error',(e)=>{
    console.log(`get Error : ${e.message}`);
  });

}

function getCsrftoken(curTime,resolve){
  http.get('http://www.zfjw.xupt.edu.cn/jwglxt/xtgl/login_slogin.html?language=zh_CN&_t=' + curTime, (res) => {
    const {statusCode} = res;
    if (statusCode !== 200) {
      console.log('get page error' + `${statusCode}`);
      return {};
    } else {
      let pageHtml = '';
      res.on('data', (chunk) => {
        pageHtml += chunk
      });
      res.on('end', () => {
        try {
          //const dom = new JSDOM(pageHtml);
          const {document} = new JSDOM(pageHtml).window;
          let csrftoken = document.querySelector('#csrftoken').value;
          if(csrftoken !== "" && csrftoken !== null){
            returnData.csrftoken = csrftoken;
            resolve();
          }
        } catch (e) {
          console.error(e.message);
        }
      });
    }
  }).on('error', (e) => {
    console.error(`got error ${e.message}`);
  });
}

function resolveSession(session){
  let result = {sessionData : {}};
  let firstEqul = session[0].indexOf('=');
  let firstQuate = session[0].indexOf(';');
  result.sessionID = session[0].substr(firstEqul + 1,firstQuate - firstEqul - 1);
  result.sessionData.Path='/jwglxt';
  result.sessionData.httpOnly = true;
  result.sessionData.Domain = 'www.zfjw.xupt.edu.cn';

  return result;
}

module.exports = getData;
