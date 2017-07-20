
cc.Class({
    extends: cc.Component,

    properties: {
        loginButton: {
            default: null,
            type: cc.Node,
            tooltip: '登陆按钮',
        },
    },

    // use this for initialization
    onLoad: function () {
        cc.log(`开始连接服务器`);
        cc.dd.chatEventManager.connectServer(cc.dd.pubConst.hostStr, this.connectCallBack.bind(this));
        cc.dd.UserEM.addObserver(this);
        const data = new Date();
        cc.log(`时间,${data.getHours()}时${data.getMinutes()}分${data.getSeconds()}秒`);
        // this.scheduleOnce(() => {
        //     cc.dd.chatEventManager.startEvent(cc.dd.chatEvent.EVENT_LEAVE_ROOM_REQ, "测试信息");
        // }, 1);
    },
    onDestroy() {
        cc.dd.UserEM.removeObserver(this);
    },
    connectCallBack() {
        this.loginButton.active = true;
    },
    onEventMessage(event, data) {
        cc.log(`收到协议：${event}`);
        switch (event) {
            case cc.dd.UserEvent.LOGIN_SUC: { //  登陆的回复
                cc.director.loadScene("HallScene");
                break;
            }
            default: {
                break;
            }
        }
    },

});