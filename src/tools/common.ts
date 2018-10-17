var Poker = { 
    0x01:"wan1", 0x02:"wan2", 0x03:"wan3", 0x04:"wan4", 0x05:"wan5", 0x06:"wan6", 0x07:"wan7", 0x08:"wan8", 0x09:"wan9",
    0x11:"tiao1", 0x12:"tiao2", 0x13:"tiao3", 0x14:"tiao4", 0x15:"tiao5", 0x16:"tiao6", 0x17:"tiao7", 0x18:"tiao8", 0x19:"tiao9",
    0x21:"tong1", 0x22:"tong2", 0x23:"tong3", 0x24:"tong4", 0x25:"tong5", 0x26:"tong6", 0x27:"tong7", 0x28:"tong8", 0x29:"tong9",
    0x31:"dong", 0x32:"nan", 0x33:"xi", 0x34:"bei", 0x35:"zhong", 0x36:"fa", 0x37:"bai",
  	0x41:"chun", 0x42:"xia", 0x43:"qiu", 0x44:"don", 0x45:"mei", 0x46:"lan", 0x47:"ju", 0x48:"zhu",
}

var NetWork = (function(){
	var instance = null;
	var connId = null;
	function getNetworkInstance(){
		var networkInstance = {
			socket:null,
			isInit:false,
			totalLen:0,
			msgCache:null,
			buffer:null,
			msgs:null,
			workDone:true,
			connTimes:1,
			analyProto:function(result){
						instance.buffer.push(result);
						if(instance.workDone){ //协议处理已完成
							instance.workDone = false;
							while(instance.buffer.length > 0){
								var buf = instance.buffer.shift();
								var msgLen = buf.byteLength;
								if(instance.totalLen == 0 && msgLen >= 5){ //还没有协议
									var dv
									if(instance.msgCache.byteLength > 0){ //有缓存到的分包数据
										var temp = new ArrayBuffer(instance.msgCache.byteLength + msgLen);
										msgLen += instance.msgCache.byteLength;  //长度与上一条协议分包数据结合

										var u8 = new Uint8Array(temp);
										u8.set(new Uint8Array(instance.msgCache), 0);
										u8.set(new Uint8Array(buf), instance.msgCache.byteLength);
										dv = new DataView(temp)
										buf = temp
									}else{
										dv = new DataView(buf);
									}
									instance.totalLen = dv.getUint16(0) + 2;
									// console.log("cmd:" + dv.getUint16(2))
									instance.msgCache = new ArrayBuffer(0);
								}
								
								if((instance.totalLen >= 5) && (instance.msgCache.byteLength + msgLen >= instance.totalLen)){
									var temp = new ArrayBuffer(instance.totalLen);
									var u8 = new Uint8Array(temp);
									u8.set(new Uint8Array(instance.msgCache),0)
									
									var bufView = new Uint8Array(buf);
									for(var i = 0; i < instance.totalLen - instance.msgCache.byteLength ; i++){
										u8[instance.msgCache.byteLength + i] = bufView[i];
									}
									
									var left = null;
									if(instance.msgCache.byteLength + msgLen > instance.totalLen){ //分包
									    left = new Uint8Array(instance.msgCache.byteLength + msgLen - instance.totalLen);
										for(var i = 0; i < left.length; i++){
											left[i] = bufView[buf.byteLength - (instance.msgCache.byteLength + msgLen - instance.totalLen) + i];
										}
									 }
									
									instance.msgCache = temp
									
									var dv
									dv = new DataView(instance.msgCache)
									var cmd = dv.getUint16(2)

									if(cmd == 505){
										instance.connTimes++;
										recvOnlineData(cmd, dv.getUint32(5));
									}else{
										var packLen = dv.getUint16(5)
										var msg = instance.msgCache.slice(7);
										
										if(Global.front_runnng && Global.protQueue.length == 0){
											var aa = new Uint8Array(msg)
											 recvOnlineData(cmd, msgpack.decode(new Uint8Array(msg)))	
										}else{
											Global.protQueue.push({cmd:cmd, msg:msg})
										}
									}
									
									if(left){
										instance.buffer.push(left.buffer);
									}
							
									instance.totalLen = 0;
									instance.msgCache = new ArrayBuffer(0);
								}else{
									var temp = new ArrayBuffer(instance.msgCache.byteLength + msgLen)
									var u8 = new Uint8Array(temp);
									u8.set(new Uint8Array(instance.msgCache), 0);
									u8.set(new Uint8Array(buf), instance.msgCache.byteLength);
									instance.msgCache = temp

								}
							}
							instance.workDone = true;
							instance.doMsg()
						}
					},
			doMsg:function(){
					if(this.msgs.length == 0 || !this.workDone){
						return;
					}
					var data = this.msgs.shift();
					var self = this;
					if(data instanceof ArrayBuffer){
						this.analyProto(data);
					}else{
						var reader = new FileReader();
						reader.readAsArrayBuffer(data);
						reader.onload = function(e){
							self.analyProto(reader.result);
						}
					}
			},
			initNetWork:function(ip, port, cbk){
				// this.socket = new WebSocket("wss://" + ip + ":" + (port+1));
				this.socket = new WebSocket("ws://" + ip + ":" + port);
				// this.socket = new WebSocket("wss://h5test.yunfanshidai.com:888");
				// this.socket = new WebSocket("wss://sjddztest.yunfanshidai.com:16250");

				this.socket.id = new Date().getTime();
				connId = this.socket.id;
				this.connTimes = 1;
				this.socket.onopen = function(evt){
					console.log("onopen");
					instance.isInit = true;
					instance.totalLen = 0;
					instance.msgCache = new ArrayBuffer(0);
					instance.buffer = [];
					instance.msgs = [];
					if(cbk != null){
						cbk();
					}
				};
				this.socket.onmessage = function(evt){
					var data = evt.data;
					instance.msgs.push(data);
					
					instance.doMsg();
				
					console.log("on message");
				};
				this.socket.onerror = function(evt){
					console.log("on error");
				};
				this.socket.onclose = function(evt){
					// APP.run(AutoScene, {tip:"服务器断开连接，正在重新连接！"})
					if(this.id == connId){
						console.log("on close");
						Global.Clock.clear();
						showTip("网络较慢请检查网络!,或退出游戏重进")
						runScene(gameView.LoginScene, {tip:"网络较慢请检查网络!"});
					}
				};
			},
			send:function(data){
				if(!this.isInit){
					
				}else if(this.socket.readyState == WebSocket.OPEN){
					console.log("send");
					this.socket.send(data);
				}else{
					console.log("state is" + this.socket.readyState);
				}
			},
			close:function(){
				if(this.socket){
					this.socket.close();
					this.socket = null;
				}
			},
			alive:function(){
				if(instance.connTimes-- <= 0){
					// runScene(gameView.LoginScene, {tip:"网络较慢请检查网络!"});
					NetWork.getInstance().initNetWork(Global.UserData.getSessionData("ip"), Global.UserData.getSessionData("port"), function () {
						sendToOnline(500, {
						  "id": Global.UserData.getSessionData("user_id"),
                            "time": Global.UserData.getSessionData("time"),
                            "session": Global.UserData.getSessionData("session"),
                            "game": "cardsjddz",
                            "nick":Global.UserData.getUserData("name"),
                            "headimgurl":Global.UserData.getUserData("head"),
                            "sex":Global.UserData.getUserData("sex"),
                            "qd": 1,
					});
					Global.is_loading = true
				});
				}else{
					sendToOnline(protocol.user_keep_alive, null);
				}
				
			}
		};
		return networkInstance;
	};
	
	return {
		getInstance:function(){
			if(instance == null){
				instance = getNetworkInstance();
			}
			return instance;
		}
	}
})();

