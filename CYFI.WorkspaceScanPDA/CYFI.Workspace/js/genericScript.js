var Common = {
    getRemotePort: function () {
        return localStorage.getItem("GatewayUrl");
        //return "http://localhost:12480/";
        return "http://27.150.175.215:5028/";
    },
    getWeChatRemotePort: function () {
        //return "http://localhost:12480/";
        return "http://gd.cyerp19.com:5028/";
    },
    getDefaultUser: function () {
        return "0000";
    },
    jsNC: function () {
        return "&NC=" + (new Date()).getTime();
    },
    jsNC2: function () {
        return "?NC=" + (new Date()).getTime();
    },
    CheckUserLogin: function () {
        var authorization = localStorage.getItem("authorization");
        var STToken = localStorage.getItem("STToken");
        var userr = localStorage.getItem("userr");
        //var authorization = $.cookie('authorization');
        //var STToken = $.cookie('STToken');
        if (!authorization || !STToken) {
            window.location.href = "login.html";
        }
        else if (authorization == '' || STToken == '') {
            window.location.href = "login.html";
        }
        else {

        }
    },
    getUrlParam: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
    },
    CreateInputText: function (id, name, label) {
        var inputStr = "<div class=\"layui-form-item\">"
            + "<label class=\"layui-form-label\">" + label + "</label>"
            + "<div class=\"layui-input-inline\" style=\"width:60%\" > "
            + "<input type=\"text\" name=\"" + name + "\" id=\"" + id + "\"   class=\"layui-input\" />"
            + "</div>"
            + "</div>"
        return inputStr;
    },
    CreateInputCheckbox: function (id, name, label) {
        var inputStr = "<div class=\"layui-form-item\">"
            + "<label class=\"layui-form-label\">" + label + "</label>"
            + "<div class=\"layui-input-inline\" style=\"width:60%\" > "
            + "<input  type=\"checkbox\" name=\"" + name + "\" id=\"" + id + "\" value = \"1\"  lay-skin=\"primary\" />"
            + "</div>"
            + "</div>";
        return inputStr;
    },
    CreateInputSelect: function (id, name, label) {
        var inputStr = "<div class=\"layui-form-item\">"
            + "<label class=\"layui-form-label\">" + label + "</label>"
            + "<div class=\"layui-input-inline\" style=\"width:60%\" > "
            + "<input type=\"text\" onclick=\"selectOpen('" + id + "')\" class=\"layui-input laydateselect\" name=\"" + name + "\" readonly id=\"" + id + "\"  lay-filter=\"" + id + "\" />"
            + "</div>"
            + "</div>";
        return inputStr;
    },
    CreateCheckboxSelect: function (id, name, label) {
        var inputStr = "<div class=\"layui-form-item\">"
            + "<label class=\"layui-form-label\">" + label + "</label>"
            + "<div class=\"layui-input-inline\" style=\"width:60%\" > "
            + "<input type=\"text\" onclick=\"selectCheckboxOpen('" + id + "')\" style=\"background-image: url(../img/select.ico); background-repeat: no-repeat;background-position: right; cursor: pointer\" class=\"layui-input laydateselect\" name=\"" + name + "\" readonly id=\"" + id + "\"  lay-filter=\"" + id + "\" />"
            + "</div>"
            + "</div>";
        return inputStr;
    },
    CreateInputDate: function (id, name, label) {
        var inputStr = "<div class=\"layui-form-item\">"
            + "<label class=\"layui-form-label\">" + label + "</label>"
            + "<div class=\"layui-input-inline\" style=\"width:60%\" > "
            + "<input type=\"text\"  class=\"layui-input laydateinput\"  autocomplete=\"off\" name=\"" + name + "\" readonly id=\"" + id + "\"   />"
            + "</div>"
            + "</div>";
        return inputStr;
    }
};