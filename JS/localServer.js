const express = require('express');
const http = require('http');
const request = require('request');
const https = require('https');
const Axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const { getHeapCodeStatistics } = require('v8');
RsaKey = null;

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

let DataGet = {};

// const jsdom = require('jsdom');
// const { JSDOM } = jsdom;

// let returnData = {};

// function getData(endCallback) {
//     const curTime = new Date().getTime();

//     new Promise((resolve) => {
//         returnData.curTime = curTime;
//         getPubKey(curTime, resolve);
//     }).then(() => {
//         // 获取csrftoken
//         new Promise(resolve => {
//             getCsrftoken(curTime, resolve);
//         }).then(() => {
//             //结束获取，返回数据
//             endCallback(returnData);
//         });
//     });
// }

// // 获取公钥及session
// function getPubKey(curTime, resolve) {
//     let parsedData = {};

//     // 获取公钥　传入时间戳
//     const messageURL = "http://www.zfjw.xupt.edu.cn/jwglxt/xtgl/login_getPublicKey.html?time=" + curTime;
//     http.get(messageURL, (res) => {
//         const { statusCode } = res;
//         const contentType = res.headers['content-type'];
//         let error;
//         if (statusCode !== 200) {
//             error = new Error('Request Failed.\n' +
//                 `Status Code: ${statusCode}`);
//         } else if (!/^application\/json/.test(contentType)) {
//             error = new Error('Invalid content-type.\n' +
//                 `Expected application/json but received ${contentType}`);
//         }
//         if (error) {
//             console.error(error.message);
//             // consume response data to free up memory
//             res.resume();
//         }

//         res.setEncoding('utf8');
//         let rawData = '';
//         res.on('data', (chunk) => { rawData += chunk; });
//         res.on('end', () => {
//             try {
//                 //获取数据
//                 parsedData = JSON.parse(rawData);
//                 returnData.publicKey = parsedData;

//                 //获取session
//                 returnData.session = resolveSession(res.headers['set-cookie']);
//                 resolve();
//             } catch (e) {
//                 console.error(e.message);
//             }
//         });
//     }).on('error', (e) => {
//         console.log(`get Error : ${e.message}`);
//     });

// }

// function getCsrftoken(curTime, resolve) {
//     http.get('http://www.zfjw.xupt.edu.cn/jwglxt/xtgl/login_slogin.html?language=zh_CN&_t=' + curTime, (res) => {
//         const { statusCode } = res;
//         if (statusCode !== 200) {
//             console.log('get page error' + `${statusCode}`);
//             return {};
//         } else {
//             let pageHtml = '';
//             res.on('data', (chunk) => {
//                 pageHtml += chunk
//             });
//             res.on('end', () => {
//                 try {
//                     //const dom = new JSDOM(pageHtml);
//                     const { document } = new JSDOM(pageHtml).window;
//                     let csrftoken = document.querySelector('#csrftoken').value;
//                     if (csrftoken !== "" && csrftoken !== null) {
//                         returnData.csrftoken = csrftoken;
//                         resolve();
//                     }
//                 } catch (e) {
//                     console.error(e.message);
//                 }
//             });
//         }
//     }).on('error', (e) => {
//         console.error(`got error ${e.message}`);
//     });
// }

// function resolveSession(session) {
//     let result = { sessionData: {} };
//     let firstEqul = session[0].indexOf('=');
//     let firstQuate = session[0].indexOf(';');
//     result.sessionID = session[0].substr(firstEqul + 1, firstQuate - firstEqul - 1);
//     result.sessionData.Path = '/jwglxt';
//     result.sessionData.httpOnly = true;
//     result.sessionData.Domain = 'www.zfjw.xupt.edu.cn';
//     return result;
// }

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(bodyParser.text());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

let cookie;
let TimeSet; // 所有必须在一个时间内

// const getCsrftoken = () => {

// }

app.post('/getRSA', (req, response) => {
    TimeSet = new Date().getTime();
    console.log("gonna receive RSA-<1");
    var responseData = "";
    Axios
        .post("http://www.zfjw.xupt.edu.cn/jwglxt/xtgl/login_getPublicKey.html?time=" +
            TimeSet, {})
        .then(res => {
            responseData = res.data;
            response.json(responseData);
            console.log("1>-Success!");
        })
        .catch(error => {
            console.error(error);
        });
    return;
})

//need cookie need csrftoken need session get all of them in one site

app.post('/Login', (requestFormLogin, responseToLoin) => {
    console.log("gonna Log in -<2");
    let formInformation = requestFormLogin.body;
    formInformation.language = "zh_CN";
    Axios({
            method: 'post',
            url: "http://www.zfjw.xupt.edu.cn/jwglxt/xtgl/login_slogin.html?time=" +
                TimeSet,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
            },
            refer: "http://www.zfjw.xupt.edu.cn/jwglxt/xtgl/login_slogin.html",
            data: {}
        })
        .then((reqToXUPT, resToServer) => {
            //session form set-cookie; 
            //csrftoken form req.data.inputElement.value
            const { document } = new JSDOM(reqToXUPT.data).window;
            let csrfToken = document.getElementById("csrftoken").value; // get!
            formInformation.csrfToken = csrfToken;
            console.log(formInformation);
            Axios({
                    method: 'post',
                    url: "http://www.zfjw.xupt.edu.cn/jwglxt/xtgl/login_slogin.html?time=" +
                        TimeSet,
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
                    },
                    // refer: "http://www.zfjw.xupt.edu.cn/jwglxt/xtgl/login_slogin.html",
                    data: JSON.stringify(formInformation)
                })
                .then((req, res) => {
                    console.log(req);
                })
                .catch(error => {
                    console.error(error);
                });
        })
        .catch(error => {
            console.error(error);
        });
})

app.get('/', (req, res) => {
    res.send("Host");
})

app.get('/Login', (req, res) => {
    res.send("Login");
})

app.get('/sign', (req, res) => {

})

app.get('/manage', (req, res) => {

})

app.get('/interview', (req, res) => {

})

app.get('/filtrate', (req, res) => {

})

app.listen(3000, () => {
    console.log('I\'m listening on port 3000!')
});