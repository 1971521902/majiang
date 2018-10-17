module gameView{
    export class AutoScene implements BaseView{
        private main:Login;
        private data:Object;
        constructor(arg = null){
            var key = getPara("key");
            if(key && key != null){
                var info = Base64.decode(decodeURIComponent(key));
                  var data = {
                    "zone_ip_0":getPara("ip",info),
                    "websocket_port_0":getPara("port", info),
                    "user_id":Number(getPara("user_id",info)),
                    "time":getPara("time",info),
                    "session":getPara("session",info),
                    "nick":getPara("nick",info),
                    "headimgurl":getPara("headimgurl",info),
                    "gameId":getPara("gameId", info),
                    "uid":getPara("uid",info)
                  }
                  Global.UserData.setSessionData(data);
                  if(getPara("roomid",info) != null){ //点邀请进来的玩家
                      Global.CacheData["roomid"] = getPara("roomid",info);
                  }	
                  NetWork.getInstance().initNetWork(data.zone_ip_0, data.websocket_port_0, function(){
						 sendToOnline(500, {
							"id":Number(Global.UserData.getSessionData("user_id")),
							"time":Global.UserData.getSessionData("time"),  
							"session":Global.UserData.getSessionData("session"),
							"nick":(Global.UserData.getSessionData("nick") != null) ? Global.UserData.getSessionData("nick") : ("test" + new Date().getTime()) ,
                             "headimgurl":Global.UserData.getSessionData("headimgurl"),
							"game":"yzmj",
					     });
				 });
                 this.initWx();
                 var params = {
                     gameId: getPara("gameId", info), //游戏的ID
                     share: {
                        success: function () {/*分享好友成功回调*/
                            showTip("分享成功了")
                        }
                     },
                     pay: {
                        success: function () {/* 支付成功回调方法（仅针对于快捷支付方式有效）*/
                            showTip("支付成功了")
                        }
                    }
                 }
                 Global.YfSDK["config"](params); //初始化
            }else{
                runScene(gameView.LoginScene);
            }
        }

        public recvData(cmd, data):void{
        }

        public updateUI(key, data):void{
        }

        private initWx(){
            http("http://h.yunfanshidai.com/wxjs/getSignPackage_api.php?url=" + Base64.encode("http://m.h.yunfanshidai.com/h5_platform/index.php?ac=play&id=196"), function (json) {
                  console.log(json);
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: json.appId, // 必填，公众号的唯一标识
                        timestamp:json.timestamp , // 必填，生成签名的时间戳
                        nonceStr: json.nonceStr, // 必填，生成签名的随机串
                        signature: json.signature,// 必填，签名，见附录1
                        jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ',
                            "getLocation", "startRecord", "stopRecord", "playVoice", "uploadVoice", "downloadVoice",
                        ]
                    });
                    wx.ready(function(res){
                        showTip("success" + res);
                    });

                    wx.error(function(res){
                        showTip("error" + res);
                    });
             })
        }
    }
}