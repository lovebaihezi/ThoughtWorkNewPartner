//Author:LQXC 柴博文

function A_Inherit_B(A, B) {
    var C = Object(B.prototype);
    C.constructor = A;
    A.prototype = C;
}

function Information(Name) { //!对象建立方式:不关心信息类型,只关心共同方法
    this.InformationName = Name;
    this.InformationValue;
    this.InformationGetFromServer;
    this.InformationFunctionsList = [];
    this.InformationNotFunctionPropertyList = [];
    this.JsonData = {};
    this.AjaxObject;
    this.CheckRules = /^$/g;
    this.Async = false;
    this.url = "?p=";
}

Information.prototype = {
    constructor: Information,

    //*基本函数----------------------------------------BasicFunction

    //  对象函数属性汇总----------------------------------------IntegrateObjectFunctions

    InformationFunctionsSet: function() {
        for (i in this) {
            if ((typeof this[i] == "function") && i != "constructor") {
                this.InformationFunctionsList.push(this[i]);
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
        this.JsonData = {
            'Name': this.InformationName,
            'Value': this.InformationValue
        };
    },

    //  建立与服务器交接的对象----------------------------------------CreateObjectToConnectServer

    createAjaxObject: function() {
        try {
            this.AjaxObject = new XMLHttpRequest();
        } catch (err) {
            this.AjaxObject = new ActiveXObject("Microsoft.XMLHTTP ");
        }
        this.AjaxObject.open("post", this.url, this.Async);
    },

    //  绑定输入函数----------------------------------------BindInputFunction

    bindInputFunction: function(InputFunction) {
        this.InputFunction = InputFunction;
    },

    //*交互函数----------------------------------------InteractionFunction

    //  获取函数----------------------------------------GetInformationFunction

    //      从用户输入获得信息----------------------------------------GetInformationFromInput

    getInformationFromInput: function() {
        this.InformationValue = window.btoa(this.InputFunction());
    },

    //  从服务器传回信息----------------------------------------GetInformationFromServer

    getInformationFromServer: function(ResponseDataFormat) {
        // TODO1:
        this.AjaxObject.onreadystatechange = function() {
            if (this.AjaxObject.readyState == 4 && this.AjaxObject.status == 200) {
                return this.ActiveXObject["response" + ResponseDataFormat];
            }
        }
        return false;
    },

    //  传递函数----------------------------------------TransferFunction

    //      传递到服务器----------------------------------------DeliveryToServer

    sendInformationToServer: function() {
        //TODO2:
        var This = this;
        if (!this.inspectInformation()) {
            throw this.InformationName + "不能为空!";
        } else {
            this.AjaxObject.send(This.JsonData);
        }
    },

    //      传递到页面----------------------------------------DeliveryToWeb

    sendInformationToWeb: function() {
        //TODO3:
    },

    //*检查函数----------------------------------------InspectFunction

    inspectInformation: function() {
        return this.CheckRules.test(this.InformationValue);
    },

    //*整合函数----------------------------------------IntegrateFunction

    //  构造函数----------------------------------------

    Structure: function() {
        this.InformationFunctionsSet();
        this.InformationNotFunctionPropertySet();
        // this.createAjaxObject();
    }

}

function InteractionInformation() {
    this.InformationList = [];
    this.JsonData = {};
    Information.call(this, "InformationStack");
}

A_Inherit_B(InteractionInformation, Information);

InteractionInformation.prototype.constructor = InteractionInformation;

//*基本函数----------------------------------------BasicFunction

//  建立Information对象----------------------------------------

InteractionInformation.prototype.createInformationObject = function(Name) {
    var I = new Information(Name);
    I.Structure();
    return I;
};
//  将全部Information对象建立为一个Array对象----------------------------------------

InteractionInformation.prototype.containAllInformationObjectsInArray = function(NameArray) {
    var This = this;
    NameArray.forEach(function(item) {
        This.InformationList.push(This.createInformationObject(item));
    });
};

//  为全体Information对象的信息建立JSON数据----------------------------------------

InteractionInformation.prototype.createJSONDataForObjectInformation = function() {
    var This = this;
    var Contain = {};
    this.InformationList.forEach(
        function(item) {
            item.createOwnInformationToJSON();
            Contain[item["InformationName"]] = item["InformationValue"];
        }
    );
    this.JsonData = JSON.stringify(Contain);
};

//*交互函数----------------------------------------InteractionFunction

//*检查函数----------------------------------------InspectFunction

InteractionInformation.prototype.inspectAllFunction = function() {
    return this.InformationList.every(
        function(item) {
            return item.inspectInformation();
        }
    );
};

//*整合函数----------------------------------------IntegrateFunction

//  将对象变为自己的属性----------------------------------------IntegrateFunction


InteractionInformation.prototype.addInformationObjectToProperty = function() {
    var This = this;
    this.InformationList.forEach(function(item) {
        This[item.InformationName] = item;
    });
}

//  为每个对象绑定输入函数----------------------------------------

InteractionInformation.prototype.bindInputFunctionToEach = function() {
    var This = this;
    this.InformationList.forEach(function(item) {
        item.InputFunction = function() {
            // console.log(document.getElementById(item.InformationName).value);
            return document.getElementById(item.InformationName).value;
        };
    });
}

const InformationStack = new InteractionInformation();
InformationStack.containAllInformationObjectsInArray(["Account", "Password", "Post", "MobilePhoneNumber", "Detail"]);
InformationStack.addInformationObjectToProperty();
InformationStack.Structure()
InformationStack.bindInputFunctionToEach();