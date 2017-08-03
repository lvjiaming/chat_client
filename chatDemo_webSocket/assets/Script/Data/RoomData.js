const EventManager = require('../Event/EventManager.js');

const RoomEvent = {
    CREATE_ROOM_FUC: "cteate_fuc",
    ENTER_ROOM_FUC: "enter_room_fuc",
    USER_ENTER: "user_enter",
    USER_LEAVE_PUSH: "user_leave_push",
};
cc.dd.RoomEvent = RoomEvent;
const RoomEM = cc.Class({
    extends: EventManager,
});
cc.dd.RoomEM = RoomEM.getInstance();

const RoomData = cc.Class({
    statics: {
        getInstance() {
            if (!this.room) {
                this.room = new RoomData();
            }
            return this.room;
        },
    },
    properties: {
        _roomId: 0,
        roomId: {
            set(value) {
                this._roomId = value;
            },
            get() {
                return this._roomId;
            },
        },
        _userList: [],
        userList: {
            set(value) {
                this._userList = value;
            },
            get() {
                return this._userList;
            },
        },
        _roomOwn: "",
        roomOwn: {
            set(value) {
                this._roomOwn = value;
            },
            get() {
                return this._roomOwn;
            },
        },
    },
    ctor() {
        this.userList = [];
    },
    otherPlayerEnter(data) {
        this.userList.push(data);
        cc.dd.RoomEM.notifyEvent(cc.dd.RoomEvent.USER_ENTER, data.user);
    },
    otherPlayerLeave(data) {
        this.userList.forEach((item) => {
            if (item === data.nickName) {
                cc.log(`将玩家${item}从玩家列表移除`);
            }
        });
        cc.dd.RoomEM.notifyEvent(cc.dd.RoomEvent.USER_LEAVE_PUSH, data.nickName);
    },
    enterRoom(data) {
        if (data.code === -1) {
            cc.log(data.errorMsg);
        } else {
            cc.dd.copy(data.data).toCover(this);
            cc.dd.RoomEM.notifyEvent(cc.dd.RoomEvent.ENTER_ROOM_FUC);
        }
    },
    setMsg(data) {
        cc.dd.copy(data).toCover(this);
        cc.dd.RoomEM.notifyEvent(cc.dd.RoomEvent.CREATE_ROOM_FUC);
    },
});
cc.dd.RoomData = RoomData.getInstance();
