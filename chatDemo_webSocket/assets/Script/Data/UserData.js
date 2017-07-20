const EventMnager = require('../Event/EventManager.js');

const UserEvent = {
    LOGIN_SUC: "login_suc",
};
cc.dd.UserEvent = UserEvent;
const UserEM = cc.Class({
    extends: EventMnager,
});
cc.dd.UserEM = UserEM.getInstance();
const UserData = cc.Class({
    statics: {
        getInstance() {
            if (!this.user) {
                this.user = new UserData();
            }
            return this.user;
        },
    },
    properties: {
        _nickName: '',
        nickName: {
            set(value) {
                this._nickName = value;
            },
            get() {
                return this._nickName;
            },
        },
    },
    ctor() {

    },
    setMsgData(data) {
        if (data.code === -1) {
            cc.log(data.errorMsg);
        } else {
            cc.log(`登陆成功`);
            cc.dd.copy(data).toCover(this);
            cc.dd.UserEM.notifyEvent(cc.dd.UserEvent.LOGIN_SUC);
        }
    },
});
cc.dd.UserData = UserData.getInstance();
