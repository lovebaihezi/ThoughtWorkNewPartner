let interviewForm: HTMLFormElement = document.forms[0]
let save: HTMLInputElement = document.getElementById("save") as HTMLInputElement
let inputList: HTMLInputElement[] = Array.from(document.querySelectorAll("label")).map((item: HTMLLabelElement): HTMLInputElement => { return item.querySelector("input") })
inputList.pop()
inputList.pop()
let a :any = {
    id: "无数据",
    name: "无数据",
    Tel: "无数据",
    subject: "无数据",
    way: "无数据",
    point: "无数据",
    Interviewer: "无数据",
    InterViewProcess: "无数据",
    comment: "无数据",
}
let student: object = JSON.parse(sessionStorage.getItem("student") || JSON.stringify(a))
let interviewer: object = JSON.parse(sessionStorage.getItem("interview") || JSON.stringify({name : "null"}))


// import { AjaxPost,AjaxData } from "./ajaxPost";

// const AjaxPost = require("./ajaxPost")

let packInformation :Function = (form: HTMLFormElement): string => {
    let allInformation: Object = {}
    Array.from(form.elements).forEach((item: HTMLInputElement): void => {
        item.name != "" ? allInformation[item.name] = item.value : 0
    })
    return JSON.stringify(allInformation)
}

let sendInformation :Function = (json: string, place: string, thenAction: Function): void => {
    waitingResponse()
    // let timeCount = setTimeout(() => {
    //     showStatus("error")
    //     isClickStudent = false
    //     location.reload()
    //     clearTimeout(timeCount)
    // }, 5000);
    // console.log(json)
    const newAjax: XMLHttpRequest = new XMLHttpRequest()
    newAjax.open("post", place, true)
    // newAjax.setRequestHeader("content-type", "application/json; charset=UTF-8");
    newAjax.addEventListener("readystatechange", (): void => {
        if (newAjax.readyState == 4 && newAjax.status == 200) {
            document.getElementById("waiting").style.display = "none"
            thenAction(newAjax.response)
        } else {
            waitingResponse()
        }
    })
    newAjax.send(json)
}
let waitingResponse :Function = (): void => {
    document.getElementById("waiting").style.display = "flex"
    // document.getElementById("waiting").onclick = () => { document.getElementById("waiting").style.display = "none" }
}
let showStatus: Function = (status: string, next: Function = () => { }): void => {
    document.getElementById(status).style.display = "flex"
    document.getElementById(status).onclick = () => {
        document.getElementById(status).style.display = "none"
        next()
    }
}

class response {
    status: string = ""
    ServerType: string = ""
    html: string = ""
}

class information extends Object {
    student: object[] = []
    interview: string = ""
    constructor(newStudent: object,) {
        super()
    }
}

let data: information

let interview = document.forms[0]
let url = "http://localhost:3000/"

interview.addEventListener("submit", (defaultEvent: Event):void => {
    defaultEvent.preventDefault()
    sendInformation(packInformation(interview), url + "interview", (response: string) => {
        let res: response = JSON.parse(response)
        let { status } = res
        if (status == "success") {
            showStatus(status, () => {
                sessionStorage.setItem("student", response)
                location.href = "../HTML/Su.html"
            })
        } else {
            showStatus(status)
        }
    })
})

let setInformation :Function = ():void => {
    if (sessionStorage.getItem("interview")) {
        (document.getElementById("interview") as HTMLInputElement).value = interviewer["name"]
        alert("你好" + interviewer["name"])
    } else {
        location.replace("../HTML/Login.html");
    }
    for (let i in student) {
        inputList.forEach((item: HTMLInputElement): void => {
            if (item.name == i) {
                item.value = student[i]
            }
        })
    }
}

setInformation()

save.addEventListener("click", () => {
    saveInformation();
})

let saveInformation :Function = () => {
    sessionStorage.setItem("student", packInformation(interview))
    document.getElementById("success").querySelector("div").innerHTML = "保存成功"
    showStatus("success")
}