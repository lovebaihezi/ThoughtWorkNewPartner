const express = require('express');
const http = require('http');
const request = require('request');
const https = require('https');
const Axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
RsaKey = null;

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(bodyParser.text());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.post('/getRSA', (req, response) => {
    console.log("gonna receive RSA");
    var responseData = "";
    Axios
        .post("http://www.zfjw.xupt.edu.cn/jwglxt/xtgl/login_getPublicKey.html?time=" + new Date().getTime(), {})
        .then(res => {
            responseData = res.data;
            response.json(responseData);
            console.log("Success!");
        })
        .catch(error => {
            console.error(error);
        });
    return;
})

app.post('/Login', (req, response) => {
    console.log("gonna Log in");
    // console.log("what will show below is what you send from post method");
    let formInformation = JSON.parse(req.body);
    let formSubmit = "yhm=" +
        formInformation["yhm"] +
        "&" +
        "mm=" +
        formInformation["mm"] +
        "&" +
        "mm=" +
        formInformation["mm"];
    console.log(formSubmit);
    Axios({
            method: 'post',
            url: "http://www.zfjw.xupt.edu.cn/jwglxt/xtgl/login_slogin.html?time=" +
                new Date().getTime(),
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
            },
            data: req.body
        })
        .then((req, res) => {
            console.log("<---------------------->");
            console.log(req);
            console.log("<---------------------->");
            console.log(res);
            console.log("<---------------------->");
        })
        .catch(error => {
            console.error(error);
        });
    console.log("<---------------------->");
    response.json("Success!");
    console.log("<---------------------->");
    return;
})

app.post('/SBWLK', (req, res) => {
    console.log(rea.body);
});

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