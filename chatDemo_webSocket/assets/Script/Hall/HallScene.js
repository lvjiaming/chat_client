cc.Class({
    extends: cc.Component,

    properties: {
        messageTool: {
            default: null,
            type: cc.Node,
            tooltip: "消息栏",
        },
    },

    // use this for initialization
    onLoad: function () {
        cc.dd.chatEventManager.addObserver(this);
        cc.dd.RoomEM.addObserver(this);
    },
    onDestroy() {
        cc.dd.chatEventManager.removeObserver(this);
        cc.dd.RoomEM.removeObserver(this);
    },
    updataMessageTool(data) {
        cc.log(`刷新消息栏内容`);
        const newLabelNode = new cc.Node("label");
        const labelComp = newLabelNode.addComponent(cc.Label);
        labelComp.string = data.mesNote;
        labelComp.fontSize = 20;
        labelComp.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
        labelComp.lineHeight = 20;
        newLabelNode.width = 300;
        this.messageTool.addChild(newLabelNode);
        newLabelNode.setAnchorPoint(cc.p(0, 0.5));
        newLabelNode.setPosition(cc.p(0, 0));
    },
    onEventMessage(event, data) {
        cc.log(`收到协议：${event}`);
        switch (event) {
            case cc.dd.chatEvent.EVENT_MESSAGE_PUSH: {
                this.updataMessageTool(data);
                break;
            }
            case cc.dd.RoomEvent.ENTER_ROOM_FUC: {  //  进入房间的回复
                cc.director.loadScene("ChatScene");
                break;
            }
            case cc.dd.RoomEvent.CREATE_ROOM_FUC: {
                cc.director.loadScene("ChatScene");
                break;
            }
            default: {
                break;
            }
        }
    },

});
