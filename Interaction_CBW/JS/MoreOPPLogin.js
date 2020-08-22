//Author:LQXC 柴博文

function Information(Name) { //!对象建立方式:不关心信息类型,只关心共同方法
    this.InformationName = Name;
    this.InformationValue;
    this.InformationGetFromServer;
    this.InformationFunctionsList = [];
    this.InformationNotFunctionPropertyList = [];
    this.JsonDate = {};
    this.AjaxObject;
}

Information.prototype = {
    constructor: Information,

    //*基本函数----------------------------------------BasicFunction

    //  对象函数属性汇总----------------------------------------IntegrateObjectFunctions

    InformationFunctionsSet: function() {
        for (i in this) {
            if ((typeof this[i] == "function") && i != "constructor") {
                this.InformationFunctionsList.push(i);
            }
        }
    },

    //  对象非空非函数属性汇总----------------------------------------IntegrateNotNullNotFunctionObjectProperty

    InformationNotFunctionPropertySet: function() {
        for (i in this) {
            if ((typeof this[i] != "function") && i != "constructor") {
                this.InformationNotFunctionPropertyList.push(i);
            }
        }
    },

    //  建立对象信息(JSON)----------------------------------------CreateObjectInformationAsJSON

    createOwnInformationToJSON: function() {
        this.JsonDate = {
            "Name": this.InformationName,
            "Value": this.InformationValue
        };
    },

    //  建立与服务器交接的对象----------------------------------------CreateObjectToConnectServer

    createAjaxObject: function() {
        try {
            this.AjaxObject = new XMLHttpRequest();
        } catch (err) {
            this.AjaxObject = new ActiveXObject("Microsoft.XMLHTTP ");
        }
    },

    //*交互函数----------------------------------------InteractionFunction

    //  获取函数----------------------------------------GetInformationFunction

    //      从用户输入获得信息----------------------------------------GetInformationFromInput

    getInformationFromInput: function(ChooseMethods, ChooseName) {
        return ChooseMethods(ChooseName);
    },

    //  从服务器传回信息----------------------------------------GetInformationFromServer

    getInformationFromServer: function() {
        // TODO1:
    },

    //  传递函数----------------------------------------TransferFunction

    //      传递到服务器----------------------------------------DeliveryToServer

    sendInformationToServer: function() {
        //TODO2:
    },

    //      传递到页面----------------------------------------DeliveryToWeb

    sendInformationToWeb: function() {
        //TODO3:
    },

    //*检查函数----------------------------------------InspectFunction

    checkInformation: function(CheckRules) {
        return CheckRules.test(this.InformationValue);
    },

    //*整合函数----------------------------------------IntegrateFunction

}

const Account = new Information("Account");
Account.InformationFunctionsSet();
Account.InformationNotFunctionPropertySet();
Account.createOwnInformationToJSON();
console.log(Account);