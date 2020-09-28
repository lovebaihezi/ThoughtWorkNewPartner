const express = require('express');
const Axios = require('axios');
const Axios2 = require('axios');
const app = express();
const bodyParser = require('body-parser');
let RsaKey = null;
const jsdom = require('jsdom');
const {
    JSDOM
} = jsdom;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

let cookie;
let TimeSet; // 所有必须在一个时间内

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

let formInformation = {};
//need cookie need csrftoken need session get all of them in one site

function getCsrftoken(requestFormLogin) {
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
            const {
                headers
            } = reqToXUPT;
            cookie = headers['set-cookie'];
            // console.log(headers);
            const {
                document
            } = new JSDOM(reqToXUPT.data).window;
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

app.post('/studentLogin', (requestFormLogin, responseToLoin) => {
    formInformation.yhm = JSON.parse(requestFormLogin.body).yhm;
    formInformation.mm = JSON.parse(requestFormLogin.body).mm;
    console.log(cookie[1].split(","));
    console.log("gonna send to XUPT server");
    Axios2({
            method: 'post',
            url: "http://www.zfjw.xupt.edu.cn/jwglxt/xtgl/login_slogin.html?time=" + (TimeSet - 8 * 60 * 60 * 10),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset:utf-8',
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
                'Origin': 'http://www.zfjw.xupt.edu.cn',
                'Cookie': cookie[0].slice(0, 43)
            },
            // data: formInformation
            data: formInformation
        }).then((req, res) => {
            try {
                console.log(res.status);
            } catch (err) {
                console.log("failed");
            }
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