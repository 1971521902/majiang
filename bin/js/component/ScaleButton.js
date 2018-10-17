var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Button = laya.ui.Button;
//缩放时间，单位为
var scaleTime = 100;
var component;
(function (component) {
    //继承editorUI.Button
    var ScaleButton = /** @class */ (function (_super) {
        __extends(ScaleButton, _super);
        function ScaleButton(skin, label) {
            if (skin === void 0) { skin = null; }
            if (label === void 0) { label = ""; }
            var _this = _super.call(this, skin, label) || this;
            /* 设置按钮为单态按钮
            ** 取值：
            ** 1：单态。图片不做切割，按钮的皮肤状态只有一种。
            ** 2：两态。图片将以竖直方向被等比切割为2部分，从上向下，依次为弹起状态皮肤、按下和经过及选中状态皮肤。
            ** 3：三态。图片将以竖直方向被等比切割为2部分，从上向下，依次为弹起状态皮肤、经过状态皮肤、按下和选中状态皮肤
            */
            _this.stateNum = 1;
            _this.baseX = _this.scaleX;
            _this.baseY = _this.scaleY;
            _this.pivot(_this.width / 2, _this.height / 2);
            //添加鼠标按下事件侦听。按时时缩小按钮。
            _this.on(Laya.Event.MOUSE_DOWN, _this, _this.scaleBig);
            //添加鼠标抬起事件侦听。抬起时还原按钮。
            _this.on(Laya.Event.MOUSE_UP, _this, _this.scaleSmall);
            //添加鼠标离开事件侦听。离开时还原按钮。
            _this.on(Laya.Event.MOUSE_OUT, _this, _this.scaleSmall);
            return _this;
        }
        ScaleButton.prototype.scaleSmall = function () {
            Laya.Tween.to(this, { scaleX: this.baseX, scaleY: this.baseY }, scaleTime);
        };
        ScaleButton.prototype.scaleBig = function () {
            //变大还原的缓动效果
            this.tempX = this.baseX + 0.1;
            this.tempY = this.baseY + 0.1;
            this.scaleX = this.baseX;
            this.scaleY = this.baseY;
            Laya.Tween.to(this, { scaleX: (this.tempX), scaleY: (this.tempY) }, scaleTime);
        };
        return ScaleButton;
    }(Button));
    component.ScaleButton = ScaleButton;
})(component || (component = {}));
//# sourceMappingURL=ScaleButton.js.map