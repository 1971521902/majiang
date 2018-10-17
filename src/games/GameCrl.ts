module games{
    export class GameCtr{
        data:Object;
        game:any;
        loc:Object;

        constructor(data){
            var self = this;
            this.data = data;

        //     wx.getLocation({
        //         type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        //         success: function (res) {
        //             self.loc = {
        //                 y:res.longitude,
        //                 x:res.latitude,
        //             }        
        //             // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        //             // var longitude = res.longitude ; // 经度，浮点数，范围为180 ~ -180。
        //             // var speed = res.speed; // 速度，以米/每秒计
        //             // var accuracy = res.accuracy; // 位置精度
        //          }
        //    });

            if(this.data["tbl"]){
                Laya.stage.removeChildren();
                switch(this.data["tbl"].type){
                    case "cardnddz":
                        this.game = new games.ddz_sjGameScene(data);
                    case "cardsjddz" :
                        this.game = new games.ddz_sjGameScene(data);
                    break;
                }
            }else if(this.data == "cardsjddz"){
                this.game = new games.ddz_sjGameScene(data);
            }else{
                // 回放
                // if(this.data["replay"]){
                //     switch(this.data["type"]){
                //         case "yzmj":
                //         this.game = new games.YzmjReplayScene(data);
                //         break;
                //     }
                // }
            }
        }

        public recvData(cmd, data){
            console.log("this.game",this.game)
            if(this.game){
                this.game.recvData(cmd, data);
            }else{
                return
            }
        }

        public updateUI(key, data){
            this.game.updateUI(key, data);
        }

        public getLocation(){
            return this.loc;
        }
    }

export var STATE = {
ROOM_WAITING_START:1,
ROOM_WAITING_HUANPAI:2,
ROOM_WAITING_DINGQUE:3,
ROOM_END:4,
ROOM_WAITING_ENTER:5,
ROOM_WAITING_JIESUAN:6,
ROOM_WAITING_RESTART:7,
ROOM_WAITING_CLEAR:8,
ROOM_WAITING_EATOP:9,
ROOM_WAITING_PUTOP:10,
ROOM_WAITING_ZHUOMA:11,

ROOM_WAITING_JIAOFEN:20,
ROOM_WAITING_JIABEI:21,
ROOM_WAITING_HUANPAIPUKE:22,
}

export var USER_STATE = {
PLAYER_XUANPAI:1,
PLAYER_XUANPAI_END:2,
PLAYER_XUANQUE:3,
PLAYER_XUANQUE_END:4,
PLAYER_WAITING_PUT:0x10001,
PLAYER_WAITING_TINGPAIPUT:0x10002,
PLAYER_WAITING_PENG:0x10004,
PLAYER_WAITING_TINGPAI:0x10008,
PLAYER_WAITING_HUPAI:0x10010,
PLAYER_WAITING_PENGGAN:0x10011,
PLAYER_WAITING_GANG:0x10012,
PLAYER_WAITING_JGAN:0x10014,
PLAYER_WAITING_CHIPAI:0x10020,

}

export var EMOJ_ANI = [
["pillangry", 4],
["pillbang", 6],
["pillcool", 6],
["pillcry", 11],
["pillcube",4],
["pillembarrass", 2],
["pillfaint", 12],
["pillhoho",6],
["pilllove",2],
["pillmoney", 6],
["pillpitful",2],
["pillsad", 12],
["pillthief",7],
["pillwhat", 9],
["pillwhistle",6],
]
}