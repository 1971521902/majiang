import Hallddz = ui.sjddz.hall_sjddzUI;
import Handler = laya.utils.Handler;
import Loader = laya.net.Loader;
import Box = Laya.Box;
import Btn = Laya.Button;
import Lab = Laya.Label;
import CheckBox= Laya.CheckBox;
module gameView{
    export class hall_sjddz implements BaseView{    
        private hallView:Hallddz;
        private createView:ui.sjddz.create_sjddzUI;
        private RankingList:ui.sjddz.envelopeUI;   // 排行榜窗口
        private shopping:ui.sjddz.shoppingUI;      // 换卡
        private roomID:string;   
        private items:Object;
        private hall_button:Array<any>;
        private envelope_button:Array<any>;
        private haveRoom:boolean; //
        private data:Object;
         /*  俱乐部  */
        constructor(data){
                this.data = data
                new yftools.Loading([
                 "res/atlas/ddz.atlas",
                 "res/atlas/text.atlas",
                 "res/atlas/setting.atlas",
                 "res/atlas/fileApplication.atlas",
                 "res/atlas/ddzsj_Result.atlas",
                 "res/atlas/poker.atlas",
                 "res/atlas/emoji.atlas",
                 "res/atlas/gold_ui.atlas",

                 "res/atlas/userinfo.atlas",//用户信息
                 "res/atlas/hall_ddz.atlas",
                 "res/atlas/ddz_sj.atlas",
                 "res/atlas/head.atlas",
                 "res/atlas/password.atlas",
                 "res/atlas/public.atlas",

                 "res/atlas/effect/hongbao.atlas",
                //  "hall_ddz/createRoom.png",
             ], this.onLoaded, this,"wxlocal/login_bg.png");

        }

        private onLoaded():void{
            //  showloading()       //  加载中暂时的
             if(this.haveRoom){
                 return;
             }
            //  var box = new Box();
            //  box.width = Laya.Browser.width
            //  box.height = Laya.Browser.height
            //  Laya.stage.addChild(box);
            //  box.addChild(this.hallView)


             this.hallView = new Hallddz();
             Laya.stage.addChild(this.hallView);

             addClick(this.hallView.createRoom,this.onclick, this);
             addClick(this.hallView.create_money,this.onclick, this);
             addClick(this.hallView.goldRoom,this.onclick, this);

             addClick(this.hallView.enterRoom, this.onclick, this);
             addClick(this.hallView.closeBtn, this.onclick, this);

             addClick(this.hallView.envelope, this.onclick, this);            // 竖版 排行榜
             addClick(this.hallView.resurrection, this.onclick, this);        // 竖版 复活卡
             addClick(this.hallView.ranking, this.onclick, this);             // 竖版 奖品
             addClick(this.hallView.setting_sjddz, this.onclick, this);       // 竖版 设置
             addClick(this.hallView.notice, this.onclick, this);              // 竖版 公告
             addClick(this.hallView.emil, this.onclick, this);                // 竖版 邮件
             addClick(this.hallView.Daily, this.onclick, this);               // 每日福利
             addClick(this.hallView.zhuan_card, this.onclick, this);          // 赚取复活卡
             addClick(this.hallView.treasure, this.onclick, this);            // 百宝箱
             addClick(this.hallView.Advertising, this.onclick, this);         // 看广告

             this.hallView.treasure.visible = false

             this.roomID = "";
             this.items = {};
             playMusic("res/music/hall.mp3");
             if(Global.CacheData["roomid"]){
                sendToOnline(protocol.user_enter_room, Global.CacheData["roomid"]);
                Global.CacheData["roomid"] = null;
             }
            if(seekByName(this.hallView, "sjc_jushu") && this.data && typeof(this.data["shangjing"].win_num) == "number" ){
                seekByName(this.hallView, "sjc_jushu").visible = true
                seekByName(this.hallView, "sjc_jushu").text = "进度:"+ this.data["shangjing"].win_num + "/7" 
            }else{
                if( typeof(Global.sjwin_num) == "number"){
                    seekByName(this.hallView, "sjc_jushu").text = "进度:"+ Global.sjwin_num + "/7" 
                }else{
                    seekByName(this.hallView, "sjc_jushu").visible = false
                }
            }

            var text = seekByName(this.hallView, "Text_1")
            text.visible = true
            text.fontSize = 30
            text.color = "#ffffff"; 
            if(false){

            }else{
                text.text = "请大家文明娱乐，远离赌博！祝您游戏愉快!"
            }
            var wid = text.width
            var tim = parseInt(wid + seekByName(this.hallView, "Panel_1").width) * 20   //  / 100 

            var looptemp = function (){
                text.x = 700
                Laya.Tween.to(text,{x : -wid -100}, tim, null, Handler.create(this,function(obj){
                    looptemp()
                }, [text]),0);
            }
            looptemp()
            //  新用户   领新手红包
            if(this.data  && this.data["new_player"] == 0){
                var qian = Number(this.data["new_player_money"].toFixed(2))
                this.packet(qian)
            }
            
            //  关闭广告
            if(window["bannerAd"]){
                window["bannerAd"].hide()
            }
            Global.is_loadhall = true
            


        }
        


        private getFitGame(yxb,data){        //  初级场      中级场       高级场
            for(var k in data){
                if (data[k].stop && (yxb >= data[k].start && yxb < data[k].stop)) { 
                    return k
                }else if (!data[k].stop && yxb >= data[k].start ){
                    return k
                }
            }
            return 1
        }

