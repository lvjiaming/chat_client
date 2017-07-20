cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        this.node.on("child-added", () => {
            const child = this.node.children;
            if (child.length > 10) {
                cc.log(`已超过10个，删除一条信息`);
                destory(child[child.length - 1]);
            }
        });
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
