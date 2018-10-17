module games{
    export class ddz_sjPoker{
        panel:Laya.Panel; 
        card:Laya.Image;
        data:Object;
        scale:number;
        choose:boolean;
        value:number;
        tag:number;
        poker_norY:number;
        poker_upY:number;
        poker_zhi:string;
        zhaungtai:number;
        Bright:boolean;
        yidong:number;
        poker_16zj:number;
        constructor(value, arg){
            this.panel = new Laya.Panel();
            var card_bg
            if(typeof(value) == "string"){
                this.card = new Laya.Image("poker/" + value + ".png");
                card_bg = new Laya.Image("poker/pk_bg_tuceng.png");
            }else{
                this.card = new Laya.Image("poker/poker_back.png"); 
                card_bg = new Laya.Image("poker/pk_bg_tuceng.png");
            }
            //  扑克的颜色  背景灰色
            this.card.addChild(card_bg)
            card_bg.x = 0
            card_bg.y = 0
            card_bg.anchorX = 0
            card_bg.anchorY = 0
            card_bg.visible = false
            card_bg.name = "card_bg"

            this.data = arg;
            this.scale = arg.scale || 1;
            if(value.slice(0,3) == "gui"){
                this.value = Number(value.slice(3))
                this.value = this.value + 15
            }else{
                this.value = Number(value.slice(3))
            }
            this.poker_zhi = value
            this.poker_16zj = arg.poker_16zj
            this.tag = 0;
            // this.card.x = arg.startX;
            // this.card.y = arg.startY;
            this.panel.x = arg.startX;
            this.panel.y = arg.startY;
            this.poker_norY = arg.startY            // Y轴起始坐标
            this.poker_upY = arg.startY - 25        // Y轴选中坐标
            this.zhaungtai = arg.zhaungtai
            this.Bright = true
            this.yidong = null
            
            this.panel.anchorX = 0.5;
            this.panel.anchorY = 0.5;
            this.panel.scale(this.scale, this.scale);
            this.panel.addChild(this.card);

            this.panel.size(128, 162);
            this.choose = true          

        }

        public getPanel():Laya.Panel{
            return this.panel;
        }
        

        public setZorder(or){
            this.panel.zOrder = or;
        }

        public removeSelf(){
            this.panel.removeSelf();
        }

        public containsPt(x,y):boolean{
            var pt:Laya.Point = this.data["parent"].localToGlobal(new Laya.Point(this.panel.x, this.panel.y));
            return new laya.maths.Rectangle(pt.x - this.panel.width / 2, pt.y - this.panel.height / 2, this.panel.width, this.panel.height).contains(x, y);
        }
        public intersectsPt(obj,rect):boolean{
            var pt:Laya.Point = this.data["parent"].localToGlobal(new Laya.Point(obj.x, obj.y));
            return  rect.intersects(new laya.maths.Rectangle(pt.x,pt.y,obj.width, obj.height));
        }

        public setChoose():void{
            if(this.choose){
                this.panel.y -= 25;
                this.choose = !this.choose
            }else{
                this.panel.y += 25;
                this.choose = !this.choose
            }
        }
        
        public setPos(x,y):void{
            this.panel.x = x;
            this.panel.y = y;
        }

        public resetupY (){              //还原Y轴
            this.panel.y = this.poker_norY;
        }   
        public set_poker_upY(){         //选中Y轴    
            this.panel.y = this.poker_upY;
        }
        public getBright():number{
            return this.zhaungtai;
        }
        public getpoker_16zj():number{
            return this.poker_16zj;
        }

        // 背景变灰色
        public setcard_bg(){
            seekByName(this.card, "card_bg").visible = true
        }
        // 还原背景
        public restorecard_bg(){
            seekByName(this.card, "card_bg").visible = false
        }
        public getX():number{
            return this.panel.x;
        }
        public getY():number{
            return this.panel.y;
        }
        public getValue():number{
            return this.value;
        }
        public getIndex():number{
            return this.data["index"];
        }
        public setTag(t:number){
            this.tag = t;
        }
        public getTag(){
            return this.tag;
        }
        
    }
}