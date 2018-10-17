var gameView;
(function (gameView) {
    var AutoScene = /** @class */ (function () {
        function AutoScene(arg) {
            if (arg === void 0) { arg = null; }
            var key = getPara("key");
            if (key && key != null) {
                var info = Base64.decode(decodeURIComponent(key));
                var data = {
                    "zone_ip_0": getPara("ip", info),
                    "websocket_port_0": getPara("port", info),
                    "user_id": Number(getPara("user_id", info)),
                    "time": getPara("time", info),
                    "session": getPara("session", info),
                    "nick": getPara("nick", info),
                    "headimgurl": getPara("headimgurl", info),
                    "gameId": getPara("gameId", info),
                    "uid": getPara("uid", info)
                };
                Global.UserData.setSessionData(data);
                if (getPara("roomid", info) != null) {
                    Global.CacheData["roomid"] = getPara("roomid", info);
                }
                NetWork.getInstance().initNetWork(data.zone_ip_0, data.websocket_port_0, function () {
                    sendToOnline(500, {
                        "id": Number(Global.UserData.getSessionData("user_id")),
                        "time": Global.UserData.getSessionData("time"),
                        "session": Global.UserData.getSessionData("session"),
                        "nick": (Global.UserData.getSessionData("nick") != null) ? Global.UserData.getSessionData("nick") : ("test" + new Date().getTime()),
                        "headimgurl": Global.UserData.getSessionData("headimgurl"),
                        "game": "yzmj",
                    });
                });
                this.initWx();
                var params = {
                    gameId: getPara("gameId", info),
                    share: {
                        success: function () {
                            showTip("分享成功了");
                        }
                    },
                    pay: {
                        success: function () {
                            showTip("支付成功了");
                        }
                    }
                };
                Global.YfSDK["config"](params); //初始化
            }
            else {
                runScene(gameView.LoginScene);
            }
        }
        AutoScene.prototype.recvData = function (cmd, data) {
        };
        AutoScene.prototype.updateUI = function (key, data) {
        };
        AutoScene.prototype.initWx = function () {
            http("http://h.yunfanshidai.com/wxjs/getSignPackage_api.php?url=" + Base64.encode("http://m.h.yunfanshidai.com/h5_platform/index.php?ac=play&id=196"), function (json) {
                console.log(json);
                wx.config({
                    debug: false,
                    appId: json.appId,
                    timestamp: json.timestamp,
                    nonceStr: json.nonceStr,
                    signature: json.signature,
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ',
                        "getLocation", "startRecord", "stopRecord", "playVoice", "uploadVoice", "downloadVoice",
                    ]
                });
                wx.ready(function (res) {
                    showTip("success" + res);
                });
                wx.error(function (res) {
                    showTip("error" + res);
                });
            });
        };
        return AutoScene;
    }());
    gameView.AutoScene = AutoScene;
})(gameView || (gameView = {}));
//# sourceMappingURL=AutoScene.js.map