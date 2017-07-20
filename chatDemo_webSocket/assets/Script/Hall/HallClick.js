cc.Class({
    extends: cc.Component,

    properties: {
        editBox: {
            default: null,
            type: cc.EditBox,
            tooltip: "输入框",
        },
    },

    // use this for initialization
    onLoad: function () {

    },
    //  创建房间
    onCreateRoomClick() {
        cc.dd.chatEventManager.startEvent(cc.dd.chatEvent.EVENT_CREATE_ROOM_REQ);
    },
    //  加入房间
    onEnterRoomClick() {
        const roomId = parseInt(this.editBox.string);
        if (!roomId) {
            cc.log(`房间号为空`);
            return;
        }
        cc.log(`请求加入房间${roomId}`);
        cc.dd.chatEventManager.startEvent(cc.dd.chatEvent.EVENT_ENTER_ROOM_REQ, roomId);
    },
});
