var games;
(function (games) {
    var ddz_sjPoker = /** @class */ (function () {
        function ddz_sjPoker(value, arg) {
            this.panel = new Laya.Panel();
            var card_bg;
            if (typeof (value) == "string") {
                this.card = new Laya.Image("poker/" + value + ".png");
                card_bg = new Laya.Image("poker/pk_bg_tuceng.png");
            }
            else {
                this.card = new Laya.Image("poker/poker_back.png");
                card_bg = new Laya.Image("poker/pk_bg_tuceng.png");
            }
            //  扑克的颜色  背景灰色
            this.card.addChild(card_bg);
            card_bg.x = 0;
            card_bg.y = 0;
            card_bg.anchorX = 0;
            card_bg.anchorY = 0;
            card_bg.visible = false;
            card_bg.name = "card_bg";
            this.data = arg;
            this.scale = arg.scale || 1;
            if (value.slice(0, 3) == "gui") {
                this.value = Number(value.slice(3));
                this.value = this.value + 15;
            }
            else {
                this.value = Number(value.slice(3));
            }
            this.poker_zhi = value;
            this.poker_16zj = arg.poker_16zj;
            this.tag = 0;
            // this.card.x = arg.startX;
            // this.card.y = arg.startY;
            this.panel.x = arg.startX;
            this.panel.y = arg.startY;
            this.poker_norY = arg.startY; // Y轴起始坐标
            this.poker_upY = arg.startY - 25; // Y轴选中坐标
            this.zhaungtai = arg.zhaungtai;
            this.Bright = true;
            this.yidong = null;
            this.panel.anchorX = 0.5;
            this.panel.anchorY = 0.5;
            this.panel.scale(this.scale, this.scale);
            this.panel.addChild(this.card);
            this.panel.size(128, 162);
            this.choose = true;
        }
        ddz_sjPoker.prototype.getPanel = function () {
            return this.panel;
        };
        ddz_sjPoker.prototype.setZorder = function (or) {
            this.panel.zOrder = or;
        };
        ddz_sjPoker.prototype.removeSelf = function () {
            this.panel.removeSelf();
        };
        ddz_sjPoker.prototype.containsPt = function (x, y) {
            var pt = this.data["parent"].localToGlobal(new Laya.Point(this.panel.x, this.panel.y));
            return new laya.maths.Rectangle(pt.x - this.panel.width / 2, pt.y - this.panel.height / 2, this.panel.width, this.panel.height).contains(x, y);
        };
        ddz_sjPoker.prototype.intersectsPt = function (obj, rect) {
            var pt = this.data["parent"].localToGlobal(new Laya.Point(obj.x, obj.y));
            return rect.intersects(new laya.maths.Rectangle(pt.x, pt.y, obj.width, obj.height));
        };
        ddz_sjPoker.prototype.setChoose = function () {
            if (this.choose) {
                this.panel.y -= 25;
                this.choose = !this.choose;
            }
            else {
                this.panel.y += 25;
                this.choose = !this.choose;
            }
        };
        ddz_sjPoker.prototype.setPos = function (x, y) {
            this.panel.x = x;
            this.panel.y = y;
        };
        ddz_sjPoker.prototype.resetupY = function () {
            this.panel.y = this.poker_norY;
        };
        ddz_sjPoker.prototype.set_poker_upY = function () {
            this.panel.y = this.poker_upY;
        };
        ddz_sjPoker.prototype.getBright = function () {
            return this.zhaungtai;
        };
        ddz_sjPoker.prototype.getpoker_16zj = function () {
            return this.poker_16zj;
        };
        // 背景变灰色
        ddz_sjPoker.prototype.setcard_bg = function () {
            seekByName(this.card, "card_bg").visible = true;
        };
        // 还原背景
        ddz_sjPoker.prototype.restorecard_bg = function () {
            seekByName(this.card, "card_bg").visible = false;
        };
        ddz_sjPoker.prototype.getX = function () {
            return this.panel.x;
        };
        ddz_sjPoker.prototype.getY = function () {
            return this.panel.y;
        };
        ddz_sjPoker.prototype.getValue = function () {
            return this.value;
        };
        ddz_sjPoker.prototype.getIndex = function () {
            return this.data["index"];
        };
        ddz_sjPoker.prototype.setTag = function (t) {
            this.tag = t;
        };
        ddz_sjPoker.prototype.getTag = function () {
            return this.tag;
        };
        return ddz_sjPoker;
    }());
    games.ddz_sjPoker = ddz_sjPoker;
})(games || (games = {}));
//# sourceMappingURL=ddz_sjPoker.js.map