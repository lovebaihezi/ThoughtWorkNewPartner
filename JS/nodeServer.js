const express = require('express');
const Axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
// const {
//     response
// } = require('express');

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

let url = "http://47.93.233.174:80/thoughtworksNaXin/"

app.post('/studentLogin', (req, resToBrowser) => {
    Axios
        .post(
            url + "studentLogin",
            req.body
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

app.post('/studentApply', (req, res) => {
    Axios
        .post(
            url + "Apply",
            req.body
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
    Axios
        .post(
            url + "Signin",
            req.body
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

app.post('/adminLogin', (req, res) => {
    Axios
        .post(
            url + "administrator",
            req.body
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

app.post('/interview', (req, res) => {
    Axios
        .post(
            url + "interview",
            req.body
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

app.listen(30100, () => {
    console.log('I\'m listening on port 30100!')
});