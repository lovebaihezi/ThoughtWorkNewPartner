const express = require('express');
const http = require('http');
const request = require('request');
const https = require('https');
const Axios = require('axios');
const Axios2 = require('axios');
const app = express();
const bodyParser = require('body-parser');
const { getHeapCodeStatistics } = require('v8');
RsaKey = null;

const jsdom = require('jsdom');
const { url } = require('inspector');
const { JSDOM } = jsdom;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

let cookie;
let TimeSet; // 所有必须在一个时间内

// const getCsrftoken = () => {

// }

function getRSA(responseToLoin) {
    TimeSet = new Date().getTime();
    console.log("gonna receive RSA-<1");
    var responseData = "";
    return Axios
        .post("http://www.zfjw.xupt.edu.cn/jwglxt/xtgl/login_getPublicKey.html?time=" +
            TimeSet, {})
        .then(res => {
            responseData = res.data;
            // responseToLoin.json(responseData);
            console.log("1 >- receive RSA success!");
            return responseData;
        })
        .catch(error => {
            console.error(error);
        });
}

let formInformation;
//need cookie need csrftoken need session get all of them in one site

function encryptPW() {

}

function getCsrftoken(requestFormLogin) {
    formInformation = requestFormLogin.body;
    console.log("gonna receive csrftoken -< 2");
    formInformation.language = "zh_CN";
    return Axios({
            method: 'post',
            url: "http://www.zfjw.xupt.edu.cn/jwglxt/xtgl/login_slogin.html?time=" +
                TimeSet,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
            },
            refer: "http://www.zfjw.xupt.edu.cn",
            data: {}
        })
        .then((reqToXUPT, resToServer) => {
            //session form set-cookie; 
            //csrftoken form req.data.inputElement.value
            const { headers } = reqToXUPT;
            cookie = headers['set-cookie'];
            console.log(cookie);
            console.log(cookie[1].slice(-1, -24))
            const { document } = new JSDOM(reqToXUPT.data).window;
            // console.log(resToServer.headers);
            let csrfToken = document.getElementById("csrftoken").value; // get!
            formInformation.csrfToken = csrfToken;
            console.log("2 >- receive csrftoken");
            console.log("data create success! next -> send to XUPT");
        })
        .catch(error => {
            console.error(error);
        });
}

app.post('/getData', (requestFormLogin, responseToLoin) => {
    console.log("<------------------new request for login---------------->");
    console.log("gonna Log in -<0");
    Axios.all([getRSA(responseToLoin), getCsrftoken(requestFormLogin)]).then(
        Axios.spread((RSA, csrfToken) => {
            console.log("all success!");
            responseToLoin.json(RSA);
        }));
})

app.post('/login', (requestFormLogin, responseToLoin) => {
    formInformation.yhm = requestFormLogin.body.yhm;
    formInformation.mm = requestFormLogin.body.mm;
    console.log(formInformation);
    console.log("gonna send to XUPT server");
    Axios2({
            method: 'post',
            url: "http://www.zfjw.xupt.edu.cn/jwglxt/xtgl/login_slogin.html?time=" + "123456",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset:utf-8',
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
                'Origin': 'http://www.zfjw.xupt.edu.cn',
                'Cookie': cookie[0].slice(0, 43)
            },
            // data: formInformation
            data: formInformation
        }).then((req, res) => {
            console.log(req.config);
            console.log(res.status);
            console.log("<----------------Login ended---------------->");
        })
        .catch(error => {
            console.error(error)
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