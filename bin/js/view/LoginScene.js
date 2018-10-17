var Login = ui.sjddz.login_shuUI;
var gameView;
(function (gameView) {
    var LoginScene = /** @class */ (function () {
        function LoginScene(arg) {
            if (arg === void 0) { arg = null; }
            this.__Login = {};
            this.data = arg || {};
            new yftools.Loading(["wxlocal/pro.png"], this.onLoaded, this, "wxlocal/login_bg.png");
        }
        LoginScene.prototype.onLoaded = function () {
            if (this.haveRoom) {
                return;
            }
            var button;
            if (Global.is_loading) {
                Global.is_loading = false;
            }
            else {
                var load_bg = new Laya.Sprite();
                load_bg.loadImage("wxlocal/login_bg.png", 0, 0, 720, 1280);
                Laya.stage.addChild(load_bg);
                this.main = new Login();
            }
            Global.is_loadhall = false;
            var self = this;
            Laya.stage.addChild(this.main);
            addClick(this.main.login, function (e) {
                var loginReq = function (user, passwd, code, openid, token) {
                    // var ip = "http://h5test.yunfanshidai.com/h5mj/login_svr/login.php?plt=0&cmdid=201&username="+ ((user != null && user != "") ? user : ("test" + new Date().getTime())) +
                    // var ip = "http://login.ywjwj.com/test2/login_svr/login.php?plt=0&cmdid=201&username=" + ((user != null && user != "") ? user : ("test" + new Date().getTime())) +
                    var ip = "http://yftest.ywjwj.com/test2/login_svr/login.php?plt=0&cmdid=201&username=" + ((user != null && user != "") ? user : ("test" + new Date().getTime())) +
                        "&passwd=" + hex_md5(passwd) +
                        "&code=" + (code || "") +
                        "&qd=gftest" +
                        "&time=" + new Date().getTime() +
                        "&os=windows" +
                        "&game=cardsjddz";
                    console.log(ip);
                    return ip;
                };
                var socketConnect = function (res) {
                    if (res.userInfo) {
                        NetWork.getInstance().initNetWork(Global.UserData.getSessionData("ip"), Global.UserData.getSessionData("port"), function () {
                            sendToOnline(500, {
                                "id": Global.UserData.getSessionData("user_id"),
                                "time": Global.UserData.getSessionData("time"),
                                "session": Global.UserData.getSessionData("session"),
                                "nick": (res.userInfo.nickName != null) ? res.userInfo.nickName : ("test" + new Date().getTime()),
                                "headimgurl": res.userInfo.avatarUrl,
                                "sex": res.userInfo.gender,
                                "game": "cardsjddz",
                                "qd": 1,
                            });
                        });
                        var nickName = localStorage.getItem("nickName");
                        var headimgurl = localStorage.getItem("headimgurl");
                        var gender = localStorage.getItem("gender");
                        if (nickName == "" || headimgurl == "" || gender == "") {
                            localStorage.setItem("nickName", res.userInfo.nickName);
                            localStorage.setItem("headimgurl", res.userInfo.avatarUrl);
                            localStorage.setItem("gender", res.userInfo.gender);
                        }
                    }
                };
                if (false) {
                    //   Laya.URL.basePath = "https://shop.yunfanshidai.com/h5test/";
                    //   Laya.URL.basePath = "https://shop.yunfanshidai.com/sjddztest/";
                    wx.login({
                        success: function (info) {
                            console.log("info.code", info.code);
                            if (info.code) {
                                Global.GameCfg = new GameConfig;
                                // http("https://shop.yunfanshidai.com/xcxht/sjddzxcx/login.php?code=" + info.code + "&qd=1", function (json) {
                                http("https://shop.yunfanshidai.com/xcxht/sjddzxcx/login_test.php?code=" + info.code + "&qd=1", function (json) {
                                    if (json.status == "success") {
                                        Global.UserData.setSessionData(json.data);
                                        var nickName = localStorage.getItem("nickName");
                                        var headimgurl = localStorage.getItem("headimgurl");
                                        var gender = localStorage.getItem("gender");
                                        if (nickName && headimgurl && gender) {
                                            console.log("登陆成功,进入游戏");
                                            var json_temp = {
                                                "userInfo": {},
                                            };
                                            json_temp.userInfo = json.data;
                                            json_temp.userInfo["nickName"] = nickName;
                                            json_temp.userInfo["headimgurl"] = headimgurl;
                                            json_temp.userInfo["gender"] = gender;
                                            socketConnect(json_temp);
                                        }
                                        else {
                                            console.log("进入登陆界面");
                                            button = wx.createUserInfoButton({
                                                type: 'image',
                                                image: 'wxlocal/loginUI_startBtn.png',
                                                style: {
                                                    left: window.innerWidth / 2 - 75,
                                                    top: window.innerHeight - window.innerHeight / 6,
                                                    width: 150,
                                                    height: 50,
                                                    borderRadius: 4
                                                }
                                            });
                                            button.onTap(function (res) {
                                                button.destroy();
                                                //保存用户数据到游戏服务器
                                                socketConnect(res);
                                            });
                                        }
                                    }
                                });
                            }
                        },
                        fail: function () {
                        }
                    });
                    // var time = 3
                    // Global.Clock.addTimeFun("goldshare_gold",function(){
                    //     time = time - 1
                    //     if(time<0){
                    //         if(Global.is_loadhall == false ){
                    // socketConnect(res);
                    //             button = wx.createUserInfoButton({
                    //                 type: 'image',
                    //                 image: 'wxlocal/loginUI_startBtn.png',
                    //                 style: {
                    //                     left: window.innerWidth/2 - 75 ,
                    //                     top: window.innerHeight - window.innerHeight/6 ,
                    //                     width: 150,
                    //                     height: 50,
                    //                     borderRadius: 4
                    //                 }
                    //             })
                    //         }
                    //         Global.Clock.removeTimeFun("goldshare_gold");
                    //     }
                    // }, 0.5);
                    return;
                }
                else {
                    //  Laya.URL.basePath = "http://shop.yunfanshidai.com/sjddztest/";
                    http(loginReq(self.main.account.text == "" ? new Date().getTime() : self.main.account.text, "test", null, null, null), function (json) {
                        Global.GameCfg = new GameConfig;
                        Global.UserData.setSessionData(json);
                        NetWork.getInstance().initNetWork(json.zone_ip_0, json.websocket_port_0, function () {
                            sendToOnline(500, {
                                "id": Global.UserData.getSessionData("user_id"),
                                "time": Global.UserData.getSessionData("time"),
                                "session": Global.UserData.getSessionData("session"),
                                "nick": (Global.UserData.getSessionData("nick") != null) ? Global.UserData.getSessionData("nick") : ("test" + new Date().getTime()),
                                "headimgurl": Global.UserData.getSessionData("headimgurl"),
                                "game": "cardsjddz",
                            });
                        });
                    });
                }
            });
            if (this.data["tip"]) {
                showTip(this.data["tip"]);
            }
            playMusic("res/music/hall.mp3");
        };
        LoginScene.prototype.recvData = function (cmd, data) {
        };
        LoginScene.prototype.updateUI = function (key, data) {
        };
        return LoginScene;
    }());
    gameView.LoginScene = LoginScene;
})(gameView || (gameView = {}));
//# sourceMappingURL=LoginScene.js.map