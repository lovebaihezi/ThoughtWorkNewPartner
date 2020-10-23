class AjaxPost extends XMLHttpRequest {
    url: string = ""
    error: Function = (): void => {
        document.getElementById("error").style.display = "flex"
        document.getElementById("error").onclick = () => { document.getElementById("error").style.display = "none" }
    }
    waiting: Function = (): void => {
        document.getElementById("waiting").style.display = "flex"
        document.getElementById("waiting").onclick = () => { document.getElementById("waiting").style.display = "none" }
    }
    success: Function = (): void => {
        document.getElementById("success").style.display = "flex"
        document.getElementById("success").onclick = () => { document.getElementById("success").style.display = "none" }
    }
    failed: Function = (): void => {
        document.getElementById("failed").style.display = "flex"
        document.getElementById("failed").onclick = () => { document.getElementById("failed").style.display = "none" }
    }
    checkStatus: Function = (response: object): boolean => {
        return response["status"] == "success"
    }
    constructor(url: string , data: string , err?: Function, wait?: Function, next?: Function, fail?: Function) {
        super();
        this.url = url || ""
        let This = this
        sessionStorage.setItem("savedInformation",data)
        const errorNext = (() => {
            This.error()
            err ? err() : 0
        })
        const waitingNext = (() => {
            This.waiting()
            wait ? wait() : 0
        })
        const successNext = ((res:object) => {
            This.success()
            next ? next(res) : 0
        })
        const failedNext = (() => {
            This.failed()
            fail ? fail() : 0
        })
        this.open("post", url, true)
        this.onreadystatechange = () => {
            this.readyState == 4 && this.status == 200 ?
                this.checkStatus(this.response) ?
                    next(JSON.parse(this.response))
                    : failedNext()
                : waitingNext()
        }
        try {
            this.send(data)
        } catch (err) {
            this.error()
        }
    }
}

class AjaxData {
    url: string = ""
    data: string = ""
    dataOrigin: HTMLElement = document.querySelector("div")
    constructor(url: string, dataOrigin: HTMLElement, getData: Function) {
        this.url = url
        this.dataOrigin = dataOrigin
        this.data = getData(this.dataOrigin)
    }
}