var sendToOnline = function(cmd, data=null){
	var sendData
	if(data != null){
		sendData = msgpack.encode(data)
	}
	var msgLen = sendData ? sendData.length : 0;

	var len = msgLen + 5 + 2
	
	var buffer = new ArrayBuffer(len);
	var dv = new DataView(buffer);
	
	dv.setUint16(0, len - 2, false);
	dv.setUint16(2, cmd, false);
	dv.setUint8(4, 2);

	if(msgLen > 0){
		dv.setUint16(5, msgLen);
		for(var i = 0; i < msgLen; i++){
			dv.setInt8(7 + i, sendData[i]);
		}
	}
	console.log("=====socket send==========")
	console.log("cmd:" + cmd + "   len:" + msgLen);
	NetWork.getInstance().send(buffer);
	console.log("=====send end==========")
}
function showjiazai(shijian = null){
	var is_loading = new Laya.Sprite();
	is_loading.loadImage("wxlocal/game_bg.png", 0, 0, 720, 1280);
	is_loading.zOrder=10002;
	Laya.stage.addChild(is_loading);

	var jiazai = new Laya.Image("wxlocal/loading_image.png");
	jiazai.zOrder=10002;
	jiazai.x = Laya.stage.width/2
	jiazai.y = Laya.stage.height/2
	jiazai.width = 100
	jiazai.height = 100	
	jiazai.anchorX = 0.5
	jiazai.anchorY = 0.5
	jiazai.tag = 889
	Laya.stage.addChild(jiazai);

	var time = 4	
	if(shijian){
		time = shijian
	}
	// Global.Clock.addTimeFun("loading",function(){
	// 	time = time - 1
	// 	if(time<0){
	// 		Global.Clock.removeTimeFun("loading");
	// 		jiazai.removeSelf();
	// 	}
	// }, 0.5);
	// Laya.Tween.to(jiazai,{rotation:360},4000);
	Laya.Tween.to(jiazai,{rotation:360}, shijian*100, null, Handler.create(this,function(obj){
		jiazai.removeSelf();
	}, [jiazai]),0);
	return {login_icon:jiazai}
}
var recvOnlineData = function(cmd, data){
	console.log("=-------------------")
	console.log(cmd)
	console.log(data)
	// if(Global.is_jiazai_quan){
	// 	Global.is_jiazai_quan.bg && Global.is_jiazai_quan.bg.destroy() 
	// 	Global.is_jiazai_quan.login_icon && Global.is_jiazai_quan.login_icon.destroy();
	// 	Global.is_jiazai_quan = null
	// }
	if(cmd == 999){
		if(typeof data == "number"){
			 showTip(errorcode[data] || "unknow errorcode " + data)
		}else{
			 showTip(data)
		}
	}
	if(cmd == protocol.user_login){
		Global.UserData.setUserData(data);
		Global.UserData.setUserDataByKey("version",Global.VERSION)
		Global.Clock.addTimeFun("alive", function(){
			NetWork.getInstance().alive();
		}, 1);
		if(data && data["shangjing"] ){        // 赏金场赢的场次
			Global.sjwin_num = data["shangjing"].win_num
		}else{
			Global.sjwin_num = 0
		}
		if(Global.APP instanceof gameView.LoginScene){
			runScene(gameView.hall_sjddz,data); 
		}
		
		if (Global.share_callback) {          
			if(Global.share_callback["key"] == "new_player"){         	// 分享新玩家   保存全局数据    登陆时候发送4005
				sendToOnline(protocol.user_sjddz_share_new_player, Number(Global.share_callback["userid"]) );          
			}else{														// 分享当天第一次进入游戏   保存全局数据    登陆时候发送4001
				sendToOnline(protocol.user_sjddz_share_touch, Number(Global.share_callback["userid"]) );
			}
		}

		sendToOnline(protocol.user_sjddz_share_new_player, 307206 ); 
		//   排行榜 
		if (window["WxModular"]) {
			if(wx){
				wx["postMessage"]({
					type:1,
					data:{
						score: Global.UserData.getUserData("shangjing").remain_money.toFixed(2), // 得分
					}// 	
				});
				wx["postMessage"]({
					type:5,
				});
			}
		}
	}else if(cmd == protocol.user_hudong_sjddz_hall){         // 1164   返回大厅清空
		Global.sjwin_num = data.win_num
		runScene(gameView.hall_sjddz);
	}else if(cmd == protocol.user_keep_alive){
		var t =	new Date();
		t.setTime(data * 1000);
		console.log(t.toLocaleDateString() + " "+ t.toLocaleTimeString());
	}else if(cmd == protocol.user_update_room_card){  		// 房卡 624
		var delta = Number(data) - Global.UserData.getUserData("room_card")
		Global.UserData.setUserDataByKey("room_card",delta)
	}else if(cmd == protocol.user_update_yxb){  			// 刷新金币 670
		var delta = Number(data) - Global.UserData.getUserData("yxb")
		Global.UserData.setUserDataByKey("yxb",data)
		Global.APP.updateUI("yxb", delta)
	}else if(cmd == protocol.user_update_fuhuoka){  		// 刷新复活卡 1168
		var delta = Number(data["relive_card_num"]) - Global.UserData.getUserDataBy_data_key("relive_card_num","shangjing")
		Global.UserData.setUserDataBy_data_key("relive_card_num",data["relive_card_num"],"shangjing")
		Global.APP.updateUI("relive_card_num", delta)
	}else if(cmd == protocol.user_gold_compensate){  		// 显示送金币分享到群 2005
		var time = 2
		Global.Clock.addTimeFun("goldshare_gold",function(){
			time = time - 1
			if(time<0){
				showGoldshare_gold(data)
				Global.Clock.removeTimeFun("goldshare_gold");
			}
		}, 0.5);
	}else if(cmd == protocol.user_gold_compensate){  		//确定按钮送金币 2006
		showTip("领取成功，恭喜你获得2000金币")
	}else if(cmd == protocol.user_room_exit_state){ //重连时的解散房间状态
		Global.CacheData["clear_state"] = data;
	}else{
		  Global.APP.recvData(cmd, data)
	}
}

