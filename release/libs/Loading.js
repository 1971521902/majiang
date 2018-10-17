var yftools;!function(o){
		var s=function(){
			function o(o,s,r,str){
				var t=this;this.resArr=o,
				this.callback=s,
				Laya.stage.removeChildren(),
				this.box=new Laya.Box,
				this.box.left=0,
				this.box.right=0,
				this.box.top=0,
				this.box.bottom=0,
				Laya.stage.addChild(this.box);
				var img = "wxlocal/login_bg.png"
				if(str){
					img = str
				}
				var e=new Laya.Image(img);
				this.box.addChild(e),this.progress=new Laya.ProgressBar("wxlocal/pro.png"),
				this.progress.value=0,
				this.progress.anchorX=.5,
				this.progress.anchorY=.5,
				this.progress.centerX=0,
				this.progress.bottom=150,
				this.box.addChild(this.progress);
				var a=new Laya.Label("资源加载中。。。");
				a.color="#ffffff",
				a.centerX=0,
				a.bottom=180,
				a.fontSize=30,
				a.bold=!0,
				this.box.addChild(a),
				Laya.loader.load(this.resArr,Handler.create(this,function(o){s&&(s.apply(o),
					t.box.removeSelf(),t.box=null)},[r]),
					Handler.create(this,this.onProgress,null,!1))}return o.prototype.onProgress=function(o){
						this.progress&&(this.progress.value=o)
						},o}();o.Loading=s
	}
	(yftools||(yftools={}));