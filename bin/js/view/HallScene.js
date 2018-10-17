// import Hall = ui.hallUI;
// import Loader = laya.net.Loader;
// import Handler = laya.utils.Handler;
// import Box = Laya.Box;
// import Btn = Laya.Button;
// import Lab = Laya.Label;
// import CheckBox= Laya.CheckBox;
// import Password = ui.passwordUI;
// import SignUI = ui.SignUI;
// module gameView{
//     export class HallScene implements BaseView{    
//         private hallView:Hall;
//         private createView:ui.createRoomUI;
//         private RankingList:ui.RankingListUI;// 排行榜窗口
//         private sign; // 签到
//         private roomID:string;
//         private items:Object;
//         private onlyView:View; //大厅唯一界面
//         private shopTab:number; //商城标签
//         /*  俱乐部  */
//         private init_alertUI:ui.club.createClubUI; //创建俱乐部窗口
//         private clubdataxinxi;// 俱乐部数据
//         private tab:number=0;//当前选项卡 0:大厅 1:成员 2:审核
//         private club:ui.club.clubUI=null;// 俱乐部窗口对象
//         private CurrentClub:any={};// 当前俱乐部ID对象{id:俱乐部id,name：俱乐部名称,power:俱乐部权限}
//         private auto_room_create:boolean;// 自动房间
//         private clubAlert:ui.club.joinClubUI;// 搜索俱乐部窗口
//         private roomRuleData:any={};// 房间设置列表
//         private deleteUser:any={};// 删除用户id
//         private clubAlertObj:any={};// 2级弹框
//         private clubOpen:any=true;// 俱乐部开关
//         private haveRoom:boolean; //
//         private roomtype:any={
//             yzmj: "扬中麻将",
//             cardniuniu: "斗牛",
//             hhmj: "晃晃麻将",
//             hzmj: "红中麻将",
//             nn: "牛牛",
//             ddz: "斗地主",
//             bqmj: "宝清麻将"
//         };
//         private hall_button:Array<any>;
//          /*  俱乐部  */
//         private shoppingMallObj:ui.ShoppingMallUI=null;//商城
//         constructor(){
//              Laya.loader.load([
//                  "res/atlas/hall.atlas",
//                  "res/atlas/createRoom.atlas",
//                  "res/atlas/head.atlas",
//                  "res/atlas/password.atlas",
//                  "res/atlas/list.atlas",//排行榜
//                  "res/atlas/sign.atlas",//签到
//                  "res/atlas/realNamEverify.atlas",//实名认证
//                  "res/atlas/help.atlas",// 帮助
//                  "res/atlas/club.atlas",// 俱乐部
//                  "res/atlas/setting.atlas",
//                  "res/atlas/userinfo.atlas",//用户信息
//                  "res/atlas/share.atlas",//分享
//                  "res/atlas/public.atlas",
//                  "res/atlas/ShoppingMall.atlas",//商城
//                  "res/atlas/hall_ddz.atlas",
//                  "res/atlas/ddz_sj.atlas",
//              ], Handler.create(this, this.onLoaded));
//         }
//         private onLoaded():void{
//             //  console.log("大厅")
//              if(this.haveRoom){
//                  return;
//              }
//              this.hallView = new Hall();
//              Laya.stage.addChild(this.hallView);
//              addClick(this.hallView.createRoom,this.onclick, this);
//              addClick(this.hallView.enterRoom, this.onclick, this);
//              addClick(this.hallView.goldRoom,  this.onclick, this);
//              addClick(this.hallView.helpBtn,    this.onclick, this);
//              addClick(this.hallView.shareBtn,   this.onclick, this);
//              addClick(this.hallView.recordBtn,  this.onclick, this);
//              addClick(this.hallView.settingBtn, this.onclick, this);
//              addClick(this.hallView.clubBtn,  this.onclick, this);
//              addClick(this.hallView.rankBtn,  this.onclick, this);
//              addClick(this.hallView.signBtn,  this.onclick, this);
//              addClick(this.hallView.realNameBtn,  this.onclick, this);
//              addClick(this.hallView.shopBtn,  this.onclick, this);+
//              addClick(this.hallView.addCard,  this.onclick, this);
//              addClick(this.hallView.addGold,  this.onclick, this);
//              addClick(this.hallView.user_info,  this.onclick, this);
//              this.hallView.nameText.text = Global.UserData.getUserData("name");
//              this.hallView.idText.text = Global.UserData.getUserData("id");
//              this.hallView.cardValue.text = Global.UserData.getUserData("room_card");
//              this.hallView.goldValue.text = Global.UserData.getUserData("yxb");
//              //设置头像
//              var str = Global.UserData.getUserData("head") || ("head/" + Global.UserData.getUserData("tid") + ".png");
//              this.hallView.headImg.skin = str;
//              this.hallView.headImg.size(this.hallView.user_info.width, this.hallView.user_info.height);
//              this.roomID = "";
//              this.items = {};
//              var arr= [1,1,2]
//              var brr = {}
//              playMusic("res/music/hall.mp3");
//              this.hallItemScroll()
//              if(Global.CacheData["roomid"]){
//                 sendToOnline(protocol.user_enter_room, Global.CacheData["roomid"]);
//                 Global.CacheData["roomid"] = null;
//              }
//         }
//         private onclick(e):void{
//             var name:string = e.currentTarget.name;
//             if(name == "createRoom"){
//                 // this.showCreate();
//                 // sendToOnline(protocol.user_reenter_room, 1);
//             }else if(name == "enterRoom"){
//                 //this.showEnter();
//                 // sendToOnline(protocol.user_reenter_room, 2);
//             }else if(name == "goldRoom"){
//             }else if(name == "helpBtn"){
//                 this.help();// 调用help弹框
//             }else if(name == "shareBtn"){
//                 this.share();//分享
//             }else if(name == "recordBtn"){
//                 sendToOnline(protocol.user_send_record, "yzmj");
//             }else if(name == "settingBtn"){
//                 this.showSetting();
//             }else if(name == "user_info"){
//                 this.userInfo();// 用户信息
//             }else if(name == "rankBtn"){
//                 this.init_list_UI();// 调用排行榜弹框
//             }else if(name == "signBtn"){
//                 this.init_Sign_UI(1);// 调用签到弹框
//             }else if(name == "realNameBtn"){
//                 this.Authentication();// 调用实名认证弹框
//             }else if(name == "clubBtn"){
//                 this.ClubMain();// 俱乐部
//             }else if(name == 'shopBtn'){
//                 this.ShoppingMall(1);// 商城
//             }else if(name == "addCard"){
//                 this.shopTab = 0;
//                 this.ShoppingMall(1);// 商城
//             }else if(name == "addGold"){
//                 this.shopTab = 1;
//                 this.ShoppingMall(1);// 商城
//             }
//         }
//         private hallItemScroll():void{
//             var self = this
//             var list = seekByName(this.hallView, "hall_scrollView")
//             list.vScrollBarSkin = "";
//             this.hall_button = []
//             for (var i:number = 1; i <= 10; i++) {
//                 this.hall_button.push(i);
//             }
//             //添加list滚动条功能
//             this.hallView.hall_scrollView.hScrollBarSkin='';
//             //将this.arr数据赋值到列表数据源。
//             this.hallView.hall_scrollView.array = this.hall_button;
//             this.hallView.hall_scrollView.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
//             this.hallView.hall_scrollView.scrollBar.elasticDistance = 50;//设置橡皮筋极限距离。
//             //list渲染:单元格渲染处理器(默认返回参数cell:Box,index:int)。
//             this.hallView.hall_scrollView.renderHandler=new Handler(this,this.onRender);
//         }
//         private  onRender(cell:Box,index:number):void{
//             var self = this
//             //如果索引不再可索引范围，则终止该函数
//             if(index > this.hall_button.length)return;
//             //获取当前渲染条目的数据
//             var data:any=this.hall_button[index];
//             //根据子节点的名字listNumber，获取子节点对象。       
//             var butt_ = seekByName(cell, "hall_item_")
//             if (butt_){
//                 butt_.name = "" + data
//                 butt_.skin = `hall/hall_item_${data}.png`
//                 var that = this
//                 addClick(butt_, function(e){
//                     var num = Number(butt_.name)
//                     console.log(num)
//                     if(num == 1){
//                         sendToOnline(protocol.user_reenter_room, 2);
//                         // sendToOnline(protocol.user_club_get_club_num);
//                     }else if(num == 2){
//                         showTip("即将开放")
//                     }else if(num == 3){
//                         sendToOnline(protocol.user_reenter_room, 1);
//                         // sendToOnline(protocol.user_club_get_club_num);
//                     }else if(num == 4){
//                         showTip("即将开放")
//                     }else if(num == 5){       // 竖版  sjddz
//                         sendToOnline(protocol.user_switcher_vertical);
//                     }else {
//                         sendToOnline(protocol.user_reenter_room, 1);
//                         // sendToOnline(protocol.user_club_get_club_num);
//                     }
//                 });
//             }
//         }
//         private showEnter():void{
//             var enter = new ui.passwordUI();
//             var self = this;
//             Laya.stage.addChild(enter);
//             addClick(enter.closeBtn, function(e){
//                 self.roomID = "";
//                 enter.removeSelf();
//             })
//             for(var i = 0; i <= 9; i++){
//                 enter["btn" + i].tag = i
//                 addClick(enter["btn"+i], function(e){
//                     if(self.roomID.length < 6){
//                        self.roomID = self.roomID + e.target.tag;
//                        enter["num" + self.roomID.length].text = e.target.tag + "";
//                        if(self.roomID.length == 6){
//                             sendToOnline(protocol.user_enter_room, Number(self.roomID));
//                        }
//                     }
//                 })
//             }
//             addClick(enter.btnClear, function(e){
//                 self.roomID = ""
//                 for(var i = 1; i <= 6; i++){
//                     enter["num" + i].text = "";
//                 }
//             });
//             addClick(enter.btnDel, function(e){
//                 if(self.roomID.length > 0){
//                     enter["num" +self.roomID.length].text = "";
//                     self.roomID = self.roomID.substring(0,self.roomID.length -1);
//                 }
//             });
//         }
//         private isOpen(game_type,idx){
// 			var self = this 
// 			var gameType ={
// 				"yzmj":{[0]:true, [1]:true },
// 				"cardniuniu":{[0]:true, [1]:true},
//                 "cardnddz":{[0]:true, [1]:true},
//                 "bqmj":{[0]:true, [1]:true}
// 			}
// 			var tempgame = gameType[game_type] && (gameType[game_type][idx] && gameType[game_type][idx] || false) || false
// 			return tempgame
// 		}
//         private showCreate(club:boolean=null):void{
//             this.createView = new ui.createRoomUI();
//             var self = this;
//             var layer = this.createView;
//             layer.zOrder = 1002;
//             Laya.stage.addChild(layer);
//             // 俱乐部处理
//             if(club){
//                 layer.createBtn.skin='club/set_rule_btn.png';
//                 layer.clubBtn.visible=true;
//                 addClick(layer.changeName,()=>{self.modifyNameClub(1)},this);//改名
//             }
//             layer.gameList1.itemRender = Item;
//             layer.gameList1.renderHandler = new Handler(this, this.updateItem);
//             layer.gameList1.selectEnable = true;
//             layer.gameList1.selectHandler = new Handler(this, this.selectItem);
//             var games = Global.GameCfg.getCfg("room");
//             var data:Array<Array<string>> = [];
//             for(var i = 0; i < games["game"]; i++){
//                 data.push(["public/btn_nom.png", games["GAMETYPE" + i].desc ]);
//             }
//             layer.gameList1.array = data;
//             layer.gameList1.repeatX= 2;
//             layer.gameList1.repeatY= data.length/2;
//             layer.gameList1.spaceX= 0
//             layer.gameList1.spaceY= 20
//             layer.gameList1.vScrollBarSkin='';
//             layer.gameList1.selectedIndex = 0;
//             this.roomPanel(0);
//              var callback = function(e){
//                 if(e.target.name == "createBtn"){
//                     var pass = {}
//                     for(var k in self.items){
//                         var all = self.items[k];
//                         for(var cur in all){
//                             if(all[cur].selected){
//                                 pass[k] = Number(Global.GameCfg.getConfigById("room",all[cur].tag).num);
//                             }
//                         }
//                     }
//                     pass["type"] =  games["GAMETYPE" + layer.gameList1.selectedIndex].type;
//                     if( !self.isOpen(pass["type"],0) ){
//                         showTip("即将开放")
//                         return
//                     }
//                     if(pass["type"] == "cardnddz"){
//                         pass["player_num"] = 3
//                     }
//                     // 俱乐部处理
//                     if(club){
//                         pass['auto_room_create']=layer.auto_create_room.selected;//自动房间
//                         pass['clubid']=self.CurrentClub.id;//俱乐部id
//                         sendToOnline(protocol.user_club_set_rule,pass);
//                         _log(pass);
//                         return;
//                     }
//                     _log(pass);
//                     sendToOnline(protocol.user_create_room, pass);
//                     // runScene(gameView.GameScene);
//                     // runScene(gameView.niuGameScene);
//                 }else if(e.target.name == "closeBtn"){
//                     layer.close();
//                 }
//             }
//             addClick(layer.closeBtn, callback);
//             addClick(layer.createBtn, callback);
//         }
//         private roomPanel(idx):void{
//             var cfg = Global.GameCfg.getCfg("room")["GAMETYPE" + idx];
//             this.items = {};
//             var self = this;
//             // var panel = this.createView.optPanel;
//             // panel.removeChildren();
//             var list = this.createView.container;   // list列表
//             var data:Array<any> = [];
//             var gameCfg = Global.GameCfg.getCfg("room")["GAMETYPE" + idx ]
//             var itemCallback = function(e){
//                 var obj = e.target;
//                 var config = Global.GameCfg.getConfigById("room", parseInt(String(obj.tag / 10)));
//                 var temp_num = parseInt(String(obj.tag / 100))
//                 var configa = Global.GameCfg.getConfigById(gameCfg, "ITEM" + temp_num );
//                 for(var idx in self.items[config.value]){
//                     var it = self.items[config.value][idx];
//                     if(!config.multi_check){
//                         if(obj == it){  
//                              it.selected = true;
//                         }else{
//                             it.selected = false;
//                         }
//                     }
//                 }
//             }
//             for(var i = 0; i < cfg.len;i++){
//                 var option = new Box();
//                 option.size(200, 50);
//                 option.y = i * 50;
//                 var optCfg = cfg["ITEM" + i];  //玩法大项的配置
//                 var x = 110;
//                 if(optCfg.desc != ""){
//                     var lab = new Lab(optCfg.desc + ":");
//                     lab.color = "#A197F0";  // 9b6535
//                     lab.fontSize = 28;
//                     lab.centerY = 0.5;
//                     lab.x = x;
//                     lab.anchorX = 1;
//                     option.addChild(lab);
//                 }
//                 if(typeof(optCfg) == "object"){
//                     data.push(option);
//                 }   
//                 // panel.addChild(option);
//                 for(var j = 0; j < optCfg.len; j++){
//                     var itemCfg = optCfg["OPTION" + j];      //玩法小选项的配置 
//                     var cb = new CheckBox("public/check_box.png", itemCfg.Name);
//                     cb.tag = Number(itemCfg.ID);
//                     cb.stateNum = 3;
//                     cb.labelSize = 28;
//                     cb.labelColors = "#A197F0,#A197F0,#A197F0";
//                     cb.x = x + 20 ;
//                     cb.anchorY = 0.5;
//                     cb.y = option.height / 2 + 2;
//                     cb.labelPadding = "10";
//                     option.addChild(cb);
//                     x = x + cb.width + 30;
//                     addClick(cb, itemCallback);
//                     if((j == 0 && optCfg.desc != "" && !optCfg.multi_check) || itemCfg.default){
//                         cb.selected = true;
//                     }
//                     if(optCfg.value != null){ //配置项目需要选择时保存起来
//                         if(this.items[optCfg.value] == null){
//                             this.items[optCfg.value] = []
//                         }
//                         this.items[optCfg.value].push(cb);
//                     }
//                 }
//             }
//             // list列表
//             list.itemRender = Box;
//             list.array = data;
//             list.repeatX= 1;
//             list.spaceY= 20
//             list.vScrollBarSkin='';
//             this.createView.container.scrollBar.elasticBackTime=500;
//             this.createView.container.scrollBar.elasticDistance=100;
//             list.renderHandler = new Handler(this,(cell:Box,index:number):void=>{
//                 if(index > data.length )return;
//                 let content:any = data[index];
//                 if(content){
//                    if(index<=2){
//                         cell = data[index];
//                     }else{
//                         cell = data[index];
//                     }
//                 }
//             })
//         }
//         private updateItem(cell:Item, index:number):void{
//             cell.setImg(cell.dataSource[0]);
//             cell.setName(cell.dataSource[1]);
//             if(index%2 == 0){
//                 cell.x = 0 + 10
//             }else{
//                 cell.x = this.createView.gameList1.width/2
//             }
//         }
//         private selectItem(index:number):void{
//             var cells = this.createView.gameList1.cells;
//             for(var it in cells){
//                 if(cells[it].isSel()){
//                     cells[it].setSelected(false);
//                 }else if(index == Number(it)){
//                     cells[it].setSelected(true);
//                     this.roomPanel(index);
//                 }
//             }
//         }
//         // 分享 
//         private share=():void=>{
//            let share:ui.shareUI=this.init_alert(ui.shareUI,null);
//            addClick(share.friendBtn, function(){
//                setWxInfo({kind:"hall",share:1});
//                share.removeSelf();
//            });
//            addClick(share.timelineBtn, function(){
//                setWxInfo({kind:"hall",share:2});
//                share.removeSelf();
//            });
//         }
//         // 商城入口
//         private ShoppingMall=(type:number,data:any=null,tabIdx=0):void=>{
//             if(type==1){
//                 if(this.shoppingMallObj){this.shoppingMallObj.removeSelf()};
//                 this.shoppingMallObj=this.init_alert(ui.ShoppingMallUI,
//                     Laya.Handler.create(this,()=>{
//                         sendToOnline(protocol.user_shop_data);
//                 }));
//             }else if(type==2&&!!data){
//                 let status = true;//是否已绑定代理
//                 //未绑定代理
//                if(!!data&&!data.invated_id){
//                    status = false;
//                    let targte = this.shoppingMallObj.invated_btn;
//                    targte.skin="ShoppingMall/binding_btn.png";
//                    addClick(targte,()=>{
//                        let binding = this.init_alert(ui.bindingUI,
//                             Laya.Handler.create(this,()=>{
//                                 // 绑定代理窗口
//                                 addClick(binding.bindingBtn,()=>{
//                                     let bindingtext = binding.bindingtext.text;
//                                     (!!bindingtext&&bindingtext.length>0)?
//                                     sendToOnline(protocol.user_yqm_bind,Number(bindingtext)):
//                                     showTip('请填写代理号');
//                                 },this)
//                        }))
//                    },this);
//                }
//                // 选项卡
//                let tab = this.shoppingMallObj.shoppingTab
//                tab.selectHandler = new Handler(this,()=>{
//                    this.ShoppingTab(Number(tab.selectedIndex),status);
//                })
//                tab.selectedIndex = tabIdx;
//                this.ShoppingTab(tabIdx,status);
//             }else{
//                 showTip('暂时无法获取数据');
//             }
//             // 设置房卡
//             this.shoppingMallObj.roomsize.text=Global.UserData.getUserData('room_card');//房卡
//             this.shoppingMallObj.goldsize.text=Global.UserData.getUserData('yxb');//金币
//         }
//         // 商城选项卡功能 index 0: 房卡 1:金币 2: 记录 3:记录列表渲染 status: 是否绑定代理  data: 接受充值记录
//         private ShoppingTab=(index:number,status:boolean=null,data:any=null):void=>{
//             let _ =(type)=>{Global.UserData.getUserData(type)},self=this;
//             // true 显示充值列表 false 显示金币列表
//             let toggleTab =(status:boolean)=>{
//                 this.shoppingMallObj.list_2.visible=status;//充值记录
//                 this.shoppingMallObj.list_1.visible=!status;//金币列表
//             }
//             if(index==0){
//                 // 房卡
//                 toggleTab(false);
//                 let url = "http://yfyx.yunfanshidai.com/api/roomcardprice.php";
//                 http(url,function (data){self.shoppingRender(0,data,status)});
//             }else if(index==1){
//                 // 金币
//                 toggleTab(false);
//                 let url = "http://yfyx.yunfanshidai.com/api/goldprice.php";
//                 http(url,function(data){self.shoppingRender(1,data,status)});
//             }else if(index==2){
//                 // 记录列表请求
//                 sendToOnline(protocol.user_pay_record);
//                 toggleTab(true);
//             }else if(index==3){
//                 // 记录列表渲染
//                 var render = (data)=>{
//                     // 渲染函数
//                     this.shoppingMallObj.Record.visible=true;
//                     _log(data);
//                 }
//                 if(!!data){
//                     render(data)
//                 }else{
//                     this.shoppingMallObj.Record.visible=false;
//                     showTip('无充值记录');
//                 };
//             }
//         }
//         // 商城房卡与金币列表渲染函数
//         private shoppingRender=(type:number,data:any,status:boolean)=>{
//             let listData = [];
//             for(let i in data){
//                 listData.push(data[i]);
//             }
//             this.shoppingMallObj.list_1.array=listData;
//             this.shoppingMallObj.list_1.renderHandler=new Handler(this,(cell:Box,index:number):void=>{
//                 let _=listData[index];
//                 if(type==0){
//                     (cell.getChildByName('list_type') as Laya.Image).skin = `ShoppingMall/room_card.png`;//背景图
//                 }else{
//                     (cell.getChildByName('list_type') as Laya.Image).skin = `ShoppingMall/gold_mid_img.png`;//背景图
//                 }
//                 let target = (cell.getChildByName('submit_btn') as Laya.Button);
//                 (cell.getChildByName('Gold') as Laya.Label).text = _.name;//标题
//                 (target.getChildByName('Price') as Laya.Label).text = _.price;//价格
//                 if(status){
//                     addOnceClick(target,()=>{
//                         _log(_);
//                     },this);
//                 }else{
//                     addOnceClick(target,()=>{
//                         http("http://yfyx.yunfanshidai.com/api/placeorder.php?userid=" + Global.UserData.getUserData("id") + "&goodsid=" + listData[index].id + "&role=" + encodeURIComponent(Global.UserData.getUserData("name")) + "&server=1" + "&uid=" + Global.UserData.getSessionData("uid"), function(resp){
//                             console.log(listData[index])
//                             console.log(resp)
//                             Global.YfSDK["pay"]({
//                                 gameId:Global.UserData.getSessionData("gameId"),
//                                	uid:Global.UserData.getSessionData("uid"),
//                                	time:resp.time, //10位时间戳
//                                	server:1,
//                                	role:Global.UserData.getUserData("name"),
//                                	goodsId:listData[index].id,
//                                	goodsName:listData[index].name,
//                                	money:listData[index].price,
//                               	cpOrderId:resp.orderid,
//                               	ext:resp.orderid,
//                                 sign:resp.sign,
//                                 signType:"md5"
//                             });
//                         });
//                     },this);
//                 }
//             });
//             this.shoppingMallObj.list_1.scrollBar.elasticBackTime=500;
//             this.shoppingMallObj.list_1.scrollBar.elasticDistance=100;
//         }
//         // 用户信息
//         private userInfo=():void=>{
//             let _= Global.UserData;
//             let user:ui.userinfoUI=this.init_alert(ui.userinfoUI,null);
//             user.user_id.text=_.getUserData('id');
//             user.user_ip.text=_.getUserData('ip');
//             user.user_name.text=_.getUserData('name');
//             (_.getUserData('head'))?user.user_head.skin=_.getUserData('head'):_log('无头像');
//         }
//         // 排行榜——init
//         private init_list_UI=():void=>{
//             let list:ui.RankingListUI=this.init_alert(ui.RankingListUI,
//             Laya.Handler.create(this,()=>{sendToOnline(protocol.user_match_rank_list)}));
//             this.RankingList = list;
//         }
//         // 排行榜——render
//         private list_ui_rander=(data):void=>{
//             this.RankingList.RankingList.vScrollBarSkin = '';
//             this.RankingList.RankingList.array = data;
//             this.RankingList.RankingList.scrollBar.elasticBackTime=500;
//             this.RankingList.RankingList.scrollBar.elasticDistance=100;
//             this.RankingList.RankingList.renderHandler = new Handler(this,(cell:Box,index:number):void=>{
//                 if(index > data.length)return;
//                 let content:any = data[index];// 单项数据
//                 let user_name:Laya.Label = cell.getChildByName('user_name') as Laya.Label // 用户名称
//                 let user_content:Laya.Label = cell.getChildByName('user_content') as Laya.Label // 用户金币
//                 let user_img:Laya.Image = cell.getChildByName('user_img') as Laya.Image;// 用户头像
//                 let user_icon:Laya.Image = cell.getChildByName('user_icon') as Laya.Image // 皇冠
//                 let user_icon_clip:Laya.FontClip = cell.getChildByName('user_icon_clip') as Laya.FontClip // 用户等级
//                 if(index<=2){
//                     user_icon.skin = `list/rank_${index+1}.png`;
//                     user_icon.visible = true;
//                 }else{
//                     user_icon_clip.value = (index+1).toString();
//                     user_icon.visible = false;
//                 }
//                 user_name.text = content.nick;
//                 user_content.text = content.yxb;
//                 if(!!content.head.head){
//                     user_img.skin = content.head.head;
//                 }
//             })
//         }
//         // 签到
//         private init_Sign_UI=(type:number,data:any=null):void=>{
//             let self = this;
//             if(type==1){
//                 sendToOnline(protocol.user_sign_list,true);
//                 self.sign=this.init_alert(ui.SignUI);
//             }else if(type==2){
//                 let datas=Object.keys(data);
//                 for(let i=datas.length;i--;){
//                     let _=self.sign[`sign_${i}`],x=data[datas[i]];
//                     if(x.status==3){
//                         addClick(_,()=>{showTip("暂时无法签到")},this)
//                     }else if(x.status==1){
//                         _.disabled=true;self.sign[`sign_btn_${i}`].alpha = 1;
//                     }else if(x.status==0){
//                         addClick(_,()=>{
//                             sendToOnline(protocol.user_sign,i+1);
//                             _.disabled=true;
//                             self.sign[`sign_btn_${i}`].alpha = 1;
//                         },this)
//                     }
//                 }
//             }else if(type==3&&data){
//                 showTip('签到成功');
//             }
//         }
//         // 实名注册
//         private Authentication=():void=>{
//             let Authentication:ui.AuthenticationUI = this.init_alert(ui.AuthenticationUI);
//             addClick(Authentication.submit,(e):void=>{showTip("暂时无法提交");})
//         }
//         // 帮助
//         private help=():void=>{
//             let help:ui.helpUI = this.init_alert(ui.helpUI);
//             help.gameTab.on("change", this, function(obj:Laya.Tab){
//                 help['tt'].text = cvtToNewline(Global.GameCfg.getConfigById("word", "3" + (obj.selectedIndex + 1)).DESC);
//                 help.scrollPanel.vScrollBar.setScroll(0, help['tt'].height - help.scrollPanel.height, 0);
//             },[help.gameTab]);
//             help.gameTab.selectedIndex = 0;
//         }
//         // 窗口生成
//         private init_alert = (type,create_handler:any=null,clear_handler:any=null)=>{
//             let type_obj = new type; 
//             if(!type_obj.content || !type_obj.close_Btn){
//                 _log("ui界面结构不正确");
//                 return;
//             }
//             this.toggles(0,type_obj.content);
//             Laya.stage.addChild(type_obj);
//             this.toggles(1,type_obj.content,create_handler);
//             type_obj._close=()=>{
//                 this.toggles(2,type_obj.content,null,Laya.Handler.create(this,()=>{
//                     type_obj.removeSelf();
//                 }))
//             };
//             addClick(type_obj.close_Btn,(e):void=>{
//                 if(!!clear_handler&&clear_handler instanceof Function)clear_handler();//关闭窗口时执行
//                 type_obj._close();
//             });
//             return type_obj;
//         }
//         // 窗口弹出动画 status: 0初始化,1显示,2隐藏 target:目标 create_handler:窗口显示后的回调 clear_handler:窗口隐藏后的回调
//         private toggles=(status:number,target:any,create_handler:Handler=null,clear_handler:Handler=null):void=>{
//             switch(status){
//                 case 0:
//                     target.scale(0.2,0.2);
//                     target.alpha = 0;
//                     break;
//                 case 1:
//                     Laya.Tween.to(target,{alpha:1,scaleX:1,scaleY:1},300,Laya.Ease.strongInOut,create_handler,null)
//                     break;
//                 case 2:
//                     Laya.Tween.to(target,{scaleX:0.2,scaleY:0.2,alpha:0},300,Laya.Ease.strongOut,clear_handler,null)
//                     break;    
//             }
//         }
//         // 俱乐部 >> 主入口
//         private ClubMain=():void=>{
//             this.clubRequest('clubList');// 获取当前俱乐部数量
//         }
//         // 俱乐部 >> 俱乐部数量及代理权限判断
//         private ClubsizeJudeg=(data:any=null):void=>{
//             let user_type = Global.UserData.getUserData('user_type') || false;// 获取当前用户类型
//             if(user_type && user_type>0){
//                 // 有权限
//                 if(data.length==0 || !data){
//                     // 无俱乐部
//                     this.createClubs(1);// 创建俱乐部 窗口
//                 }else{
//                     this.clubHall(data);// 进入大厅界面 (有代理权限);
//                 }
//             }else{
//                 // 无权限
//                 if(data.length==0 || !data){
//                     // 无俱乐部
//                     this.clubSearch(1);//  搜索俱乐部 窗口
//                 }else{
//                     // 有俱乐部
//                     this.clubHall(data);// 进入大厅界面 (无代理权限);
//                 }
//             }
//         } 
//         // 俱乐部  >> 集中网络请求对象处理
//         private clubRequest=(target:string="",data=null):void=>{
//             let _=protocol;
//             switch(target){
//                 case "member":    
//                     sendToOnline(_.user_club_get_player_list,data);// 获取俱乐部玩家列表
//                     break;
//                 case "clubList":    
//                     sendToOnline(_.user_club_get_club_num);// 获取俱乐部数量
//                     break;
//                 case "clubSearch":
//                     sendToOnline(_.user_club_search,data);// 搜索俱乐部
//                     break;
//                 case "createBlub":
//                     sendToOnline(_.user_club_create,data);// 创建俱乐部
//                     break;    
//                 case "joinClub":
//                     sendToOnline(_.user_club_join,data);//加入俱乐部    
//                     break;
//                 case "clubRoom":
//                     sendToOnline(_.user_agency_list,data);//获取大厅房间信息
//                     break;
//                 case "clubRoucer":
//                     sendToOnline(_.user_club_get_recod_list,{clubid:this.CurrentClub.id,type:'yzmj'});
//                     break;
//                 default:
//                     _log("没有传入请求类型");
//                     return;    
//             }
//         }
//         // 俱乐部 >> 大厅总入口  >> data只接受俱乐部数据
//         private clubHall=(data:any=null):void=>{
//             if(this.club){
//                this.club.removeSelf();
//             }
//             // 添加大厅窗口
//             this.club=this.init_alert(ui.club.clubUI,null,()=>{
//                 this.clubOpen=false;//关闭窗口时停止定时器
//             });
//             this.clubOpen=true;//开启计时器
//             this.clubListRender(data);// 俱乐部下拉列表
//             this.clubEvent();//绑定各种按钮事件
//             this.club.on(Laya.Event.CLOSE,this,()=>{
//                 _log('俱乐部页面关闭');
//                 this.clubOpen=false;
//             })
//             // 获取房间设置列表
//             var getRoom = ()=>{
//                 this.roomRule(1)
//             }
//             // 大厅房间
//             var gethall = ()=>{
//                 this.clubHallRoom(1);
//                 Laya.timer.loop(3000,this,getloophall);//启动定时器
//             }
//             // 大厅房间定时器
//             var getloophall=()=>{
//                 if(!this.clubOpen||this.clubOpen==false){
//                     Laya.timer.clear(this,getloophall);
//                     return;
//                 }
//                 this.clubHallRoom(1);
//                 _log('定时请求');
//             }
//             Laya.timer.once(500,this,getRoom);
//             Laya.timer.once(1500,this,gethall);
//             // 设置初始化俱乐部脚部信息
//             (this.club.clubName as Laya.Label).text=this.CurrentClub.name;//俱乐部名称
//             (this.club.clubID as Laya.Label).text=this.CurrentClub.id;//俱乐部ID
//         }
//          // 俱乐部模块 >> 事件绑定
//         private clubEvent=():void=>{
//             let _=this.club;
//             addOnceClick(_.member_dissolution,()=>{this.clubalerts(1)},this);//解散俱乐部
//             addOnceClick(_.member_add,()=>{this.clubalerts(4)},this);//添加用户
//             addOnceClick(_.member_delete,()=>{this.clubalerts(2,this.deleteUser.id)},this);//删除用户
//             addOnceClick(_.member_exit,()=>{this.clubalerts(3)},this);//退出俱乐部
//             addOnceClick(_.hall,()=>{this.clubHallRoom(1);this.tab=0;this.clubTab(0)},this);// 大厅按钮
//             addOnceClick(_.member,()=>{this.clubMember(1);this.tab=1;this.clubTab(1)},this);// 成员按钮
//             addOnceClick(_.getRoom,()=>{this.FastOpening()},this);// 快速开房
//             addOnceClick(_.clubToExamine,()=>{this.clubMember(3);this.tab=2;this.clubTab(2)},this);// 审核
//             addOnceClick(_.settings,()=>{this.showCreate(true)},this);// 设置
//             addOnceClick(_.Record,()=>{this.clubRequest('clubRoucer')},this);// 战绩 
//         }
//         // 俱乐部 >> 俱乐部下拉列表渲染及权限判断
//         private clubListRender=(data:any=null)=>{
//             let comboBox = this.club.clubComboBox,text=[];
//             let last_clubid = Global.UserData.getUserData('last_clubid');//上次操作俱乐部id
//             if(!data){
//                 return;
//             }
//             // 判断权限
//             let intercept=(index:number=null)=>{
//                 if(index<=0)index=0;
//                 if(data[index].userid==Global.UserData.getUserData('id')){
//                     return this.club.AdministratorRights.visible=true;
//                 };return this.club.AdministratorRights.visible=false;
//             }
//             // 列表渲染
//             for(let i=0;i<data.length;i++){
//                 text.push(`俱乐部${i+1}`);
//                 // 如果有上一次操作
//                 if(data[i].clubid==last_clubid){
//                     comboBox.selectedIndex=i;
//                     this.CurrentClub={id:last_clubid,power:intercept(i),name:data[i].name,userid:data[i].userid};
//                 };
//             };
//             comboBox.labels=text.join(',');
//             let comoBtn = comboBox.button;
//             // 列表按钮渲染
//             comboBox.list.spaceY=3;
//             comboBox.list.scrollBar.elasticBackTime=500;
//             comboBox.list.scrollBar.elasticDistance=100;
//             comboBox.list.renderHandler=new Handler(this,(cell:Box,index:number)=>{
//                 let target = cell.getChildByName('label') as Laya.Label;
//                 target._childs[0].visible=false;//隐藏文字
//                 if(target._childs.length>=2){
//                     return;
//                 }else{
//                     let img:Laya.Image = new Laya.Image(`club/club${index+1}_n.png`);
//                     img.size(cell.width,cell.height);
//                     target.addChild(img);
//                 }        
//                 createClubBtn.y=comboBox.list._childs[0].height; 
//             });
//             // 创建俱乐部按钮
//             let createClubBtn:Laya.Button = new Laya.Button('club/create_btn.png');
//             createClubBtn.size(120,60);
//             createClubBtn.stateNum=1;
//             addClick(createClubBtn,()=>{
//                 this.createClubs(1);// 创建俱乐部 窗口
//             },this);
//             comboBox.list.addChild(createClubBtn);
//             // 切换id
//             comboBox.selectHandler = new Handler(this,(cd:Laya.ComboBox)=>{
//                 let indexs;
//                 if(cd.selectedIndex<=0){
//                     indexs=0
//                 }else{
//                     indexs = cd.selectedIndex;//当前选项下标
//                 }
//                 let powers = intercept(indexs);//判断权限
//                 if(powers==false){createClubBtn.visible=false};//当前项无权限则不显示创建按钮
//                 this.CurrentClub={id:data[indexs].clubid,
//                     power:powers,
//                     name:data[indexs].name,
//                     userid:data[indexs].userid};
//                 this.roomRule(1);//刷新房间设置列表
//                 this.clubTab();// 调用选项卡判断
//                 comoBtn.skin=`club/club${indexs+1}_n.png`;//修改俱乐部按钮贴图
//             }, [comboBox]);
//             //初始化默认id  如果没有上一次操作ID或没有俱乐部id则取第一个俱乐部ID
//             if(!last_clubid || !this.CurrentClub.id){
//                 this.CurrentClub.id=data[0].clubid;
//                 this.CurrentClub.name=data[0].name;
//                 this.CurrentClub.userid=data[0].userid;
//             }
//             this.CurrentClub.power=intercept(comboBox.selectedIndex);//判断当前项是否有权限
//             if(this.CurrentClub.power==false){createClubBtn.visible=false};//当前项无权限则不显示创建按钮
//         }
//         // 俱乐部 >> 选项卡切换控制
//         private clubTab=(target:any=null):void=>{
//             let tabs = this.tab;//获取当前选项卡
//             let clubs = this.club.clubRoom;// 大厅
//             let member = this.club.member_content;// 成员与审核列表
//             if(target){
//                 if(target==0){
//                     clubs.visible=true;// 显示大厅
//                     member.visible=false;
//                 }else if(target==1||target==2){
//                     clubs.visible=false;// 显示列表
//                     member.visible=true;
//                 }
//             }else{
//                 switch (tabs){
//                     case 0:
//                         this.clubHallRoom(1);//大厅
//                         clubs.visible=true;
//                         member.visible=false;
//                         break;
//                     case 1:
//                         this.clubMember(1)//成员
//                         clubs.visible=false;
//                         member.visible=true;
//                         break;
//                     case 2: 
//                         this.clubMember(3);//审核
//                         clubs.visible=false;
//                         member.visible=true;
//                         break;
//                 }
//             }   
//         }
//         // 俱乐部 >> 成员列表及审核列表 >> type:1:成员,3审核  type:2,4 渲染 
//         private clubMember=(type:number=null,data:any=null):void=>{
//             let clubid =this.CurrentClub.id,self=this,_=this.club;
//             if(type == 1){
//                 sendToOnline(protocol.user_club_get_player_list,{clubid:clubid,page:1});return;
//             }else if(type == 2){
//                 renderList(data,1);
//             }else if(type == 3){
//                 sendToOnline(protocol.user_club_join_audit_list,clubid);return;
//             }else if(type == 4){
//                 renderList(data,2);
//             }
//             function renderList(data,type){
//                 let datas=[];
//                 //数据格式化
//                 for(let i in data){
//                     if(!isNaN(Number(i))){
//                         datas.push(data[i])
//                     }
//                 };
//                 // 成员列表
//                 if(type==1){
//                     let list=_.member_list;
//                     list.array=datas;
//                     let list_content=_.list_footer;// 成员列表底部操作按钮
//                     list.scrollBar.elasticBackTime=500;
//                     list.scrollBar.elasticDistance=100;
//                     list.selectEnable = true;
//                     // 当前选中的成员
//                     list.selectHandler=new Handler(this,(index)=>{
//                         for(let i=0;i<=list._childs[0]._childs.length-1;i++){
//                             let target = null;
//                             try{
//                                 target = list._childs[0]._childs[i]._dataSource.userid;//其他项id
//                             }catch(e){
//                                 console.error('成员列表遍历失败');
//                             }
//                             if(target !== list.selection.dataSource.userid){
//                                 (list._childs[0]._childs[i].getChildByName('member_background') as Laya.Image).skin='club/cell_bg_1.png';//更改背景
//                             }else{
//                                 (list._childs[0]._childs[i].getChildByName('member_background') as Laya.Image).skin='club/cell_bg.png';//更改背景
//                             }
//                         }
//                         self.deleteUser={index:index,id:list.selectedItem.userid};
//                     });
//                     list.renderHandler=new Handler(this,(cell:Box,index:number):void=>{
//                         if(index>datas.length)return;
//                         let dataList=datas[index];
//                         let targetBoos = (cell.getChildByName('member_list_post') as Laya.Label);
//                         if(dataList.userid==self.CurrentClub.userid){
//                             targetBoos.text="老板";
//                             targetBoos.color="#ff0000";
//                         }else{
//                             targetBoos.text="成员";
//                             targetBoos.color="#000";
//                         }
//                         (cell.getChildByName('member_index') as Laya.Label).text=index.toString();//玩家index
//                         (cell.getChildByName('member_list_id') as Laya.Label).text=dataList.userid;//玩家ID
//                         (cell.getChildByName('member_list_head') as Laya.Image).skin=dataList.head||"head/1.png";//玩家头像
//                         (cell.getChildByName('member_list_name') as Laya.Label).text=dataList.nick;//玩家昵称
//                         (cell.getChildByName('member_list_Gender') as Laya.Label).text=dataList.sex?"男":"女";//玩家性别
//                         (cell.getChildByName('ToexamineBtn') as Laya.Label).visible=false;// 显示审核列表按钮member_list_post
//                         (cell.getChildByName('member_list_post') as Laya.Label).visible=true;// 隐藏状态
//                     });
//                     let names=self.CurrentClub.name,ids=self.CurrentClub.id;
//                     if(!self.CurrentClub.name||!self.CurrentClub.id){
//                         names=self.clubdataxinxi[0].name;
//                         ids=self.clubdataxinxi[0].clubid;
//                     }
//                     (list_content.getChildByName('member_size') as Laya.Label).text=data.all;//总人数
//                     (list_content.getChildByName('member_name') as Laya.Label).text=names;//俱乐部名称
//                     (list_content.getChildByName('member_ID') as Laya.Label).text=ids;//俱乐部ID
//                     _.clubstatus_s.text="职务"; 
//                     //有权限
//                     if(self.CurrentClub.power){
//                         _.member_btn_ground.visible=true;
//                         _.member_exit.visible=false;
//                     }else{//无权限
//                         _.member_btn_ground.visible=false;
//                         _.member_exit.visible=true;
//                     }
//                 }else if(type==2){// 审核列表
//                     let list=_.member_list;
//                     list.array=datas;
//                     let list_content=_.list_footer;
//                     list.scrollBar.elasticBackTime=500;
//                     list.scrollBar.elasticDistance=100;
//                     list.renderHandler=new Handler(this,(cell:Box,index:number):void=>{
//                         if(index>datas.length)return;let dataList=datas[index];
//                         (cell.getChildByName('member_index') as Laya.Label).text=index.toString();//玩家index
//                         (cell.getChildByName('member_list_id') as Laya.Label).text=dataList.userid;//玩家ID
//                         (cell.getChildByName('member_list_head') as Laya.Image).skin=dataList.head||"head/1.png";//玩家头像
//                         (cell.getChildByName('member_list_name') as Laya.Label).text=dataList.nick;//玩家昵称
//                         (cell.getChildByName('member_list_Gender') as Laya.Label).text=dataList.sex?"男":"女";//玩家性别
//                         (cell.getChildByName('ToexamineBtn') as Laya.Label).visible=true;// 隐藏审核列表按钮member_list_post
//                         (cell.getChildByName('member_list_post') as Laya.Label).visible=false;// 隐藏——状态
//                         let Toexamine_adopt=cell.getChildByName('ToexamineBtn').getChildByName('Toexamine_adopt') as Laya.Button;
//                         let Toexamine_refuse=cell.getChildByName('ToexamineBtn').getChildByName('Toexamine_refuse') as Laya.Button;
//                         Toexamine_adopt.offAll();
//                         addClick(Toexamine_adopt,()=>{
//                             sendToOnline(protocol.user_club_join_audit,{clubid:self.CurrentClub.id,id:dataList.userid,op:true});
//                             self.clubMember(3);
//                         },this);// 通过按钮
//                         Toexamine_refuse.offAll();
//                         addClick(Toexamine_refuse,()=>{
//                             sendToOnline(protocol.user_club_join_audit,{clubid:self.CurrentClub.id,id:dataList.userid,op:false})
//                             self.clubMember(3);
//                         },this);// 拒绝按钮
//                     });
//                     let names=self.CurrentClub.name,ids=self.CurrentClub.id;
//                     if(!self.CurrentClub.name||!self.CurrentClub.id){
//                         names=self.clubdataxinxi[0].name;
//                         ids=self.clubdataxinxi[0].clubid;
//                     }
//                     (list_content.getChildByName('member_size') as Laya.Label).text=datas.length.toString();//总人数
//                     (list_content.getChildByName('member_name') as Laya.Label).text=names;//俱乐部名称
//                     (list_content.getChildByName('member_ID') as Laya.Label).text=ids;//俱乐部ID
//                      _.member_btn_ground.visible=false;// 隐藏成员列表操作按钮
//                      _.clubstatus_s.text="状态"; 
//                      _.member_exit.visible=false;//隐藏退出按钮
//                 }
//             }
//         }
//          // 俱乐部 >> 列表增删操作 >> 1:解散2:删除3:退出4:添加 userid:用户id,
//         private clubalerts=(type:number=null,userid=null):void=>{
//             let obj,ids=this.CurrentClub.id;
//             let init=(target)=>{
//                 let alert=this.init_alert(target),_=alert.Determine;alert.zOrder=10001;
//                 return {alert,_}}
//             if(type==1){
//                 obj=init(ui.club.ClubAlertUI);
//                 obj.alert.text.text="确定解散俱乐部吗?";
//                 addClick(obj._,()=>{sendToOnline(protocol.user_club_jiesan,ids)},this);
//             }
//             else if(type==2){
//                 if(!userid){
//                     showTip('您还未选择需要删除的成员!');return;
//                 }else{
//                     obj=init(ui.club.ClubAlertUI);
//                     obj.alert.text.text="确定删除该成员吗?";
//                     addClick(obj._,()=>{
//                         if(userid==Global.UserData.getUserData('id')){
//                             showTip("不可以删除本人");
//                         }else{
//                             sendToOnline(protocol.user_club_delete_player,{clubid:ids,id:userid});
//                         }
//                     },this)};
//             }else if(type==3){
//                 obj=init(ui.club.ClubAlertUI);
//                 obj.alert.text.text="确定退出该俱乐部吗?";
//                 addClick(obj._,()=>{sendToOnline(protocol.user_club_quit_club,ids)},this);
//             }else if(type==4){
//                 obj=init(ui.club.addplayerUI);this.clubAlertObj=obj.alert;
//                 addClick(obj._,()=>{
//                     let userid = obj.alert.userID.text;
//                     if(!userid){
//                         showTip('请输入正确的玩家ID')
//                     }else{
//                         sendToOnline(protocol.user_club_add_player,{clubid:ids,id:Number(userid)})
//                     }
//                 },this);
//                 return;
//             }
//             if(obj.alert.cancel){
//                  // 关闭按钮
//                 addClick(obj.alert.cancel,()=>{
//                     this.toggles(2,obj.alert.content,null,Laya.Handler.create(this,()=>{obj.alert.removeSelf()}))
//                 },this);
//             }else{console.log('找不到取消按钮')};
//             this.clubAlertObj=obj.alert;
//         }
//         // 俱乐部 >> 成员列表及审核列表成功回调
//         private clubListDataset=(type:number=null,data:any=null):void=>{
//             let closeAlert=(target):void=>{
//                 if(target){
//                     target._close();//销毁窗口
//                 }else{
//                     _log('target对象不存在');
//                 }
//             }
//             closeAlert(this.clubAlertObj)//清除弹框
//             switch (type){
//                 case 0://解散俱乐部
//                     showTip('该俱乐部已成功解散');
//                     this.clubRefresh();
//                     break;
//                 case 1:// 删除成员
//                     showTip('该用户已成功删除');
//                     this.deleteUser={};//清空上一次对象
//                     this.clubMember(1);// 刷新成员列表
//                     break;
//                 case 2:// 退出俱乐部
//                     showTip('退出俱乐部成功');
//                     this.clubRefresh();
//                     break;      
//                 case 3:// 添加成员
//                     showTip('已成功添加该成员');
//                     this.clubMember(1);// 刷新成员列表
//                     break;
//             }
//         }
//         // 俱乐部 >> 获取房间设置列表
//         private roomRule=(type:number=null,data:any=null):void=>{
//             if(type==1){
//                 if(!this.CurrentClub.id)Laya.timer.once(1000,this,()=>{this.roomRule(1)});// 如果没有俱乐部id则延时1秒后递归
//                 sendToOnline(protocol.user_club_get_rule,this.CurrentClub.id);
//             }else if(type==2){
//                 if(data){
//                     this.roomRuleData = data;
//                     _log(data);
//                 }else{
//                     this.roomRuleData = {};
//                 }
//             }
//         }
//          // 俱乐部 >> 快速开房
//         private FastOpening=():void=>{
//             let index = Object.keys(this.roomRuleData);
//             if(index.length<=0){
//                 showTip('您还没有设置房间规则');
//             }else{
//                 sendToOnline(protocol.user_agency,{clubid:this.CurrentClub.id,id:this.roomRuleData[index[0]].id});
//             }
//         }
//         // 俱乐部 >> 大厅房间
//         private clubHallRoom=(type:number=null,data:any=null):void=>{
//             // 设置列表底部信息
//             let setFooter = ()=>{
//                 (this.club.clubName as Laya.Label).text=this.CurrentClub.name;//俱乐部名称
//                 (this.club.clubID as Laya.Label).text=this.CurrentClub.id;//俱乐部ID
//             }
//             if(!this.roomRuleData||Object.keys(this.roomRuleData).length==0){
//                 this.roomRule(1)
//             };
//             let self=this,
//             roomdata=this.roomRuleData[Object.keys(this.roomRuleData)[0]];// 获取房间设置列表
//             if(!roomdata){
//                 _log('无俱乐部房间设置列表');
//                 // 无游戏房间
//                 this.club.Roomlist.visible=false;
//                 this.club.room_auto_one.visible=false;
//                 // 设置列表底部信息
//                 setFooter();
//                 this.club.clubTableSize.text='0';// 牌桌数
//                 return;
//             };
//             if(type==1){
//                 this.clubRequest("clubRoom",this.CurrentClub.id)
//             }else if(type==2){
//                 // 设置列表底部信息
//                 setFooter();
//                 this.club.clubTableSize.text=Object.keys(data).length.toString();// 牌桌数
//                 if(roomdata.auto_room_create){
//                     //有自动房间
//                     if(Object.keys(data).length>0){
//                         // 有游戏房间
//                         this.roomRender(1,data,true);
//                     }else{
//                         // 无游戏房间 添加一个自动房间
//                         this.roomRender(2);
//                     }
//                 }else{
//                     //无自动房间
//                     if(Object.keys(data).length>0){
//                         // 有游戏房间
//                         this.roomRender(1,data,false);
//                     }else{
//                         // 无游戏房间
//                         this.club.Roomlist.visible=false;
//                     }
//                 }
//             }
//         }
//         // 俱乐部房间渲染
//         private roomRender=(type:number,data:any=null,auto_room:boolean=false):void=>{
//             let cont = this.club.clubRoom,_=this.club,self=this;cont.visible=true;
//             if(type==1){
//                 if(!data||Object.keys(data).length==0){_.Roomlist.visible=false;return;}
//                 /*普通房间*/
//                 let roomdata=[],autoRoomSwitch=false;//数据,自动房间开关
//                 _.room_auto_one.visible=false;//关闭自动房间图标
//                 let names = Object.keys(data);
//                 for(let i=0;i<=names.length-1;i++){
//                     let box = data[names[i]];
//                     if(auto_room)(box.cur_num==box.player_num)?autoRoomSwitch=true:autoRoomSwitch=false;//判断房间是否满员
//                     let _= {room_index:names[i],data:box,auto_room:false};
//                     if(_){roomdata.push(_)};
//                 }
//                 _.Roomlist.visible=true;
//                 _.Roomlist.array=roomdata;
//                 _.Roomlist.vScrollBarSkin = "";
//                 _.Roomlist.scrollBar.elasticBackTime=500;
//                 _.Roomlist.scrollBar.elasticDistance=100;
//                 _.Roomlist.renderHandler=new Handler(this,(cell:Box,index:number):void=>{
//                     if(index>roomdata.length)return;let dataList=roomdata[index].data;
//                     let target = cell.getChildByName('room_index');
//                     let join_btn = (cell.getChildByName('room_box') as Laya.Button);join_btn.offAll();//进入游戏按钮 背景图片进入
//                     if(roomdata[index].auto_room_open){
//                         // 房间满员自动创建
//                         (target as Laya.Box).visible = false;
//                         (cell.getChildByName('auto_create_data') as Laya.Box).visible=true;
//                         addClick(join_btn,()=>{self.auto_create_room(1);_log("创建自动房间")},this);
//                     }else{
//                         // 正常房间
//                         (target as Laya.Box).visible = true;
//                         (cell.getChildByName('auto_create_data') as Laya.Box).visible=false;
//                         (target.getChildByName('TabelName') as Laya.Label).text=this.roomtype[dataList.type];//游戏类型
//                         (target.getChildByName('cur_num') as Laya.Label).text=dataList.cur_num;//当前玩家数
//                         (target.getChildByName('player_num') as Laya.Label).text=dataList.player_num;//当前最大玩家数
//                         (target.getChildByName('RoomID') as Laya.Label).text=roomdata[index].room_index;//当前房间id
//                         let btn_target=(target.getChildByName('user_agency_dissolve') as Laya.Button);//解散按钮
//                         let InvitingFriends=(target.getChildByName('InvitingFriends') as Laya.Button);//邀请好友
//                         self.roomPlayer(1,target.getChildByName('clubPlayerGroud'),dataList.nick,dataList.head);// 玩家信息渲染
//                         btn_target.offAll();join_btn.offAll();
//                         if(!this.CurrentClub.power){//无权限
//                             btn_target.visible=false;InvitingFriends.x=150;
//                         }else{// 有权限
//                             btn_target.visible=true;InvitingFriends.x=100;
//                             addOnceClick(btn_target,()=>{
//                                 let _=Number(roomdata[index].room_index),data;
//                                 _?data=_:showTip('房间无法解散');
//                                 sendToOnline(protocol.user_agency_dissolve,data);//解散房间
//                             },this);
//                         }
//                         addClick(join_btn,()=>{// 背景图点击进入房间
//                             this.clubOpen=false;//关闭俱乐部定时器
//                             sendToOnline(protocol.user_enter_room,Number(roomdata[index].room_index))},this);
//                     }
//                 });
//                 // 房间满员则添加一个自动房间
//                 if(auto_room&&autoRoomSwitch){_.Roomlist.addItem({room_index:null,data:null,auto_room_open:true})};
//             }else if(type==2){
//                 /*添加单个自动房间*/
//                _.room_auto_one.visible=true;_.Roomlist.visible=false;
//                _.auto_create_btn.offAll();
//                addClick(_.auto_create_btn,()=>{self.auto_create_room(1)},this);
//                addClick(_.auto_create_bg,()=>{self.auto_create_room(1)},this);
//             }
//         }
//         // 俱乐部 >> 自动房间创建
//         private auto_create_room=(type:number,data:any=null):void=>{
//             if(type==1){
//                 let index = Object.keys(this.roomRuleData);
//                 sendToOnline(protocol.user_club_join_room,{clubid:this.CurrentClub.id,id:Number(this.roomRuleData[index[0]].id)})
//             }else{this.clubTab(0);/* 刷新大厅 */}
//         }
//         // 俱乐部 >> 游戏房间玩家信息 1:传入box对象 2传入id
//         private roomPlayer(type:any=null,target:any=null,nicks:any=null,heads:any=null){
//             let nick=Object.keys(nicks),head=Object.keys(heads);
//             if(nick.length==0){
//               target.visible=false;return;
//             }else if(type==1){
//                 target.visible=true;
//                 for(let i=0;i<nick.length;i++){
//                     if(nicks[nick[i]]){
//                         (target.getChildByName(`clubPlayerText_${i+1}`) as Laya.Label).text=nicks[nick[i]];//名称
//                         (target.getChildByName(`clubPlayer_${i+1}`) as Laya.Image).visible=true;//显示头像
//                         if(heads[head[i]]){
//                             (target.getChildByName(`clubPlayer_${i+1}`) as Laya.Image).skin=heads[head[i]];//头像
//                         }
//                     }
//                 }
//             }
//         }
//         // 俱乐部 >> 创建俱乐部 
//         private createClubs=(type:number=null,data:any=null):void=>{
//             let self = this;
//             if(type == 1){
//                 self.init_alertUI= this.init_alert(
//                 ui.club.createClubUI,Laya.Handler.create(this,()=>{ 
//                 addClick(self.init_alertUI.createBtn,(e):void=>{
//                 let content = self.init_alertUI.createName.text;
//                 (content&&content.length<=12)?self.clubRequest("createBlub",content):showTip("俱乐部名称不正确");})}))
//             }else if(type == 2 && data){
//                 showTip("创建俱乐部成功");
//                 self.toggles(2,self.init_alertUI.content,null,Laya.Handler.create(this,()=>{self.init_alertUI.removeSelf()}));// 销毁
//                 this.clubRefresh();
//             };
//         }
//         // 俱乐部 >> 搜索俱乐部 
//         private clubSearch=(type:number=null,data:any=null):void=>{
//             let self = this;
//             switch (type){
//                 case null:
//                     _log("未设置具体操作");
//                     break;
//                 case 1:
//                     self.clubAlert = this.init_alert(ui.club.joinClubUI);// 初始化加入俱乐部弹框并绑定事件
//                         addClick(self.clubAlert.submit,(e):void=>{
//                             let content = Number(self.clubAlert.textContent.text);
//                             if(!content ||content===NaN){showTip("请输入正确的俱乐部ID");return};
//                             self.clubRequest("clubSearch",content);})
//                     break;    
//                 case 2:
//                     if(!data){showTip("无俱乐部数据");return};
//                     let head:Laya.Image = this.clubAlert.head as Laya.Image;// 俱乐部头像
//                     let names:Laya.Text = this.clubAlert.names as Laya.Text;// 昵称
//                     let clubName:Laya.Text = this.clubAlert.clubName as Laya.Text;// 俱乐部名称
//                     this.clubAlert.joinContent.visible = true;// 显示俱乐部
//                     data.head?head.skin=data.head:_log("无俱乐部头像");
//                     names.text=data.nick;
//                     clubName.text=data.name;
//                     addClick(this.clubAlert.joinBtn,()=>{this.clubRequest("joinClub",Number(self.clubAlert.textContent.text))})
//                     break;
//                 case 3:
//                     if(data.length<=0||!data)return;
//                     showTip("请求成功");
//                     self.toggles(2,this.clubAlert.content,null,Laya.Handler.create(this,()=>{this.clubAlert.removeSelf()}));// 销毁
//                     _log(data);
//                     break;    
//             }
//         }
//         // 俱乐部 >> 俱乐部改名
//         private modifyNameClub=(type:number=null,data:any=null)=>{
//             let self = this;
//             if(type ==1){
//                 let obj=this.init_alert(ui.club.modifyNameClubUI,Laya.Handler.create(this,()=>{
//                     obj.zOrder=10002;
//                     addClick(obj.submit_Btn,()=>{
//                         let cangeName = obj.cangeName.text;//获取用户输入
//                         let ids = self.CurrentClub.id;
//                         (cangeName&&cangeName.length>0)?sendToOnline(protocol.user_club_rename,{clubid:ids,name:cangeName}):showTip('您未输入更改的名字');
//                         if(cangeName.length>0){//更改俱乐部名称
//                             let data = self.clubdataxinxi
//                             this.club.clubName.text=cangeName;
//                             for(let i in data){
//                                 if(data[i].clubid == ids){
//                                     data[i].name=cangeName;
//                                     self.CurrentClub.name=cangeName;
//                                 }
//                             }
//                         }
//                     },this)
//                 }));
//                 self.CurrentClub.modifyNameClub=obj;
//             }else if(type==2){
//                 let objs=self.CurrentClub.modifyNameClub;
//                 showTip('更改成功!');
//                 this.toggles(2,objs,null,Laya.Handler.create(this,()=>{objs.removeSelf()}));
//             }
//         }
//         // 俱乐部 >> 房间设置成功后回调
//         private userRoomSet=(data):void=>{
//             if(data){
//                 this.toggles(2,this.createView.content,null,Laya.Handler.create(this,()=>{this.createView.removeSelf()}));
//                 this.roomRule(1);//刷新房间设置列表
//                 this.clubTab();// 调用选项卡判断
//                 showTip('房间设置成功');return;
//             }showTip('房间设置失败请重试');
//         }    
//         // 俱乐部 >> 刷新俱乐部
//         private clubRefresh=():void=>{
//             this.ClubMain();// 开启新的俱乐部
//         }
//         private showSetting(){
//                var setting:ui.settingUI = new ui.settingUI(); 
//                var self = this;
//                addClick(setting.logout, function(){
//                    this.tempDlg = null;
//                    setting.removeSelf();
//                });
//                addClick(setting.closeBtn, function(){
//                    setting.removeSelf();
//                });
//                Laya.stage.addChild(setting);
//         }
//         public recvData(cmd, data):void{
//             let _ = protocol;_log(cmd);
//             if(cmd == protocol.user_enter_room){
//                 runScene(GameScene, data);// 进入游戏场景
//             }else if(cmd == protocol.user_switcher_vertical){       //   666 进入竖版赏金斗地主
//                 // runScene(gameView.hall_sjddz, data);
//                 runScene(GameScene, "sjddz_hall")
//             }else if(cmd == _.user_sign_list){
//                 this.init_Sign_UI(2,data);// 签到列表
//             }else if(cmd == _.user_sign){
//                 this.init_Sign_UI(3,data);// 签到后
//             }else if(cmd == _.user_match_rank_list){
//                 this.list_ui_rander(data);// 金币排行数据 
//             }else if(cmd == protocol.user_re_connect){
//                 this.haveRoom = true;
//                 runScene(GameScene, data);
//             }else if(cmd == protocol.user_reenter_room){
//                 if(data == 1){
//                     this.showCreate();
//                 }else if(data == 2){
//                     this.showEnter();
//                 }
//             }else if(cmd == _.user_agency_list){
//                 this.clubHallRoom(2,data);// 大厅房间列表
//             }else if(cmd == _.user_club_get_club_num){
//                 this.clubdataxinxi=data;// 保存俱乐部数据
//                 this.ClubsizeJudeg(data);// 判断俱乐部数量
//             }else if(cmd == _.user_club_search){
//                 this.clubSearch(2,data); // 获取搜索到的俱乐部信息
//             }else if(cmd == _.user_club_create){
//                 this.createClubs(2,data);// 创建俱乐部
//             }else if(cmd == _.user_club_join){
//                 this.clubSearch(3,data); //加入俱乐部成功
//             }else if(cmd == _.user_club_get_player_list){
//                 this.clubMember(2,data);// 获取俱乐部成员列表
//             }else if(cmd == _.user_club_join_audit_list){
//                 this.clubMember(4,data);// 获取审核玩家列表
//             }else if(cmd == _.user_club_jiesan){
//                 this.clubListDataset(0,data);// 解散俱乐部
//             }else if(cmd == _.user_club_delete_player){
//                 this.clubListDataset(1);// 删除玩家
//             }else if(cmd == _.user_club_quit_club){
//                 this.clubListDataset(2);// 退出俱乐部
//             }else if(cmd == _.user_club_add_player){
//                 this.clubListDataset(3);// 添加成员
//             }else if(cmd == _.user_club_get_rule){
//                 this.roomRule(2,data);//获取房间设置列表 
//             }else if(cmd == _.user_club_rename){
//                 this.modifyNameClub(2,data);//俱乐部改名
//             }else if(cmd == _.user_agency){
//                  this.clubHallRoom(1);showTip('快速开房成功')// 调用大厅房间渲染
//             }else if(cmd == _.user_agency_dissolve){
//                 this.clubHallRoom(1);// 解散房间
//             }else if(cmd == _.user_club_join_room){
//                 this.auto_create_room(2,data);
//             }else if(cmd == _.user_club_set_rule){
//                 this.userRoomSet(data);//房间设置回调
//             }else if(cmd == protocol.user_replay_fight){
//                data.replay = true;
//                runScene(GameScene, data); 
//             }else if(cmd == protocol.user_send_record){
//                 this.showRecord(data);
//             }else if(cmd == _.user_club_get_recod_list){
//                 this.showRecord(data,1);//俱乐部战绩
//             }else if(cmd == _.user_shop_data){
//                 this.ShoppingMall(2,data, this.shopTab);//商场
//             }else if(cmd == _.user_pay_record){
//                 this.ShoppingTab(3,data);//充值记录
//             }
//         }
//         public showReplayCheck(){
//             var input = new ui.club.addplayerUI();     
//             Laya.stage.addChild(input);
//             input.tipText.text = "请输入对局的回放访问码!";
//             addClick(input.close_Btn, function(){
//                 input.removeSelf()
//             })
//             addClick(input.Determine, function(){
//                 if(Number(input.userID.text)){
//                     sendToOnline(protocol.user_replay_fight, Number(input.userID.text));
//                 }else{
//                     showTip("输入的回放码不正确");
//                 }
//             })
//         }
//         // type = 1 时为俱乐部战绩
//         public showRecord(data,type:any=null):void{
//             if(this.onlyView){
//                 this.onlyView.removeSelf();
//             }
//             var panel = new ui.recordUI();
//             this.onlyView = panel;
//             var self = this;
//             var showReplay = false;
//             addClick(panel.backBtn, function(){
//                 if(showReplay){
//                     self.showRecord(data);
//                 }else{
//                     panel.removeSelf();
//                 }
//             })
//             addClick(panel.checkBtn, function(){
//                 self.showReplayCheck();
//             })
//             panel.gameList.renderHandler = new Handler(this, function(cell:Box, index:number){
//                 var btn = (cell as Button);
//                 btn.label = self.roomtype[cell.dataSource];
//                 btn.offAll();
//                  // 俱乐部逻辑
//                 if(!!type&&type==1){
//                      addClick(btn, function(){
//                         panel.gameList.selectedIndex = index;
//                         let target = panel.gameList.selection.dataSource;//获取按钮数据
//                         if(!!target){
//                             sendToOnline(protocol.user_club_get_recod_list,{clubid:this.CurrentClub.id,type:target});
//                             _log({clubid:this.CurrentClub.id,type:target});
//                         }
//                     }, this, true);
//                 }else{
//                     addClick(btn, function(){
//                         panel.gameList.selectedIndex = index;
//                     }, this, true);
//                 }
//             });
//             panel.gameList.selectHandler = new Handler(this, function(index:number){
//                 var cells = panel.gameList.cells;
//                 for(var k in cells){
//                     if(parseInt(k) == index){
//                         cells[k].selected = true;
//                     }else{
//                         cells[k].selected = false;
//                     }
//                 }
//             });
//             var gameArr = ["yzmj", "cardniuniu"];
//             panel.gameList.array = gameArr;
//             panel.gameList.selectedIndex = 0;
//             var dataArr = new Array<Object>();
//             var recArr = null;
//             for(var k in data){
//                 if(typeof(data[k]) == "object"){
//                     dataArr.push(data[k]);
//                 }
//             }
//             panel.itemList.array = dataArr;
//             //回弹效果
//             panel.itemList.scrollBar.elasticDistance = 100;
//             panel.itemList.scrollBar.elasticBackTime = 500;
//             //战绩数据
//             panel.itemList.renderHandler = new Handler(this, function(cell:Box, index:number){
//                 var info = cell.dataSource; 
//                 seekByName(cell, "roomID").text = "房间号：" + info.room_id;
//                 seekByName(cell, "time").text = "时间：" + new Date(info.time * 1000).toLocaleString();
//                 if(showReplay){
//                     seekByName(cell, "scoreBox").visible = false;
//                     seekByName(cell, "replayBox").visible = true;
//                     seekByName(cell, "num").text = "第" + (info.index+1) +"局";
//                     seekByName(cell, "replayID").text = "回放码：" + info.num;
//                     addClick(seekByName(cell, "playBtn"), function(){
//                         sendToOnline(protocol.user_replay_fight, info.num);
//                     }, this, true);
//                 }else{
//                     for(var i = 1; i <= 4; i++){
//                         var name = seekByName(cell, "user" + i);
//                         var score = seekByName(cell, "score" + i);
//                         if(info[i]){
//                             name.text = info[i].name;
//                              score.text = info[i].win;
//                         }else{
//                             name.visible =false;
//                             score.visible = false;
//                         }
//                     }
//                     if(info.replayid && info.replayid.length > 0){
//                         seekByName(cell, "checkReplay").visible = true;
//                         addClick(seekByName(cell, "checkReplay"), function(){
//                             showReplay = true;
//                             recArr = new Array<Object>();
//                             for(var k in info.replayid){
//                                 recArr.push({
//                                     room_id:info.room_id,
//                                     time:info.time,
//                                     index:parseInt(k),
//                                     num:info.replayid[k]
//                                 })
//                             }
//                             panel.itemList.array = recArr;
//                         }, this, true);
//                     }
//                 }
//             })
//             Laya.stage.addChild(panel);
//         }
//         public updateUI(key, data):void{
//             if(key == "enter"){
//                 runScene(GameScene, data);
// 	  	    }
// 	  	    else if(key == "reconnect"){
//                 runScene(GameScene, data);
// 	  	    }
//         }
//     }
// }
// class Item extends Box{
//     private button:Btn;
//     private sel:boolean;
//     private gName:Lab;
//     constructor(){
//         super();
//         this.size(122,55);
//         this.button = new Btn();
//         this.centerX = 0;
//         this.sel = false;
//         this.gName = new Lab("");
//         this.gName.fontSize = 24;
//         this.gName.centerX = 0.5;
//         this.gName.centerY = 0.5;
//         this.addChild(this.button);
//         this.button.addChild(this.gName);
//     }
//     public setImg(src:string){
//         this.button.skin = src;
//         this.button.stateNum = 2;
//     }
//     public setName(name:string){
//         this.gName.text = name;
//         this.gName.color = "#ffffff";
//     }
//     public setSelected(sel:boolean){
//         this.button.selected = sel;
//         this.sel = sel;
//     }
//     public isSel():boolean{
//         return this.sel;
//     }
// }
//# sourceMappingURL=HallScene.js.map