function runScene(scene, arg = null, reset = null){
	 Laya.stage.removeChildren();
	 Global.APP = new scene(arg);
	 if(reset == "loading" || Global.is_jiazai_quan ){
		showloading(0.5)
	 }
}
function showloading(shijian = null){
	var sp = new Laya.Image("wxlocal/game_bg.png")
	Laya.stage.addChild(sp)
	sp.zOrder =999999;
	// var is_loading = new ui.sjddz.loadingUI();
	// is_loading.zOrder=999999;
	// Laya.stage.addChild(is_loading);
	
	var time = 2
	if(shijian){
		time = shijian
	}
	Global.Clock.addTimeFun("loading",function(){
		time = time - 1
		if(time<0){
			Global.Clock.removeTimeFun("loading");
			Laya.stage.removeChild(sp);
		}
	}, 0.5);
	// var jiazai = seekByName(is_loading,"jiazai")
	// Laya.Tween.to(jiazai,{rotation:360},3000);
	// return is_loading
}
// function switchover(test){        // 切换 横 竖版
// 	  if(test == "heng"){
// 		Laya["_isinit"] = false;
// 		Laya.MouseManager.instance["_eventList"] = [];
//       	Laya.init(1280, 720);
//       	Laya.stage.scaleMode = "exactfit"
//       	Laya.stage.screenMode = "horizontal";
// 		Global.Clock = new ClockClass;
// 	  }else if(test == "shu"){
// 		Laya["_isinit"] = false;
// 		Laya.MouseManager.instance["_eventList"] = [];
// 		Laya.init(720, 1280);
// 		Laya.stage.scaleMode = "exactfit"
// 		Laya.stage.screenMode = "vertical";
// 		Global.Clock = new ClockClass;
// 	  }
// }

