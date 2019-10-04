cc.Class({
    extends: cc.Component,

    properties: {
        // tốc độ cuộn tính theo px / s
        speed: -300,
        // x bắt đầu lăn lại sau khi đạt đến vị trí này
        resetX: -300
    },

    onLoad(){
        this.canScroll = true;
    },

    update (dt) {
        if (!this.canScroll) {
            return;
        }
        this.node.x += this.speed * dt;
        if (this.node.x <= this.resetX) {
            this.node.x -= this.resetX;
        }
    },

    stopScroll (){
        this.canScroll = false;
    },

    startScroll(){
        this.canScroll = true;
    }
});