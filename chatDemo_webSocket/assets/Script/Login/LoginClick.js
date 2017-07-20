cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {

    },
    //  登陆
    onLoginClick() {
        cc.dd.chatEventManager.startEvent(cc.dd.chatEvent.EVENT_LOGIN_REQ);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