        private gold_session (data){
            var self = this
            var goldtype = new ui.sjddz.gold_typeUI();
            Laya.stage.addChild(goldtype);
            // goldtype.nameText.text = Global.UserData.getUserData("name");
            // goldtype.idText.text = Global.UserData.getUserData("id");
            goldtype.cardValue.text = Global.UserData.getUserData("shangjing").relive_card_num // Global.UserData.getUserData("room_card");
            goldtype.goldValue.text = Global.UserData.getUserData("yxb");
            //设置头像
            var str = Global.UserData.getUserData("head") || ("head/" + Global.UserData.getUserData("tid") + ".png");
            goldtype.headImg.skin = str;

            var i=1
            for(var k in data){
                var session = seekByName(goldtype,"session"+i)
                seekByName(session,"start").text = data[k].start + "~" + (data[k].stop || "以上" ) + "金币" 
                seekByName(session,"award").text = data[k].num +"局奖励数"+ data[k].award +"红包"  
                seekByName(session,"people").text = data[k].online_num
                seekByName(session,"line").text = data[k].base                 //  底分
                i++
            }

            addClick(seekByName(goldtype,"addCard"), function(e){
                showTip("即将开放")
            })
            addClick(seekByName(goldtype,"addGold"), function(e){
                showTip("即将开放")
            })
            addClick(goldtype.closeBtn, function(e){
                goldtype.removeSelf();
            })
            addClick(goldtype.session1, function(e){
                sendToOnline(protocol.user_jbc_join_game, { type: 7, game : "cardsjddz" });
            })
            addClick(goldtype.session2, function(e){
                sendToOnline(protocol.user_jbc_join_game, { type: 8, game : "cardsjddz" });
            })
            addClick(goldtype.session3, function(e){
                sendToOnline(protocol.user_jbc_join_game, { type: 9, game : "cardsjddz" });
            })
            addClick(goldtype.Button_start, function(e){
                var yxb = Global.UserData.getUserData("yxb");
                var gameType = self.getFitGame(yxb,data)
                if(gameType == 1){
                    showTip("金币不足")
                    sendToOnline(protocol.user_sjddz_yaoqing);
                    // sendToOnline(protocol.user_gold_compensate)            //  金币不足发送2005
                    return
                }
                sendToOnline(protocol.user_jbc_join_game, { type: Number(gameType), game : "cardsjddz" });
            })
        }
        private onclick(e):void{
            var name:string = e.currentTarget.name;
            if(name == "createRoom"){          // 正常开房
                showTip("即将开放")
                // sendToOnline(protocol.user_reenter_room, 1);
            }else if(name == "enterRoom"){
                sendToOnline(protocol.user_reenter_room, 2);
            }else if(name == "goldRoom"){        // 金币场
                sendToOnline(protocol.user_hudong_gold_server);
            }else if(name == "create_money"){     //   赏金场
                // showTip("即将开放")
                sendToOnline(protocol.user_join_money,{ type: 1, game : "cardsjddz"} );
            }else if(name == "envelope"){
                // sendToOnline(protocol.user_match_rank_list);
                sendToOnline(protocol.user_sjddz_paihangbang);
            }else if(name == "resurrection"){           // 获取复活卡
                // showTip("暂未开放")
                //  this.resurrection()
                sendToOnline(protocol.user_sjddz_haunjingbi );
            }else if(name == "ranking"){
                // showTip("暂未开放")
                sendToOnline(protocol.user_get_ranking);
            }else if(name == "setting_sjddz"){
                this.setting_sjddz()
            }else if(name == "notice"){
                this.notice()
            }else if(name == "Daily"){           // 每日分享
                sendToOnline(protocol.user_sjddz_yaoqing );
                
                // runScene(gameView.hall_sjddz,null,"loading");
                // sendToOnline(protocol.user_join_money,{ type: 1, game : "cardsjddz"} );
            }else if(name == "zhuan_card"){      // 邀请新手复活卡   4004
                sendToOnline(protocol.user_sjddz_share_new_fuhuoka);
            }else if(name == "treasure"){
                showTip("即将开放")
            }else if(name == "Advertising"){        // 看广告
                if(window["videoAd"]){
                    window["videoAd"].load()
                    .then(() => window["videoAd"].show())
                    .catch(err => console.log(err.errMsg))
                }
                // showTip("即将开放")
                // sendToOnline(protocol.user_get_resurrection,1);    // 1161
            }else if(name == "emil"){
                showTip("即将开放")
            }else if(name == "closeBtn"){
            
            }
        }
        private notice(){            // 公告
            var notice = new ui.sjddz.noticeUI();
            Laya.stage.addChild(notice);
            addClick(notice.closeBtn, function(e){
                notice.removeSelf();
            })

        }
        private setting_sjddz(){      // 设置
            // var setting = new ui.sjddz.setting_sjddzUI();
            var setting = new ui.sjddz.user_messageUI();
            Laya.stage.addChild(setting);
            addClick(setting.closeBtn, function(e){
                setting.removeSelf();
            })
            seekByName(setting,"headImg").skin = Global.UserData.getUserData("head") || ("head/" + Global.UserData.getUserData("tid") + ".png");
            seekByName(setting,"user_name").text = Global.UserData.getUserData("name")
            seekByName(setting,"user_id").text = Global.UserData.getUserData("id")
            setting.goldValue.text = Global.UserData.getUserData("yxb");
            setting.cardValue.text = Global.UserData.getUserData("shangjing").relive_card_num   //  this.data["shangjing"].relive_card_num
            setting.moneyValue.text =  Global.UserData.getUserData("shangjing").remain_money.toFixed(2)  || 0 //   this.data["shangjing"].remain_money

            seekByName(setting,"version_text").text = "V" + Global.UserData.getUserData("version")

            var  music1 = true
            var  music2 = true
            addClick(seekByName(setting,"music1"), function(e){
                if(music1){
                    Laya.SoundManager.stopAll()
                    seekByName(setting,"music1").skin = "setting/buxuan.png"
                }else{
                    seekByName(setting,"music1").skin = "setting/xuanze.png"
                    playMusic("res/music/hall.mp3");
                }
                music1 = ! music1
            })
            addClick(seekByName(setting,"music2"), function(e){
                if(music2){
                    seekByName(setting,"music2").skin = "setting/buxuan.png"
                    Laya.SoundManager.stopAll()
                }else{
                    seekByName(setting,"music2").skin = "setting/xuanze.png"
                    playMusic("res/music/hall.mp3");
                }
                music2 = ! music2
            })
        }
        public HSlider(skin:String = null){
            console.log(132456)
        }
        private ranking(data){            // 奖品
            var self = this
            var rank = new ui.sjddz.rankingUI();
            Laya.stage.addChild(rank);
            addClick(rank.closeBtn, function(e){
                rank.removeSelf();
            })

            var zhuangtai1 = seekByName(rank,"zhuangtai1")
            var zhuangtai2 = seekByName(rank,"zhuangtai2")
            if(data){
                seekByName(zhuangtai1,"all_money").text = data.all_money && data.all_money.toFixed(2) || 0
                seekByName(zhuangtai1,"balance").text = data.remain_money   && ("余额(元):" + data.remain_money.toFixed(2)) || 0
            }

            var history = []
            if(data["list"] && data["list"].length >0 ){
                seekByName(zhuangtai1,"diandiandian").visible = false
                for (var i:number = 0; i < data["list"].length; i++) {
                    history.push(data["list"][i]);
                }
                var history_jilu = seekByName(zhuangtai1,"history_jilu")
                // history_jilu.itemRender = Box;
                history_jilu.array = history;
                history_jilu.repeatX= 1;
                history_jilu.spaceY= 20
                history_jilu.vScrollBarSkin='';
                history_jilu.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
                history_jilu.scrollBar.elasticDistance = 50;//设置橡皮筋极限距离。
                history_jilu.renderHandler = new Handler(this,(cell:Box,index:number):void=>{
                    if(index > history.length)return;
                    let content:any = history[index];
                    if(content){
                        seekByName(cell,"user_time").text = showtimes(history[index].time)
                        var qian = history[index].money
                        seekByName(cell,"user_money").text = qian || 0
                        if(index<=2){
                            cell = history[index];
                        }else{
                            cell = history[index];
                        }
                    }
                })
            }else{
                seekByName(zhuangtai1,"diandiandian").visible = true
                seekByName(zhuangtai1,"history_jilu").visible = false
            }

            addClick(rank.withdraw, function(e){
                // showTip("即将开放")
                zhuangtai2.visible = true
                zhuangtai1.visible = false
                if(data){
                    seekByName(zhuangtai2,"tixian").text = Number(rank.tixian)&& Number(rank.tixian) || 0
                    seekByName(zhuangtai2,"money_yue").text = data.remain_money && ("余额：" + data.remain_money.toFixed(2)) || 0
                }
                 addClick(seekByName(zhuangtai2,"money"), function(e){
                    if(rank.tixian.text == ""){
                        showTip("请输入提现的金额");
                        return
                    }
                    if(rank.tixian.text && Number(rank.tixian.text) < 5){
                        showTip("提现金额不能低于5块钱")
                        return
                    }else if(rank.tixian.text && Number(rank.tixian.text) > 300){
                        showTip("提现金额不能高于300")
                        return
                    }else if (Global.UserData["session"]["openid"]) {
                    // var url = "https://shop.yunfanshidai.com/xcxht/sjddzxcx/income_tixian_api.php";                  //    正式服   提现
                    // var url = "https://shop.yunfanshidai.com/xcxht/sjddzxcx/income_tixian_test_api.php";            // sjddztest    测试服
                      var post = {
                        openid: Global.UserData["session"]["openid"],
                        userid: Global.UserData.getSessionData("user_id"),
                        amount: Number(rank.tixian.text),
                      }
                      console.log(post)
                      httpPost(Global.tixian_url, post, function (data) {
                            if(data == ""){
                                showTip("请输入正确的金额");
                                return
                            }
                            var result = JSON.parse(data);
                                console.log(data);
                            if (result.status == "fail" && typeof (result.msg) == "string" ) {
                                showTip(result.msg)
                            }else if(result.status == "success" && typeof (result.msg) == "string"){
                                showTip(result.msg)
                                rank.removeSelf();
                            }
                      },this);
                    }else{
                        showTip("即将开放")
                    }
                })
                addClick(seekByName(zhuangtai2,"closeBtn"), function(e){
                    zhuangtai1.visible = true
                    zhuangtai2.visible = false
                })

            })
        }

