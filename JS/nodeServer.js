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

let dataProduce = (Origin) => {
    let data = "\""
    for (i in Origin) {
        data = data + i + "=" + Origin[i] + "&"
    }
    data = data.slice(0, data.length - 1)
    data += "\""
    return data
}

let newAxios = (method, req, resToBrowser, data) => {
    console.log("data:")
    console.log(data)
    Axios
        .post(
            url + method,
            data
        ).then(response => {
            console.log(JSON.stringify(response.data))
            resToBrowser.json(response.data)
        }).catch(err => {
            // console.error(err);
            // console.log(err.response.data)
            // console.log("error")
            resToBrowser.json({
                status: "error",
                ServerType: "node",
                data: data,
                // html: err.response.data
            })
        })
}

app.post('/studentLogin', (req, resToBrowser) => {
    // Axios
    //     .post(
    //         url + "studentLogin",
    //         req.body
    //     ).then(response => {
    //         console.log(JSON.stringify(response.data))
    //         resToBrowser.json(response.data)
    //     }).catch(err => {
    //         console.log("<----------------->")
    //         console.error(err);
    //         resToBrowser.json({
    //             status: "Server Error",
    //             ServerType: "node"
    //         })
    //         console.log("<----------------->")

    //     })
    newAxios("studentLogin", req, resToBrowser, req.body)
})

app.post('/studentApply', (req, resToBrowser) => {
    // Axios
    //     .post(
    //         url + "Apply",
    //         req.body
    //     ).then(response => {
    //         console.log(JSON.stringify(response.data))
    //         resToBrowser.json(response.data)
    //     }).catch(err => {
    //         console.log("<----------------->")
    //         console.error(err);
    //         resToBrowser.json({
    //             status: "Server Error",
    //             ServerType: "node"
    //         })
    //         console.log("<----------------->")

    //     })
    newAxios("Apply", req, resToBrowser, req.body)

})

app.post('/Sign', (req, resToBrowser) => {
    // Axios
    //     .post(
    //         url + "Signin",
    //         req.body
    //     ).then(response => {
    //         console.log(JSON.stringify(response.data))
    //         resToBrowser.json(response.data)
    //     }).catch(err => {
    //         console.log("<----------------->")
    //         console.error(err);
    //         resToBrowser.json({
    //             status: "Server Error",
    //             ServerType: "node"
    //         })
    //         console.log("<----------------->")

    //     })
    newAxios("Signin", req, resToBrowser, dataProduce(req.body))

})

app.post('/adminLogin', (req, resToBrowser) => {
    // Axios
    //     .post(
    //         url + "administrator",
    //         req.body
    //     ).then(response => {
    //         console.log(JSON.stringify(response.data))
    //         resToBrowser.json(response.data)
    //     }).catch(err => {
    //         console.log("<----------------->")
    //         console.error(err);
    //         resToBrowser.json({
    //             status: "Server Error",
    //             ServerType: "node"
    //         })
    //         console.log("<----------------->")

    //     })
    newAxios("administrator", req, resToBrowser, dataProduce(req.body))

})

app.post('/interview', (req, resToBrowser) => {
    // Axios
    //     .post(
    //         url + "interview",
    //         req.body
    //     ).then(response => {
    //         console.log(JSON.stringify(response.data))
    //         resToBrowser.json(response.data)
    //     }).catch(err => {
    //         console.log("<----------------->")
    //         console.error(err);
    //         resToBrowser.json({
    //             status: "Server Error",
    //             ServerType: "node"
    //         })
    //         console.log("<----------------->")

    //     })
    newAxios("interview", req, resToBrowser, dataProduce(req.body))

})

app.post('/managestudent', (req, resToBrowser) => {
    // Axios
    //     .post(
    //         url + "managestudent",
    //         req.body
    //     ).then(response => {
    //         console.log(JSON.stringify(response.data))
    //         resToBrowser.json(response.data)
    //     }).catch(err => {
    //         console.log("<----------------->")
    //         console.error(err);
    //         resToBrowser.json({
    //             status: "Server Error",
    //             ServerType: "node"
    //         })
    //         console.log("<----------------->")

    //     })
    newAxios("managestudent", req, resToBrowser, dataProduce(req.body))

})

const port = 3000
    // const url = "127.0.0.1"
app.listen(port, () => {
    console.log(`I'm listening on port ${port}!`)
});