function http(ip, callback){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", ip,true);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			var result;
			if(xhr.responseText.indexOf("\{") != -1){
				var response = xhr.responseText.substr(1,xhr.response.length-2);
				
			    result = JSON.parse(response);
			}else{
				result = xhr.responseText;
			}
			
			if(callback){
				callback(result)
			}
		}
	}
	xhr.send();	
}
function httpPost(query, args, callback, target, params= null, isSync = null) {
    var httpClient = new XMLHttpRequest();
    var url = query;
    httpClient.open("POST", url, isSync == true ? false : true);
    httpClient.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var self = this;
    httpClient.onreadystatechange = function () {
        if (httpClient.readyState == 4 && (httpClient.status >= 200 && httpClient.status <= 207)) {
            var callbackParams = [httpClient.responseText];
            if (params) {
                callbackParams.push(params);
            }
            callback.apply(target, callbackParams);
        }
    }
    if (typeof(args) == "object") {
        var argsStr = "";
        for (var i in args) {
            argsStr += (argsStr == "" ? "" : "&") + i + "=" + args[i];
        }
        args = argsStr;
    }
    httpClient.send(args);
}

function addClick(btn:Button, func, caller = null, removeAll=false, args=null):void{
  if(removeAll){
	  btn.offAll(Laya.Event.CLICK);
  }
  btn.on(Laya.Event.CLICK, caller, func, args);    
}

