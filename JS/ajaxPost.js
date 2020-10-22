'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.AjaxData = exports.AjaxPost = void 0;
var AjaxPost = /** @class */ (function (_super) {
    __extends(AjaxPost, _super);
    function AjaxPost(url, data, err, wait, next, fail) {
        if (url === void 0) { url = ""; }
        if (data === void 0) { data = "{}"; }
        var _this = _super.call(this) || this;
        _this.url = "";
        _this.error = function () { };
        _this.waiting = function () { };
        _this.success = function () { };
        _this.failed = function () { };
        _this.checkStatus = function (response) { return response["status"] == "success"; };
        _this.url = url || "";
        _this.error = err || (function () { });
        _this.waiting = wait || (function () { });
        _this.success = next || (function () { });
        _this.failed = fail || (function () { });
        _this.open("post", url, true);
        _this.onreadystatechange = function () {
            _this.readyState == 4 && _this.status == 200 ?
                _this.checkStatus(_this.response) ?
                    next(JSON.parse(_this.response))
                    : _this.failed()
                : _this.waiting();
        };
        try {
            _this.send(data);
        }
        catch (err) {
            _this.error();
        }
        return _this;
    }
    return AjaxPost;
}(XMLHttpRequest));
exports.AjaxPost = AjaxPost;
var AjaxData = /** @class */ (function () {
    function AjaxData(url, dataOrigin, getData) {
        this.url = "";
        this.data = "";
        this.dataOrigin = document.querySelector("div");
        this.url = url;
        this.dataOrigin = dataOrigin;
        this.data = getData(this.dataOrigin);
    }
    return AjaxData;
}());
exports.AjaxData = AjaxData;
