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

// import { AjaxPost,AjaxData } from "./ajaxPost"

// const AjaxPost = require('./ajaxPost')
// const AjaxData = require('./ajaxPost')

// let timeout = 1000;

// class AjaxPost extends XMLHttpRequest {
//     url: string = ""
//     error: Function = (): void => {
//         document.getElementById("error").style.display = "flex"
//         document.getElementById("error").onclick = () => { document.getElementById("error").style.display = "none" }
//     }
//     waiting: Function = (): void => {
//         document.getElementById("waiting").style.display = "flex"
//         document.getElementById("waiting").onclick = () => { document.getElementById("waiting").style.display = "none" }
//     }
//     success: Function = (): void => {
//         document.getElementById("success").style.display = "flex"
//         document.getElementById("success").onclick = () => { document.getElementById("success").style.display = "none" }
//     }
//     failed: Function = (): void => {
//         document.getElementById("failed").style.display = "flex"
//         document.getElementById("failed").onclick = () => { document.getElementById("failed").style.display = "none" }
//     }
//     checkStatus: Function = (response: object): boolean => {
//         return response["status"] == "success"
//     }
//     constructor(url: string , data: string , err?: Function, wait?: Function, next?: Function, fail?: Function) {
//         super();
//         this.url = url || ""
//         let This = this
//         sessionStorage.setItem("savedInformation",data)
//         const errorNext = (() => {
//             This.error()
//             err ? err() : 0
//         })
//         const waitingNext = (() => {
//             This.waiting()
//             wait ? wait() : 0
//         })
//         const successNext = ((res:object) => {
//             This.success()
//             next ? next(res) : 0
//         })
//         const failedNext = (() => {
//             This.failed()
//             fail ? fail() : 0
//         })
//         this.open("post", url, true)
//         this.onreadystatechange = () => {
//             this.readyState == 4 && this.status == 200 ?
//                 this.checkStatus(this.response) ?
//                     next(JSON.parse(this.response))
//                     : failedNext()
//                 : waitingNext()
//         }
//         try {
//             this.send(data)
//         } catch (err) {
//             this.error()
//         }
//     }
// }

// class AjaxData {
//     url: string = ""
//     data: string = ""
//     dataOrigin: HTMLElement = document.querySelector("div")
//     constructor(url: string, dataOrigin: HTMLElement, getData: Function) {
//         this.url = url
//         this.dataOrigin = dataOrigin
//         this.data = getData(this.dataOrigin)
//     }
// }

class response {
    status: string = ""
    ServerType: string = ""
    html: string = ""
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
    extraForm.style.display = "flex"
    Array.from(extraForm.querySelectorAll("input")).forEach((item: HTMLInputElement): void => {
        item.setAttribute("required", "on");
    })
})

let pro: string = "login"

studentForm.addEventListener("submit", formEvent => {
    formEvent.preventDefault()
    if (isClickStudent) {
        return
    } else {
        isClickStudent = true
        if (!loginOrApply['isClick']) {
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


// let login: Function = (): void => {
//     const loginData = new AjaxData(
//         "/studentApply", studentForm, (form: HTMLFormElement): string => {
//             let allInformation: Object = {}
//             Array.from(form.elements).forEach((item: HTMLInputElement): void => {
//                 allInformation[item.name] = item.value
//             })
//             return JSON.stringify(allInformation)
//         }
//     );
//     const Ajax = new AjaxPost(
//         loginData.url,loginData.data
//     )
//     console.log(loginData)
//     console.log(Ajax)
// }

// let apply: Function = (): void => {

// }

// let adminLogin: Function = (): void => {

// }

let { login, apply, adminLogin, closeForm, showForm } = TW_Login()
function TW_Login() {
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
                isClickStudent = false
                document.getElementById("waiting").style.display = "none"
                thenAction(newAjax.response)
            } else {
                waitingResponse()
            }
        })
            newAjax.send(json)
    }

    let closeForm  :Function= (formElement: HTMLElement): void => {
        formElement.classList.add("close")
    }

    let showForm :Function = (formElement: HTMLElement): void => {
        formElement.classList.remove("close")
    }

    // const url :string = "http://176.122.165.147:3000/"
    const url: string = "http://localhost:3000/"

    let login :Function = (): void => {
        let formInformation: Object = JSON.parse(packInformation(studentForm))
        sendInformation(JSON.stringify(formInformation), url + "studentLogin", loginCheckAction)
    }

    let apply :Function = (): void => {
        let formInformation: Object = JSON.parse(packInformation(studentForm))
        sendInformation(JSON.stringify(formInformation), url + "studentApply", loginCheckAction)

    }

    let adminLogin :Function = (): void => {
        sendInformation(packInformation(adminForm), url + "adminLogin", adminSuccessAction)
    }

    let loginCheckAction :Function = (response: string): void => {
        let res: response = JSON.parse(response)
        let { status } = res
        if (status == "success") {
            showStatus(status, () => {
                sessionStorage.setItem("student",response)
                location.replace('../HTML/index.html')
            })
        } else {
            showStatus(status)
        }
    }

    // let applySuccessAction = (response: string): void => {
    //     loginCheckAction(response)
    // }

    let adminSuccessAction :Function = (response: string): void => {
        let res: response = JSON.parse(response)
        let { status } = res
        if (status == "success") {
            showStatus(status, () => {
                sessionStorage.setItem("interview",response)
                location.replace('../HTML/Su.html')
            })
        } else {
            showStatus(status)
        }
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
    return { login, apply, adminLogin, closeForm, showForm }
}