// 单次点击
function addOnceClick(btn:Button, func, caller = null):void{
	btn.offAll();
  	btn.on(Laya.Event.CLICK, caller, func);    
}

//批量清除点击事件
let deleClick=(btnGround:any, func, caller = null):void=>{
	let _=(target)=>{target.off(Laya.Event.CLICK, caller, func);}
	if(Array.isArray(btnGround))for(let i=btnGround.length;i--;){_(btnGround[i])}
	else{_(btnGround)};
}

function addSelect(box:CheckBox, func, caller = null):void{
	box.on(Laya.Event.CHANGE, caller, func, [box]);
}

function seekByName(obj, name){
	var find;
	if(obj && obj._childs.length > 0){
		for(var k in obj._childs){
			if(obj._childs[k].name == name){
				find = obj._childs[k];
				break;
			}else{
				var temp = seekByName(obj._childs[k], name);
				if(temp){
					find = temp;
					break;
				}
			}
		}
	}
	return find;
}


function showTip(msg){
	var bg = new Laya.Image("public/tips_bg.png");
	bg.centerX = 0;
	bg.centerY = 100;
	bg.anchorX = 0.5;
	bg.anchorY = 0.5;

	var text = new Laya.Label(msg + "");
	text.anchorX = 0.5;
	text.anchorY = 0.5;
	text.fontSize = 40;
	text.color = "#ffffff";
	text.x = 380;
	text.y = 25;
	bg.addChild(text);

	bg.zOrder=10002;
	Laya.stage.addChild(bg);

	Laya.Tween.to(bg, {centerY : -100}, 800, null, Handler.create(this,function(obj){
		Laya.timer.once(1000, this, function(arg){
			Laya.stage.removeChild(arg);
		}, [obj])
	}, [bg]),0);
}

function getPokerstr(pokers){
    if (pokers){
        var pok = []
        for (var key in pokers){
            var kind = ["fan", "mei", "xin","hei"]
            var hua = Math.floor(pokers[key] / 16) - 1
            var value = (pokers[key] % 16)
            var name = ""
            if (hua == 3 && value > 13){
                name = "gui" +(value - 13)
            }else{
                name = kind[hua]+(pokers[key] % 16)
            }
            pok.push(name)
        }
        return pok
    }else{
        return
    }
}
function CurentTime(){ 
        var now = new Date();

        var year = now.getFullYear();       //年   
        var month = now.getMonth() + 1;     //月   
        var day = now.getDate();            //日

        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分   
        var ss = now.getSeconds();           //秒
        var clock = ""
        
        if (hh < 10)
            clock += "0";
        	clock += hh + ":";
        if (mm < 10) clock += '0'; 
        	clock += mm + ":"; 
        if (ss < 10) clock += '0'; 
        	clock += ss; 
        return(clock); 
}

function playMusic(mus){
	laya.media.SoundManager.playMusic(mus);
}

function playSound(sou){
	laya.media.SoundManager.playSound(sou);
}

