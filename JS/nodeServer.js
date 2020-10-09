const express = require('express');
const Axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const { response } = require('express');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use((req, resToClient, next) => {
    resToClient.header("Access-Control-Allow-Origin", "*")
    resToClient.header("content-type", "application/json; charset=UTF-8")
    next();
});

app.post('/studentLogin', (req, resToClient) => {
    console.log(req.body)
    let userInformation = JSON.parse(req.body)
    let fakeLoginInformation = {}
    fakeLoginInformation.yhm = userInformation.ID
    fakeLoginInformation.mm = userInformation.password
    fakeLoginInformation.Telephone = userInformation.Telephone
    fakeLoginInformation.方向 = userInformation.way
    Axios
        .post(
            "http://47.93.233.174:8080/thoughtworksNaXin/studentLogin",
            JSON.stringify(fakeLoginInformation)
        ).then(response => {
            console.log(response.data)
            resToClient.json(response.data)
        }).catch(err => {
            console.log("<----------------->")
            console.log(err)
            console.log("<----------------->")

        })
})

app.post('/adminLogin', (req, res) => {
    console.log(req.body)
    res.json(req.body)
})

app.listen(3000, () => {
    console.log('I\'m listening on port 3000!')
});