        // private resurrection(){      // 复活卡
        //     var resurrec = new ui.sjddz.resurrectionUI();
        //     Laya.stage.addChild(resurrec);
        //     addClick(resurrec.closeBtn, function(e){
        //         resurrec.removeSelf();
        //     })
        //     addClick(resurrec.share, function(e){
        //         // Global.create_share = "小伙伴们帮帮忙，小手一点助我通关领红包！"
        //         sendToOnline(protocol.user_get_resurrection,1);
        //         if(Global.UserData["session"]["openid"]){
        //             if(window["shareBTN"]){
                        //     window["shareBTN"]()
                        // }
        //         }else{
        //             showTip("不在微信中不能分享")
        //         }
        //         resurrec.removeSelf();
        //     })
            
        // }
         private Dailyshare_activity(data ){      // 分享新用户送复活卡
            var Dailyshare = new ui.sjddz.DailyshareUI();
            Laya.stage.addChild(Dailyshare);
            addClick(Dailyshare.closeBtn, function(e){
                Dailyshare.removeSelf();
            })

            for(var i=0;i<data["cfg"].length;i++){
                var hongbao = seekByName(Dailyshare,"hongbao_bg"+(i+1) )
                if(data["cfg"][i].type == 1){            // 金币
                    seekByName(hongbao,"cfg_num").text = data["cfg"][i].num
                    seekByName(hongbao,"cfg_num").visible = true
                }else if(data["cfg"][i].type == 2){      // 复活卡
                    seekByName(hongbao,"hongbao").skin = "ddz/share_hongbao2.png"
                    seekByName(hongbao,"gold_bg").visible = false
                    seekByName(hongbao,"cfg_num").text = "×"+ data["cfg"][i].num
                    seekByName(hongbao,"cfg_num").visible = true
                    seekByName(hongbao,"cfg_num").color = "#000000"
                }
            }
            for(var j=0;j<data["list"].length;j++){
                var hong = seekByName(Dailyshare,"hongbao_bg"+(j+1) )
                var ran =Math.floor( Math.random()*11 +1)
                // cur_index = 1  --当前已领取index 
                // all_index = 1  --总共可领取index
                    seekByName(hong,"icon").skin =  data["list"][j].head  || "head/"+ ran +".png";
                    seekByName(hong,"icon").visible = true
                    seekByName(hong,"nick").text = getByteLen(data["list"][j].nick,8)     
                    seekByName(hong,"nick").visible = true
                    seekByName(hong,"lignqu_" + (j+1) ).visible = false
                    seekByName(hong,"gold_bg").visible = false
                    if(data["cfg"][j].type == 1 ){
                        seekByName(hong,"hongbao").skin = "ddz/share_hongbao3.png"
                    }else{
                        seekByName(hong,"hongbao").skin = "ddz/share_hongbao1.png"
                    }
                    if( (j+1) <= data["cur_index"] ){
                        seekByName(hong,"accomplish").visible = true
                    }else{
                        seekByName(hong,"accomplish").visible = false
                    }
            }
            for (var k =1;k<=5;k++){
                var hongbao_bg = seekByName(Dailyshare,"hongbao_bg"+k)
                addClick(seekByName(hongbao_bg,"lignqu_" +k), function(e){       //  分享给好友后要红包
                    if(window["shareBTN"]){
                        window["shareBTN"]({userid: Global.UserData.getUserData("id"),key: "fuli" });
                    }
                })
            }
            var all_temp = data["all_index"]
            var cur_temp = data["cur_index"]
            if(all_temp == cur_temp ){
              seekByName(Dailyshare, "all_lingqu").disabled = true;
            }
            addClick(Dailyshare.all_lingqu, function(e){
                if (all_temp == 0){
                    showTip("没有领取的奖励");
                }else if(cur_temp == all_temp){
                    showTip("已经领取")
                }else{
                    showTip("一键领取")
                    cur_temp = cur_temp
                    sendToOnline(protocol.user_sjddz_yijian_lingqu,{  cur_index:data["cur_index"], all_index:data["all_index"]  });
                    seekByName(Dailyshare, "all_lingqu").disabled = true;
                }
                for(var l=0;l<data["list"].length;l++){
                    var hong = seekByName(Dailyshare,"hongbao_bg"+(l+1) )
                    // seekByName(hong,"accomplish").visible = true
                }
            })

        }

