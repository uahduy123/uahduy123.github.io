const PipeGroup = require('PipeGroup');

cc.Class({
    extends: cc.Component,

    properties: {
        /** Nút đường ống tài nguyên đúc sẵn */
        pipePrefab: cc.Prefab,
        /** Tốc độ di chuyển ống, đơn vị px / s */
        pipeMoveSpeed: -300,
        /** Khoảng cách giữa mỗi cặp ống, đơn vị px */
        pipeSpacing: 400
    },

    onLoad() {
        this.pipeList = [];
        this.isRunning = false;
    },

    startSpawn(){
        this._spawnPipe();
        let spawnInterval = Math.abs(this.pipeSpacing / this.pipeMoveSpeed);
        this.schedule(this._spawnPipe, spawnInterval);
        this.isRunning = true;
    },

    _spawnPipe(){
        let pipeGroup = null;
        if (cc.pool.hasObject(PipeGroup)) {
            pipeGroup = cc.pool.getFromPool(PipeGroup);
        } else {
            pipeGroup = cc.instantiate(this.pipePrefab).getComponent(PipeGroup);
        }
        this.node.addChild(pipeGroup.node);
        pipeGroup.node.active = true;
        pipeGroup.init(this);
        this.pipeList.push(pipeGroup);
    },

    recyclePipe(pipe) {
        pipe.node.removeFromParent();
        pipe.node.active = false;
        cc.pool.putInPool(pipe);
    },
    
    /** Lấy ống nước không thành công tiếp theo */
    getNext() {
        return this.pipeList.shift();
    },

    reset() {
        this.unschedule(this._spawnPipe);
        this.pipeList = [];
        this.isRunning = false;
    }
});
