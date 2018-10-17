var games;
(function (games) {
    var ddz_sjPlayer = /** @class */ (function () {
        function ddz_sjPlayer(data) {
            var self = this;
            this.data = data;
            this.index = this.data["idx"];
            self.pos = data["idx"];
            self.curUser = self.data["cur"];
            self.play_type = data.play_type; // 3,4,5,6  配置表
            self.playerData = data;
            self.showOther = false;
            self.main = data.main;
            this.isCanTouch = false;
            this.pokerNum = data["cardnum"];
            this.is_mouse = true;
            this.is_donghua = data["is_donghua"];
            this.distance = 20; // 选中牌移动的距离
            this.state = {
                "normal": 0,
                "toUp": 1,
                "up": 2,
                "toBack": 3,
            };
            this.pokerSizeX = 128;
            this.pokerSizeY = 162;
            seekByName(this.data["head"], "coinText").text = this.data["info"].yxb;
            seekByName(this.data["head"], "ready").visible = false;
            seekByName(this.data["head"], "off").visible = false;
            seekByName(this.data["head"], "zhuang").visible = data.zhuang && true || false;
            if (self.pos != 1) {
                var pk_bg = seekByName(this.data["head"], "pk_bg");
                pk_bg.visible = true;
                seekByName(pk_bg, "pker_num").text = this.pokerNum;
            }
            // this.cardPanel = seekByName(this.data["parent"].main, this.data["pName"]);
            this.cardPanel = self.data["panel"];
            this.out_panel1 = self.data["out_panel1"];
            this.createCard();
            this.RuleCheck = new games.ddz_sjRuleCheck({
                DDZCardType: {}
            });
            var aa = this.RuleCheck["DDZCardType"];
        }
        ddz_sjPlayer.prototype.createCard = function () {
            var self = this;
            this.poker = [];
            this.cards = {};
            this.poker_num = [];
            this.setPokerData(this.playerData["card"]);
            this.drawPoker();
        };
        ddz_sjPlayer.prototype.setPokerData = function (pool) {
            var self = this;
            if (typeof (pool) == "object" && pool.length > 0) {
                if (self.poker.length > 0) {
                    var data = getPokerstr(pool);
                    for (var key = 0; key < data.length; key++) {
                        self.poker.push(data[key]);
                    }
                }
                else {
                    self.poker = getPokerstr(pool);
                }
                self.setPoker(self.poker.length);
                if (self.poker && self.poker.length > 0) {
                    self.sortPoker(null);
                }
            }
            else {
                self.setPoker(self.pokerNum);
            }
        };
        ddz_sjPlayer.prototype.drawPoker = function () {
            var self = this;
            var SizeY = 0;
            var num = self.poker.length;
            if (self.curUser) {
                self.newPokerLayer();
                var scale = 0.9;
                var offset = (Laya.Browser.width - this.pokerSizeX * scale) / 9 - 3;
                if (offset >= this.pokerSizeX * scale / 2) {
                    offset = this.pokerSizeX / 2 - 5;
                }
                // var startX = Laya.Browser.width/2 - offset * ((num - 1) / 2)
                var startX = -offset * (((num - 10) / 2) - 1);
                for (var k = 0; k < self.poker.length; k++) {
                    if (num >= 11) {
                        if (k < 10) {
                            SizeY = -this.pokerSizeX * 0.7;
                            if (k == 0) {
                                startX = -offset * 4;
                            }
                        }
                        else {
                            SizeY = 0;
                            if (k == 10) {
                                startX = -offset * (((num - 10) / 2) - 1);
                            }
                        }
                    }
                    else {
                        SizeY = 0;
                        if (k == 0) {
                            startX = -offset * ((num / 2) - 1);
                        }
                    }
                    this.cards[k + 1] = new games.ddz_sjPoker(self.poker[k], {
                        parent: this.cardPanel,
                        startX: startX,
                        startY: SizeY,
                        scale: scale,
                        zhaungtai: this.state["normal"],
                        poker_16zj: self.poker[k],
                    });
                    startX = startX + offset;
                    this.cards[k + 1].setTag(k + 1);
                    this.cardPanel.addChild(this.cards[k + 1].getPanel());
                }
                this.showWidth = offset;
            }
            else {
            }
        };
        ddz_sjPlayer.prototype.newPokerLayer = function () {
            var self = this;
            if (self.cardPanel) {
                self.cardPanel.removeChildren();
            }
        };
        // this.state = {       // 手牌状态
        //     "normal":0,      //
        //     "toUp":1,        //
        //     "up":2,          // 起来           
        //     "toBack":3,      // 回退
        // }
        ddz_sjPlayer.prototype.check_down = function (stageX, stageY) {
            var Rectangle = Laya.Rectangle;
            var legal = false;
            var scale = 0.9;
            var temp_cards = Object.keys(this.cards);
            var checked_arr = [];
            for (var k in this.cards) {
                if (this.cards[k]) {
                    if (this.cards[k].containsPt(stageX, stageY)) {
                        if (!this.cards[k].Bright) {
                            return;
                        }
                        if (!this.cards[k].yidong) {
                            if (this.cards[k].zhaungtai == this.state["normal"]) {
                                if (this.cards[k].Bright) {
                                    checked_arr.push(this.cards[k]);
                                }
                            }
                            else if (this.cards[k].zhaungtai == this.state["up"]) {
                                checked_arr.push(this.cards[k]);
                            }
                            legal = true;
                        }
                    }
                }
            }
            // 检查谁的zOrder  在最上面
            var temp_num = 0;
            if (checked_arr.length) {
                for (var i = 0; i < checked_arr.length; i++) {
                    temp_num = checked_arr[i].getTag();
                    var num = 0;
                    for (var j = 0; j < checked_arr.length; j++) {
                        if (temp_num < checked_arr[j].getTag()) {
                            num++;
                        }
                    }
                    if (num == 0) {
                        if (checked_arr[i].zhaungtai == this.state["normal"]) {
                            checked_arr[i].zhaungtai = this.state["toUp"];
                            checked_arr[i].yidong = 1;
                            checked_arr[i].setcard_bg();
                        }
                        else if (checked_arr[i].zhaungtai == this.state["up"]) {
                            checked_arr[i].zhaungtai = this.state["toBack"];
                            checked_arr[i].yidong = null;
                        }
                    }
                }
            }
            return legal;
        };
        ddz_sjPlayer.prototype.touchDown = function (e) {
            var Rectangle = Laya.Rectangle;
            if (this.isCanTouch) {
                this.startPt = { x: e.stageX, y: e.stageY, width: 1, height: 1 };
                var pt = new Rectangle(e.stageX, e.stageY, 1, 1);
                // var temp = this.checkRectSelect(e.stageX,e.stageY,pt)
                var temp = this.check_down(e.stageX, e.stageY);
                this.is_mouse = temp;
            }
        };
        ddz_sjPlayer.prototype.touchMove = function (e) {
            // console.log("touchMove",e.stageX,e.stageY)
            var self = this;
            if (this.is_mouse) {
                var Rectangle = Laya.Rectangle;
                var width = this.startPt && Math.abs(e.stageX - self.startPt["x"]) || 0;
                var height = this.startPt && Math.abs(e.stageY - self.startPt["y"]) || 0;
                var x = this.startPt && self.startPt["x"] < e.stageX && self.startPt["x"] || e.stageX || 0;
                var y = this.startPt && self.startPt["y"] < e.stageY && self.startPt["y"] || e.stageY || 0;
                var rect = new Rectangle(x, y, width, height);
                this.checkRectSelect(e.stageX, e.stageY, rect);
            }
        };
        ddz_sjPlayer.prototype.touchUp = function (e) {
            // console.log("touchUp",e.stageX,e.stageY)
            if (this.is_mouse) {
                for (var k in this.cards) {
                    if (this.cards[k]) {
                        this.cards[k].yidong = null;
                        if (!this.cards[k].Bright) {
                            this.cards[k].setcard_bg();
                        }
                        else {
                            this.cards[k].restorecard_bg();
                        }
                        if (this.cards[k].zhaungtai == this.state["toUp"]) {
                            this.cards[k].set_poker_upY();
                            this.cards[k].zhaungtai = this.state["up"];
                        }
                        else if (this.cards[k].zhaungtai == this.state["toBack"]) {
                            this.cards[k].resetupY();
                            this.cards[k].zhaungtai = this.state["normal"];
                        }
                    }
                }
            }
        };
        ddz_sjPlayer.prototype.checkRectSelect = function (stageX, stageY, rect) {
            var Rectangle = Laya.Rectangle;
            var legal = false;
            var scale = 0.9;
            var startPt = new Rectangle(stageX, stageY, 1, 1);
            var temp_cards = Object.keys(this.cards);
            for (var k in this.cards) {
                if (this.cards[k]) {
                    var sp = this.cards[k].card;
                    var x = this.cards[k].panel.x - this.pokerSizeX / 2 * scale + 1;
                    var y = this.cards[k].panel.y - this.pokerSizeX / 2 * scale - 20;
                    var width = ((Number(k) == 10) || (Number(k) == temp_cards.length)) && sp.width * scale || this.showWidth - 1;
                    var height = sp.height * scale;
                    if (temp_cards.length > 10 && Number(k) < 10) {
                        height = height * 0.7;
                    }
                    var obj = new Rectangle(x, y, width, height);
                    if ((obj && rect) && this.cards[k].intersectsPt(obj, rect)) {
                        if (!this.cards[k].Bright) {
                            return;
                        }
                        if (!this.cards[k].yidong) {
                            this.cards[k].yidong = 1;
                            this.cards[k].setcard_bg();
                            if (this.cards[k].zhaungtai == this.state["normal"]) {
                                if (!this.cards[k].Bright) {
                                    this.cards[k].setcard_bg();
                                }
                                else {
                                    this.cards[k].zhaungtai = this.state["toUp"]; // 准备出牌
                                }
                            }
                            else if (this.cards[k].zhaungtai == this.state["up"]) {
                                // v[2] = state.toBack --准备回退
                                this.cards[k].zhaungtai = this.state["toBack"];
                                this.cards[k].setcard_bg();
                            }
                            legal = true;
                        }
                    }
                    else {
                        if (this.cards[k].yidong) {
                            this.cards[k].yidong = null;
                            this.cards[k].restorecard_bg();
                            if (this.cards[k].zhaungtai == this.state["toUp"]) {
                                this.cards[k].zhaungtai = this.state["normal"];
                            }
                            else if (this.cards[k].zhaungtai == this.state["toBack"]) {
                                this.cards[k].zhaungtai = this.state["up"];
                            }
                        }
                    }
                }
            }
            return legal;
        };
        ddz_sjPlayer.prototype.pokerUp = function (data) {
            var self = this;
            self.backAllPoker();
            var cardpo = getPokerstr(data);
            for (var k in cardpo) {
                for (var sk in self.cards) {
                    if (self.cards[sk].poker_16zj == cardpo[k]) {
                        if (this.cards[sk].zhaungtai == this.state["normal"]) {
                            this.cards[sk].set_poker_upY();
                            this.cards[sk].zhaungtai = this.state["up"];
                        }
                    }
                }
            }
        };
        ddz_sjPlayer.prototype.sortPoker = function (pool) {
            var self = this;
            if (pool) {
                pool.sort(function (l, r) {
                    var obj1 = self.addValue(l);
                    var obj2 = self.addValue(r);
                    var lv = obj1["value"];
                    var rv = obj2["value"];
                    if (lv == rv) {
                        return obj1["huatype"] > obj1["huatype"] ? -1 : 1;
                    }
                    else {
                        return lv > rv ? -1 : 1;
                    }
                });
                return pool;
            }
            else if (self.poker) {
                self.poker.sort(function (l, r) {
                    var obj1 = self.addValue(l);
                    var obj2 = self.addValue(r);
                    var lv = obj1["value"];
                    var rv = obj2["value"];
                    if (lv == rv) {
                        return obj1["huatype"] > obj1["huatype"] ? -1 : 1;
                    }
                    else {
                        return lv > rv ? -1 : 1;
                    }
                });
            }
        };
        //--对2和鬼牌加权重
        ddz_sjPlayer.prototype.addValue = function (name) {
            if (name == undefined) {
                console.log(132);
            }
            var value = Number(name.slice(3));
            var hua = { "fan": 1, "mei": 2, "xin": 3, "hei": 4, "gui": 4 };
            if (value < 3 || name.slice(0, 3) == "gui") {
                value = value + 20;
                if (name.slice(0, 3) == "gui") {
                    value = value + 5;
                }
            }
            var huatype = hua[name.slice(0, 3)];
            return { "value": value, "huatype": huatype };
        };
        ddz_sjPlayer.prototype.getValue = function () {
            var self = this;
            var dat = [];
            for (var key = 0; key < self.poker.length; key++) {
                var num = Number(self.poker[key].slice(3));
                dat.push(Number(num));
            }
            return dat;
        };
        // 接牌
        ddz_sjPlayer.prototype.getPokerData = function (pool) {
            var self = this;
            var card = getPokerstr(pool);
            self.poker = card;
            self.sortPoker(null);
        };
        ddz_sjPlayer.prototype.poker_kong = function (show) {
            this.poker_num = [];
        };
        ddz_sjPlayer.prototype.removepassCard = function () {
            var panel;
            if (this.pos != 1) {
                panel = seekByName(this.main, "Panel_" + this.pos);
            }
            else {
                panel = seekByName(this.main, "out_panel1");
            }
            panel.removeChildren();
        };
        ddz_sjPlayer.prototype.passCard = function (card, is_diao) {
            var self = this;
            var panel;
            if (self.pos != 1) {
                panel = seekByName(self.main, "Panel_" + self.pos);
            }
            else {
                panel = seekByName(self.main, "out_panel1");
            }
            panel.removeChildren();
            var posX = 0;
            var posY = 0;
            var scale = 0.9;
            var num = card.length;
            var dts = 1;
            var zOrder = 20;
            if (self.pos == 1) {
                posX = -(((num - 1) * 35) / 2);
                posY = 30;
            }
            else if (self.pos == 2) {
                posX = 0;
                dts = -1;
                scale = 0.8;
            }
            else if (self.pos == 3) {
                posX = 0;
                scale = 0.8;
            }
            var val = getPokerstr(card);
            if (self.pos == 2) {
                for (var i = 0; i < val.length; i++) {
                    if (i % 5 == 0) {
                        posY = this.pokerSizeY * scale * ((i / 5) * 0.6);
                        zOrder = 20;
                        posX = 0;
                    }
                    var sp = new games.ddz_sjPoker(val[i], {
                        parent: panel,
                        startX: posX,
                        startY: posY,
                        scale: scale,
                    });
                    posX = posX + (40 * dts);
                    zOrder--;
                    sp.setZorder(zOrder);
                    panel.addChild(sp.getPanel());
                }
            }
            else {
                for (var i = 0; i < val.length; i++) {
                    if (!(self.pos == 1) && i % 5 == 0) {
                        posX = 0;
                        posY = this.pokerSizeY * scale * ((i / 5) * 0.6);
                    }
                    var sp = new games.ddz_sjPoker(val[i], {
                        parent: panel,
                        startX: posX,
                        startY: posY,
                        scale: scale,
                    });
                    posX = posX + (40 * dts);
                    zOrder++;
                    sp.setZorder(zOrder);
                    panel.addChild(sp.getPanel());
                }
            }
            self.updatePoker(val, is_diao);
        };
        ddz_sjPlayer.prototype.updatePoker = function (card, is_diao) {
            var self = this;
            if (self.poker && self.poker.length > 0) {
                self.RemoveCardFromPoker(card);
                self.setPoker(self.poker.length);
            }
            else {
                if (!is_diao) {
                    self.setPoker(self.pokerNum - card.length);
                }
            }
            self.playerCardSound(self.pokerNum);
            self.drawPoker();
        };
        ddz_sjPlayer.prototype.playerCardSound = function (num) {
            if (num > 2) {
                return;
            }
            playSound("res/music/ddz/baojing" + num + ".mp3");
        };
        ddz_sjPlayer.prototype.RemoveCardFromPoker = function (card) {
            for (var k = 0; k < card.length; k++) {
                for (var sk = 0; sk < this.poker.length; sk++) {
                    if (card[k] == this.poker[sk]) {
                        this.splicetemp(card[k]);
                        this.poker.splice(sk, 1);
                    }
                }
            }
            var copy_card = {};
            var _num = 1;
            for (var key in this.cards) {
                if (this.cards) {
                    copy_card[_num] = this.cards[key];
                }
                _num++;
            }
            this.cards = {};
            this.cards = copy_table(copy_card);
            // console.log(copy_card,"copy_card          ",this.poker)
        };
        ddz_sjPlayer.prototype.splicetemp = function (temp) {
            for (var k in this.cards) {
                if (this.cards[k].poker_zhi == temp) {
                    delete this.cards[k];
                }
            }
        };
        ddz_sjPlayer.prototype.backAllPoker = function () {
            var self = this;
            for (var k in self.cards) {
                if (this.cards[k].zhaungtai == this.state["up"]) {
                    this.cards[k].resetupY();
                    this.cards[k].zhaungtai = this.state["normal"];
                }
            }
        };
        ddz_sjPlayer.prototype.setallNomal = function () {
            var self = this;
            for (var k in self.cards) {
                this.cards[k].restorecard_bg();
                this.cards[k].Bright = true;
            }
        };
        ddz_sjPlayer.prototype.setalldisabled = function () {
            var self = this;
            for (var k in self.cards) {
                this.cards[k].setcard_bg();
                this.cards[k].Bright = false;
            }
        };
        ddz_sjPlayer.prototype.setdisabled = function (card) {
            var self = this;
            if (card && card.length > 0) {
                var tishicard = copy_Array(card);
                var tishivlue = self.getdisabled(tishicard);
                for (var k in self.cards) {
                    if (!self.ishave(tishivlue, self.cards[k].getValue())) {
                        self.cards[k].setcard_bg();
                        self.cards[k].Bright = false;
                    }
                }
            }
        };
        ddz_sjPlayer.prototype.getdisabled = function (card) {
            var valueList = [];
            for (var k in card) {
                for (var m in card[k]) {
                    var value = card[k][m] % 16;
                    if (value > 13) {
                        value = value + 2;
                    }
                    if (!(valueList.length > 0 && this.ishave(valueList, value))) {
                        valueList.push(value);
                    }
                }
            }
            return valueList;
        };
        ddz_sjPlayer.prototype.ishave = function (card, value) {
            for (var k in card) {
                if (card[k] == value) {
                    return true;
                }
            }
            return false;
        };
        ddz_sjPlayer.prototype.isCanPassSelect = function (lastcard) {
            var last = null;
            if (lastcard) {
                last = getPokerstr(lastcard);
            }
            var aa = this.getpassUp();
            var is_Check = this.RuleCheck["isChuPai"](aa, this.poker, last);
            return is_Check;
        };
        ddz_sjPlayer.prototype.getCanPassCard = function (lastcard) {
            var last = getPokerstr(lastcard);
            var cancard_list = this.RuleCheck["getCanPassCard"](last, this.poker);
            return cancard_list;
        };
        ddz_sjPlayer.prototype.getpassUp = function () {
            var self = this;
            var pass = [];
            for (var k in self.cards) {
                if (this.cards[k].zhaungtai == this.state["up"]) {
                    pass.push(this.cards[k].getpoker_16zj());
                }
            }
            this.sortPoker(null);
            return pass;
        };
        ddz_sjPlayer.prototype.showCards = function (card) {
            var self = this;
            if (card) {
                self.poker = [];
                self.setPokerData(card);
                self.jiesuan_card(card);
            }
        };
        ddz_sjPlayer.prototype.jiesuan_card = function (card) {
            var self = this;
            var panel;
            if (self.pos != 1) {
                panel = seekByName(self.main, "Panel_" + self.pos);
            }
            else {
                panel = seekByName(self.main, "out_panel1");
            }
            if (card && card.length == 0) {
                return;
            }
            panel.removeChildren();
            var posX = 0;
            var posY = 0;
            var scale = 0.9;
            var num = card.length;
            var dts = 1;
            var zOrder = 20;
            if (self.pos == 1) {
                posX = -(((num - 1) * 35) / 2);
                posY = 30;
            }
            else if (self.pos == 2) {
                posX = 0;
                dts = -1;
                scale = 0.8;
            }
            else if (self.pos == 3) {
                posX = 0;
                scale = 0.8;
            }
            // var val = getPokerstr(card)
            var val = self.sortPoker(getPokerstr(card));
            if (self.pos == 2) {
                // for (var i=val.length-1;i >= 0;i--){
                for (var i = 0; i < val.length; i++) {
                    if (i % 5 == 0) {
                        posX = 0;
                        posY = this.pokerSizeY * scale * ((i / 5) * 0.6);
                        zOrder = 20;
                    }
                    var sp = new games.ddz_sjPoker(val[i], {
                        parent: panel,
                        startX: posX,
                        startY: posY,
                        scale: scale,
                    });
                    posX = posX + (40 * dts);
                    zOrder--;
                    sp.setZorder(zOrder);
                    panel.addChild(sp.getPanel());
                }
            }
            else if (self.pos == 3) {
                for (var i = 0; i < val.length; i++) {
                    if (i % 5 == 0) {
                        posX = 0;
                        posY = this.pokerSizeY * scale * ((i / 5) * 0.6);
                    }
                    var sp = new games.ddz_sjPoker(val[i], {
                        parent: panel,
                        startX: posX,
                        startY: posY,
                        scale: scale,
                    });
                    posX = posX + (40 * dts);
                    zOrder++;
                    sp.setZorder(zOrder);
                    panel.addChild(sp.getPanel());
                }
            }
        };
        ddz_sjPlayer.prototype.showPoker = function (show) {
            this.showOther = show;
        };
        ddz_sjPlayer.prototype.getPokers = function () {
            return this.poker;
        };
        ddz_sjPlayer.prototype.PokerClear = function () {
            this.poker = [];
        };
        ddz_sjPlayer.prototype.setPoker = function (num) {
            this.pokerNum = num;
            if (this.pos != 1) {
                var pk_bg = seekByName(this.data["head"], "pk_bg");
                pk_bg.visible = true;
                seekByName(pk_bg, "pker_num").text = this.pokerNum;
            }
        };
        ddz_sjPlayer.prototype.isTouche = function (bol) {
            this.isCanTouch = bol;
        };
        ddz_sjPlayer.prototype.isSelf = function () {
            return this.curUser;
        };
        ddz_sjPlayer.prototype.getIndex = function () {
            return this.index;
        };
        ddz_sjPlayer.prototype.getInfo = function (key) {
            if (key === void 0) { key = null; }
            if (key != null) {
                return this.data["info"]["name"];
            }
            else {
                return this.data["info"];
            }
        };
        return ddz_sjPlayer;
    }());
    games.ddz_sjPlayer = ddz_sjPlayer;
})(games || (games = {}));
//# sourceMappingURL=ddz_sjPlayer.js.map