        private zhuan_card_activity(data = null){      // 分享新用户送复活卡
            var Earn_cardU = new ui.sjddz.Earn_cardUI();
            Laya.stage.addChild(Earn_cardU);
            addClick(Earn_cardU.closeBtn, function(e){
                Earn_cardU.removeSelf();
            })

            addClick(Earn_cardU.share, function(e){
                // sendToOnline(protocol.user_get_resurrection,1);
                Earn_cardU.removeSelf();
            })

            var cfg = {
                1 : 1 ,
                2 : 2 ,
                3 : 4 ,
                4 : 8 ,
            }
            var cfg_people = {
                1 : "2" ,
                2 : "6" ,
                3 : "15" ,
                4 : "40" ,
            }
            var cfg_fuhuoka = {
                1 : 2 ,
                2 : 8 ,
                3 : 20 ,
                4 : 50 ,
            }
            var temp_num = 0
            for(var key in cfg_people){
                if(data.invite_num > Number(cfg_people[key])){
                    temp_num = Number(key)
                }
            }

            for (var k =1;k<=4;k++){
                var hongbao_bg = seekByName(Earn_cardU,"invite_imgbg"+k)
                var invit_text_bg1 = seekByName(hongbao_bg,"invitation"+k)
                invit_text_bg1.text= Number(data.invite_num)
                if( data.relive_card_flag & Number(cfg[k]) ){
                    seekByName(hongbao_bg,"qiangwang"+k).visible = false
                    seekByName(hongbao_bg,"receive").visible = true
                }
                if(temp_num > k){
                    seekByName(hongbao_bg,"qiangwang"+k).skin = "ddz/share_ling.png"
                }
                addClick(seekByName(hongbao_bg,"qiangwang"+k), function(e){       //  分享给好友后要红包
                    var slice = e.target.name.slice(-1)
                    if(e.target.skin == "ddz/share_ling.png" ){
                        sendToOnline(protocol.user_sjddz_share_new_lingqu,cfg_fuhuoka[Number(slice)]);
                        var receive = seekByName(seekByName(Earn_cardU, "invite_imgbg" + Number(slice)), "receive")
                        receive.visible = true
                    }else{
                        if(window["shareBTN"]){
                            window["shareBTN"]({userid: Global.UserData.getUserData("id"),key: "new_player" });
                        }
                    }
                    


                })
            }

        }

        private share_gold(data=null){                     // 破产
            let share_gold = new ui.sjddz.share_goldUI();
            addClick(share_gold.share, function(){
                sendToOnline(protocol.user_gold_compensate_get)
                if(window["shareBTN"]){
                    window["shareBTN"]()
                }
            })

            addClick(share_gold.closeBtn, function(){
                share_gold.removeSelf();
            })
            Laya.stage.addChild(share_gold);
            share_gold.zOrder = 9999
        }


