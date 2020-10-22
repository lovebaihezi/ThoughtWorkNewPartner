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
//     try {
//         newAjax.send(json)
//     } catch (error) {
//         alert(error)
//     }
// }
// let waitingResponse = () => {
//     let submit: HTMLInputElement = document.getElementById("SignId") as HTMLInputElement
//     submit.value = "等待响应中"
// }
// let signForm: HTMLFormElement = document.forms[0]
// let studentID: HTMLInputElement = signForm.querySelector("input")
// const url = "localhost:30000"
// signForm.addEventListener("submit", (defaultEvent: Event) => {
//     defaultEvent.preventDefault()
//     sendInformation(JSON.stringify({ studentID: studentID.value }), url, (response: string) => {
//         JSON.parse(JSON.parse(response)).status == "success"
//             ? alert("签到成功")
//             : alert("签到失败")
//     })
// })
// import { AjaxPost,AjaxData } from "./ajaxPost";
const AjaxPost = require('./ajaxPost')


