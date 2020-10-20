'use strict'
export class AjaxPost extends XMLHttpRequest {
    url: string = ""
    error: Function = (): void => { }
    waiting: Function = (): void => { }
    success: Function = (): void => { }
    failed: Function = (): void => { }
    checkStatus: Function = (response: object): boolean => { return response["status"] == "success" }
    constructor(url: string = "", data: string = "{}", err?: Function, wait?: Function, next?: Function, fail?: Function) {
        super()
        this.url = url || ""
        this.error = err || (()=>{})
        this.waiting = wait || (()=>{})
        this.success = next || (()=>{})
        this.failed = fail || (()=>{})
        this.open("post", url, true)
        this.onreadystatechange = () => {
            this.readyState == 4 && this.status == 200 ?
                this.checkStatus(this.response) ?
                    next(JSON.parse(this.response))
                    : this.failed()
                : this.waiting()
        }
        try {
            this.send(data)
        } catch (err) {
            this.error()
        }
    }
}