        private conversion(data){      // 复活卡兑换金币
            var self  = this
            this.shopping = new ui.sjddz.shoppingUI();
            Laya.stage.addChild(this.shopping);
            addClick(this.shopping.closeBtn, function(e){
                self.shopping.removeSelf();
            })
            seekByName(this.shopping,"cardValue").text  = Global.UserData.getUserData("shangjing").relive_card_num // Global.UserData.getUserData("room_card");
            seekByName(this.shopping,"goldValue").text = Global.UserData.getUserData("yxb");
            //设置头像
            var str = Global.UserData.getUserData("head") || ("head/" + Global.UserData.getUserData("tid") + ".png");
            this.shopping.headImg.skin = str;

            addClick(seekByName(this.shopping,"addCard"), function(e){
                showTip("即将开放")
            })
            addClick(seekByName(this.shopping,"addGold"), function(e){
                showTip("即将开放")
            })
            
            var arr = []
            var brr = []
            for(var key in data){
                arr.push(key)
                brr.push(data[key])
            }
            var shoplist = seekByName(this.shopping,"shoplist")

            shoplist.array = arr;
            shoplist.repeatY= arr.length;
            shoplist.vScrollBarSkin='';
            shoplist.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
            shoplist.scrollBar.elasticDistance = 50;//设置橡皮筋极限距离。
            shoplist.renderHandler = new Handler(this,(cell:Box,index:number):void=>{
                console.log("进入")
                if(index > data[arr[index]].length)return;
                let content:any = data[arr[index]];
                var butt_ = seekByName(cell, "shopping_btn")
                if (butt_){
                    butt_.name = "" + content
                    var that = this
                    addClick(butt_, function(e){
                          sendToOnline(protocol.user_sjddz_duihuanfangka,Number(arr[index]) ); 
                          console.log("换卡",Number(arr[index]))                     
                    });
                }
                if(content){
                    seekByName(cell,"jinbi_text").text = brr[index]
                    seekByName(cell,"fuhuoka").text = arr[index]
                    seekByName(cell,"gold_img").skin = "ddz/" + (index+1) + ".png"
                }

            })
            
        }

        private drawTextu(){        // 排行榜
            console.log("排行榜");
          var sprite = new Laya.Sprite();
          sprite.pos(0, 0);
          sprite.size(Laya.stage.width, Laya.stage.height);
          let callback = () => {
            var texture = new Laya.Texture(sharedCanvas);
            sprite.graphics.drawTexture(texture, 0, 0, Laya.stage.width, Laya.stage.height);
          }
          sprite.timer.frameLoop(10, this, callback);
          Laya.stage.addChild(sprite);
          // if (!wx) return;
          if(wx["postMessage"]){
            wx["postMessage"]({type: 2,  style: { left: 45, top: 300 } })
          }
          return sprite
        }
        