// let ajax = (request:string)=>{
// 	return new Promise((resolve,reject)=>{
// 		let ajax = new XMLHttpRequest();
// 		ajax.open('GET',request,true);
// 		ajax.onreadystatechange=()=>{
// 			if(ajax.readyState===4){
// 				if(ajax.status===200){
// 					resolve(JSON.parse(ajax.response));
// 				}else{
// 					reject(this.response);
// 				}
// 			}
// 		}
// 		ajax.send();
// 	})
// }

// 特殊打印
let _log=(text:any,font:number=30,color:string='#cc3535'):void=>{
	try{
		console.log(`%c${JSON.stringify(text)}`,`font-size:${font}px;color:${color};font-family:fantasy;word-wrap:break-word;`);
	}catch(err){
		console.log(text);console.error('打印对象有错误');
	}
}

function getPara(key, url = null){
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
    var r = (url != null ? url : window.location.search.substr(1)).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
}


function setWxInfo(data){
  var para = {
		hall:{
			title:"云帆棋牌",
			desc:"快快来加入吧",
		},
		game:{
			title:"麻将游戏",
			desc:"测试分享",
		}
   }

   Global.YfSDK["showShare"](
	   data.title || para[data.kind].title, 
	   data.desc || para[data.kind].desc, 
	   "http://wawa.yunfanshidai.com/h5game/icon.png");

//    if(data.share == 1){
// 	  wx.onMenuShareAppMessage({
// 			title:data.title || para[data.kind].title,
// 			desc: data.desc || para[data.kind].desc, 
// 			link: 'http://h.yunfanshidai.com/index.php?ac=game&id=196',
// 			imgUrl:Global.UserData.getUserData("head"),
// 			type: 'link',
// 			dataUrl: '',
// 			success: function () {
// 				alert('转发成功！');
// 			},
// 			cancel: function () {
// 				alert('转发失败！');
// 			}
// 		});
//    }else if(data.share == 2){
// 		wx.onMenuShareTimeline({
// 		    title: '云帆棋牌', // 分享标题
// 		    link:'http://h.yunfanshidai.com/index.php?ac=game&id=196', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
// 		    imgUrl: 'http://wawa.yunfanshidai.com/h5game/icon.png', // 分享图标
// 		    success: function () {
// 		    // 用户确认分享后执行的回调函数
// 			}
//   	 	});
//    }
}

function rad(deg){
	return deg * Math.PI / 180;
}
					//经度1       纬度1     经度2        纬度2
function getDistance(longitude1,latitude1 ,longitude2, latitude2){
	var lat1 = rad(latitude1);
	var lat2 = rad(latitude2);
	var a = lat1 - lat2;  //纬度差
	var b = rad(longitude1) - rad(longitude2);  //经度差
	var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(b / 2), 2)));
	s = s * 6378137; //弧长乘地球半径，（米）；
	return s;
}
function showUserInfo_shu(info){
	let user = new ui.sjddz.userinfo_shuUI();
	user.user_id.text=info.id;
	user.user_ip.text=info.ip;
	user.user_name.text=info.name;
	user.user_head.skin = info.head || "head/" + (info.tid || 1) + ".png";


	addClick(user.close_Btn, function(){
		user.removeSelf();
	})
	Laya.stage.addChild(user);
}

String.prototype["replaceAll"] = function(s1,s2){ 
	return this.replace(new RegExp(s1,"gm"),s2); 
}
 function copy_table(data){
	var  copyobj = {}
	for(var key in data){
		copyobj[key] = data[key]
	}
	return copyobj
}
 function copy_Array(data){
	var  copyarr = []
	for(var k = 0;k<data.length;k++){
		copyarr.push(data[k])
	}
	return copyarr
}
function returnArray(data){
	var  copyarr = []
	for(var k = data.length-1;k>=0;k--){
		copyarr.push(data[k])
	}
	return copyarr
}


//将字符串的换行符转义
function cvtToNewline(str){
	return str.replace(/\\n/g, "\n"); 
}

