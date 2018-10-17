var games;
(function (games) {
    var ddz_sjGameScene = /** @class */ (function () {
        function ddz_sjGameScene(data) {
            this.loading_jia = {};
            this.__Login = {};
            this.data = data;
            this.players = {};
            this.playerNum = 3;
            this.protQueue = [];
            this.loadEnd = false;
            this.firstchupai = true;
            this.ju = 0;
            new yftools.Loading([
                "res/atlas/ddz.atlas",
                "res/atlas/text.atlas",
                "res/atlas/ddz_sj.atlas",
                "res/atlas/setting.atlas",
                "res/atlas/fileApplication.atlas",
                "res/atlas/ddzsj_Result.atlas",
                "res/atlas/emoji.atlas",
                "res/atlas/hudong.atlas",
                "res/atlas/userinfo.atlas",
                "res/atlas/poker.atlas",
                "res/atlas/effect.atlas",
                "res/atlas/effect/shunzi.atlas",
                "res/atlas/effect/zhadan.atlas",
                "res/atlas/effect/hongbao.atlas",
                "res/atlas/chat.atlas",
            ], this.onLoaded, this, "wxlocal/game_bg.png");
        }
        ddz_sjGameScene.prototype.onProLoaded = function (data) {
            var number = Math.floor(data / 1 * 100);
            this.__Login["title"].text = "玩命加载中:" + number + "/100";
        };
        // //加载完成后的回调函数
        ddz_sjGameScene.prototype.onProgress = function (pro) {
            // console.log("加载了总文件的:"+pro*100+"%");
        };
        // //加载完成后
        ddz_sjGameScene.prototype.onLoaded = function () {
            for (var a in this.__Login) {
                this.__Login[a].destroy();
            }
            this.main = new ui.sjddz.ddz_sjgameUI();
            // Global.is_jiazai_quan = showjiazai(100)
            addClick(this.main.backBtn, this.onclick, this);
            addClick(this.main.startBtn, this.onclick, this);
            addClick(this.main.delRoom, this.onclick, this);
            addClick(this.main.getFriend, this.onclick, this);
            addClick(this.main.is_music, this.onclick, this);
            var that = this;
            Laya.stage.addChild(this.main);
            addClick(this.main.settingBtn, function () {
                this.showSetting();
            }, this);
            this.main.room_ID.text = "房间号:" + this.data["id"];
            seekByName(this.main, "room_ju").text = this.ju + "/" + this.data["tbl"].totalNum + "局";
            var self = this;
            for (var k in this.data["list"]) {
                if (this.data["list"][k].id == Global.UserData.getUserData("id")) {
                    this.selfPos = parseInt(k);
                    break;
                }
            }
            var yue_time = new Date();
            Global.Clock.addTimeFun("times", function () {
                var time = CurentTime();
                seekByName(that.main, "roomTime").text = time; //  yue_time.toLocaleDateString() +" "+
            }, 0.5);
            this.RuleCheck = new games.ddz_sjRuleCheck({
                DDZCardType: {}
            });
            //  关闭广告
            if (window["bannerAd"]) {
                window["bannerAd"].hide();
            }
            // 关闭胜利盒子
            Global.show_shenglihezi["hideIcon"]();
            Global.is_loadhall = true;
            // 初始化  数据
            self.shangjing_ju = 1;
            self.is_music = true;
            this.main.game.on(Laya.Event.MOUSE_DOWN, this, function (e) {
                console.log("MOUSE_DOWN");
                if (this.players[this.selfPos]) {
                    this.players[this.selfPos].touchDown(e);
                }
            });
            this.main.game.on(Laya.Event.MOUSE_MOVE, this, function (e) {
                if (this.players[this.selfPos]) {
                    this.players[this.selfPos].touchMove(e);
                }
            });
            this.main.game.on(Laya.Event.MOUSE_UP, this, function (e) {
                if (this.players[this.selfPos]) {
                    this.players[this.selfPos].touchUp(e);
                }
            });
            // //  赏金场    赢的场次       
            if (self.data["tbl"].game_type == "shangjing") {
                if (self.shangjing_ju = self.data["list"][self.selfPos]["shangjing"]) {
                    self.shangjing_ju = (self.data["list"][self.selfPos]["shangjing"].win_num + 1) || 1;
                    seekByName(seekByName(self.main, "win_ju"), "win_num").text = "(" + this.shangjing_ju + "/7)连胜送红包";
                    seekByName(self.main, "win_ju").visible = true;
                }
            }
            if (self.data["tbl"].game_type == "gold") {
                // //  金币场    赢的场次       
                if (self.data["list"][self.selfPos]["shangjing"]) {
                    self.shangjing_ju = (self.data["list"][self.selfPos]["shangjing"].gold_win_num + 1) || 1;
                    seekByName(seekByName(self.main, "win_ju"), "win_num").text = "(" + (this.shangjing_ju) + "/7)送红包";
                    seekByName(self.main, "win_ju").visible = true;
                }
            }
            //隐藏一些不必要的东西    shangjing 赏金场    gold 金币场     null  普通场
            if (self.data["tbl"].game_type != null) {
                seekByName(this.main, "settingBtn").visible = true;
                if (self.data["tbl"].game_type == "shangjing") {
                    seekByName(this.main, "settingBtn").visible = false;
                }
                seekByName(this.main, "room_stat").visible = false;
                seekByName(this.main, "startBtn").visible = false;
                seekByName(this.main, "getFriend").visible = false;
                seekByName(this.main, "delRoom").visible = false;
                // 隐藏 好友场 场景
                if (self.data["tbl"].game_type == "gold") {
                    var gold_number = seekByName(this.main, "gold_number");
                    seekByName(this.main, "gold_difen").value = self.data["tbl"].gold_base_times || 100; // 金币场底分
                    seekByName(this.main, "gold_beishu").value = 0; // 金币场倍数
                    for (var i = 1; i <= 3; i++) {
                        var play = seekByName(this.main, "player" + i);
                        seekByName(play, "coinText").visible = false;
                        seekByName(play, "gold_bg").visible = true;
                    }
                }
                if (self.data["tbl"].game_type == "shangjing") {
                    for (var j = 1; j <= 3; j++) {
                        var play = seekByName(this.main, "player" + j);
                        seekByName(play, "coinText").visible = false;
                        seekByName(play, "gold_bg").visible = false;
                    }
                    var play1 = seekByName(this.main, "player1");
                    seekByName(play1, "fuhuoka_bg").visible = true;
                    seekByName(play1, "gold_bg").visible = true;
                    if (seekByName(this.main, "cardValue") && seekByName(this.main, "goldValue")) {
                        seekByName(this.main, "cardValue").text = Global.UserData.getUserData("shangjing").relive_card_num;
                        seekByName(this.main, "goldValue").text = Global.UserData.getUserData("yxb");
                        seekByName(this.main, "cardValue").visible = true;
                        seekByName(this.main, "goldValue").visible = true;
                    }
                }
                if (!this.data["room_state"]) {
                    var time = 3;
                    Global.Clock.addTimeFun("startBtn", function () {
                        time = time - 1;
                        if (time < 0) {
                            sendToOnline(protocol.user_card_ready);
                            Global.Clock.removeTimeFun("startBtn");
                        }
                    }, 0.5);
                }
            }
            else {
            }
            addClick(this.main.msgBtn, function () {
                // sendToOnline(620 );
                if (this.finalData) {
                    return;
                }
                if (seekByName(self.main, "voice_list").visible == true) {
                    seekByName(self.main, "voice_list").visible = false;
                    seekByName(self.main, "voice_bg").visible = false;
                }
                else {
                    seekByName(self.main, "voice_bg").visible = true;
                    self.voice();
                }
            }, this);
            if (this.data["room_state"]) {
                this.prepare();
                this.startGame({
                    list: this.data["pooker_list"],
                    master: this.data["master"],
                    times: this.data["times"],
                    room_state: this.data["room_state"],
                }, this.data);
                if (this.data["room_state"] == games.STATE.ROOM_WAITING_RESTART) {
                    if (this.data["room_arg"].pooker_list) {
                        var temp_data = this.data["room_arg"].pooker_list;
                        for (var k in temp_data) {
                            self.players[k].showCards(temp_data[k]);
                        }
                    }
                    this.showResult(this.data["room_arg"], null);
                }
            }
            else {
                this.prepare();
            }
            this.updateState();
            this.loadEnd = true;
            while (this.protQueue.length > 0) {
                var prot = this.protQueue.splice(0, 1);
                this.recvData(prot[0]["cmd"], prot[0]["data"]);
            }
        };
        ddz_sjGameScene.prototype.up_goldbeishu = function (num) {
            var self = this;
            if (self.data["tbl"].game_type == "gold") {
                seekByName(self.main, "gold_beishu").value = num || 3; //  金币场  倍数
            }
        };
        ddz_sjGameScene.prototype.updateState = function () {
            var self = this;
            self.autoindex = 0;
            var opt = seekByName(self.main, "opt");
            // opt.visible = true
            var panel = seekByName(opt, "opt3");
            // panel.visible = true
            for (var i = 1; i <= 3; i++) {
                // seekByName(panel, "btn_"+i).visible = true
                // seekByName(panel, "btn_"+i).disabled = false
                addClick(seekByName(panel, "btn_" + i) || seekByName(panel, "chupai") || seekByName(panel, "buchu"), function (e) {
                    if (this.name == "btn_1" || this.name == "buchu") {
                        self.hideBtn();
                        self.createbuchuTimer(self.getNextIndex(self.curIndex));
                        self.players[self.selfPos].backAllPoker();
                        self.players[self.selfPos].setallNomal();
                        self.setBuchu(self.getPlayerPos(self.selfPos + 1));
                        sendToOnline(protocol.user_card_pass);
                    }
                    else if (this.name == "btn_2" || this.name == "chupai") {
                        var last = self.canCardData && self.lastcard || null;
                        var canpass = self.players[self.selfPos].isCanPassSelect(last, self.firstchupai && self.data["tbl"].first_card);
                        if (!canpass) {
                            showTip("不符合规则");
                        }
                        else if (canpass && canpass == 1) {
                            showTip("不符合规则");
                        }
                        else if (canpass && canpass == 2) {
                            showTip("首轮必出黑桃3");
                        }
                        else if (canpass && typeof (canpass) && canpass.length > 0) {
                            // self.hideBtn()
                            // self.showEffect(canpass)      //音乐
                            // self.createbuchuTimer(self.getNextIndex(self.curIndex))
                            // self.players[self.selfPos].passCard(canpass,null)
                            // self.players[self.selfPos].setallNomal()
                            // self.firstchupai=false
                            sendToOnline(protocol.user_card_passcard, canpass);
                        }
                    }
                    else if (this.name == "btn_3") {
                        if (self.canCardData && typeof (self.canCardData) == "object" && self.canCardData.length > 0) {
                            self.pokerUp(self.canCardData);
                        }
                    }
                });
            }
            addClick(seekByName(panel, "buchu"), function (e) {
                self.hideBtn();
                self.createbuchuTimer(self.getNextIndex(self.curIndex));
                self.players[self.selfPos].backAllPoker();
                self.players[self.selfPos].setallNomal();
                self.setBuchu(self.getPlayerPos(self.selfPos + 1));
                sendToOnline(protocol.user_card_pass);
            });
            addClick(seekByName(panel, "chupai"), function (e) {
                var last = self.canCardData && self.lastcard || null;
                var canpass = self.players[self.selfPos].isCanPassSelect(last, self.firstchupai && self.data["tbl"].first_card);
                if (!canpass) {
                    showTip("不符合规则");
                }
                else if (canpass && canpass == 1) {
                    showTip("不符合规则");
                }
                else if (canpass && typeof (canpass) && canpass.length > 0) {
                    self.hideBtn();
                    self.showEffect(canpass); //音乐
                    self.createbuchuTimer(self.getNextIndex(self.curIndex));
                    self.players[self.selfPos].passCard(canpass, null);
                    self.players[self.selfPos].setallNomal();
                    self.firstchupai = false;
                    sendToOnline(protocol.user_card_passcard, canpass);
                }
            });
        };
        ddz_sjGameScene.prototype.playerCardSound = function (str) {
            var sex = str;
            var music = "music/ddz/" + (Number(sex || 2) == 1 && "man/" || "nv/") + str + ".mp3";
            if (this.is_music) {
                playSound("res/" + music);
            }
        };
        ddz_sjGameScene.prototype.showEffect = function (passcard) {
            var self = this;
            var obj;
            if (!passcard && typeof (passcard) != "object") {
                return;
            }
            var obj = this.RuleCheck["getPassCardType"](passcard);
            var card = obj["value"];
            var types = obj["cardType"];
            var ani;
            var panel = seekByName(this.main, "effmain");
            if (panel) {
                panel.removeChildren();
            }
            if (types == 1) {
                self.playerCardSound("w_1_" + card);
            }
            else if (types == 2) {
                self.playerCardSound("w_2_" + card);
            }
            else if (types == 3) {
                self.playerCardSound("liandui");
            }
            else if (types == 4) {
                ani = createAni("shunzi", 15);
                self.playerCardSound("shunzi");
            }
            else if (types == 5) {
                self.playerCardSound("3dai0");
            }
            else if (types == 6) {
                self.playerCardSound("3dai1");
            }
            else if (types == 7) {
                self.playerCardSound("3dai2");
            }
            else if (types == 8) {
                self.playerCardSound("feiji");
            }
            else if (types == 9) {
                ani = createAni("zhadan", 19);
                self.playerCardSound("bomb");
            }
            else if (types == 10) {
                self.playerCardSound("4dai2");
            }
            else if (types == 11) {
                self.playerCardSound("4dai22");
            }
            else if (types == 12) {
                self.playerCardSound("huojian");
            }
            if (types == 8) {
                var huojian = new Laya.Image("effect/feiji_img_feiji.png");
                huojian.anchorX = 0.5;
                huojian.anchorY = 0.5;
                huojian.x = -100;
                huojian.y = Laya.Browser.height / 2;
                Laya.stage.addChild(huojian);
                Laya.Tween.to(huojian, { x: (Laya.Browser.width + 200) }, 1800, null, Handler.create(this, function (obj) {
                    Laya.timer.once(1000, this, function (arg) {
                        Laya.stage.removeChild(arg);
                    }, [obj]);
                }, [huojian]), 0);
            }
            else if (types == 12) {
                var huojian = new Laya.Image("effect/huojian.png");
                huojian.anchorX = 0.5;
                huojian.anchorY = 0.5;
                huojian.x = Laya.Browser.width / 2;
                huojian.y = Laya.Browser.height - 200;
                Laya.stage.addChild(huojian);
                Laya.Tween.to(huojian, { y: -100 }, 1000, null, Handler.create(this, function (obj) {
                    Laya.timer.once(1000, this, function (arg) {
                        Laya.stage.removeChild(arg);
                    }, [obj]);
                }, [huojian]), 0);
            }
            if (ani) {
                panel.addChild(ani);
            }
        };
        ddz_sjGameScene.prototype.onclick = function (e) {
            var self = this;
            if (e.target.name == "backBtn") {
                runScene(gameView.hall_sjddz);
            }
            else if (e.target.name == "startBtn") {
                sendToOnline(protocol.user_card_ready);
                seekByName(this.main, "startBtn").visible = false;
            }
            else if (e.target.name == "getFriend") {
                // Global.create_share = "房间号【" + this.data["id"] + "】 " + this.data["list"].length + "缺" + (this.getTbl("player_num") -
                //              this.data["list"].length) + "\n" + "斗地主，" + this.getTbl("player_num") + "人房，" + this.getTbl("totalNum") + "局,快来加入吧"
                // window["shareBTN"]()
            }
            else if (e.target.name == "is_music") {
                if (self.is_music) {
                    Laya.SoundManager.stopAll();
                    this.main.is_music.skin = "ddz_sj/music_guan.png";
                }
                else {
                    playMusic("res/music/game.mp3");
                    this.main.is_music.skin = "ddz_sj/music_kai.png";
                }
                self.is_music = !self.is_music;
            }
            else if (e.target.name == "delRoom") {
                if (self.start) {
                    sendToOnline(protocol.user_update_exit_room);
                }
                else {
                    if (self.isManager()) {
                        self.exitShow();
                    }
                    else {
                        showTip("没有权限");
                    }
                }
            }
        };
        ddz_sjGameScene.prototype.voice = function () {
            var self = this;
            var data = [];
            var cfg = Global.GameCfg.getConfigById("word", 10);
            var arr = [];
            for (var i = 0; i < cfg.len; i++) {
                arr.push(cfg["MESSAGE" + i]);
            }
            var voice_list = seekByName(this.main, "voice_list");
            voice_list.visible = true;
            voice_list.array = arr;
            //文字消息列表
            voice_list.vScrollBarSkin = '';
            voice_list.scrollBar.elasticBackTime = 200; //设置橡皮筋回弹时间。单位为毫秒。
            voice_list.scrollBar.elasticDistance = 50; //设置橡皮筋极限距离。
            voice_list.renderHandler = new Handler(this, function (cell, index) {
                var msgText = cell.getChildByName("msgText");
                msgText.text = cell.dataSource["DESC"];
            });
            voice_list.mouseHandler = new Handler(this, function (e, index) {
                if (e.type == Laya.Event.CLICK) {
                    var data = voice_list.array[index];
                    sendToOnline(protocol.user_send_voice, "music:" + (index + 1));
                    voice_list.visible = false;
                }
            });
        };
        ddz_sjGameScene.prototype.showSetting = function () {
            if (this.tempDlg != null) {
                this.tempDlg.removeSelf();
            }
            var setting = new ui.sjddz.setting_sjddzUI();
            this.tempDlg = setting;
            var self = this;
            setting.clearBtn.visible = true;
            addClick(setting.closeBtn, function () {
                setting.removeSelf();
            });
            addClick(setting.clearBtn, function () {
                if (self.start) {
                    sendToOnline(protocol.user_update_exit_room);
                }
                else {
                    if (self.isManager()) {
                        self.exitShow();
                    }
                    else {
                        showTip("没有权限");
                    }
                }
            });
            Laya.stage.addChild(setting);
        };
        ddz_sjGameScene.prototype.exitShow = function () {
            var self = this;
            var exit = new ui.sjddz.dissolve_ddzUI();
            addClick(exit.Button_close, function () {
                exit.removeSelf();
            });
            addClick(exit.Button_back, function () {
                sendToOnline(protocol.user_update_exit_room);
            });
            Laya.stage.addChild(exit);
        };
        ddz_sjGameScene.prototype.isManager = function () {
            return Global.UserData.getUserData("id") == this.data["room_creator"];
        };
        ddz_sjGameScene.prototype.getTbl = function (key) {
            return this.data["tbl"][key];
        };
        ddz_sjGameScene.prototype.prepare = function () {
            var self = this;
            for (var k in this.data["list"]) {
                if (this.data["list"][k].id == Global.UserData.getUserData("id")) {
                    this.selfPos = parseInt(k);
                    break;
                }
            }
            for (var i = 1; i <= 3; i++) {
                var idx = this.selfPos + i;
                if (idx > 3) {
                    idx = idx - 3;
                }
                var user_id = idx - 1;
                var pan = this.main["player" + i];
                if (this.data["list"][user_id]) {
                    pan.visible = true;
                    pan.getChildByName('nameText').visible = true;
                    pan.getChildByName('coinText').text = this.data["list"][user_id].yxb;
                    if (this.data["tbl"].game_type == "gold") {
                        seekByName(pan, "goldValue").text = this.data["list"][user_id].yxb;
                    }
                    pan.getChildByName('nameText').text = getByteLen(this.data["list"][user_id].name, 8); // this.data["list"][user_id].name; 
                    pan.getChildByName('ready').visible = this.data["list"][user_id].ready && this.data["list"][user_id].ready || false;
                    var ran = Math.floor(Math.random() * 11 + 1);
                    this.data["list"][user_id].random_head = ran;
                    pan.getChildByName('head' + i).skin = this.data["list"][user_id].head || "head/" + ran + ".png";
                    if (user_id == this.selfPos && this.data["list"][user_id].ready) {
                        seekByName(this.main, "startBtn").visible = false;
                    }
                    addClick(pan, function (info) {
                        self.showUserInfo_shu(info);
                    }, this, true, [this.data["list"][user_id]]);
                }
                else {
                    pan.visible = false;
                }
            }
        };
        ddz_sjGameScene.prototype.showUserInfo_shu = function (info) {
            var _this = this;
            var self = this;
            var user = new ui.sjddz.userinfo_shuUI();
            user.user_id.text = info.id;
            user.user_ip.text = info.ip;
            user.user_name.text = info.name;
            user.user_head.skin = info.head || "head/" + (info.random_head || info.tid || 1) + ".png";
            Laya.stage.addChild(user);
            var data = [];
            for (var i = 1; i <= 4; i++) {
                data.push(i);
            }
            var panle_skill = seekByName(user, "panle_skill");
            //添加list滚动条功能
            panle_skill.hScrollBarSkin = '';
            panle_skill.array = data;
            panle_skill.scrollBar.elasticBackTime = 200; //设置橡皮筋回弹时间。单位为毫秒。
            panle_skill.scrollBar.elasticDistance = 50; //设置橡皮筋极限距离。
            panle_skill.renderHandler = new Handler(this, function (cell, index) {
                console.log(132456);
                if (index > data.length)
                    return;
                var content = data[index];
                var butt_ = seekByName(cell, "Button_");
                if (butt_) {
                    butt_.name = "" + content;
                    butt_.skin = "userinfo/hudong_" + content + ".png";
                    var that = _this;
                    addClick(butt_, function (e) {
                        var num = Number(butt_.name);
                        if (info.id == Global.UserData.getUserData("id")) {
                            showTip("不能对自己使用");
                        }
                        else if (self.start) {
                            sendToOnline(protocol.user_hudong_biaoqing, { id: info.id, num: num });
                            user.removeSelf();
                        }
                        else {
                            showTip("游戏未开始不能使用");
                        }
                    });
                }
                if (content) {
                    if (index <= 2) {
                        cell = data[index];
                    }
                    else {
                        cell = data[index];
                    }
                }
            });
            addClick(user.close_Btn, function () {
                user.removeSelf();
            });
        };
        ddz_sjGameScene.prototype.showReadyStatus = function (data) {
            var self = this;
            var is_gold = (self.data["tbl"].game_type == "gold" || self.data["tbl"].game_type == "shangjing") && true || false;
            if (!is_gold) {
                var pos = self.getPlayerPos(data);
                var pan = seekByName(self.main, "player" + pos);
                seekByName(pan, "ready").visible = true;
                this.data["list"][data - 1].ready = true;
            }
        };
        ddz_sjGameScene.prototype.getPlayerPos = function (pos) {
            var self = this;
            // var num = self.data["tbl"].player_num
            var num = this.playerNum;
            for (var i = 1; i <= num; i++) {
                var idx = self.selfPos + i;
                if (idx > num) {
                    idx = idx - num;
                }
                if (idx == pos) {
                    return i;
                }
            }
        };
        ddz_sjGameScene.prototype.packet = function (data) {
            var self = this;
            var sjddz_money = new ui.sjddz.sjddz_moneyUI();
            Laya.stage.addChild(sjddz_money);
            sjddz_money.zOrder = 99999;
            seekByName(sjddz_money, "containing").visible = true;
            seekByName(sjddz_money, "close_btn").visible = false;
            var lingjiang = seekByName(sjddz_money, "lingjiang");
            var hongbao = seekByName(sjddz_money, "hongbao");
            hongbao.scaleX = 0;
            hongbao.scaleY = 0;
            Laya.Tween.to(hongbao, { scaleX: 1, scaleY: 1, }, 500, null, Handler.create(this, function (obj) {
                seekByName(hongbao, "chai_red").visible = false;
            }, [hongbao]), 0);
            // seekByName(sjddz_money,"chai_red").visible = false
            seekByName(sjddz_money, "share_qun").visible = true;
            // addClick(seekByName(sjddz_money,"chai_red"), function(){            //  直接拆红包
            addClick(seekByName(sjddz_money, "share_qun"), function () {
                seekByName(sjddz_money, "share_qun").visible = false;
                if (window["shareBTN"]) {
                    window["shareBTN"]();
                }
                if (self.data["tbl"].game_type == "shangjing") {
                    this.shangjing_ju = 0;
                }
                if (self.data["tbl"].game_type == "gold") {
                    this.shangjing_ju = 0;
                }
                var time = 1;
                Global.Clock.addTimeFun("sjddz_money_hongbao", function () {
                    time = time - 1;
                    if (time < 0) {
                        if (data && typeof (data["money"]) == "number" || data["money"] == 0) {
                            hongbao.visible = false;
                            lingjiang.visible = true;
                            seekByName(lingjiang, "score_money").text = data["money"] || 0;
                        }
                        Global.Clock.removeTimeFun("sjddz_money_hongbao");
                    }
                }, 0.5);
                var urls = [];
                for (var i = 1; i <= 6; i++) {
                    urls.push("effect/hongbao/hongbao_" + i + ".png");
                }
                var ani = new Laya.Animation();
                ani.loadImages(urls).play(0, false);
                ani.pos(-200, 0);
                ani.interval = 300;
                ani.on(Laya.Event.COMPLETE, this, function () {
                    ani.removeSelf();
                });
                seekByName(sjddz_money, "Anim_money").addChild(ani);
            }, this);
            addClick(seekByName(sjddz_money, "tc_btn"), function () {
                sjddz_money.removeSelf();
            }, this);
        };
        ddz_sjGameScene.prototype.recvData = function (cmd, data) {
            if (!this.loadEnd) {
                this.protQueue.push({ cmd: cmd, data: data });
                return;
            }
            var self = this;
            if (cmd == protocol.user_exit_game) {
                runScene(gameView.hall_sjddz);
            }
            else if (cmd == protocol.user_enter_room) {
                this.data["list"] = data.list;
                this.prepare();
                // if(this.data["list"].length >=2 && this.loading_jia){
                //     this.main.visible = true
                //     this.loading_jia.visible = false
                // }
                // //  赏金场    赢的场次       
                if (self.data["tbl"].game_type == "shangjing") {
                    if (self.shangjing_ju = self.data["list"][self.selfPos]["shangjing"]) {
                        self.shangjing_ju = (self.data["list"][self.selfPos]["shangjing"].win_num + 1) || 1;
                        seekByName(seekByName(self.main, "win_ju"), "win_num").text = "(" + this.shangjing_ju + "/7)连胜送红包";
                        seekByName(self.main, "win_ju").visible = true;
                    }
                }
            }
            else if (cmd == protocol.user_card_ready) {
                self.showReadyStatus(data);
            }
            else if (cmd == protocol.game_logic_start) {
                this.startGame(data, null);
            }
            else if (cmd == protocol.user_get_money) {
                var time = 2;
                Global.Clock.addTimeFun("get_money", function () {
                    time = time - 1;
                    if (time < 0) {
                        self.packet(data);
                        Global.Clock.removeTimeFun("get_money");
                    }
                }, 0.5);
            }
            else if (cmd == protocol.user_hudong_biaoqing) {
                self.action_type(data);
            }
            else if (cmd == protocol.user_room_state) {
                this.roomState = data;
            }
            else if (cmd == protocol.user_card_qiang_di_zhu) {
                this.showJiaofenStatus(data);
                if (data.idx != self.curIndex) {
                    if (data.jiao_fen && data.jiao_fen > 0) {
                        self.playerCardSound(data.jiao_fen + "fen");
                    }
                    else {
                        self.playerCardSound("bujiao");
                    }
                }
                if (data.cur_idx) {
                    this.createbuchuTimer(data.cur_idx, 5); // 加分和加倍    默认5秒
                    if (data.cur_idx == this.selfPos + 1) {
                        if (this.jiaofen && this.jiaofen > data.jiao_fen) {
                            this.showJiaofen(true, this.jiaofen);
                        }
                        else {
                            this.showJiaofen(true, data.jiao_fen);
                        }
                    }
                    else {
                        this.hideBtn();
                    }
                }
                this.jiaofen = data.jiao_fen;
            }
            else if (cmd == protocol.user_card_jia_bei) {
                if (data.cur_times[self.selfPos] && self.data["tbl"].game_type == "gold") {
                    self.up_goldbeishu(data.cur_times[self.selfPos] || 3);
                }
                this.showJiabeiStatus(data);
                if (data.idx - 1 != self.curIndex) {
                    if (data.jia_bei && data.jia_bei > 1) {
                        self.playerCardSound("jiabei");
                    }
                    else {
                        self.playerCardSound("bujiabei");
                    }
                }
                if (data.cur_idx) {
                    this.createbuchuTimer(data.cur_idx, 5); // 加分和加倍    默认5秒
                    if (data.cur_idx - 1 == self.selfPos) {
                        this.showJiabei(true);
                    }
                    else {
                        this.hideBtn();
                    }
                }
            }
            else if (cmd == protocol.user_card_passcard || cmd == protocol.user_card_pass) {
                if (data.cur_times && data.cur_times[self.selfPos] && self.data["tbl"].game_type == "gold") {
                    self.up_goldbeishu(data.cur_times[self.selfPos] || 3);
                }
                if (!(self.curIndex - 1 == self.selfPos)) {
                    if (cmd == protocol.user_card_passcard) {
                        self.showEffect(data.id); // 音乐
                        if (self.players[data.idx - 1]) {
                            self.players[data.idx - 1].passCard(data.id, null);
                        }
                    }
                    else {
                        self.playerCardSound("pass");
                        self.setBuchu(self.getPlayerPos(data.idx));
                    }
                    this.createbuchuTimer(self.getNextIndex(self.curIndex));
                }
                else {
                    self.hideBtn();
                    if (data.id && data.id.length > 0) {
                        self.showEffect(data.id); //音乐
                        self.createbuchuTimer(self.getNextIndex(self.curIndex));
                        self.players[self.selfPos].passCard(data.id, null);
                        self.players[self.selfPos].setallNomal();
                        self.firstchupai = false;
                    }
                    else {
                        self.createbuchuTimer(self.getNextIndex(self.curIndex));
                        self.playerCardSound("pass");
                    }
                }
                self.curIndex = self.getNextIndex(self.curIndex);
                if (data.id) {
                    self.lastcard = data.id;
                    self.lastidx = data.idx;
                }
                if (self.curIndex - 1 == self.selfPos && !data.game_end) {
                    if (self.lastidx && self.lastidx == self.curIndex) {
                        self.checkPassCard(null, null);
                    }
                    else {
                        self.checkPassCard(self.lastcard, null);
                    }
                }
            }
            else if (cmd == protocol.user_update_socre) {
                for (var i = 0; i < this.data["list"].length; i++) {
                    if (Number(this.data["list"][i].id) == Number(data.id)) {
                        this.data["list"][i].yxb = Number(data.num);
                        var idx = self.getPlayerPos(i + 1);
                        var pan = this.main["player" + idx];
                        seekByName(pan, "goldValue").text = Number(data.num);
                    }
                }
            }
            else if (cmd == protocol.user_gold_compensate_get) {
                var pan1 = this.main["player1"];
                var delta = Number(data) - Global.UserData.getUserData("yxb");
                seekByName(pan1, "goldValue").text = Number(data);
                this.gold_changci = true;
                //   写死    破产奖励5000
                get_gold_and_resurrection(5000, "gold");
            }
            else if (cmd == protocol.user_sjddz_share_fuhuoka) {
                var pan1 = this.main["player1"];
                var aaa = seekByName(pan1, "cardValue").text;
                seekByName(pan1, "cardValue").text = Number(seekByName(pan1, "cardValue").text) + data;
                this.gold_changci = true;
            }
            else if (cmd == protocol.user_con_resurrection) {
                showTip("复活成功");
            }
            else if (cmd == protocol.user_single_result) {
                if (data.pooker_list) {
                    for (var k in data.pooker_list) {
                        self.players[k].showCards(data.pooker_list[k]);
                    }
                }
                var time = 2;
                Global.Clock.addTimeFun("Result", function () {
                    time = time - 1;
                    if (time < 0) {
                        self.showResult(data, null);
                        Global.is_jiazai_quan = true;
                        Global.Clock.removeTimeFun("Result");
                    }
                }, 0.5);
            }
            else if (cmd == protocol.user_final_result) {
                this.finalData = data.list;
                if (data.clear_room) {
                    if (this.mlayer) {
                        this.mlayer.removeSelf();
                    }
                    this.showResult(data.list, true);
                }
            }
            else if (cmd == protocol.user_room_exit_state) {
                if (data) {
                    for (var key in data) {
                        if (key != "time") {
                            if (data[key] != 1) {
                                var nu;
                                if (data[key]) {
                                    nu = key;
                                }
                                else {
                                    // nu  = key * -1
                                }
                                // table.insert(self.rolesYes,nu)    
                            }
                            else {
                                this.exitRoomRole = Number(key);
                            }
                        }
                    }
                }
            }
            else if (cmd == protocol.user_disagree_exit) {
                if (this.mlayer) {
                    this.mlayer.removeSelf();
                    this.mlayer = null;
                    // Clock.removeTimeFunc("wait_exit")
                    showTip("申请失败，小伙伴们不同意解散！");
                }
            }
            else if (cmd == protocol.user_update_exit_room) {
                if (this.players[data - 1].id == Global.UserData.getUserData("id")) {
                    return;
                }
                this.exitGameingShow(data - 1, null);
            }
            else if (cmd == protocol.user_update_yes_exit_room) {
                if (this.mlayer && seekByName(this.mlayer, "infoPanel")) {
                    if (data < 0) {
                        // text.setColor(cc.color(255, 0, 0))
                        showTip("同意");
                    }
                    else {
                        // text.setColor(cc.color(0, 255, 0))
                        showTip("不同意");
                    }
                }
            }
            else if (cmd == protocol.user_send_voice) {
                seekByName(self.main, "voice_bg").visible = false;
                var cur = data.idx;
                var sign = this.getHeadSign(cur);
                //    var pos = sign.localToGlobal(new Laya.Point(sign.x,sign.y));
                var pos = new Laya.Point(sign.x, sign.y);
                if (data.str.indexOf("emoj:") != -1) {
                    var idx = data.str.substring(5, data.str.length) - 1;
                    var info = games.EMOJ_ANI[idx];
                    var urls = [];
                    for (var i = 1; i <= info[1]; i++) {
                        urls.push("emoji/" + info[0] + i + ".png");
                    }
                    var ani = new Laya.Animation();
                    ani.loadImages(urls).play(0, false);
                    ani.pos(pos.x - 20, pos.y - 130);
                    ani.interval = 200;
                    ani.on(Laya.Event.COMPLETE, this, function () {
                        ani.removeSelf();
                    });
                    Laya.stage.addChild(ani);
                }
                else if (data.str.indexOf("music:") != -1) {
                    var cfg = Global.GameCfg.getConfigById("word", 10);
                    var arr = new Array();
                    for (var i = 0; i < cfg.len; i++) {
                        arr.push(cfg["MESSAGE" + i]);
                    }
                    var idx = data.str.substring(6, data.str.length) - 1;
                    seekByName(sign, "voice1").visible = true;
                    seekByName(sign, "msgText").text = arr[idx]["DESC"];
                    seekByName(sign, "voice1").width = seekByName(sign, "msgText").width + 50;
                    seekByName(sign, "msgText").x = seekByName(sign, "voice1").width - 30;
                    playSound("res/music/pre_voice/" + arr[idx]["music"]);
                    Laya.Tween.to(seekByName(sign, "voice1"), { alpha: 0 }, 1000, null, Handler.create(this, function (obj) {
                        obj.visible = false;
                        obj.alpha = 255;
                    }, [seekByName(sign, "voice1")]), 1000);
                }
            }
            else if (cmd == protocol.user_re_connect) {
                runScene(gameView.GameScene, data);
            }
        };
        ddz_sjGameScene.prototype.getHeadSign = function (data, voice) {
            if (voice === void 0) { voice = false; }
            if (this.start) {
                return seekByName(this.main, "player" + this.players[data - 1].getIndex());
            }
            else {
                for (var i = 1; i <= this.playerNum; i++) {
                    var idx = this.selfPos + i;
                    if (idx > this.playerNum) {
                        idx = idx - this.playerNum;
                    }
                    var user_id = idx - 1;
                    if (idx == data) {
                        return seekByName(this.main, "player" + i);
                    }
                }
            }
        };
        ddz_sjGameScene.prototype.close_time = function () {
            for (var i = 1; i <= 3; i++) {
                var player = seekByName(this.main, "player" + i);
                var tim_bg = seekByName(player, "time_bg");
                tim_bg.visible = false;
            }
        };
        ddz_sjGameScene.prototype.getFitGame = function (yxb, data) {
            for (var k in data) {
                if (data[k].stop && (yxb >= data[k].start && yxb < data[k].stop)) {
                    return k;
                }
                else if (!data[k].stop) {
                    return k;
                }
            }
            return 1;
        };
        ddz_sjGameScene.prototype.showResult = function (data, final) {
            var self = this;
            self.exitRoomRole = null;
            this.close_time();
            if (final) {
                var main = new ui.sjddz.sjddz_dajiesuanUI();
                Laya.stage.addChild(main);
                addClick(main.Button_again, function () {
                    runScene(gameView.hall_sjddz);
                });
                if (seekByName(main, "Image_2") && data[self.selfPos + 1] && data[self.selfPos + 1].win < 0) {
                    seekByName(main, "Image_2").skin = "ddzsj_Result/lose_title.png";
                }
                var yue_time = new Date();
                var time = CurentTime();
                seekByName(main, "Text_ID").text = "房号:" + self.data["id"];
                seekByName(main, "Text_JU").text = "局数:" + self.data["tbl"].totalNum;
                seekByName(main, "Text_TIME").text = "时间:" + time; //yue_time.toLocaleDateString() +" "+
                var idxs = 1;
                var score = 0;
                for (var i = 1; i <= self.data["list"].length; i++) {
                    var idx = self.getPlayerPos(i);
                    var call = seekByName(main, "cell_" + idx);
                    var user_idx = idx - 1;
                    if (self.data["list"][user_idx]) {
                        seekByName(call, "icon").skin = self.data["list"][user_idx].head || "head/2.png";
                        seekByName(call, "nameText").text = "姓名:" + getByteLen(self.data["list"][user_idx].name, 6);
                        seekByName(call, "Text_Id").text = "id::" + self.data["list"][user_idx].id;
                        seekByName(call, "winnum").text = data[idx] && data[idx].win_num || 0;
                        seekByName(call, "losenum").text = data[idx] && data[idx].lose_num || 0;
                        seekByName(call, "zhadannum").text = data[idx] && data[idx].zhadan_num || 0;
                        if (data[idx] && data[idx].win < 0) {
                            seekByName(call, "sign").skin = "ddzsj_Result/+.png";
                            seekByName(call, "final_score").skin = "ddzsj_Result/num2.png";
                        }
                        seekByName(call, "final_score").value = data[idx] && data[idx].win || 0;
                        seekByName(call, "manager").visible = idx == 1 && true || false;
                        if (score < data[idx].win) {
                            score = data[idx].win;
                            idxs = idx;
                        }
                    }
                }
                var cell = seekByName(main, "cell_" + idxs);
                seekByName(cell, "win").visible = true;
                // addClick(main.Button_share, function(){
                //         showTip("暂未开放")
                // });
            }
            else {
                //  开启广告.
                if (window["bannerAd"]) {
                    // window["bannerAd"].show()
                }
                this.hideBtn();
                var is_gold = self.data["tbl"].game_type;
                var result;
                var jushu;
                var is_win;
                is_win = data[self.selfPos + 1] && data[self.selfPos + 1].win;
                if (is_win > 0) {
                    playSound("res/music/ddz/win.mp3");
                }
                else if (is_win < 0) {
                    playSound("res/music/ddz/lose.mp3");
                }
                if (is_gold == "shangjing") {
                    result = new ui.sjddz.sjddz_ResultUI();
                    is_win = data[self.selfPos + 1] && data[self.selfPos + 1].win;
                    if (is_win == 0) {
                        seekByName(result, "ddz_win").skin = "ddzsj_Result/liuju_bg.png";
                        jushu = self.shangjing_ju;
                    }
                    else if (is_win < 0) {
                        seekByName(result, "ddz_win").skin = "ddzsj_Result/challenge_fail.png";
                        seekByName(result, "confirmBtn").skin = "ddzsj_Result/fuhuo_btn.png";
                        seekByName(result, "continue_game").skin = "ddzsj_Result/continue_chognxin.png";
                        jushu = self.shangjing_ju;
                        seekByName(result, "fuhuoka_bg").visible = true;
                        seekByName(result, "fuhuoka_num").text = "×" + Global.UserData.getUserData("shangjing").relive_card_num;
                        //   是否有复活卡
                        var show_shibai = seekByName(result, "show_shibai");
                        if (Global.UserData.getUserData("shangjing").relive_card_num <= 0) {
                            seekByName(result, "showResult").visible = false;
                            show_shibai.visible = true;
                        }
                        addClick(seekByName(show_shibai, "share_flock"), function () {
                            Global.Clock.removeTimeFun("count_time");
                            if (window["shareBTN"]) {
                                window["shareBTN"]();
                            }
                            seekByName(show_shibai, "label_text").text = "已经分享成功，恭喜获得复活卡X1";
                            seekByName(show_shibai, "share_text").text = "赶紧复活吧！！！";
                            seekByName(show_shibai, "count_time_bg").visible = false;
                            sendToOnline(protocol.user_sjddz_share_fuhuoka, 1); //  4003
                            seekByName(show_shibai, "share_flock").visible = false;
                            if (seekByName(show_shibai, "free_fuhuo")) {
                                seekByName(show_shibai, "free_fuhuo").visible = true;
                                addClick(seekByName(show_shibai, "free_fuhuo"), function () {
                                    sendToOnline(protocol.user_con_resurrection, 1); //  刷新复活重新开始
                                    result.removeSelf();
                                    self.clean_card();
                                    runScene(gameView.hall_sjddz, null, "loading");
                                    sendToOnline(protocol.user_join_money, { type: 1, game: "cardsjddz" });
                                });
                            }
                        });
                        addClick(seekByName(show_shibai, "fanhui"), function () {
                            // show_shibai.visible = false
                            // seekByName(result, "showResult").visible = true
                            runScene(gameView.hall_sjddz);
                        });
                        var time_num = 20;
                        seekByName(show_shibai, "count_time").text = time_num;
                        Global.Clock.addTimeFun("count_time", function () {
                            time_num = time_num - 1;
                            if (time_num >= 0) {
                                seekByName(show_shibai, "count_time").text = time_num;
                            }
                            if (time_num < 0) {
                                Global.Clock.removeTimeFun("count_time");
                                seekByName(show_shibai, "share_flock").visible = false;
                                seekByName(show_shibai, "show_bgtu").skin = "ddzsj_Result/zaijiezaili.png";
                            }
                        }, 0.5);
                    }
                    else {
                        jushu = data[self.selfPos + 1] && data[self.selfPos + 1].win_num || 1;
                        seekByName(result, "ddz_win").skin = "ddzsj_Result/challenge_success.png";
                        self.shangjing_ju = jushu;
                        if (jushu != 7) {
                            var time_num = 5;
                            seekByName(result, "time_num").visible = true;
                            Global.Clock.addTimeFun("time_num", function () {
                                time_num = time_num - 1;
                                seekByName(result, "time_num").text = time_num + "(s)";
                                seekByName(result, "time_num").visible = true;
                                if (time_num < 0) {
                                    runScene(gameView.hall_sjddz, null, "loading");
                                    sendToOnline(protocol.user_join_money, { type: 1, game: "cardsjddz" });
                                    result.removeSelf();
                                    self.clean_card();
                                    seekByName(self.main, "win_ju").visible = false;
                                    Global.Clock.removeTimeFun("time_num");
                                }
                            }, 0.5);
                        }
                    }
                    seekByName(result, "office").skin = "ddzsj_Result/" + (jushu && jushu || self.shangjing_ju) + ".png";
                    if (is_win < 0 || is_win == 0) {
                        jushu = jushu - 1;
                    }
                    for (var k = 1; k <= 7; k++) {
                        if (k <= jushu) {
                            seekByName(result, "schedule" + k).skin = "ddzsj_Result/game1.png";
                        }
                        else {
                            seekByName(result, "schedule" + k).skin = "ddzsj_Result/game2.png";
                        }
                    }
                    addClick(result.continue_game, function () {
                        if (is_win < 0) {
                            sendToOnline(protocol.user_hudong_sjddz_hall, { type: 2 }); // 2 挑战失败  fail   发一个值      没有都不发
                        }
                        else if (is_win > 0) {
                            Global.Clock.removeTimeFun("time_num");
                        }
                        runScene(gameView.hall_sjddz, null, "loading");
                        sendToOnline(protocol.user_join_money, { type: 1, game: "cardsjddz" });
                        result.removeSelf();
                        self.clean_card();
                        seekByName(self.main, "win_ju").visible = false;
                    });
                }
                else if (is_gold == "gold") {
                    result = new ui.sjddz.sjddz_Result_goldUI();
                    result.closeBtn.visible = true;
                    if (data[self.selfPos + 1] && data[self.selfPos + 1].win > 0) {
                        seekByName(result, "score").text = data.gold_win && data.gold_win[self.selfPos] || 0;
                    }
                    else if (data[self.selfPos + 1] && data[self.selfPos + 1].win < 0) {
                        seekByName(result, "ddz_result").skin = "ddzsj_Result/shu_bg.png";
                        seekByName(result, "score").text = data.gold_win && data.gold_win[self.selfPos] || 0;
                    }
                    if (data[self.selfPos + 1] && data[self.selfPos + 1].win == 0) {
                        seekByName(result, "ddz_result").skin = "ddzsj_Result/liuju.png";
                        seekByName(result, "score").text = 0;
                    }
                    if (data["cur_times"]) {
                        seekByName(self.main, "gold_beishu").value = data["cur_times"][self.selfPos] || 3;
                    }
                }
                else if (is_gold == null) {
                    result = new ui.sjddz.sjddz_commonUI();
                    if (data[self.selfPos + 1] && data[self.selfPos + 1].win < 0) {
                        seekByName(result, "ddz_result").skin = "ddzsj_Result/shu_bg.png";
                    }
                    for (var k = 1; k <= self.data["list"].length; k++) {
                        var pos = self.getPlayerPos(k);
                        var panel = seekByName(result, "player" + pos);
                        panel.visible = true;
                        seekByName(panel, "name").text = getByteLen(self.data["list"][k - 1].name, 8);
                        seekByName(panel, "beishu").text = data[k].jia_bei && data[k].jia_bei || 0;
                        seekByName(panel, "score").text = data[k].win && data[k].win || 0;
                        seekByName(panel, "dizhu").text = data[k].di_zhu && true || false;
                        seekByName(panel, "dizhu").visible = data[k].di_zhu && true || false;
                    }
                    if (data[self.selfPos + 1] && data[self.selfPos + 1].win == 0) {
                        seekByName(result, "ddz_win").skin = "ddzsj_Result/liuju_bg.png";
                    }
                }
                Laya.stage.addChild(result);
                result.zOrder = 999;
                addClick(seekByName(result, "confirmBtn"), function (e) {
                    if (is_gold == "gold") {
                        runScene(gameView.hall_sjddz);
                        var room_type;
                        if (self.gold_changci) {
                            room_type = 7;
                        }
                        else {
                            room_type = data.room_type[self.selfPos];
                        }
                        if (room_type == 1) {
                            showTip("金币不足");
                            return;
                        }
                        sendToOnline(protocol.user_jbc_join_game, { type: room_type, game: "cardsjddz" });
                    }
                    else if (is_gold == "shangjing") {
                        seekByName(self.main, "win_ju").visible = false;
                        if (data[self.selfPos + 1] && data[self.selfPos + 1].win >= 0) {
                            if (window["shareBTN"]) {
                                window["shareBTN"]();
                            }
                        }
                        else {
                            runScene(gameView.hall_sjddz, "loading");
                            if (Global.UserData.getUserData("shangjing").relive_card_num > 0) {
                                sendToOnline(protocol.user_con_resurrection, 1);
                                sendToOnline(protocol.user_join_money, { type: 1, game: "cardsjddz" });
                            }
                            result.removeSelf();
                            self.clean_card();
                        }
                    }
                    else {
                        if (self.finalData) {
                            self.showResult(self.finalData, true);
                        }
                        else {
                            self.clean_card();
                            sendToOnline(protocol.user_card_restart);
                        }
                        result.removeSelf();
                    }
                });
                addClick(result.closeBtn, function () {
                    if (self.data["tbl"].game_type == "shangjing") {
                        if (is_win > 0 || is_win == 0) {
                            sendToOnline(protocol.user_hudong_sjddz_hall, { type: 1 });
                            Global.Clock.removeTimeFun("time_num");
                        }
                        else {
                            sendToOnline(protocol.user_hudong_sjddz_hall, { type: 1, fail: "true" });
                        }
                    }
                    else {
                        runScene(gameView.hall_sjddz);
                    }
                });
            }
        };
        ddz_sjGameScene.prototype.startGame = function (data, reconnect) {
            var pos;
            var self = this;
            self.start = true;
            Global.is_jiazai_quan = false;
            self.resetShow(data);
            var is_donghua = false;
            if (reconnect) {
                self.roomState = reconnect.room_state;
                this.ju = reconnect.cur_num + 1;
                self.curIndex = reconnect.cur_idx;
                seekByName(self.main, "room_ju").text = this.ju + "/" + self.data["tbl"].totalNum + "局";
                if (reconnect.cur_times && reconnect.cur_times[self.selfPos] && self.data["tbl"].game_type == "gold") {
                    self.up_goldbeishu(reconnect.cur_times[self.selfPos] || 3);
                }
            }
            else {
                is_donghua = true;
                this.ju = data.cur_num + 1;
                self.curIndex = data.cur_idx;
                seekByName(self.main, "room_ju").text = this.ju + "/" + self.data["tbl"].totalNum + "局";
                if (data.cur_times && data.cur_times[self.selfPos] && self.data["tbl"].game_type == "gold") {
                    self.up_goldbeishu(data.cur_times[self.selfPos] || 3);
                }
            }
            for (var i = 1; i <= this.playerNum; i++) {
                var idx = this.selfPos + i;
                if (idx > this.playerNum) {
                    idx = idx - this.playerNum;
                }
                var user_id = idx - 1;
                //   this.main["player" +idx].tag = idx;
                if (this.data["list"][user_id]) {
                    this.players[user_id] = new games.ddz_sjPlayer({
                        info: this.data["list"][user_id],
                        card: i == 1 ? data.list : [],
                        play_type: self.data["tbl"].play_type,
                        idx: i,
                        dataIdx: idx,
                        parent: this,
                        main: this.main,
                        is_donghua: is_donghua,
                        head: this.main["player" + i],
                        panel: seekByName(self.main, "Panel_" + i),
                        out_panel1: seekByName(self.main, "out_panel1"),
                        cur: self.selfPos == user_id,
                        cardnum: (data && data.card_num_list && data.card_num_list[user_id]) || (reconnect && reconnect.card_num_list && reconnect.card_num_list[user_id]),
                        zhuang: (data && data.zhuang && (data.zhuang == idx)) || (reconnect && reconnect.zhuang_idx && (reconnect.zhuang_idx == idx)),
                    });
                }
                //   addClick(this.main["player" +i],function(e){
                //       console.log("位置" +self.players[this.tag].getIndex());
                //   });
            }
            self.players[self.selfPos].isTouche(true); // 是否可以点击牌
            if ((data) && (data.frist_put) && (self.curIndex == self.selfPos) && (!reconnect)) {
                self.firstchupai = true;
            }
            var isready = true;
            // var huanpai_list =(data && data.huanpai_list ) || (reconnect && reconnect.huanpai_list )
            var jiao_fen_list = (data && data.jiao_fen_list) || (reconnect && reconnect.jiao_fen_list); // 叫分 3000  状态20
            if (self.roomState == games.STATE.ROOM_WAITING_JIAOFEN && jiao_fen_list) {
                if (jiao_fen_list[self.selfPos] && self.curIndex - 1 == self.selfPos) {
                    this.jiaofen = (reconnect && reconnect.max_jiao_fen) || 0;
                    this.showJiaofen(true, this.jiaofen);
                }
                for (var key in jiao_fen_list) {
                    if (jiao_fen_list[key] == true) {
                        isready = false;
                    }
                    else {
                        self.showJiaofenStatus({ idx: key, jiao_fen: jiao_fen_list[key] });
                    }
                }
                this.createbuchuTimer(self.curIndex, 5); // 加分和加倍    默认5秒
            }
            var jia_bei_list = (data && data.jia_bei_list) || (reconnect && reconnect.jia_bei_list); // 加倍 3001  状态21
            var dizhu = (data && data.zhuang) || (reconnect && reconnect.zhuang_idx);
            if (dizhu) {
                self.showJiaofenStatus({ idx: dizhu, jiao_fen: jiao_fen_list[dizhu - 1] });
            }
            var rm_card = (data && data.rm_card) || (reconnect && reconnect.rm_card);
            if (rm_card) {
                self.createMingDiPai(rm_card);
            }
            if (self.roomState == games.STATE.ROOM_WAITING_JIABEI && jia_bei_list) {
                if (jia_bei_list[self.selfPos] == true && self.curIndex - 1 == self.selfPos) {
                    this.showJiabei(true);
                }
                this.createbuchuTimer(self.curIndex, 5); // 加分和加倍    默认5秒
            }
            if (self.roomState != games.STATE.ROOM_WAITING_JIAOFEN) {
                for (var key in jia_bei_list) {
                    if (jia_bei_list[key] == true) {
                        isready = false;
                    }
                    else if (typeof (jia_bei_list[key]) == "number") {
                        self.showJiabeiStatus({ idx: Number(key) + 1, jia_bei: jia_bei_list[key] });
                    }
                }
            }
            if (reconnect && reconnect.put_card_list) {
                self.resetDestop(reconnect.put_card_list);
            }
            // var jia_bei_list =(data && data.jia_bei_list ) || (reconnect && reconnect.jia_bei_list )     
            if (self.roomState == games.STATE.ROOM_WAITING_PUTOP) {
                if (self.curIndex - 1 == self.selfPos) {
                    if (reconnect && reconnect["put_card_list"]) {
                        var putlist = reconnect.put_card_list;
                        var tempinex = self.getFrontIndex(self.curIndex);
                        console.log(typeof (tempinex));
                        var lastuser = typeof (tempinex) == "number" && putlist[tempinex - 1] || null;
                        for (var i = 0; i < self.data["list"].length; i++) {
                            if (lastuser && typeof (lastuser) == "object" && lastuser.card && typeof (lastuser.card)) {
                                self.lastcard = lastuser.card;
                                self.lastidx = lastuser.idx;
                                break;
                            }
                            tempinex = self.getFrontIndex(tempinex);
                            lastuser = putlist[tempinex];
                        }
                        if (self.lastcard && self.lastidx && self.lastidx != self.curIndex) {
                            self.checkPassCard(self.lastcard, null);
                        }
                        else {
                            this.checkPassCard(null, null);
                        }
                    }
                    else {
                        this.checkPassCard(null, null);
                    }
                }
                this.createbuchuTimer(self.curIndex);
                var time = 2;
                Global.Clock.addTimeFun("jiabei", function () {
                    time = time - 1;
                    if (time < 0) {
                        // 赏金场出牌隐藏   叫分和加倍
                        if (self.data["tbl"].game_type != null) {
                            for (var i = 1; i <= 3; i++) {
                                seekByName(self.main, "eff" + i).removeChildren();
                                var zhuang = seekByName(self.main, "player" + i);
                                seekByName(zhuang, "double").visible = false;
                            }
                        }
                        Global.Clock.removeTimeFun("jiabei");
                    }
                }, 0.5);
            }
            if (self.exitRoomRole) {
                self.exitGameingShow(self.exitRoomRole, true);
            }
        };
        ddz_sjGameScene.prototype.createMingDiPai = function (card) {
            var self = this;
            var pan = seekByName(self.main, "eff4");
            pan.visible = true;
            if (card && card.length > 0) {
                var dt = getPokerstr(card);
                for (var key = 0; key < dt.length; key++) {
                    var str = key + 1;
                    var eff4_pk = seekByName(pan, "eff4_pk" + str);
                    eff4_pk.skin = "poker/" + dt[key] + ".png";
                }
            }
        };
        ddz_sjGameScene.prototype.resetDestop = function (putlist) {
            var self = this;
            var count = 0;
            for (var k in putlist) {
                if (putlist[k] && typeof (putlist[k]) == "object") {
                    self.players[k].passCard(putlist[k].card, true);
                }
                else if (putlist[k]) {
                    self.setBuchu(self.getPlayerPos(Number(k) + 1));
                }
                else {
                    count = count + 1;
                }
            }
            if (count == self.data["list"].length && self.selfPos + 1 == self.curIndex) {
                self.firstchupai = true;
            }
            var tempinex = self.getFrontIndex(self.curIndex);
            var lastuser = putlist[tempinex];
            for (var i = 1; i <= self.data["list"].length; i++) {
                if (lastuser && typeof (lastuser) == "object" && lastuser.card && typeof (lastuser.card)) {
                    self.lastcard = lastuser.card;
                    self.lastidx = lastuser.idx;
                    break;
                }
                tempinex = self.getFrontIndex(tempinex);
                lastuser = putlist[tempinex];
            }
        };
        ddz_sjGameScene.prototype.getFrontIndex = function (curindex) {
            var nextindex = curindex - 1;
            if (nextindex == 0) {
                nextindex = this.data["list"].length;
            }
            return nextindex;
        };
        ddz_sjGameScene.prototype.checkPassCard = function (last, passtime) {
            var self = this;
            var lastcard = last;
            if (lastcard) {
                this.canCardData = self.players[self.selfPos].getCanPassCard(lastcard);
                this.chupaiStatus(this.canCardData, passtime);
            }
            else {
                this.canCardData = null;
                this.chupaiStatus(null, passtime);
            }
        };
        ddz_sjGameScene.prototype.chupaiStatus = function (canCardData, passtime) {
            var self = this;
            this.hideBtn();
            self.players[self.selfPos].backAllPoker();
            self.players[self.selfPos].removepassCard();
            self.autoindex = 0;
            var opt = seekByName(self.main, "opt");
            opt.visible = true;
            var panel = seekByName(opt, "opt3");
            panel.visible = true;
            for (var i = 1; i <= 3; i++) {
                seekByName(panel, "btn_" + i).visible = true;
                seekByName(panel, "btn_" + i).disabled = false;
            }
            var opt = seekByName(self.main, "opt");
            var panel = seekByName(opt, "opt3");
            seekByName(panel, "btn_1").visible = true;
            seekByName(panel, "btn_2").visible = true;
            seekByName(panel, "btn_3").visible = true;
            seekByName(panel, "chupai").visible = false;
            seekByName(panel, "buchu").visible = false;
            panel.visible = true;
            for (var i = 1; i <= 3; i++) {
                seekByName(panel, "btn_" + i).disabled = false;
            }
            if (!canCardData) {
                seekByName(panel, "btn_1").visible = false;
                seekByName(panel, "btn_2").visible = false;
                seekByName(panel, "btn_3").visible = false;
                seekByName(panel, "chupai").visible = true;
                self.createbuchuTimer(self.selfPos + 1);
            }
            if (canCardData && typeof (canCardData) == "object" && canCardData.length == 0) {
                seekByName(panel, "btn_1").visible = false;
                seekByName(panel, "btn_2").visible = false;
                seekByName(panel, "btn_3").visible = false;
                seekByName(panel, "buchu").visible = true;
                // self.players[self.selfPos].setalldisabled()
                self.createbuchuTimer(self.selfPos + 1, 5);
                // }else if (canCardData && typeof(canCardData)=="object" &&  canCardData.length>0){ 
                //         // self.players[self.selfPos].setdisabled(canCardData)
                //         // self.createbuchuTimer(self.selfPos+1)
            }
            if (canCardData && typeof (canCardData) == "object" && canCardData.length > 0 && self.data["tbl"].stype) {
                seekByName(panel, "btn_1").disabled = true;
            }
        };
        ddz_sjGameScene.prototype.pokerUp = function (data) {
            var self = this;
            if (self.autoindex < data.length) {
                self.players[self.selfPos].pokerUp(data[self.autoindex]);
            }
            else {
                self.autoindex = 0;
                self.players[self.selfPos].pokerUp(data[self.autoindex]);
            }
            self.autoindex = self.autoindex + 1;
        };
        ddz_sjGameScene.prototype.showJiabei = function (bol) {
            var self = this;
            this.hideBtn();
            var opt = seekByName(this.main, "opt");
            var opt1 = seekByName(opt, "opt2");
            opt1.visible = bol;
            if (bol) {
                for (var k = 1; k <= 2; k++) {
                    seekByName(opt1, "btn_" + k).visible = true;
                    seekByName(opt1, "btn_" + k).disabled = false;
                    addClick(seekByName(opt1, "btn_" + k), function (e) {
                        if (this.name) {
                            var num = Number(this.name.slice(4));
                            sendToOnline(protocol.user_card_jia_bei, num);
                            if (num - 1 > 0) {
                                self.playerCardSound("jiabei");
                            }
                            else {
                                self.playerCardSound("bujiabei");
                            }
                        }
                    });
                }
            }
        };
        ddz_sjGameScene.prototype.showJiaofen = function (bol, xianzhi) {
            var self = this;
            this.hideBtn();
            var opt = seekByName(this.main, "opt");
            var opt1 = seekByName(opt, "opt1");
            opt1.visible = bol;
            if (bol) {
                for (var k = 1; k <= 4; k++) {
                    seekByName(opt1, "btn_" + k).visible = true;
                    addClick(seekByName(opt1, "btn_" + k), function (e) {
                        if (this.name) {
                            var num = Number(this.name.slice(4)) - 1;
                            sendToOnline(protocol.user_card_qiang_di_zhu, num);
                            if (num > 0) {
                                self.playerCardSound(num + "fen");
                            }
                            else {
                                self.playerCardSound("bujiao");
                            }
                            self.hideBtn();
                        }
                    });
                    if (xianzhi && k <= xianzhi + 1 && k != 1) {
                        seekByName(opt1, "btn_" + k).disabled = true;
                    }
                    else {
                        seekByName(opt1, "btn_" + k).disabled = false;
                    }
                }
            }
        };
        ddz_sjGameScene.prototype.resetShow = function (data) {
            var self = this;
            seekByName(self.main, "startBtn").visible = false;
            seekByName(self.main, "backBtn").visible = false;
            seekByName(self.main, "center").visible = false;
            if (seekByName(self.main, "loading")) {
                seekByName(self.main, "loading").visible = false;
            }
            if (self.data["tbl"].game_type == "gold") {
                var gold_number = seekByName(this.main, "gold_number");
                gold_number.visible = true;
            }
            if (self.zhuang_img) {
                this.main.removeChild(self.zhuang_img);
            }
            self.clean_card();
            if (seekByName(self.main, "win_ju") && self.data["tbl"].game_type == "shangjing") {
                seekByName(seekByName(self.main, "win_ju"), "win_num").text = this.shangjing_ju + "/7局连胜奖励";
                seekByName(self.main, "win_ju").visible = true;
            }
            this.jiaofen = 0;
        };
        ddz_sjGameScene.prototype.clean_card = function () {
            var self = this;
            for (var i = 1; i <= 3; i++) {
                seekByName(self.main, "Panel_" + i).removeChildren();
                seekByName(self.main, "eff" + i).removeChildren();
                var zhuang = seekByName(self.main, "player" + i);
                seekByName(zhuang, "zhuang").visible = false;
                seekByName(zhuang, "head" + i).removeChildren(); // 庄家
                seekByName(zhuang, "double").visible = false;
            }
            if (seekByName(self.main, "out_panel1")) {
                seekByName(self.main, "out_panel1").removeChildren();
            }
            if (seekByName(self.main, "eff4")) {
                seekByName(self.main, "eff4").visible = true;
                // 还原
                var pan = seekByName(self.main, "eff4");
                for (var key = 1; key <= 3; key++) {
                    var eff4_pk = seekByName(pan, "eff4_pk" + key);
                    eff4_pk.skin = "poker/poker_back.png";
                }
            }
        };
        ddz_sjGameScene.prototype.createbuchuTimer = function (idx, temp_tim) {
            if (temp_tim === void 0) { temp_tim = null; }
            var time = 10;
            if (temp_tim) {
                time = temp_tim;
            }
            for (var i = 1; i <= 3; i++) {
                var player = seekByName(this.main, "player" + i);
                var tim_bg = seekByName(player, "time_bg");
                tim_bg.visible = false;
            }
            var pos = this.getPlayerPos(idx);
            var pan = seekByName(this.main, "player" + pos);
            var time_bg = seekByName(pan, "time_bg");
            // 清空  桌面的牌
            var panel;
            if (pos != 1) {
                panel = seekByName(this.main, "Panel_" + pos);
            }
            else {
                panel = seekByName(this.main, "out_panel1");
            }
            panel.removeChildren();
            time_bg.visible = true;
            seekByName(time_bg, "js_time").text = time;
            Global.Clock.addTimeFun("ddz_buchu_clock" + pos, function (dt) {
                time = time - 1;
                seekByName(time_bg, "js_time").text = time;
                if (time > 0) {
                }
                else {
                    Global.Clock.removeTimeFun("ddz_buchu_clock" + pos);
                }
            }, 0.1);
        };
        ddz_sjGameScene.prototype.hideBtn = function () {
            var self = this;
            var opt = seekByName(self.main, "opt");
            opt.visible = true;
            for (var i = 1; i <= 3; i++) {
                var panel = seekByName(opt, "opt" + i);
                panel.visible = false;
                var num = (i == 1 ? 4 : (i == 2 ? 2 : 3));
                for (var j = 1; j <= num; j++) {
                    var btn = seekByName(panel, "btn_" + j);
                    if (btn) {
                        btn.visible = false;
                    }
                }
            }
            var player = seekByName(this.main, "player1");
            var tim_bg = seekByName(player, "time_bg");
            tim_bg.visible = false;
        };
        ddz_sjGameScene.prototype.setBuchu = function (pos) {
            var panel;
            if (pos != 1) {
                panel = seekByName(this.main, "Panel_" + pos);
            }
            else {
                panel = seekByName(this.main, "out_panel1");
            }
            panel.removeChildren();
            var sp = new Laya.Image("text/buchu_paopao.png");
            if (pos == 2) {
                sp.x = -345 * 0.3 - 20;
                sp.y = 0;
            }
            else if (pos == 3) {
                sp.x = 345 * 0.3 + 20;
                sp.y = 0;
            }
            panel.addChild(sp);
        };
        ddz_sjGameScene.prototype.getNextIndex = function (curindex) {
            var nextindex = curindex + 1;
            if (nextindex > this.data["list"].length) {
                nextindex = 1;
            }
            return nextindex;
        };
        ddz_sjGameScene.prototype.showJiabeiStatus = function (data) {
            var self = this;
            var pos = this.getPlayerPos(data.idx);
            var pan = seekByName(self.main, "player" + pos);
            var double = seekByName(pan, "double");
            double.visible = true;
            if (data.jia_bei > 1) {
                double.skin = "text/double_2.png";
            }
            else {
                double.skin = "text/not_double.png";
            }
        };
        ddz_sjGameScene.prototype.showJiaofenStatus = function (data) {
            var pos = this.getPlayerPos(data.idx);
            var pan = seekByName(this.main, "player" + pos);
            if (data.jiao_fen > 0) {
                this.setTipImg(pos, "text/score" + data.jiao_fen + "_light.png");
            }
            else {
                this.setTipImg(pos, "text/bujiao_paopao.png");
            }
        };
        ddz_sjGameScene.prototype.setTipImg = function (pos, str) {
            if (!pos) {
                return;
            }
            var eff = seekByName(this.main, "eff" + pos);
            eff.removeChildren();
            eff.visible = true;
            var sp = new Laya.Image(str);
            sp.x = 0;
            sp.y = 0;
            sp.anchorX = 0.5;
            sp.anchorY = 0.5;
            eff.addChild(sp);
        };
        //申请解散
        ddz_sjGameScene.prototype.exitGameingShow = function (data, info) {
            var self = this;
            this.mlayer = new ui.sjddz.fileApplication_sjddzUI();
            var isCur = false;
            var that = this;
            self.exitRoomRole = data;
            addClick(this.mlayer.Button_1, function () {
                showTip("请等待小伙伴们的选择！");
            });
            addClick(this.mlayer.Button_2, function () {
                that.mlayer.Button_2.disabled = true;
                that.mlayer.Button_3.disabled = true;
                sendToOnline(protocol.user_update_yes_exit_room, true);
            });
            addClick(this.mlayer.Button_3, function () {
                that.mlayer.Button_2.disabled = true;
                that.mlayer.Button_3.disabled = true;
                sendToOnline(protocol.user_update_yes_exit_room, false);
            });
            for (var key in this.players) {
                if (Number(key) != data) {
                    console.log(this.players[key].isSelf());
                }
                else if (this.players[key].isSelf()) {
                    if (Number(key) == data) {
                        isCur = true;
                        seekByName(this.mlayer, "Button_1").visible = true;
                        seekByName(this.mlayer, "Button_2").visible = false;
                        seekByName(this.mlayer, "Button_3").visible = false;
                    }
                }
            }
            // var cfg = Global.GameCfg.getCfg("word")["MSGTYPE7"]["MESSAGE1"]["DESC"].format(self.players[data].getInfo("name"))
            var cfg = Global.GameCfg.getCfg("word")["MSGTYPE7"]["MESSAGE1"]["DESC"];
            var zuo = cfg.slice(0, 2);
            var you = cfg.slice(6);
            this.mlayer.Text_xuan.text = zuo + self.players[data].getInfo("name") + you;
            var y = this.mlayer.height / 4;
            for (var k in this.players) {
                if (Number(k) != data) {
                    var v = this.players[k];
                }
            }
            var time = 60;
            Global.Clock.addTimeFun("wait_exit", function (dt) {
                console.log(dt);
                // if (isCur) {
                //       seekByName(self.mlayer, "managerBtn").text = "等待中(" + time + "S)" 
                //   } else {
                //       seekByName(self.mlayer, "Text_2").text = "(" + time + "S)" 
                //   }
            }, 60);
            Laya.stage.addChild(this.mlayer);
        };
        ddz_sjGameScene.prototype.action_type = function (data) {
            var self = this;
            var gj_idx = self.getPlayerPos(data.idx);
            var attackedidx = self.getPlayerPos(data.attackedidx);
            var cur_gj = seekByName(self.main, "player" + gj_idx);
            var cur_att = seekByName(self.main, "player" + attackedidx);
            cur_att.visible = true;
            var an1 = null;
            if (data.num == 1) {
                an1 = createAni_huodng("jidan_", 12);
            }
            else if (data.num == 2) {
                an1 = createAni_huodng("pijiu_", 21);
            }
            else if (data.num == 3) {
                an1 = createAni_huodng("tuoxie_", 24);
            }
            else if (data.num == 4) {
                an1 = createAni_huodng("xianhua_", 27);
            }
            else if (data.num == 5) {
                an1 = createAni_huodng("zhadan_", 14);
            }
            else {
                an1 = createAni_huodng("zuicun_", 37);
            }
            var sp2 = new Laya.Image("userinfo/hudong_" + data.num + data.num + ".png");
            sp2.x = cur_gj.x;
            sp2.y = cur_gj.y;
            sp2.anchorX = 0.5;
            sp2.anchorY = 0.5;
            sp2.scale(0.6, 0.6);
            this.main.addChild(sp2);
            sp2.zOrder = 999;
            var is_rotation;
            if (data.num == 2) {
                Laya.Tween.to(sp2, { x: cur_att.x, y: cur_att.y }, 800, null, Handler.create(this, function (obj) {
                    self.main.removeChild(sp2);
                    if (an1) {
                        cur_att.addChild(an1);
                    }
                }, [sp2]), 0);
            }
            else {
                Laya.Tween.to(sp2, { x: cur_att.x, y: cur_att.y, rotation: 960 }, 800, null, Handler.create(this, function (obj) {
                    self.main.removeChild(sp2);
                    if (an1) {
                        cur_att.addChild(an1);
                    }
                }, [sp2]), 0);
            }
        };
        ddz_sjGameScene.prototype.updateUI = function (key, data) {
            if (data.roomid > 0) {
                sendToOnline(protocol.user_enter_room, data.roomid);
            }
            else if (key == "reconnect") {
                runScene(ddz_sjGameScene, data);
            }
            else if (key == "enter") {
                runScene(ddz_sjGameScene, data);
            }
            else if (key == "yxb") {
                console.log("金币充值");
                if (this.gold_changci && data && data > 0) {
                    // showTip("获得金币+"+data +"祝您游戏愉快！")
                    get_gold_and_resurrection(data, "gold");
                }
            }
            else if (key == "relive_card_num") {
                console.log("复活卡");
                if (data && data > 0) {
                    // showTip("获得复活卡+"+data +"祝您游戏愉快！")
                    var time = 0.5;
                    Global.Clock.addTimeFun("gold_and_resurr", function () {
                        time = time - 1;
                        if (time < 0) {
                            get_gold_and_resurrection(data, "fuhuoka");
                            Global.Clock.removeTimeFun("gold_and_resurr");
                        }
                    }, 0.5);
                }
            }
        };
        return ddz_sjGameScene;
    }());
    games.ddz_sjGameScene = ddz_sjGameScene;
})(games || (games = {}));
//# sourceMappingURL=ddz_sjGameScene.js.map