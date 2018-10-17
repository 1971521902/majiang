declare  class Base64{
        static encode(data);
        static decode(data);
}

declare module msgpack{
    function encode(data);
    function decode(data);
}

declare module wx{
    function config(data);
    function login(data);
    function error(func);
    function ready(func);
    function onShow(func);
    function onHide(func);
    function onMenuShareAppMessage(data);
    function onMenuShareTimeline(data);
    function getLocation(data);
    function getLaunchOptionsSync();
    function startRecord();
    function stopRecord(data);
    function playVoice(data);
    function uploadVoice(data);
    function downloadVoice(data);
    function getUserInfo(data);
    function shareAppMessage(data);
    function getLaunchOptionsSync();
    function createUserInfoButton(data);

    // function request(func);
    // function showShareMenu(func);
    // function updateShareMenu(func);
    // function onShareAppMessage(func);
    // function postMessage(func);
    // function previewImage(func);
    // // function request(func);


}

declare module Parse{  
    export class DOMParser{
        parseFromString(data);
    }
}