        private phb_envelope(data){                 // 排行榜
            var self = this
            var is_temp = true
            var sprite
            var button_who = 2           // 默认第二个世界榜
            var envelope = new ui.sjddz.envelopeUI();
            Laya.stage.addChild(envelope);
            addClick(envelope.closeBtn, function(e){
                if(sprite){
                    Laya.stage.removeChild(sprite);
                }
                envelope.removeSelf();
            })
            addClick(envelope.flock, function(e){
                if(window["shareBTN"]){
                    window["shareBTN"]()
                }
            })
           
            var smoney = data["money"]
            smoney.sort(function(l,r){
                if(l.all_money < r.all_money){
                  return 1
                }else{
                  return -1
                }
            })
            addClick(envelope.shagnjin_p, function(e){
                smoney = data["money"]
                smoney.sort(function(l,r){
                    if (l.all_money < r.all_money) {
                        return 1
                    } else {
                        return -1
                    }
                })
                is_temp = true
                self.paihangbang(envelope,smoney,is_temp)
                seekByName(envelope,"envelope_bg").skin = "ddz/envelope_bg2.png"
                if(button_who == 1){
                    sprite = self.drawTextu()
                    seekByName(envelope,"RankingList").visible = false
                    seekByName(envelope,"zanweikaifang").visible = false
                }
            })
            addClick(envelope.jinbi_p, function(e){
                smoney = data["yxb"]
                smoney.sort(function(l,r){
                    if (l.yxb < r.yxb) {
                        return 1
                    } else {
                        return -1
                    }
                })
                is_temp = false
                self.paihangbang(envelope,smoney,is_temp)
                seekByName(envelope,"envelope_bg").skin = "ddz/envelope_bg1.png"
                if(sprite){
                    Laya.stage.removeChild(sprite);
                }
            })
            self.paihangbang(envelope,smoney,is_temp)
            var play = seekByName(envelope,"button_2")
            seekByName(play,"xiahua").visible = true
            
            for (var k =1;k<=3;k++){
                addClick(seekByName(envelope,"button_"+k), function(e){       //  好友场 世界场  // 群友场
                    // 清空
                    button_who = e.target.name.slice(-1)
                    if(sprite){
                        Laya.stage.removeChild(sprite);
                    }
                    seekByName(envelope, "zanweikaifang").text = "暂未开放";
                    seekByName(envelope, "user_bg_tu").visible = true
                    for(var key = 1;key<=3;key++){
                        var temp = seekByName(envelope,"button_"+key)
                        // var str2 = e.target.name.slice(e.target.name.length-1)
                        if(e.target.name == "button_"+key){
                            seekByName(temp,"xiahua").visible = true
                        }else{
                            seekByName(temp,"xiahua").visible = false
                        }
                    }
                    //  重新渲染
                    if (is_temp){
                        if(e.target.name == "button_3" ){
                          seekByName(envelope, "RankingList").visible = false;
                          seekByName(envelope, "zanweikaifang").visible = true;
                        }else if(e.target.name == "button_1" ){           //   开放域里获取的  好友场排行榜
                            sprite = self.drawTextu()
                            seekByName(envelope,"RankingList").visible = false
                            seekByName(envelope,"zanweikaifang").visible = true
                            seekByName(envelope, "zanweikaifang").text = "请稍等...";
                            seekByName(envelope, "user_bg_tu").visible = false
                            
                        }
                        else {
                            seekByName(envelope, "RankingList").visible = true;
                            seekByName(envelope, "zanweikaifang").visible = false;
                        }
                    }else{
                        if(e.target.name != "button_2" ){
                            seekByName(envelope,"RankingList").visible = false
                            seekByName(envelope,"zanweikaifang").visible = true
                        }else{
                            seekByName(envelope,"RankingList").visible = true
                            seekByName(envelope,"zanweikaifang").visible = false
                        }
                    }
                    
                })
            }


        }
        private paihangbang (envelope,smoney,is_temp){
            var shangbang = 0
            var RankingList = seekByName(envelope,"RankingList")
            RankingList.vScrollBarSkin = "";
            this.envelope_button = []
            for (var i:number = 0; i < smoney.length; i++) {
                this.envelope_button.push(smoney[i]);
                if(Number(smoney[i].userid) ==  Number(Global.UserData.getUserData("id")) ){
                console.log(Global.UserData.getUserData("id"))
                    shangbang = i+1
                }
            }
            //将this.arr数据赋值到列表数据源。
            RankingList.array = this.envelope_button;
            RankingList.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
            RankingList.scrollBar.elasticDistance = 50;//设置橡皮筋极限距离。
            //list渲染:单元格渲染处理器(默认返回参数cell:Box,index:int)。
            RankingList.renderHandler = new Handler(this,(cell:Box,index:number):void=>{
                if(index > smoney.length)return;
                var data_any:any=this.envelope_button[index];
                var num = index+1
                if(data_any){
                    seekByName(envelope,"player_name").text = getByteLen(Global.UserData.getUserData("name"),10 )
                    seekByName(envelope,"player_money").text = shangbang && "排名:"+ shangbang ||  "未上榜"
                    seekByName(cell,"user_name").text = data_any.nick
                    var ran =Math.floor( Math.random()*11 +1)
                    seekByName(cell, "user_img").skin = data_any.head || "head/" + ran + ".png";
                    
                    if(is_temp){
                        seekByName(cell,"user_content").text = data_any.all_money
                    }else{
                        seekByName(cell,"user_content").text = data_any.yxb
                    }
                    if(index <3){
                        seekByName(cell,"user_icon").visible = true
                        seekByName(cell,"user_icon").skin = "ddz_sj/jiangpai"+ num + ".png"
                        seekByName(cell,"user_icon_clip").visible = false
                        
                    }else{
                        seekByName(cell,"user_icon").visible = false
                        seekByName(cell,"user_icon_clip").visible = true
                        seekByName(cell,"user_icon_clip").value = num
                    }
                }
            })
        }

