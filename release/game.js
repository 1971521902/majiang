require("weapp-adapter.js");
require("code.js");
window.msgpack=require("libs/msgpack.js");
window.Parse=require("libs/dom-parser.js");

const screenWidth = wx.getSystemInfoSync().screenWidth;
const screenHeight = wx.getSystemInfoSync().screenHeight;
let openDataContext = wx.getOpenDataContext();
let sharedCanvas = openDataContext.canvas;
let ratio = wx.getSystemInfoSync().pixelRatio;
sharedCanvas.width = screenWidth * ratio;
sharedCanvas.height = screenHeight * ratio;

// window.WxModular = {
//     // 主动分享 被动分享 群分享功能
//     share: ()=>{
//         wx.request({
//             // url: 'https://shop.yunfanshidai.com/xcxht/slyxhz/api/share_info.php?gameid=8',\
//             url: 'https://shop.yunfanshidai.com/xcxht/slyxhz/api/share_info.php?gameid=17',
//             header: {
//                 'content-type': 'application/json' // 默认值
//             },
//             success: function (res) {
//                 // 开启转发功能
//                 wx.showShareMenu({ withShareTicket: true });
//                 // 主动转发
//                 window.shareBTN=()=>{
//                     wx.shareAppMessage({
//                         title: res.data.info,
//                         imageUrl: res.data.image
//                         // imageUrl: canvas.toTempFilePathSync({
//                         //     x: 0,
//                         //     y: 0,
//                         //     width: canvas.width,
//                         //     height: canvas.width/5*4,
//                         //     destWidth: canvas.width,
//                         //     destHeight: canvas.width/5*4,
//                         // })

//                     })
//                 };
//                 // 被动转发
//                 wx.onShareAppMessage(function () {
//                     return {
//                         title: res.data.info,
//                         imageUrl: res.data.image
//                     }
//                 });
//                 // 群分享
//                 var info = wx.getLaunchOptionsSync()
//                 if(info.shareTicket){
//                      wx.postMessage({type:3,data: {shareTicket: info.shareTicket}});//开启群排行
//                 }
//                 // wx.onShow((data)=>{
//                 //     if(data.shareTicket){
//                 //         console.log("此小游戏是通过群分享进入的",data.shareTicket);
//                 //         // 开启群排行
//                 //         window.GROUPSHARE = true; // 全局变量
//                 //         wx.postMessage({type:3,data: {shareTicket: data.shareTicket}});//开启群排行
//                 //     }
//                 // });
//             }
//         })
//     },
//     // 更多游戏
//     MoreGames: ()=>{
//         wx.request({
//             url: "https://shop.yunfanshidai.com/xcxht/slyxhz/api/get_extend.php?gameid=8",
//             header: {
//                 'content-type': 'application/json' // 默认值
//             },
//             success: (res)=>{
//                 if(!!res.data.pic){
//                     wx.previewImage({
//                         urls: [
//                             res.data.pic
//                         ]
//                     })
//                 }else{
//                     console.log("分享图请求失败",res);
//                 }
//             }
//         });
//     },
//     // 游戏圈
//     gameClub: ()=>{

//     },
//     // 截屏
//     Screenshot: (type)=>{
//         // 5:4  canvas.height/2-(canvas.width/5*4)/2
//         if(type === 1 ){
//             return canvas.toTempFilePathSync({
//                 x: 0,
//                 y: 0,
//                 width: canvas.width,
//                 height: canvas.width/5*4,
//                 destWidth: canvas.width,
//                 destHeight: canvas.width/5*4,
//             });
//         }else if(type === 2){
//             // 全屏
//             return canvas.toTempFilePathSync({
//                 x: 0,
//                 y: 0,
//                 width: canvas.width,
//                 height: canvas.height,
//                 destWidth: canvas.width,
//                 destHeight: canvas.height,
//             });
//         }
//     },
//     // 排行榜
//     Ranking: (types, data)=>{
//         wx.postMessage({ type: types, score: data });
//     }
// };
// window.WxModular.share()