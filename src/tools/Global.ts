 module Global{
    export var GameCfg:GameConfig;
    export var UserData:UserDataClass;
    export var Clock:ClockClass;
    export var APP:gameView.BaseView;
    export var CacheData:Object;
    export var YfSDK:Object;
    export var VERSION:Number;
    export var tixian_url:any;
    export var sjwin_num:Number;
    export var show_shenglihezi:any;

    export var is_loading:any;
    export var is_jiazai_quan:any;
    export var front_runnng:boolean;
    export var protQueue:Array<any>;
    export var share_callback:any;         // 分享后 其他玩家点击链接  回调保存数据
    export var is_loadhall:boolean;

}

module gameView{
    export interface BaseView{
        recvData(cmd, data):void;
        updateUI(key, data):void;   
    }
}