// 格式化时间戳
let showtimes = (time)=>{
	if (time) {
		var date = new Date(time*1000);
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var D = date.getDate() + ' ';
		var h = date.getHours() + ':';
		var m = date.getMinutes() + ':';
		var s = date.getSeconds();
		return (M + D + h + m);
	}else{
		_log('请传入正	确的时间戳');
		return new Date();
	}
}
//  玩家名字    截取字符串名字长度
function getByteLen(val,leng) {
    var len = 0;  
    var temp
    for (var i = 0; i < val.length; i++){
        var a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null) {
        	//  汉字  2个字节
            len += 2;
            leng = leng -1
        }
        else {
        	// 数字 1 个字节
            len += 1;
        }
        // 截取长度
        if(len >= leng){
        	temp = val.slice(0,leng - 1)
			temp = temp + ".."
        	return temp;
        }
    }
	return val;
}
function createAni(name, num){
	var info = name;
	var urls = [];
	for(var i = 1; i <= num; i++){
		urls.push("effect/"+ name + "/" + (info  )+ i + ".png");
	}
	var ani = new Laya.Animation();
	ani.loadImages(urls).play(0, false);
	ani.pos(-150 ,0);
	ani.interval = 200;
	ani.on(Laya.Event.COMPLETE,this,function(){
		ani.removeSelf();
	});
	return ani
	// Laya.stage.addChild(ani);
}
function createAni_huodng(name, num){
	var info = name;
	var urls = [];
	for(var i = 1; i <= num; i++){
		urls.push("hudong/" + (name  )+ i + ".png");
	}
	var ani = new Laya.Animation();
	ani.loadImages(urls).play(0, false);
	ani.pos(-100 ,-100);
	ani.interval = 200;
	ani.on(Laya.Event.COMPLETE,this,function(){
		ani.removeSelf();
	});
	return ani
	// Laya.stage.addChild(ani);
}
// // 转发
function shareSuccess(){
    sendToOnline(protocol.user_get_resurrection,1);
}

function showGoldshare_gold(data=null){            	// 分享群送金币
	let share_gold = new ui.sjddz.share_goldUI();
	addClick(share_gold.share, function(){
		sendToOnline(protocol.user_gold_compensate_get)
		if(window["shareBTN"]){
			window["shareBTN"]()
		}
		share_gold.removeSelf();
	})
	if(data){
		seekByName(share_gold,"pochan_num").text = data + "金币"
	}
	addClick(share_gold.closeBtn, function(){
		share_gold.removeSelf();
	})
	Laya.stage.addChild(share_gold);
	share_gold.zOrder = 9999
}

function get_gold_and_resurrection (data,type){            	// 领取 金币   复活卡
	let action_gain = new ui.sjddz.action_gain_goldUI();
	if(type == "gold"){
		seekByName(action_gain,"conunt_num").text = "金币×" + data
	}else if(type == "fuhuoka"){
		seekByName(action_gain,"get_icon").skin = "ddz/get_fuhuoka.png"
		seekByName(action_gain,"conunt_num").text = "复活卡×" + data
	}

	addClick(action_gain.lingqu, function(){
		if(type == "gold"){
			showTip("获得金币+"+data +"祝您游戏愉快！")
		}else if(type == "fuhuoka"){
			showTip("获得复活卡+"+data +"祝您游戏愉快！")
		}
		
		action_gain.removeSelf();
	})
	Laya.stage.addChild(action_gain);
	action_gain.zOrder = 9999
}



