var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.deviceVersion(); 
    },
    deviceVersion: function () {
        //var htmltemp = "<br/> 设备上的cordova版本：" + device.cordova +
        //    "<br/> 设备名称：" + device.model +
        //    "<br/> 设备平台系统：" + device.platform +
        //    "<br/> 设备唯一标识符" + device.uuid +
        //    "<br/> 设备平台操作系统版本号：" + device.version +
        //    "<br/> 设备平台制造商：" + device.manufacturer;
        //alert(device.uuid);
        localStorage.setItem("DEVICEUUID", device.uuid);
        //alert(device.serial);
        //return device.uuid;
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {

        //console.log('Received Event: ' + id);
    }
};
app.initialize();