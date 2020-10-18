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
    newAjax.send(json)
}
let waitingResponse = () => {
}
let searchForm : HTMLFormElement = document.getElementsByClassName('Login')[0].querySelector('form')
searchForm.addEventListener("submit", (defaultEvent: Event): void => {
    console.log(packInformation(searchForm))
    defaultEvent.preventDefault()
})
