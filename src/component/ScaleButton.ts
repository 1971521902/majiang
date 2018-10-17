import Button = laya.ui.Button;
//缩放时间，单位为
var scaleTime:number = 100;
module component{
    //继承editorUI.Button
    export class ScaleButton extends Button {
        private tempX:number;
        private tempY:number;
        private baseX:number;
        private baseY:number;

        constructor(skin:string=null,label:string=""){
            super(skin, label);
            /* 设置按钮为单态按钮
            ** 取值：
            ** 1：单态。图片不做切割，按钮的皮肤状态只有一种。
            ** 2：两态。图片将以竖直方向被等比切割为2部分，从上向下，依次为弹起状态皮肤、按下和经过及选中状态皮肤。
            ** 3：三态。图片将以竖直方向被等比切割为2部分，从上向下，依次为弹起状态皮肤、经过状态皮肤、按下和选中状态皮肤
            */
            this.stateNum = 1;
            this.baseX = this.scaleX;
            this.baseY = this.scaleY;
            this.pivot(this.width / 2, this.height / 2);
            //添加鼠标按下事件侦听。按时时缩小按钮。
            this.on(Laya.Event.MOUSE_DOWN, this, this.scaleBig);
            //添加鼠标抬起事件侦听。抬起时还原按钮。
            this.on(Laya.Event.MOUSE_UP, this, this.scaleSmall);
            //添加鼠标离开事件侦听。离开时还原按钮。
            this.on(Laya.Event.MOUSE_OUT, this, this.scaleSmall);
        }
        private scaleSmall():void{
            Laya.Tween.to(this, {scaleX:this.baseX, scaleY:this.baseY}, scaleTime);
        }
        private scaleBig():void{
            //变大还原的缓动效果
            this.tempX = this.baseX + 0.1;
            this.tempY = this.baseY + 0.1;

            this.scaleX = this.baseX;
            this.scaleY = this.baseY;
            Laya.Tween.to(this, {scaleX:(this.tempX), scaleY:(this.tempY)}, scaleTime);
        }
    }
}
