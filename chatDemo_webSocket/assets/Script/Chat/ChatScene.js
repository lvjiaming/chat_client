cc.Class({
    extends: cc.Component,

    properties: {
        title: {
            default: null,
            type: cc.Label,
            tooltip: "标题",
        },
        userList: {
            default: null,
            type: cc.Node,
            tooltip: "用户列表",
        },
        messageList: {
            default: null,
            type: cc.Node,
            tooltip: "消息列表",
        },
    },

    // use this for initialization
    onLoad: function () {
        cc.dd.RoomEM.addObserver(this);
        cc.dd.chatEventManager.addObserver(this);
        this.initRoomInfo();
    },
    onDestroy() {
        cc.dd.chatEventManager.removeObserver(this);
        cc.dd.RoomEM.removeObserver(this);
    },
    initRoomInfo() {
        this.title.string = `${cc.dd.RoomData.roomOwn}的房间`;
        this.initUserList();
    },
    initUserList() {
        const userList = this.getSelfIsFirst();
        userList.forEach((item) => {
            this.addUser(item);
        });
    },
    getSelfIsFirst() {
        const userList = cc.dd.RoomData.userList;
        userList.forEach((item, index) => {
            if (item === cc.dd.UserData.nickName) {
                let user = userList[0];
                userList[0] = userList[index];
                userList[index] = user;
            }
        });
        return userList;
    },
    addUser(nickName) {
        const UserNode = new cc.Node('user');
        UserNode.nickName = nickName;
        const labelComp = UserNode.addComponent(cc.Label);
        labelComp.string = nickName;
        this.userList.addChild(UserNode);
        labelComp.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
        UserNode.width = 200;
        labelComp.fontSize = 30;
        labelComp.lineHeight = 35;
    },
    removeUser(data) {
        const users = this.userList.children;
        users.forEach((item) => {
            if (item.nickName === data) {
                item.destroy();
            }
        });
    },
    updataMessageTool(data) {
        cc.log(`刷新消息栏内容`);
        const newLabelNode = new cc.Node("label");
        const labelComp = newLabelNode.addComponent(cc.Label);
        labelComp.string = `${data.sendUser}: ${data.sendNote}`;
        labelComp.fontSize = 25;
        labelComp.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
        labelComp.lineHeight = 25;
        labelComp.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        newLabelNode.width = 500;
        this.messageList.addChild(newLabelNode);
        newLabelNode.setPosition(cc.p(0, 0));
    },
    onEventMessage(event, data) {
        cc.log(`收到协议：${event}`);
        switch (event) {
            case cc.dd.RoomEvent.USER_ENTER: {
                this.addUser(data);
                break;
            }
            case cc.dd.chatEvent.EVENT_SEND_MEG_REP: {
                this.updataMessageTool(data);
                break;
            }
            case cc.dd.chatEvent.EVENT_LEAVE_ROOM_REP: {  //  离开房间的回复
                if (data.code === 100) {
                    cc.director.loadScene("HallScene");
                } else {
                    cc.log(`离开失败`)
                }
                break;
            }
            case cc.dd.RoomEvent.USER_LEAVE_PUSH: {
                this.removeUser(data);
                break;
            }
            default: {
                break;
            }
        }
    },

});
