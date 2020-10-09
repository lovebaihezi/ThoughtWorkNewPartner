if (sessionStorage.student) {
    if (sessionStorage.interview) {
        location.href = "./su.html"
    } else {
        if(history.length >1){
            history.go(-1)
        }else{
            location.replace("./selection.html")
        }
    }
}

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

function packInformation(form: HTMLFormElement): string {
    let allInformation: Object = {}
    Array.from(form.elements).forEach((item: HTMLInputElement): void => {
        item.name != "" ? allInformation[item.name] = item.value : 0
    })
    return JSON.stringify(allInformation)
}

function sendInformation(json: string, place: string, thenAction: Function): void {
    const newAjax: XMLHttpRequest = new XMLHttpRequest()
    newAjax.open("post", place, true)
    newAjax.setRequestHeader("content-type", "application/json; charset=UTF-8");
    newAjax.addEventListener("readystatechange", function (): void {
        if (newAjax.readyState == 4 && newAjax.status == 200) {
            thenAction(newAjax.response)
        }
    })
    newAjax.send(json)
}

function closeForm(formElement: HTMLElement): void {
    formElement.classList.add("close")
}

function showForm(formElement: HTMLElement): void {
    formElement.classList.remove("close")
}

function login(): void {
    let formInformation: Object = JSON.parse(packInformation(studentForm))
    sendInformation(JSON.stringify(formInformation), "http://127.0.0.1:3000/studentLogin", loginSuccessAction)
}

function apply(): void {
    login()
}

function adminLogin(): void {
    sendInformation(packInformation(adminForm), "http://127.0.0.1:3000/adminLogin", adminSuccessAction)
}

function loginSuccessAction(response: string): void {
    if (JSON.parse(response).status == "success") {
        if (JSON.parse(response).Telephone == "") {
            alert("你还未报名，请先报名哦！")
            isClickStudent = false
            loginOrApply['isClick'] = false
            location.reload()
        }
        else {
            sessionStorage.student = JSON.parse(response)
            if(history.length >1){
                history.go(-1)
            }else{
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

function applySuccessAction(response: string): void {
    loginSuccessAction(response)
}

function adminSuccessAction(response: string): void {
    sessionStorage.interview = JSON.parse(response)
}

function waitingResponse() {

}
