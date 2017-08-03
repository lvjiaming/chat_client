cc.Class({
    extends: cc.Component,

    properties: {
        editBox: {
            default: null,
            type: cc.EditBox,
            tooltip: '输入框',
        },
    },

    // use this for initialization
    onLoad: function () {

    },
    onSendClick() {
        const note = this.editBox.string;
        const body = {
            roomId: cc.dd.RoomData.roomId,
            note: note
        };
        cc.dd.chatEventManager.startEvent(cc.dd.chatEvent.EVENT_SEND_MEG_REQ, body);
        this.editBox.string = '';
    },
    //  返回按钮
    onReturnClick() {
        const body = {
            roomId: cc.dd.RoomData.roomId,
        };
        cc.dd.chatEventManager.startEvent(cc.dd.chatEvent.EVENT_LEAVE_ROOM_REQ, body);
    },
});
