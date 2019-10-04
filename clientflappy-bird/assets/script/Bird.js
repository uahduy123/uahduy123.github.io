const State = cc.Enum({
    /** Trạng thái sẵn sàng trước khi trò chơi bắt đầu */
    Ready: -1,
    /** Chim tăng */
    Rise: -1,
    /** Chim rơi tự do */
    FreeFall: -1,
     /** Chim va vào đường ống và ngã */
    Drop: -1,
    /** Chim đã rơi xuống đất và vẫn còn */
    Dead: -1,
});

cc.Class({
    statics: {
        State: State
    },

    extends: cc.Component,

    properties: {
         /** Tốc độ ban đầu khi ném, tính bằng pixel mỗi giây */
        initRiseSpeed: 800,
        /** Gia tốc trọng trường tính theo bình phương mỗi giây */
        gravity: 1000,
        /** Trạng thái chim */
        state: {
            default: State.Ready,
            type: State,
        },
        /** Nút mặt đất */
        ground: {
            default: null,
            type: cc.Node
        },
        /** Tiếng chim bay lên */
        riseAudio: {
            default: null,
            type: cc.AudioClip
        },
        /** Tiếng chim rơi sau khi chạm vào ống nước */
        dropAudio: {
            default: null,
            type: cc.AudioClip
        },
        /** Tiếng chim va chạm */
        hitAudio: {
            default: null,
            type: cc.AudioClip
        },
    },

    init(game){
        this.game = game;
        this.state = State.Ready;
        this.currentSpeed = 0;
        this.anim = this.getComponent(cc.Animation);
        this.anim.playAdditive("birdFlapping");
    },

    startFly () {
        this._getNextPipe();
        this.anim.stop("birdFlapping");
        this.rise();
    },

    _getNextPipe () {
        this.nextPipe = this.game.pipeManager.getNext();
    },

    update (dt) {
        if (this.state === State.Ready || this.state === State.Dead) {
            return;
        }
        this._updatePosition(dt);
        this._updateState(dt);
        this._detectCollision();
        this._fixBirdFinalPosition();
    },

    _updatePosition (dt) {
        var flying = this.state === State.Rise
            || this.state === State.FreeFall
            || this.state === State.Drop;
        if (flying) {
            this.currentSpeed -= dt * this.gravity;
            this.node.y += dt * this.currentSpeed;
        }
    },

    _updateState (dt) {
        switch (this.state) {
            case State.Rise:
                if (this.currentSpeed < 0) {
                    this.state = State.FreeFall;
                    this._runFallAction();
                }
                break;
            case State.Drop:
                if (this._detectCollisionWithBird(this.ground)) {
                    this.state = State.Dead;
                }
                break;
        }
    },

    _detectCollision () {
        if (!this.nextPipe) {
            return;
        }
        if (this.state === State.Ready || this.state === State.Dead || this.state === State.Drop) {
            return;
        }
        let collideWithPipe = false;
        // Va chạm giữa chim và ống nước trên
        if (this._detectCollisionWithBird(this.nextPipe.topPipe)) {
            collideWithPipe = true;
        }
        // Va chạm giữa chim và ống nước dưới
        if (this._detectCollisionWithBird(this.nextPipe.bottomPipe)) {
            collideWithPipe = true;
        }
        // Va chạm giữa chim với mặt đất
        let collideWithGround = false;
        if (this._detectCollisionWithBird(this.ground)) {
            collideWithGround = true;
        }
        // Xử lí va chạm
        if (collideWithPipe || collideWithGround) {
            cc.audioEngine.playEffect(this.hitAudio);

            if (collideWithGround) { // Va chạm với mặt đất
                this.state = State.Dead;
            } else { 
                this.state = State.Drop;
                this._runDropAction();
                this.scheduleOnce(()=> {
                    cc.audioEngine.playEffect(this.dropAudio);
                }, 0.3);
            }

            this.anim.stop();
            this.game.gameOver();
        } else { // Xử lí nếu không có va chạm
            let birdLeft = this.node.x;
            let pipeRight = this.nextPipe.node.x + this.nextPipe.topPipe.width
            let crossPipe = birdLeft > pipeRight;
            if (crossPipe) {
                this.game.gainScore();
                this._getNextPipe();
            }
        }
    },

    /** Vị trí hạ cánh cuối cùng */
    _fixBirdFinalPosition(){
        if (this._detectCollisionWithBird(this.ground)) {
            this.node.y = this.ground.y + this.node.width / 2;
        }
    },

    _detectCollisionWithBird(otherNode){
        return cc.rectIntersectsRect(this.node.getBoundingBoxToWorld(), otherNode.getBoundingBoxToWorld());
    },

    rise() {
        this.state = State.Rise;
        this.currentSpeed = this.initRiseSpeed;
        this._runRiseAction();
        cc.audioEngine.playEffect(this.riseAudio);
    },

    _runRiseAction(){
        this.node.stopAllActions();
        let jumpAction = cc.rotateTo(0.3, -30).easing(cc.easeCubicActionOut());
        this.node.runAction(jumpAction);
    },

    _runFallAction(duration = 0.6){
        this.node.stopAllActions();
        let dropAction = cc.rotateTo(duration, 90).easing(cc.easeCubicActionIn());
        this.node.runAction(dropAction);
    },

    _runDropAction(){
        if (this.currentSpeed > 0) {
            this.currentSpeed = 0;
        }
        this._runFallAction(0.4);
    }
});