        private showEnter():void{
            var enter = new ui.sjddz.password_sjddzUI();
            var self = this;
            
            Laya.stage.addChild(enter);

            addClick(enter.closeBtn, function(e){
                self.roomID = "";
                enter.removeSelf();
            })

            for(var i = 0; i <= 9; i++){
                enter["btn" + i].tag = i
                addClick(enter["btn"+i], function(e){
                    if(self.roomID.length < 6){
                       self.roomID = self.roomID + e.target.tag;
                       enter["num" + self.roomID.length].text = e.target.tag + "";
                       if(self.roomID.length == 6){
                            sendToOnline(protocol.user_enter_room, Number(self.roomID));
                       }
                    }
                })
            }
            addClick(enter.btnClear, function(e){
                self.roomID = ""
                for(var i = 1; i <= 6; i++){
                    enter["num" + i].text = "";
                }
            });
            addClick(enter.btnDel, function(e){
                if(self.roomID.length > 0){
                    enter["num" +self.roomID.length].text = "";
                    self.roomID = self.roomID.substring(0,self.roomID.length -1);
                }
            });
        }
        private isOpen(game_type,idx){
			var self = this 
			var gameType ={
				"yzmj":{[0]:true, [1]:true },
				"cardniuniu":{[0]:true, [1]:true},
                "cardsjddz":{[0]:true, [1]:true},
                "cardnddz":{[0]:true, [1]:true},
                "bqmj":{[0]:true, [1]:true}
			}
			var tempgame = gameType[game_type] && (gameType[game_type][idx] && gameType[game_type][idx] || false) || false
            
			return tempgame
		}
        private showCreate(num =null):void{
            this.createView = new ui.sjddz.create_sjddzUI();
            var self = this;

            var layer = this.createView;
            layer.zOrder = 1002;
            
            Laya.stage.addChild(layer);
            this.roomPanel(0);

             var callback = function(e){
                if(e.target.name == "createBtn"){

                    var pass = {}
                    for(var k in self.items){
                        var all = self.items[k];
                        for(var cur in all){
                            if(all[cur].selected){
                                pass[k] = Number(Global.GameCfg.getConfigById("room_sjddz",all[cur].tag).num);
                            }
                        }
                    }
                    
                    // if( !self.isOpen(pass["type"],0) ){
                    //     showTip("即将开放")
                    //     return
                    // }
                    pass["player_num"] = 3
                    _log(pass);
                    pass["type"] =  "cardsjddz";
                    sendToOnline(protocol.user_create_room, pass);
                }else if(e.target.name == "closeBtn"){
                    layer.close();
                }
            }
            addClick(layer.closeBtn, callback);
            addClick(layer.createBtn, callback);
        }
        private roomPanel(idx):void{
            var cfg = Global.GameCfg.getCfg("room_sjddz")["GAMETYPE" + idx];
            this.items = {};

            var self = this;
            // var panel = this.createView.optPanel;
            // panel.removeChildren();
            var list = this.createView.container;   // list列表
            var data:Array<any> = [];

            var gameCfg = Global.GameCfg.getCfg("room_sjddz")["GAMETYPE" + idx ]
            var itemCallback = function(e){
                var obj = e.target;
                var config = Global.GameCfg.getConfigById("room_sjddz", parseInt(String(obj.tag / 10)));
                var temp_num = parseInt(String(obj.tag / 100))
                var configa = Global.GameCfg.getConfigById(gameCfg, "ITEM" + temp_num );
           
                for(var idx in self.items[config.value]){
                    var it = self.items[config.value][idx];
                    if(!config.multi_check){
                        if(obj == it){  
                             it.selected = true;
                        }else{
                            it.selected = false;
                        }
                    }
                }
            }

            for(var i = 0; i < cfg.len;i++){
                var option = new Box();
                option.size(200, 50);
                option.y = i * 100;
                var optCfg = cfg["ITEM" + i];  //玩法大项的配置
                var x = 70;
                if(optCfg.desc != ""){
                    var lab = new Lab(optCfg.desc + ":");
                    lab.color = "#9b6535";  //9b6535
                    lab.fontSize = 28;
                    lab.centerY = 0.5;
                    lab.x = x;
                    lab.anchorX = 1;
                    option.addChild(lab);
                }
                if(typeof(optCfg) == "object"){
                    data.push(option);
                }   
                for(var j = 0; j < optCfg.len; j++){
                    var itemCfg = optCfg["OPTION" + j];      //玩法小选项的配置 
                    var cb = new CheckBox("public/check_box.png", itemCfg.Name);
                    cb.tag = Number(itemCfg.ID);
                    cb.stateNum = 3;
                    cb.labelSize = 28;
                    cb.labelColors = "#9b6535,#9b6535,#9b6535";
                    cb.x = x + 20 ;
                    cb.anchorY = 0.5;
                    cb.y = option.height / 2 + 2;
                    cb.labelPadding = "10";
                    option.addChild(cb);
                    x = x + cb.width + 30;

                    addClick(cb, itemCallback);

                    if((j == 0 && optCfg.desc != "" && !optCfg.multi_check) || itemCfg.default){
                        cb.selected = true;
                    }
                    if(optCfg.value != null){ //配置项目需要选择时保存起来
                        if(this.items[optCfg.value] == null){
                            this.items[optCfg.value] = []
                        }
                        this.items[optCfg.value].push(cb);
                    }
                }
            }
            // list列表
            list.itemRender = Box;
            list.array = data;
            list.repeatX= 1;
            list.spaceY= 20
            list.vScrollBarSkin='';
            this.createView.container.scrollBar.elasticBackTime=500;
            this.createView.container.scrollBar.elasticDistance=100;
            list.renderHandler = new Handler(this,(cell:Box,index:number):void=>{
                if(index > data.length )return;
                let content:any = data[index];
                if(content){
                   if(index<=2){
                        cell = data[index];
                    }else{
                        cell = data[index];
                    }
                }
            })
        }
        private packet(data){                                    //   新手红包
            var self = this
            var sjddz_money= new ui.sjddz.sjddz_moneyUI();
            Laya.stage.addChild(sjddz_money);
            sjddz_money.zOrder = 99999
            seekByName(sjddz_money ,"containing").visible = true
            var lingjiang = seekByName(sjddz_money ,"lingjiang")
            var hongbao = seekByName(sjddz_money ,"hongbao")
            seekByName(sjddz_money ,"liansheng").visible = false
            seekByName(sjddz_money ,"sed_text").text = "给你发了一个新手红包"
            hongbao.scaleX = 0
            hongbao.scaleY = 0
            Laya.Tween.to(hongbao, {scaleX:1,scaleY:1, }, 500, null, Handler.create(this,function(obj){
            }, [hongbao]),0);
            seekByName(sjddz_money,"share_qun").visible = true
            // addClick(seekByName(sjddz_money,"chai_red"), function(){            //  直接拆红包
            addClick(seekByName(sjddz_money,"share_qun"), function(){              //  分享群获得红包
                console.log( { ID:Global.UserData.getUserData("id"), num: data })
                sendToOnline(protocol.user_sjddz_new_hongbao, { ID:Global.UserData.getUserData("id"), num: data });
                seekByName(sjddz_money,"share_qun").visible = false
                if(window["shareBTN"]){
                    window["shareBTN"]()
                }
                seekByName(sjddz_money ,"sed_include").text = "恭喜获得新手红包"
                var time = 1
                Global.Clock.addTimeFun("sjddz_money_xinshou",function(){
                    time = time - 1
                    if(time<0){
                        if(data && typeof(data) == "number" || data == 0 ){
                            hongbao.visible = false
                            lingjiang.visible = true
                            seekByName(lingjiang,"score_money").text = data || 0
                        }
                        Global.Clock.removeTimeFun("sjddz_money_xinshou");
                    }
                }, 0.5);

            }, this);  
            addClick(seekByName(sjddz_money ,"tc_btn"), function(){
                sjddz_money.removeSelf();
            }, this);  
            addClick(seekByName(sjddz_money ,"close_btn"), function(){
                sjddz_money.removeSelf();
            }, this); 
            seekByName(sjddz_money ,"hongbao_close").visible = true
            addClick(seekByName(sjddz_money ,"hongbao_close"), function(){
                sjddz_money.removeSelf();
            }, this); 

        }
        public is_fuhuo(data){
            var self = this
            var fuhuo= new ui.sjddz.is_fuhuoUI();
            Laya.stage.addChild(fuhuo);
            addClick(seekByName(fuhuo ,"closeBtn"), function(){
                fuhuo.removeSelf();
            }, this); 
            if( data["win_num"] < 7 && data["win_num"] >= 0 ){
                seekByName(fuhuo,"sjddz_ju").value = data["win_num"] + 1
            }
            
            seekByName(fuhuo,"fuhuo_card").text = "×" + Global.UserData.getUserDataBy_data_key("relive_card_num","shangjing")
            addClick(fuhuo.employ, function(){               //  使用复活卡
                if(Global.UserData.getUserDataBy_data_key("relive_card_num","shangjing") <= 0){
                    showTip("复活卡不足")
                    sendToOnline(protocol.user_sjddz_share_new_fuhuoka);
                    return
                }
                sendToOnline(protocol.user_con_resurrection,1);                                     // 1162
                sendToOnline(protocol.user_join_money,{ type: 1, game : "cardsjddz"} );             // 1155
                fuhuo.removeSelf();
            }, this); 
            addClick(fuhuo.anew, function(){                //  重新开始
                sendToOnline(protocol.user_hudong_sjddz_hall,{type:2 })                             //  1164   2 挑战失败  fail   发一个值      没有都不发
                sendToOnline(protocol.user_join_money,{ type: 1, game : "cardsjddz"} );            // 1155 
                fuhuo.removeSelf();
            }, this); 
        }

