const express = require('express');
const Axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const {
    response
} = require('express');

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
    let userInformation
    try {
        userInformation = JSON.parse(req.body)
    } catch (error) {
        typeof req.body == 'object' ?
            userInformation = req.body :
            resToClient.json({
                status: "failure"
            })
    }
    let fakeLoginInformation = {}
    let url = "http://47.93.233.174:8080/thoughtworksNaXin/"
    let method = "Login"
    if (userInformation.user == "student") {
        fakeLoginInformation.yhm = userInformation.ID
        fakeLoginInformation.mm = userInformation.password
        fakeLoginInformation.Telephone = userInformation.Telephone
        fakeLoginInformation.方向 = userInformation.way
    }
    Axios
        .post(
            url + "student" + method,
            JSON.stringify(fakeLoginInformation)
        ).then(response => {
            console.log(JSON.stringify(response.data))
            resToClient.json(JSON.stringify(response.data))
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

app.listen(30100, () => {
    console.log('I\'m listening on port 30100!')
});