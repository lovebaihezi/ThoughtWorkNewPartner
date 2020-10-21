if (sessionStorage.student) {
    if (sessionStorage.interview) {
        location.href = "./su.html"
    } else {
        if (history.length > 1) {
            history.go(-1)
        } else {
            location.replace("./selection.html")
        }
    }
}

import { AjaxPost } from "./ajaxPost";

const loginButton: HTMLDivElement = document.getElementById("normalSubmit") as HTMLDivElement
const changeToStudentApplyOrLogin: HTMLDivElement = document.getElementById("leftButton") as HTMLDivElement
const changeToAdminLogin: HTMLDivElement = document.getElementById("rightButton") as HTMLDivElement
const studentForm: HTMLFormElement = document.forms[0]
const adminForm: HTMLFormElement = document.forms[1]
const loginOrApply: HTMLDivElement = document.getElementById("showApplyButton") as HTMLDivElement
const extraForm: HTMLDivElement = document.getElementById("otherInformation") as HTMLDivElement

loginOrApply['isClick'] = false
let isClickStudent = false
let isClickAdmin = false

loginOrApply.addEventListener("click", () => {
    loginOrApply['isClick'] = true
    loginOrApply.classList.add("close")
    extraForm.style.display = "none"
    document.getElementById("Telephone").removeAttribute("required")
    document.getElementById("Choose").removeAttribute("required")
})

let pro: string = "login"

studentForm.addEventListener("submit", formEvent => {
    formEvent.preventDefault()
    if (isClickStudent) {
        return
    } else {
        isClickStudent = true
        if (loginOrApply['isClick']) {
            login()
        } else {
            apply()
        }
    }

})

adminForm.addEventListener("submit", formEvent => {
    formEvent.preventDefault()
    if (isClickAdmin) {
        return
    } else {
        adminLogin()
    }
})

changeToAdminLogin.addEventListener("click", () => {
    changeToAdminLogin.classList.add("on")
    changeToStudentApplyOrLogin.classList.remove("on")
    closeForm(studentForm)
    showForm(adminForm)
})

changeToStudentApplyOrLogin.addEventListener("click", () => {
    changeToAdminLogin.classList.remove("on")
    changeToStudentApplyOrLogin.classList.add("on")
    showForm(studentForm)
    closeForm(adminForm)
})

let { login, apply, adminLogin, closeForm, showForm } = TW_Login()
function TW_Login() {
    let packInformation = (form: HTMLFormElement): string => {
        let allInformation: Object = {}
        Array.from(form.elements).forEach((item: HTMLInputElement): void => {
            item.name != "" ? allInformation[item.name] = item.value : 0
        })
        return JSON.stringify(allInformation)
    }

    let sendInformation = (json: string, place: string, thenAction: Function): void => {
        waitingResponse()
        const newAjax: XMLHttpRequest = new XMLHttpRequest()
        newAjax.open("post", place, true)
        // newAjax.setRequestHeader("content-type", "application/json; charset=UTF-8");
        newAjax.addEventListener("readystatechange", (): void => {
            if (newAjax.readyState == 4 && newAjax.status == 200) {
                thenAction(newAjax.response)
            } else {
                waitingResponse()
            }
        })
        try{
            newAjax.send(json)
        }catch(err){
            alert("服务器好像出了点问题。。。")
            isClickStudent = false
        }
        
    }

    let closeForm = (formElement: HTMLElement): void => {
        formElement.classList.add("close")
    }

    let showForm = (formElement: HTMLElement): void => {
        formElement.classList.remove("close")
    }

    // const url :string = "http://176.122.165.147:3000/"
    const url: string = "http://localhost:30100/"

    let login = (): void => {
        let formInformation: Object = JSON.parse(packInformation(studentForm))
        sendInformation(JSON.stringify(formInformation), url + "studentLogin", loginSuccessAction)
    }

    let apply = (): void => {
        login()
    }

    let adminLogin = (): void => {
        sendInformation(packInformation(adminForm), url + "adminLogin", adminSuccessAction)
    }

    let loginSuccessAction = (response: string): void => {
        // console.log(JSON.parse(JSON.parse(response)))
        if (JSON.parse(JSON.parse(response)).status == "success") {
            if (JSON.parse(response).Telephone == "") {
                alert("你还未报名，请先报名哦！")
                isClickStudent = false
                loginOrApply['isClick'] = false
                location.reload()
            }
            else {
                sessionStorage.setItem("student", JSON.parse(response))
                if (history.length > 1) {
                    history.go(-1)
                } else {
                    location.replace("./selection.html")
                }
            }
        } else {
            isClickStudent = false
            alert("账号或密码错误")
            for (let i in studentForm.elements) {
                if (studentForm.elements[i]['name'] == "mm") {
                    studentForm.elements[i]['value'] = ""
                }
            }
        }
    }

    // let applySuccessAction = (response: string): void => {
    //     loginSuccessAction(response)
    // }

    let adminSuccessAction = (response: string): void => {
        sessionStorage.interview = JSON.parse(response)
    }

    let waitingResponse = () => {
    }
    return { login, apply, adminLogin, closeForm, showForm }
}