        public recvData(cmd, data):void{
            let _ = protocol;_log(cmd);
            if(cmd == protocol.user_enter_room){
                runScene(GameScene, data);// 进入游戏场景
            }else if(cmd == protocol.user_re_connect){
                this.haveRoom = true;
                runScene(GameScene, data);
            }else if(cmd == protocol.user_join_money){              // 进入赏金场 1155   1, 正常开放    2，弹出复活界面
                if(data["ret"] == 2){                               // 弹出复活界面
                    this.is_fuhuo(data)
                }
                //     runScene(GameScene, "cardsjddz");
            // }else if(cmd == protocol.user_join_money){              //  新手礼包
            //     this.packet(data)
            }else if(cmd == protocol.user_sjddz_yaoqing){              //  每日福利 4000
                this.Dailyshare_activity(data)
            }else if(cmd == protocol.user_sjddz_share_new_fuhuoka){        //  邀请新手复活卡 4004
                this.zhuan_card_activity(data)
            }else if(cmd == protocol.user_sjddz_haunjingbi){
                this.conversion(data)
            }else if(cmd == protocol.user_reenter_room){
                if(data == 1){
                    this.showCreate();
                }else if(data == 2){
                    this.showEnter();
                }
            }else if(cmd == protocol.user_hudong_gold_server){        //  金币场模式（在服务器取数据） 
                this.gold_session(data)    // award 红包  底分 base  num 局数     online_num 在线人数    start最低多少分进入      stop  最高多少分
            }else if(cmd == protocol.user_get_ranking){        // 奖品
                this.ranking(data)
            }else if(cmd == protocol.user_get_resurrection){        // 新增复活卡 1161
                if(data){
                    // showTip("新增"+ data+ "复活卡")
                    // get_gold_and_resurrection(data,"fuhuoka")
                    console.log("获取复活卡",data)
                }
            }else if(cmd == protocol.user_sjddz_duihuanfangka){       // 1807


            }else if(cmd == protocol.user_sjddz_paihangbang){       // 排行榜
                this.phb_envelope(data)
            }else if(cmd == protocol.user_jbc_join_game){       // 
                if (data){
                    if (data == 1){
                        // -- self:getDefaultData(self.jbcGameTag)
                    }else if (data == -1){
                        showTip("金币不足")
                        sendToOnline(protocol.user_sjddz_yaoqing);
                    }else if (data == -2){
                        showTip("金币已超出当前房间限额,请选择适当场次")
                    }
                }
            }
        }

        public updateUI(key, data):void{
            if(key == "enter"){
                runScene(GameScene, data);
	  	    }
	  	    else if(key == "reconnect"){
                runScene(GameScene, data);
	  	    }else if(key == "yxb"){              //金币充值
                console.log("金币充值")
                if(this.shopping && seekByName(this.shopping,"goldValue")){
                    seekByName(this.shopping,"goldValue").text = Global.UserData.getUserData("yxb")
                }
                if(data && data > 0){
                    // showTip("获得金币+"+data +"祝您游戏愉快！")
                    get_gold_and_resurrection(data,"gold")
                }
            }else if(key == "relive_card_num"){          //复活卡
                console.log("复活卡")
                if(this.shopping && seekByName(this.shopping,"cardValue")){
                    seekByName(this.shopping,"cardValue").text = Global.UserData.getUserData("shangjing").relive_card_num
                }
                if(data && data > 0){
                    get_gold_and_resurrection(data,"fuhuoka")
                    // showTip("消耗复活卡+"+data +"张，祝您游戏愉快！")
                }
            }
        }
    }
}

class Item extends Box{
    private button:Btn;
    private sel:boolean;
    private gName:Lab;

    constructor(){
        super();
        this.size(122,55);
        this.button = new Btn();
        this.centerX = 0;
        this.sel = false;
        this.gName = new Lab("");
        this.gName.fontSize = 24;
        this.gName.centerX = 0.5;
        this.gName.centerY = 0.5;

        
        this.addChild(this.button);
        this.button.addChild(this.gName);
    }

    public setImg(src:string){
        this.button.skin = src;
        this.button.stateNum = 2;
    }

    public setName(name:string){
        this.gName.text = name;
        this.gName.color = "#ffffff";
    }

    public setSelected(sel:boolean){
        this.button.selected = sel;
        this.sel = sel;
    }

    public isSel():boolean{
        return this.sel;
    }
}