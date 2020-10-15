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

app.use((req, resToBrowser, next) => {
    resToBrowser.header("Access-Control-Allow-Origin", "*")
    resToBrowser.header("content-type", "application/json; charset=UTF-8")
    next();
});

app.post('/studentLogin', (req, resToBrowser) => {
    let userInformation
    try {
        userInformation = JSON.parse(req.body)
    } catch (error) {
        typeof req.body == 'object' ?
            userInformation = req.body :
            resToBrowser.json({
                status: "failure"
            })
    }
    let fakeLoginInformation = {}
    let url = "http://47.93.233.174:8080/thoughtworksNaXin/"
    let method = ""
    if (userInformation.Telephone != "") {
        fakeLoginInformation.yhm = userInformation.ID
        fakeLoginInformation.mm = userInformation.password
        fakeLoginInformation.Telephone = userInformation.Telephone
        fakeLoginInformation.方向 = userInformation.way
        method = "Apply"
    } else {
        fakeLoginInformation.yhm = userInformation.ID
        fakeLoginInformation.mm = userInformation.password
        method = "Login"
    }
    Axios
        .post(
            url + userInformation.user + method,
            // "http://47.93.233.174:8080/thoughtworksNaXin/studentLogin",
            JSON.stringify(fakeLoginInformation)
        ).then(response => {
            console.log(JSON.stringify(response.data))
            resToBrowser.json(JSON.stringify(response.data))
        }).catch(err => {
            console.log("<----------------->")
            console.log(err)
            resToBrowser.json({
                status: "failure"
            })
            console.log("<----------------->")

        })
})

app.post('/Sign', (req, resToBrowser) => {
    let {
        studentID
    } = req.body;
    console.log(studentID)
    Axios.post(
        url + "sign",
        JSON.stringify({
            studentID: studentID
        })
    ).then((reqServer, resServer) => {
        resToBrowser.json(resToBrowser.data)
    }).catch(err => {
        console.log(err)
    })
})

app.post('/adminLogin', (req, res) => {
    console.log(req.body)
    res.json(req.body)
})

app.listen(30100, () => {
    console.log('I\'m listening on port 30100!')
});