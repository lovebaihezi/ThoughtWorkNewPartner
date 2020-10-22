let interviewForm: HTMLFormElement = document.forms[0]
let save :HTMLInputElement = document.getElementById('save') as HTMLInputElement
let inputList : HTMLInputElement[] = Array.from(document.querySelectorAll('label')).map((item:HTMLLabelElement):HTMLInputElement=>{return item.querySelector('input')})
inputList.pop()
inputList.pop()
let student : object = JSON.parse(sessionStorage['student']) || {}
let interviewer : object = JSON.parse(sessionStorage['interview']) || {}

// import { AjaxPost,AjaxData } from "./ajaxPost";

const AjaxPost = require('./ajaxPost')

// let packInformation = (form: HTMLFormElement): string => {
//     let allInformation: Object = {}
//     Array.from(form.elements).forEach((item: HTMLInputElement): void => {
//         item.name != "" ? allInformation[item.name] = item.value : 0
//     })
//     return JSON.stringify(allInformation)
// }

// let sendInformation = (json: string, place: string, thenAction: Function): void => {
//     waitingResponse()
//     const newAjax: XMLHttpRequest = new XMLHttpRequest()
//     newAjax.open("post", place, true)
//     // newAjax.setRequestHeader("content-type", "application/json; charset=UTF-8");
//     newAjax.addEventListener("readystatechange", (): void => {
//         if (newAjax.readyState == 4 && newAjax.status == 200) {
//             thenAction(newAjax.response)
//         } else {
//             waitingResponse()
//         }
//     })
//     newAjax.send(json)
// }
// let waitingResponse = () => {
//     // document.getElementById("loading").style.display = "block"
// }

let setInformation = ()=>{
    if(sessionStorage['interview']){
        (document.getElementById('interview') as HTMLInputElement).value = interviewer['name']
        alert("你好" + interviewer['name'])
    }else{
        location.replace('../HTML/Login.html');
    }
}

save.addEventListener("click",()=>{
    saveInformation();
})

let saveInformation = ()=>{
    // sessionStorage.setItem(student['name'],data.data)
}