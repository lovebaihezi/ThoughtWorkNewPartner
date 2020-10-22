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
// }
// let searchForm: HTMLFormElement = document.getElementsByClassName('Login')[0].querySelector('form')
// searchForm.addEventListener("submit", (defaultEvent: Event): void => {
//     defaultEvent.preventDefault()
//     console.log(packInformation(searchForm))
//     sendInformation(packInformation(searchForm), "", (response: string): void => {
//         let student: object = JSON.parse(JSON.parse(response))
//         if (student['status'] == "success") {
//             sessionStorage.setItem(student['name'], JSON.stringify(student))
//             location.href = "../HTML/interview.html"
//         } else {
//             alert("查无此人！")
//         }
//     })
// })
import { AjaxPost,AjaxData } from "./ajaxPost"
const Ajax = new AjaxPost()
// const ajaxData = new data()