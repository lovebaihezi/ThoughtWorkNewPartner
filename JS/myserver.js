//1. 引入express
const express = require('express');

//2. 创建应用对象
const app = express();

//3. 创建路由规则
// request 是对请求报文的封装
// response 是对响应报文的封装
//把之前的/改成/server是为了，当客户端想浏览器端发送请求时，如果url的路径，
//即请求行的第二段内容的路径是/server时，就执行回调函数里的内容，由response作出响应
app.get('/server', (request, response)=>{
    //设置响应头,设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    //设置响应
    response.send('HELLO AJAX -2');
});
//all代表可以接受克重类型的请求如get,post，POST
app.all('/server', (request, response)=>{
    //设置响应头,设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    response.setHeader('Access-Control-Allow-Headers','*');
    //设置响应
    response.send('HELLO AJAX POST');
});

//JSON
app.all('/json-server', (request, response)=>{
    //设置响应头,设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    response.setHeader('Access-Control-Allow-Headers','*');
    //响应数据
    const data = {
        name: 'lizhi',
        studentNumber:"04193146",
        telephoneNumber:"12345678900",
        eMail:"22222222222@qq.com",
        direction:"后台",
        prozess:"3"
    };
    //对对象进行字符串转化
    let str = JSON.stringify(data);
    //设置响应
    response.send(str);
});



//4. 监听端口启动服务
app.listen(8000, ()=>{
    console.log("服务已经启动, 8000 端口监听中....");
});