//    微信开发工具的  写在这里
function share_and_advertising(){         
	window["WxModular"] = {
	// 主动分享 被动分享 群分享功能
	share: () => {
		wx["request"]({
		url: 'https://shop.yunfanshidai.com/xcxht/slyxhz/api/share_info.php?gameid=17',
		header: {
			'content-type': 'application/json' // 默认值
		},
		success: function (res) {
			// 开启转发功能
			wx["showShareMenu"]({ withShareTicket: true });
			// 主动转发
			window["shareBTN"] = (query) => {
			wx.shareAppMessage({
				title: res.data.info,
				imageUrl: res.data.image,
				// imageUrl: canvas.toTempFilePathSync({
				//     x: 0,
				//     y: 0,
				//     width: canvas.width,
				//     height: canvas.width/5*4,
				//     destWidth: canvas.width,
				//     destHeight: canvas.width/5*4,
				// })
				query: query &&  "userid="+ query.userid + "&key2="+ query.key || null ,

			}),
				wx["updateShareMenu"]({
					withShareTicket: true
				})
			};
			// 被动转发
			wx["onShareAppMessage"](function () {
			return {
				title: res.data.info,
				imageUrl: res.data.image
			}
			});
			// 群分享
			var info = wx.getLaunchOptionsSync()
			if (info.query){
				if (info.query["userid"]){
					Global.share_callback = info.query
				}
			}


			if (info.shareTicket) {
				wx["postMessage"]({ type: 3, data: { shareTicket: info.shareTicket } });//开启群排行
			}
			// wx.onShow((data)=>{
			//     if(data.shareTicket){
			//         console.log("此小游戏是通过群分享进入的",data.shareTicket);
			//         // 开启群排行
			//         window.GROUPSHARE = true; // 全局变量
			//         wx.postMessage({type:3,data: {shareTicket: data.shareTicket}});//开启群排行
			//     }
			// });
		}
		})
	},
	// 更多游戏
	MoreGames: () => {
		wx["request"]({
		url: "https://shop.yunfanshidai.com/xcxht/slyxhz/api/get_extend.php?gameid=8",
		header: {
			'content-type': 'application/json' // 默认值
		},
		success: (res) => {
			if (!!res.data.pic) {
			wx["previewImage"]({
				urls: [
				res.data.pic
				]
			})
			} else {
			console.log("分享图请求失败", res);
			}
		}
		});
	},
	// 游戏圈
	gameClub: () => {

	},
	// 截屏
	Screenshot: (type) => {
		// 5:4  canvas.height/2-(canvas.width/5*4)/2
		if (type === 1) {
		return window["canvas"].toTempFilePathSync({
			x: 0,
			y: 0,
			width: window["canvas"].width,
			height: window["canvas"].width / 5 * 4,
			destWidth: window["canvas"].width,
			destHeight: window["canvas"].width / 5 * 4,
		});
		} else if (type === 2) {
		// 全屏
		return window["canvas"].toTempFilePathSync({
			x: 0,
			y: 0,
			width: window["canvas"].width,
			height: window["canvas"].height,
			destWidth: window["canvas"].width,
			destHeight: window["canvas"].height,
		});
		}
	},
	// 排行榜
	Ranking: (types, data) => {
		wx["postMessage"]({ type: types, score: data });
	}
	};
	if(window["WxModular"]){
		window["WxModular"].share()
	}

	// 公众号广告
	window["bannerAd"] = wx["createBannerAd"]({
	adUnitId: 'adunit-adc05b846dcfedd2',
		style: {
		left: 0,
		top: 0,
		width: window.innerWidth
	}
	});
	// window.setTimeout(() => { let bottom = window.innerHeight - bannerAd.style.realHeight; bannerAd.style.top = bottom }, 1000);

	window["bannerAd"].onLoad(() => {
	console.log('banner 广告加载成功')
	})

	//   //bannerAd.show()
	//   //.then(() => console.log('banner 广告显示'))

	//  // 视频广告   得复活卡
	window["videoAd"] = wx["createRewardedVideoAd"]({
	adUnitId: 'adunit-9065ac86fde66288'
	})
	// window["videoAd"].load()
	//   .then(() => window["videoAd"].show())
	//   .catch(err => console.log(err.errMsg))

	window["videoAd"].onClose(res => {
		// 用户点击了【关闭广告】按钮
		// 小于 2.1.0 的基础库版本，res 是一个 undefined
		if (res && res.isEnded || res === undefined) {
		// 正常播放结束，可以下发游戏奖励
		console.log("正常播放结束，可以下发游戏奖励")
		//  看完视频后    获得一张复活卡   1161
			sendToOnline(protocol.user_get_resurrection,1);
		}
		else {
			// 播放中途退出，不下发游戏奖励
		console.log("播放中途退出，不下发游戏奖励")
		}
	})

}