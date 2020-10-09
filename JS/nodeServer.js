const express = require('express');
const Axios = require('axios');
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
    res.header("Access-Control-Allow-Origin", "*")
    res.header("content-type", "application/json; charset=UTF-8")
    next();
});

app.post('/studentLogin', (req, res) => {
    console.log(req.body)
    res.json(req.body)
})

app.post('/adminLogin', (req, res) => {
    console.log(req.body)
    res.json(req.body)
})

app.listen(3000, () => {
    console.log('I\'m listening on port 3000!')
});