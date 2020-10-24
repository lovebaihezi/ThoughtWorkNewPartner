let packInformation = (form: HTMLFormElement): string => {
    let allInformation: Object = {}
    Array.from(form.elements).forEach((item: HTMLInputElement): void => {
        item.name != "" ? allInformation[item.name] = item.value : 0
    })
    return JSON.stringify(allInformation)
}

let sendInformation = (json: string, place: string, thenAction: Function): void => {
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
let waitingResponse = (): void => {
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

let interview = document.forms[0]
let url = "http://localhost:3000/"

interview.addEventListener("submit",(defaultEvent:Event)=>{
    defaultEvent.preventDefault()
    sendInformation(packInformation(interview),url + "managestudent",(response:string)=>{
        let res: response = JSON.parse(response)
        let { status } = res
        if (status == "success") {
            showStatus(status, () => {
                sessionStorage.setItem("student",response)
                location.href = "../HTML/interview.html"
            })
        } else {
            showStatus(status)
        }
    })
})