cc.Class({
    extends: cc.Component,
    properties: {
        /** Chiều cao tối thiểu của ống trên */
        topPipeMinHeight: 100,
        /** Chiều cao tối thiểu của ống dưới */
        bottomPipeMinHeight: 100,
        /** Khoảng cách dọc ống trên và dưới tối thiểu */
        spacingMinValue: 250,
        /** Khoảng cách dọc ống trên và dưới */
        spacingMaxValue: 300,
        /** Nút ống trên */
        topPipe: cc.Node,
        /** Nút ống dưới */
        bottomPipe: cc.Node,
    },

    init(pipeManager) {
        this.pipeManager = pipeManager;
        this._initPositionX();
        this._initPositionY();
    },

    /** Đặt vị trí ban đầu của nút trên trục x */
    _initPositionX(){
        let visibleSize = cc.director.getVisibleSize(); // Kích thước vùng nhìn thấy cảnh
        let sceneLeft = -visibleSize.width / 2; // Neo Canvas nằm ở giữa và bên trái của Canvas là một nửa chiều rộng của bên trái của neo
        let sceneRight = visibleSize.width / 2; // Neo Canvas nằm ở trung tâm và bên phải của Canvas là một nửa chiều rộng so với bên phải của neo.
        this.node.x = sceneRight + 300;
        this.recylceX = sceneLeft - Math.max(this.topPipe.width, this.bottomPipe.width);
    },

    /** Đặt vị trí trục y của ống trên và ống dưới và khoảng cách giữa chúng */
    _initPositionY(){
        let visibleSize = cc.director.getVisibleSize();
        let topPipeMaxY = visibleSize.height / 2 - this.topPipeMinHeight;
        let bottomPipeMinY = cc.find("Canvas/ground").y + this.bottomPipeMinHeight; // Prefab không thể có được các nút thông qua trình kiểm tra thuộc tính, chỉ tra cứu động
        let spacing = this.spacingMinValue + Math.random() * (this.spacingMaxValue - this.spacingMinValue);
        this.topPipe.y = topPipeMaxY - Math.random() * (topPipeMaxY - bottomPipeMinY - spacing);
        this.bottomPipe.y = this.topPipe.y - spacing;
    },

    update(dt) {
        if (!this.pipeManager.isRunning) {
            return;
        }
        // Cập nhật vị trí đường ống trong thời gian thực
        this.node.x += this.pipeManager.pipeMoveSpeed * dt;
        // Nếu bạn vượt quá phạm vi hiển thị màn hình, bạn có thể tái chế đối tượng.
        if (this.node.x < this.recylceX) {
            this.pipeManager.recyclePipe(this);
        }
    }
});