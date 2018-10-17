var ResourceVersion = laya.net.ResourceVersion;
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.init(720, 1280);
        //设置版本控制类型为使用文件名映射的方式
        ResourceVersion.type = ResourceVersion.FILENAME_VERSION;
        //加载版本信息文件
        // ResourceVersion.enable("https://shop.yunfanshidai.com/h5test/version.json", Handler.create(this, this.beginLoad));
        // ResourceVersion.enable("https://shop.yunfanshidai.com/sjddztest/version.json?time=" + new Date().getTime(), Handler.create(this, this.beginLoad));        
        ResourceVersion.enable("version.json", Handler.create(this, this.beginLoad));
        Laya.stage.alignV = "middle";
        Laya.stage.alignH = "center";
        Laya.stage.scaleMode = "exactfit";
        Laya.stage.screenMode = "vertical";
    }
    GameMain.prototype.beginLoad = function () {
        Laya.MiniAdpter.nativefiles = [
            "layaNativeDir",
            "wxlocal",
            "wxlocal/tips_bg.png",
            "wxlocal/login_bg.png",
            "wxlocal/icon.png",
            "wxlocal/pro.png",
            "res/atlas/wxlocal.atlas",
            "res/atlas/wxlocal.png",
        ];
        new yftools.Loading([
            "res/atlas/wxlocal.atlas",
            "wxlocal/pro.png",
            "wxlocal/login_bg.png",
        ], this.onLoaded, this, "wxlocal/login_bg.png");
    };
    GameMain.prototype.onLoaded = function () {
        // Global.GameCfg = new GameConfig;
        Global.UserData = new UserDataClass;
        Global.Clock = new ClockClass;
        Global.CacheData = {};
        Global.front_runnng = true;
        Global.protQueue = [];
        if (window["wx"]) {
            wx.onHide(function () {
                Global.front_runnng = false;
            });
            wx.onShow(function (data) {
                Global.front_runnng = true;
                console.log("重新进入游戏");
                //  重新进入游戏后  进入加载界面  
                // if(Global.is_loading){
                // Global.is_jiazai_quan = showjiazai();
                // }
                if (Global.protQueue.length > 0) {
                    // var getsye = wx["getSystemInfoSync"]()
                    // var system = getsye["system"].indexOf("iOS")
                    // if(system == 0){        // 安卓系统
                    //     Global.is_jiazai_quan = showjiazai();
                    // }
                    while (Global.protQueue.length > 0) {
                        var prot = Global.protQueue.splice(0, 1)[0];
                        console.log(Global.protQueue);
                        recvOnlineData(prot.cmd, msgpack.decode(new Uint8Array(prot.msg)));
                    }
                }
            });
            // wx.exitMiniProgram()=>{
            //     console.log("退出游戏")
            // };
        }
        // http("https://shop.yunfanshidai.com/sjddztest/ver/sjddzversion", (info)=>{                               //         外网测试服
        //     Laya.URL.basePath = "https://shop.yunfanshidai.com/" + info.testdir + "/" + info.ver + "/";          //       测试服 testdir
        //     //Laya.URL.basePath = "https://shop.yunfanshidai.com/18091201/sjddztest";  
        //     Global.tixian_url = "https://shop.yunfanshidai.com/xcxht/sjddzxcx/income_tixian_test_api.php"        // sjddztest    测试服
        //     Global.VERSION = info.ver                        // 版本号
        //     share_and_advertising()
        //     runScene(gameView.LoginScene);
        // });
        // http("https://shop.yunfanshidai.com/h5test/ver/sjddzversion", (info)=>{                             //        线上正式服
        //     Laya.URL.basePath = "https://shop.yunfanshidai.com/" + info.dir + "/" + info.ver + "/";         //       正式服 dir     
        //    //  Laya.URL.basePath = "https://shop.yunfanshidai.com/18091201/h5test"; 
        //     Global.tixian_url = "https://shop.yunfanshidai.com/xcxht/sjddzxcx/income_tixian_api.php"             //    正式服   提现
        //     Global.VERSION = info.ver                          // 版本号
        //     share_and_advertising()
        //     runScene(gameView.LoginScene);
        // });
        runScene(gameView.LoginScene);
        /*
        *@object参数{
        *@gameid  必传，小游戏在后台的id值
        *@dev 跳转小程序版本，1：正式，2：体验，3：开发 ， 默认为1
        *@x,y     可选，手动设置位置时x,y必传，否则默认右上角靠边位置
        *@left, right, top, bottom   可选，游戏如果做非全屏的适配处理时，传游戏边界位置
        *}
        *@function{  //手动关闭与显示
        *    showIcon(x,y); //x,y强制设置显示图标时的位置，可为空
        *    hideIcon;
        *}
        */
        Global.show_shenglihezi = new yftools.YFWindow({
            gameid: 17,
        });
        Global.show_shenglihezi["showIcon"]();
        // this.checkIsIPhoneX()
    };
    return GameMain;
}());
Laya.MiniAdpter.init();
new GameMain();
//# sourceMappingURL=GameMain.js.map