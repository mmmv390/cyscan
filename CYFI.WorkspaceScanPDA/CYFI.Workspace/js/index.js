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
        //var htmltemp = "<br/> �豸�ϵ�cordova�汾��" + device.cordova +
        //    "<br/> �豸���ƣ�" + device.model +
        //    "<br/> �豸ƽ̨ϵͳ��" + device.platform +
        //    "<br/> �豸Ψһ��ʶ��" + device.uuid +
        //    "<br/> �豸ƽ̨����ϵͳ�汾�ţ�" + device.version +
        //    "<br/> �豸ƽ̨�����̣�" + device.manufacturer;
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