
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
import EffectAnimation = laya.display.EffectAnimation
module ui.club {
    export class addplayerUI extends Dialog {
		public content:Laya.Image;
		public userID:Laya.TextInput;
		public close_Btn:component.ScaleButton;
		public Determine:component.ScaleButton;
		public tipText:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":368,"x":636,"var":"content","skin":"club/help_bg1.png","name":"content","anchorY":0.5,"anchorX":0.5},"child":[{"type":"TextInput","props":{"y":149,"x":92,"width":389,"var":"userID","skin":"club/club_id_input.png","promptColor":"#ccc","prompt":"     请输入玩家ID","overflow":"hidden","name":"userID","height":70,"fontSize":22,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}},{"type":"ScaleButton","props":{"y":13,"x":550,"width":51,"var":"close_Btn","skin":"createRoom/close.png","name":"close_Btn","label":"","height":51,"anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":325,"x":285,"width":154,"var":"Determine","skin":"club/confirm_btn.png","name":"Determine","label":"","height":69,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":57,"x":127,"var":"tipText","text":"请输入您要添加的玩家ID","fontSize":30,"font":"Microsoft YaHei","color":"#000000","bold":true,"align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.club.addplayerUI.uiView);

        }

    }
}

module ui.club {
    export class clubUI extends Dialog {
		public content:Laya.Image;
		public close_Btn:Laya.Button;
		public clubRoom:Laya.Box;
		public club_footer:Laya.Box;
		public clubTableSize:Laya.Label;
		public clubName:Laya.Label;
		public clubID:Laya.Label;
		public Roomlist:Laya.List;
		public room_box:Laya.Button;
		public room_index:Laya.Box;
		public InvitingFriends:component.ScaleButton;
		public user_agency_dissolve:component.ScaleButton;
		public RoomID:Laya.Label;
		public cur_num:Laya.Label;
		public player_num:Laya.Label;
		public TabelName:Laya.Label;
		public clubPlayerGroud:Laya.Box;
		public clubPlayer_1:Laya.Image;
		public clubPlayerText_1:Laya.Label;
		public clubPlayer_2:Laya.Image;
		public clubPlayerText_2:Laya.Label;
		public clubPlayer_3:Laya.Image;
		public clubPlayerText_3:Laya.Label;
		public clubPlayer_4:Laya.Image;
		public clubPlayerText_4:Laya.Label;
		public clubPlayer_5:Laya.Image;
		public clubPlayerText_5:Laya.Label;
		public clubPlayer_6:Laya.Image;
		public clubPlayerText_6:Laya.Label;
		public auto_create_data:Laya.Box;
		public auto_room_icon:Laya.Image;
		public auto_room_create_btn:component.ScaleButton;
		public room_auto_one:Laya.Box;
		public auto_create_bg:component.ScaleButton;
		public auto_create_btn:component.ScaleButton;
		public member_content:Laya.Box;
		public clubstatus_s:Laya.Label;
		public list_footer:Laya.Box;
		public member_size:Laya.Label;
		public member_name:Laya.Label;
		public member_ID:Laya.Label;
		public member_exit:component.ScaleButton;
		public member_btn_ground:Laya.Box;
		public member_dissolution:component.ScaleButton;
		public member_add:component.ScaleButton;
		public member_delete:component.ScaleButton;
		public member_list:Laya.List;
		public member_background:Laya.Image;
		public member_index:Laya.Label;
		public member_list_id:Laya.Label;
		public member_list_head:Laya.Image;
		public member_list_name:Laya.Label;
		public member_list_Gender:Laya.Label;
		public member_list_post:Laya.Label;
		public ToexamineBtn:Laya.Box;
		public Toexamine_refuse:component.ScaleButton;
		public Toexamine_adopt:component.ScaleButton;
		public btn_group:Laya.Box;
		public hall:component.ScaleButton;
		public member:component.ScaleButton;
		public AdministratorRights:Laya.Box;
		public getRoom:component.ScaleButton;
		public clubToExamine:component.ScaleButton;
		public settings:component.ScaleButton;
		public Record:component.ScaleButton;
		public clubComboBox:Laya.ComboBox;
		public Nodata:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1280,"skin":"public/mask.png","sizeGrid":"0,0,0,0","height":720,"alpha":0.7}},{"type":"Image","props":{"y":382,"x":640,"var":"content","skin":"club/club_bg.png","name":"content","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Button","props":{"y":10,"x":1204,"var":"close_Btn","stateNum":1,"skin":"createRoom/close.png","name":"close_Btn"}},{"type":"Box","props":{"y":134,"x":31,"visible":true,"var":"clubRoom","name":"clubRoom"},"child":[{"type":"Box","props":{"y":472,"x":9,"width":1188,"visible":true,"var":"club_footer","name":"club_footer","height":36},"child":[{"type":"Label","props":{"y":0,"x":72,"text":"牌桌数:","fontSize":25,"font":"Microsoft YaHei","color":"#000000","align":"left"}},{"type":"Label","props":{"y":0,"x":180,"var":"clubTableSize","text":"0","name":"clubTableSize","fontSize":25,"font":"Microsoft YaHei","color":"#000000","align":"left"}},{"type":"Label","props":{"y":0,"x":306,"text":"俱乐部名称:","fontSize":25,"font":"Microsoft YaHei","color":"#000000","align":"left"}},{"type":"Label","props":{"y":0,"x":446,"width":242,"var":"clubName","text":"     ","overflow":"scroll","name":"clubName","height":25,"fontSize":25,"font":"Microsoft YaHei","color":"#000000","align":"left"}},{"type":"Label","props":{"y":0,"x":693,"text":"俱乐部ID:","fontSize":25,"font":"Microsoft YaHei","color":"#000000","align":"left"}},{"type":"Label","props":{"y":0,"x":838,"var":"clubID","text":"   ","name":"clubID","fontSize":25,"font":"Microsoft YaHei","color":"#000000","align":"left"}}]},{"type":"List","props":{"y":-48,"x":-17,"width":1228,"visible":false,"var":"Roomlist","spaceY":30,"spaceX":40,"repeatY":2,"repeatX":4,"name":"Roomlist","height":516},"child":[{"type":"Box","props":{"y":59,"x":25,"width":259,"renderType":"render","height":197},"child":[{"type":"Button","props":{"y":30,"x":32,"var":"room_box","stateNum":1,"skin":"club/room_bg.png","name":"room_box"}},{"type":"Box","props":{"y":-21,"x":-17,"var":"room_index","name":"room_index","mouseThrough":true},"child":[{"type":"ScaleButton","props":{"y":188,"x":100,"width":90,"var":"InvitingFriends","skin":"club/share_btn.png","name":"InvitingFriends","label":"","height":40,"anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":191,"x":194,"width":90,"var":"user_agency_dissolve","skin":"club/cell_jiesan.png","name":"user_agency_dissolve","label":"","height":40,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":64,"x":102,"text":"房号:","fontSize":15,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":65,"x":146,"var":"RoomID","text":"888888","name":"RoomID","fontSize":15,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":94,"x":108,"text":"人数:","fontSize":15,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":96,"x":153,"var":"cur_num","text":"0","name":"cur_num","fontSize":15,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":95,"x":163,"text":"/","name":"personnel","fontSize":15,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":96,"x":170,"var":"player_num","text":"4","name":"player_num","fontSize":15,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":123,"x":116,"var":"TabelName","text":"晃晃麻将","name":"TabelName","fontSize":15,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Box","props":{"y":0,"x":0,"visible":false,"var":"clubPlayerGroud","name":"clubPlayerGroud"},"child":[{"type":"Image","props":{"y":100,"width":48,"visible":false,"var":"clubPlayer_1","skin":"head/1.png","name":"clubPlayer_1","height":48}},{"type":"Label","props":{"y":150,"x":0,"wordWrap":true,"width":80,"var":"clubPlayerText_1","overflow":"hidden","name":"clubPlayerText_1","height":40,"fontSize":15,"font":"Microsoft YaHei","color":"#000000"}},{"type":"Image","props":{"y":44,"x":19,"width":48,"visible":false,"var":"clubPlayer_2","skin":"head/1.png","name":"clubPlayer_2","height":48}},{"type":"Label","props":{"y":17,"x":21,"wordWrap":true,"width":80,"var":"clubPlayerText_2","overflow":"hidden","name":"clubPlayerText_2","height":40,"fontSize":15,"font":"Microsoft YaHei","color":"#000000"}},{"type":"Image","props":{"x":89,"width":48,"visible":false,"var":"clubPlayer_3","skin":"head/1.png","name":"clubPlayer_3","height":48}},{"type":"Label","props":{"y":-28,"x":89,"wordWrap":true,"width":80,"var":"clubPlayerText_3","overflow":"hidden","name":"clubPlayerText_3","height":40,"fontSize":15,"font":"Microsoft YaHei","color":"#000000"}},{"type":"Image","props":{"y":1,"x":156,"width":48,"visible":false,"var":"clubPlayer_4","skin":"head/1.png","name":"clubPlayer_4","height":48}},{"type":"Label","props":{"y":-28,"x":155,"wordWrap":true,"width":80,"var":"clubPlayerText_4","overflow":"hidden","name":"clubPlayerText_4","height":40,"fontSize":15,"font":"Microsoft YaHei","color":"#000000"}},{"type":"Image","props":{"y":40,"x":230,"width":48,"visible":false,"var":"clubPlayer_5","skin":"head/1.png","name":"clubPlayer_5","height":48}},{"type":"Label","props":{"y":13,"x":230,"wordWrap":true,"width":80,"var":"clubPlayerText_5","overflow":"hidden","name":"clubPlayerText_5","height":40,"fontSize":15,"font":"Microsoft YaHei","color":"#000000"}},{"type":"Image","props":{"y":97,"x":242,"width":48,"visible":false,"var":"clubPlayer_6","skin":"head/1.png","name":"clubPlayer_6","height":48}},{"type":"Label","props":{"y":149,"x":244,"wordWrap":true,"width":80,"var":"clubPlayerText_6","overflow":"hidden","name":"clubPlayerText_6","height":40,"fontSize":15,"font":"Microsoft YaHei","color":"#000000"}}]}]},{"type":"Box","props":{"y":50,"x":89,"visible":false,"var":"auto_create_data","name":"auto_create_data","mouseThrough":true},"child":[{"type":"Image","props":{"x":12,"var":"auto_room_icon","skin":"club/wenhao.png","name":"auto_room_icon"}},{"type":"ScaleButton","props":{"y":117,"x":45,"width":90,"var":"auto_room_create_btn","skin":"club/create_room_btn.png","name":"auto_room_create_btn","label":"","height":37,"anchorY":0.5,"anchorX":0.5}}]}]}]},{"type":"Box","props":{"y":41,"x":39,"width":196,"visible":false,"var":"room_auto_one","name":"room_auto_one","height":158},"child":[{"type":"ScaleButton","props":{"y":57,"x":98,"var":"auto_create_bg","skin":"club/room_bg.png","name":"auto_create_bg","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":136,"x":103,"width":90,"var":"auto_create_btn","skin":"club/create_room_btn.png","name":"auto_create_btn","label":"","height":37,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":23,"x":69,"skin":"club/wenhao.png"}}]}]},{"type":"Box","props":{"y":94,"x":20,"visible":false,"var":"member_content","name":"member_content"},"child":[{"type":"Image","props":{"width":1217,"skin":"club/info_bg.png","height":559}},{"type":"Box","props":{"y":-1,"x":66},"child":[{"type":"Label","props":{"y":19,"x":-4,"text":"顺序号","fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","bold":true}},{"type":"Label","props":{"y":19,"x":222,"text":"ID号","fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","bold":true}},{"type":"Label","props":{"y":19,"x":412,"text":"头像","fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","bold":true}},{"type":"Label","props":{"y":19,"x":600,"text":"昵称","fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","bold":true}},{"type":"Label","props":{"y":19,"x":767,"text":"性别","fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","bold":true}},{"type":"Label","props":{"y":19,"x":944,"var":"clubstatus_s","text":"职务","name":"clubstatus_s","fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","bold":true}}]},{"type":"Box","props":{"y":473,"x":33,"var":"list_footer","name":"list_footer"},"child":[{"type":"Label","props":{"y":29,"x":-4,"text":"总人数:","fontSize":25,"font":"Microsoft YaHei","color":"#000000","bold":false}},{"type":"Label","props":{"y":29,"x":85,"var":"member_size","text":"5","name":"member_size","fontSize":25,"font":"Microsoft YaHei","color":"#000000","bold":false}},{"type":"Label","props":{"y":29,"x":128,"text":"名称:","fontSize":25,"font":"Microsoft YaHei","color":"#000000","bold":false}},{"type":"Label","props":{"y":29,"x":196,"var":"member_name","text":"王尼玛的俱乐部","name":"member_name","fontSize":25,"font":"Microsoft YaHei","color":"#000000","bold":false}},{"type":"Label","props":{"y":29,"x":419,"text":"俱乐部ID:","fontSize":25,"font":"Microsoft YaHei","color":"#000000","bold":false}},{"type":"Label","props":{"y":29,"x":537,"var":"member_ID","text":"1008011","name":"member_ID","fontSize":25,"font":"Microsoft YaHei","color":"#0070ff","bold":false}},{"type":"ScaleButton","props":{"y":45,"x":914,"width":139,"visible":false,"var":"member_exit","skin":"club/quit_club.png","name":"member_exit","label":"","height":54,"anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":17,"x":689.5,"visible":false,"var":"member_btn_ground","name":"member_btn_ground"},"child":[{"type":"ScaleButton","props":{"y":27,"x":69.5,"width":139,"var":"member_dissolution","skin":"club/jiesan.png","name":"member_dissolution","label":"","height":54,"anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":27,"x":224.5,"width":139,"var":"member_add","skin":"club/add_btn.png","name":"member_add","label":"","height":54,"anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":27,"x":379.5,"width":139,"var":"member_delete","skin":"club/del_btn.png","name":"member_delete","label":"","height":54,"anchorY":0.5,"anchorX":0.5}}]}]},{"type":"List","props":{"y":63,"x":11,"width":1194,"var":"member_list","vScrollBarSkin":"   ","spaceY":15,"repeatY":5,"repeatX":1,"name":"member_list","height":432},"child":[{"type":"Box","props":{"y":9,"x":20,"width":1131,"renderType":"render","height":70},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1158,"var":"member_background","skin":"club/cell_bg_1.png","name":"member_background","height":76}},{"type":"Label","props":{"y":17,"x":67,"var":"member_index","text":"1","name":"member_index","fontSize":28,"font":"Microsoft YaHei","color":"#000000"}},{"type":"Label","props":{"y":21,"x":226,"var":"member_list_id","text":"12345678","name":"member_list_id","fontSize":28,"font":"Microsoft YaHei","color":"#000000"}},{"type":"Image","props":{"y":9,"x":452,"width":49,"var":"member_list_head","skin":"head/1.png","name":"member_list_head","height":51}},{"type":"Label","props":{"y":22,"x":583,"width":150,"var":"member_list_name","text":"老王","overflow":"hidden","name":"member_list_name","fontSize":28,"font":"Microsoft YaHei","color":"#000000","align":"center"}},{"type":"Label","props":{"y":21,"x":821,"var":"member_list_Gender","text":"男","name":"member_list_Gender","fontSize":28,"font":"Microsoft YaHei","color":"#000000"}},{"type":"Label","props":{"y":20,"x":983,"var":"member_list_post","text":"成员","name":"member_list_post","fontSize":28,"font":"Microsoft YaHei","color":"#000000"}},{"type":"Box","props":{"y":12,"x":919,"width":212,"visible":false,"var":"ToexamineBtn","name":"ToexamineBtn","height":47},"child":[{"type":"ScaleButton","props":{"y":25.5,"x":163.5,"width":105,"var":"Toexamine_refuse","skin":"club/refuse.png","name":"Toexamine_refuse","label":"","height":51,"anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":26,"x":53,"width":105,"var":"Toexamine_adopt","skin":"club/search.png","name":"Toexamine_adopt","label":"","height":51,"anchorY":0.5,"anchorX":0.5}}]}]}]}]},{"type":"Box","props":{"y":15,"x":35.5,"var":"btn_group","name":"btn_group"},"child":[{"type":"ScaleButton","props":{"y":27,"x":69.5,"width":139,"var":"hall","skin":"club/dt_bn_2.png","name":"hall","label":"","height":54,"anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":27,"x":227,"width":139,"var":"member","skin":"club/member_btn_1.png","name":"member","label":"","height":54,"anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":1,"x":471.5,"visible":false,"var":"AdministratorRights","name":"AdministratorRights"},"child":[{"type":"ScaleButton","props":{"y":27,"x":70,"width":139,"var":"getRoom","skin":"club/friend_room_btn.png","name":"getRoom","label":"","height":54,"anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":28,"x":224.5,"width":139,"var":"clubToExamine","skin":"club/join_audit_1.png","name":"clubToExamine","label":"","height":54,"anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":28,"x":381.5,"width":139,"var":"settings","skin":"club/create_btn_1.png","name":"settings","label":"","height":54,"anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":29,"x":538.5,"width":139,"var":"Record","skin":"club/room_recod.png","name":"Record","label":"","height":54,"anchorY":0.5,"anchorX":0.5}}]},{"type":"ComboBox","props":{"y":-1,"x":315,"width":130,"visibleNum":10,"var":"clubComboBox","stateNum":1,"skin":"club/club1_n.png","scrollBarSkin":"   ","name":"clubComboBox","labels":"俱乐部1,俱乐部2","labelSize":0,"labelPadding":"0","labelFont":"Microsoft YaHei","itemSize":45,"itemColors":"null","height":60}},{"type":"ScaleButton","props":{"y":76,"x":384,"width":139,"visible":false,"skin":"club/create_btn.png","label":"","height":54,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":294,"x":517,"visible":false,"var":"Nodata","text":"暂无数据","name":"Nodata","fontSize":45,"font":"Microsoft YaHei","color":"#000000","align":"center"}},{"type":"Image","props":{"y":-38,"x":408,"skin":"club/title_1.png"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.club.clubUI.uiView);

        }

    }
}

module ui.club {
    export class ClubAlertUI extends Dialog {
		public content:Laya.Image;
		public text:Laya.Label;
		public Determine:component.ScaleButton;
		public cancel:component.ScaleButton;
		public close_Btn:component.ScaleButton;

        public static  uiView:any ={"type":"Dialog","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":354,"x":611,"var":"content","skin":"club/dissovle_bg.png","name":"content","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":27,"x":139,"text":"温馨提示","fontSize":40,"font":"Microsoft YaHei","color":"#ffffff","bold":true,"align":"center"}},{"type":"Label","props":{"y":142,"x":94,"var":"text","text":"确定解散俱乐部吗？","name":"text","fontSize":30,"font":"Microsoft YaHei","color":"#000000","bold":false,"align":"center"}},{"type":"ScaleButton","props":{"y":269,"x":149,"width":140,"var":"Determine","skin":"club/purple_btn.png","name":"Determine","label":"","height":55,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":9,"x":44,"text":"确定","fontSize":25,"font":"Microsoft YaHei","color":"#ffffff"}}]},{"type":"ScaleButton","props":{"y":269,"x":308,"width":140,"var":"cancel","skin":"club/red_btn.png","name":"cancel","label":"","height":55,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":11,"x":45,"text":"取消","fontSize":25,"font":"Microsoft YaHei","color":"#ffffff"}}]},{"type":"ScaleButton","props":{"y":46,"x":401,"width":51,"var":"close_Btn","skin":"createRoom/close.png","name":"close_Btn","label":"","height":51,"anchorY":0.5,"anchorX":0.5}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.club.ClubAlertUI.uiView);

        }

    }
}

module ui.club {
    export class createClubUI extends Dialog {
		public content:Laya.Image;
		public close_Btn:component.ScaleButton;
		public createBtn:component.ScaleButton;
		public createName:Laya.TextInput;

        public static  uiView:any ={"type":"Dialog","props":{"y":0,"x":0,"width":1280,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1280,"skin":"public/mask.png","sizeGrid":"0,0,0,0","height":720,"alpha":0.7}},{"type":"Image","props":{"y":344,"x":614,"var":"content","skin":"club/create_club_bg.png","name":"content","anchorY":0.5,"anchorX":0.5},"child":[{"type":"ScaleButton","props":{"y":40,"x":505,"width":51,"var":"close_Btn","skin":"createRoom/close.png","name":"close_Btn","label":"","height":51,"anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":174,"x":423,"width":154,"var":"createBtn","skin":"club/create_btn.png","name":"createBtn","label":"","height":69,"anchorY":0.5,"anchorX":0.5}},{"type":"TextInput","props":{"y":147,"x":61,"width":279,"var":"createName","skin":"club/input_name_bg.png","promptColor":"#ccc","prompt":"  请输入俱乐部名称","overflow":"hidden","name":"createName","height":54,"fontSize":22,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.club.createClubUI.uiView);

        }

    }
}

module ui.club {
    export class joinClubUI extends Dialog {
		public content:Laya.Image;
		public close_Btn:component.ScaleButton;
		public submit:component.ScaleButton;
		public textContent:Laya.TextInput;
		public joinContent:Laya.Box;
		public head:Laya.Image;
		public names:laya.display.Text;
		public clubName:laya.display.Text;
		public joinBtn:component.ScaleButton;

        public static  uiView:any ={"type":"Dialog","props":{"x":0,"width":1280,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1280,"skin":"public/mask.png","sizeGrid":"0,0,0,0","height":720,"alpha":0.7}},{"type":"Image","props":{"y":353,"x":619,"var":"content","skin":"club/join_club_bg.png","name":"content","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":26,"x":309,"skin":"club/join_club_title.png"}},{"type":"ScaleButton","props":{"y":40,"x":772,"width":77,"var":"close_Btn","skin":"createRoom/close.png","name":"close_Btn","label":"","height":77,"anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":143,"x":674,"width":185,"var":"submit","skin":"club/sousuo.png","name":"submit","label":"","height":84,"anchorY":0.5,"anchorX":0.5}},{"type":"TextInput","props":{"y":110,"x":55,"width":503,"var":"textContent","skin":"club/input_name_bg.png","promptColor":"#ccc","prompt":"    请输入俱乐部ID","overflow":"hidden","name":"textContent","height":65,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}},{"type":"Box","props":{"y":221,"x":176,"visible":false,"var":"joinContent","name":"joinContent"},"child":[{"type":"Text","props":{"text":"头像：","fontSize":30,"font":"Microsoft YaHei","color":"#000000"}},{"type":"Text","props":{"y":84,"text":"昵称：","fontSize":30,"font":"Microsoft YaHei","color":"#000000"}},{"type":"Text","props":{"y":158,"text":"俱乐部名称：","fontSize":30,"font":"Microsoft YaHei","color":"#000000"}},{"type":"Image","props":{"y":-19,"x":101,"width":100,"var":"head","skin":"head/1.png","name":"head","height":100}},{"type":"Text","props":{"y":85,"x":108,"var":"names","text":"王尼玛","name":"names","fontSize":30,"font":"Microsoft YaHei","color":"#000000"}},{"type":"Text","props":{"y":158,"x":195,"var":"clubName","text":"王尼玛的俱乐部","name":"clubName","fontSize":30,"font":"Microsoft YaHei","color":"#000000"}},{"type":"ScaleButton","props":{"y":266,"x":230,"width":254,"var":"joinBtn","skin":"club/join.png","name":"joinBtn","label":"","height":90,"anchorY":0.5,"anchorX":0.5}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.club.joinClubUI.uiView);

        }

    }
}

module ui.club {
    export class modifyNameClubUI extends Dialog {
		public content:Laya.Image;
		public close_Btn:component.ScaleButton;
		public submit_Btn:component.ScaleButton;
		public cangeName:Laya.TextInput;

        public static  uiView:any ={"type":"Dialog","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":354,"x":624,"var":"content","skin":"club/rename_bg.png","name":"content","anchorY":0.5,"anchorX":0.5},"child":[{"type":"ScaleButton","props":{"y":40,"x":505,"width":51,"var":"close_Btn","skin":"createRoom/close.png","name":"close_Btn","label":"","height":51,"anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":227,"x":278,"width":154,"var":"submit_Btn","skin":"club/confirm_btn.png","name":"submit_Btn","label":"","height":69,"anchorY":0.5,"anchorX":0.5}},{"type":"TextInput","props":{"y":109,"x":82,"width":389,"var":"cangeName","skin":"club/input_name_bg.png","promptColor":"#ccc","prompt":"  请输入俱乐部名称","overflow":"hidden","name":"cangeName","height":70,"fontSize":22,"font":"Microsoft YaHei","color":"#ffffff","align":"left"}},{"type":"Image","props":{"y":24,"x":233,"skin":"club/rename_title.png"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.club.modifyNameClubUI.uiView);

        }

    }
}

module ui.sjddz {
    export class action_gain_goldUI extends Dialog {
		public get_icon:Laya.Image;
		public conunt_num:Laya.Label;
		public lingqu:component.ScaleButton;

        public static  uiView:any ={"type":"Dialog","props":{"width":720,"popupCenter":true,"height":1280,"alpha":1},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"public/mask.png","sizeGrid":"0,0,0,0","height":1280,"alpha":0.7}},{"type":"Box","props":{"y":240,"x":0,"width":720,"height":800},"child":[{"type":"Image","props":{"y":-3,"x":232,"skin":"ddz/get_jiangping.png"}},{"type":"Image","props":{"y":333,"x":391,"var":"get_icon","skin":"ddz/get_gold.png","name":"get_icon","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":458,"x":359,"skin":"ddz/get_tuceng.png","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":18,"x":181,"var":"conunt_num","text":"金币×88","name":"conunt_num","fontSize":36,"color":"#ffe16a","anchorY":0.5,"anchorX":0.5}}]},{"type":"ScaleButton","props":{"y":674,"x":360,"visible":true,"var":"lingqu","skin":"ddz/action_queding.png","name":"lingqu","label":"","anchorY":0.5,"anchorX":0.5}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.sjddz.action_gain_goldUI.uiView);

        }

    }
}

module ui.sjddz {
    export class chatPtUI extends Dialog {
		public kindTab:Laya.Tab;
		public list1:Laya.List;
		public list0:Laya.List;
		public emojBtn:component.ScaleButton;
		public sendBtn:component.ScaleButton;
		public closeBtn:component.ScaleButton;
		public inputPanel:Laya.TextInput;

        public static  uiView:any ={"type":"Dialog","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":195,"x":55,"width":600,"skin":"chat/emoticonUI_bg.png","height":890},"child":[{"type":"Tab","props":{"y":105,"x":100,"width":400,"var":"kindTab","selectedIndex":0},"child":[{"type":"Button","props":{"stateNum":2,"skin":"chat/emoj_btn.png","name":"item0","left":0,"labelSize":36,"labelColors":"#007AFF,#007AFF,#FFFFFF","centerY":0}},{"type":"Button","props":{"stateNum":2,"skin":"chat/voice_btn.png","right":0,"name":"item1","labelSize":36,"labelColors":"#007AFF,#007AFF,#FFFFFF","centerY":-1}}]},{"type":"Image","props":{"y":201,"x":50,"width":500,"skin":"chat/chat_emojibg.png","height":600},"child":[{"type":"List","props":{"y":0,"x":0,"width":500,"visible":false,"var":"list1","vScrollBarSkin":"public/empty.png","spaceY":5,"spaceX":75,"repeatY":8,"repeatX":1,"height":600},"child":[{"type":"Box","props":{"y":0,"x":0,"width":500,"renderType":"render","height":60},"child":[{"type":"Image","props":{"y":54,"x":-3,"width":500,"skin":"chat/xixian.png","renderType":"render","mouseEnabled":true}},{"type":"Label","props":{"y":27,"x":250,"text":"label","name":"msgText","fontSize":40,"anchorY":0.5,"anchorX":0.5}}]}]},{"type":"List","props":{"y":0,"x":0,"width":500,"visible":true,"var":"list0","vScrollBarSkin":"public/empty.png","spaceY":50,"spaceX":75,"repeatY":4,"repeatX":5,"height":600},"child":[{"type":"ScaleButton","props":{"y":70,"x":75,"var":"emojBtn","skin":"emoji/pillangry1.png","renderType":"render","label":""}}]}]},{"type":"ScaleButton","props":{"y":-30,"x":-352,"width":107,"var":"sendBtn","skin":"chat/send.png","pivotY":38,"pivotX":53,"label":"","height":70}},{"type":"ScaleButton","props":{"y":62,"x":596,"var":"closeBtn","skin":"public/close.png","pivotY":38,"pivotX":53,"label":""}},{"type":"Image","props":{"y":45,"x":-529,"width":319,"skin":"chat/msg_bg.png","height":74},"child":[{"type":"TextInput","props":{"y":0,"x":0,"width":325,"var":"inputPanel","skin":"chat/input.png","prompt":"点击输入发送的文字","height":74,"fontSize":30}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.sjddz.chatPtUI.uiView);

        }

    }
}

module ui.sjddz {
    export class create_sjddzUI extends Dialog {
		public content:Laya.Image;
		public container:Laya.List;
		public closeBtn:component.ScaleButton;
		public createBtn:component.ScaleButton;
		public item:component.ScaleButton;

        public static  uiView:any ={"type":"Dialog","props":{"width":720,"popupCenter":true,"height":1280,"alpha":1},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"public/mask.png","sizeGrid":"0,0,0,0","height":1280,"alpha":0.7}},{"type":"Image","props":{"y":309,"x":36,"var":"content","skin":"ddz_sj/create_bg.png","name":"content"},"child":[{"type":"Image","props":{"y":18,"x":244,"skin":"ddz_sj/kaishefangjian.png"}},{"type":"List","props":{"y":112,"x":33,"width":579,"var":"container","spaceY":10,"spaceX":5,"repeatY":8,"repeatX":2,"renderType":"render","name":"container","height":434}},{"type":"ScaleButton","props":{"y":59,"x":605,"visible":true,"var":"closeBtn","skin":"ddz_sj/close.png","scaleY":0.8,"scaleX":0.8,"name":"closeBtn","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":586,"x":324,"visible":true,"var":"createBtn","skin":"ddz_sj/create_kaifang.png","name":"createBtn","label":"","anchorY":0.5,"anchorX":0.5}}]},{"type":"ScaleButton","props":{"y":-112,"x":834,"var":"item","stateNum":2,"skin":"public/button_que.png","scaleY":1.2,"scaleX":1.2,"name":"item","label":"","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":-4,"x":50,"text":"玩什么","name":"itemText","fontSize":40,"color":"#ffff00","bold":true}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.sjddz.create_sjddzUI.uiView);

        }

    }
}

module ui.sjddz {
    export class DailyshareUI extends Dialog {
		public icon_bg:Laya.Image;
		public taren_bg:Laya.Image;
		public all_lingqu:component.ScaleButton;
		public share:component.ScaleButton;
		public closeBtn:component.ScaleButton;

        public static  uiView:any ={"type":"Dialog","props":{"width":720,"popupCenter":true,"height":1280,"alpha":1},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"public/mask.png","sizeGrid":"0,0,0,0","height":1280,"alpha":0.7}},{"type":"Image","props":{"y":140,"x":23,"width":674,"skin":"ddz/share_bg.png","name":"bankrupt","height":941},"child":[{"type":"Image","props":{"y":39,"x":336,"skin":"ddz/share_hongyouli.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":77,"x":35,"var":"icon_bg","skin":"ddz/share_meiri.png","name":"huodong_bg"},"child":[{"type":"Image","props":{"y":245,"x":0,"var":"taren_bg","skin":"ddz/share_juixing.png","name":"taren_bg"},"child":[{"type":"Label","props":{"y":20,"x":17,"text":"点击进入即可领取一个红包，（每日0点重置）","name":"taren_test","fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0}}]}]},{"type":"Image","props":{"y":375,"x":28,"skin":"ddz/share_chang.png","name":"hongbao_bg1"},"child":[{"type":"Image","props":{"y":88,"x":93,"width":80,"skin":"ddz/share_icon.png","name":"icon","height":80,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":101,"x":95,"width":131,"skin":"ddz/share_hongbao4.png","name":"hongbao","height":168,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":-2,"x":65,"visible":false,"text":"label","name":"nick","fontSize":23,"color":"#000000","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":19,"x":17,"skin":"ddz/share_hongbao_gold.png","name":"gold_bg"}},{"type":"Label","props":{"y":122,"x":65,"visible":false,"text":"label","name":"cfg_num","fontSize":25,"color":"#ffca57","anchorY":0.5,"anchorX":0.5}}]},{"type":"ScaleButton","props":{"y":207,"x":96,"visible":true,"skin":"ddz/share_yao.png","name":"lignqu_1","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":200,"x":96,"visible":false,"skin":"ddz/share_lingqu.png","name":"accomplish","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":375,"x":241,"skin":"ddz/share_chang.png","name":"hongbao_bg2"},"child":[{"type":"Image","props":{"y":88,"x":96,"width":80,"skin":"ddz/share_icon.png","name":"icon","height":80,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":101,"x":95,"width":131,"skin":"ddz/share_hongbao4.png","name":"hongbao","height":168,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":-2,"x":65,"visible":false,"text":"label","name":"nick","fontSize":23,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":19,"x":17,"skin":"ddz/share_hongbao_gold.png","name":"gold_bg"}},{"type":"Label","props":{"y":122,"x":65,"visible":false,"text":"label","name":"cfg_num","fontSize":25,"color":"#ffca57","anchorY":0.5,"anchorX":0.5}}]},{"type":"ScaleButton","props":{"y":207,"x":96,"visible":true,"skin":"ddz/share_yao.png","name":"lignqu_2","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":200,"x":96,"visible":false,"skin":"ddz/share_lingqu.png","name":"accomplish","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":375,"x":454,"skin":"ddz/share_chang.png","name":"hongbao_bg3"},"child":[{"type":"Image","props":{"y":88,"x":96,"width":80,"skin":"ddz/share_icon.png","name":"icon","height":80,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":101,"x":95,"width":131,"skin":"ddz/share_hongbao4.png","name":"hongbao","height":168,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":-2,"x":65,"visible":false,"text":"label","name":"nick","fontSize":23,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":19,"x":17,"skin":"ddz/share_hongbao_gold.png","name":"gold_bg"}},{"type":"Label","props":{"y":122,"x":65,"visible":false,"text":"label","name":"cfg_num","fontSize":25,"color":"#ffca57","anchorY":0.5,"anchorX":0.5}}]},{"type":"ScaleButton","props":{"y":207,"x":96,"visible":true,"skin":"ddz/share_yao.png","name":"lignqu_3","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":200,"x":96,"visible":false,"skin":"ddz/share_lingqu.png","name":"accomplish","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":658,"x":28,"skin":"ddz/share_chang.png","name":"hongbao_bg4"},"child":[{"type":"Image","props":{"y":90,"x":96,"width":80,"skin":"ddz/share_icon.png","name":"icon","height":80,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":101,"x":95,"width":131,"skin":"ddz/share_hongbao4.png","name":"hongbao","height":168,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":-2,"x":65,"visible":false,"text":"label","name":"nick","fontSize":23,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":19,"x":17,"skin":"ddz/share_hongbao_gold.png","name":"gold_bg"}},{"type":"Label","props":{"y":122,"x":65,"visible":false,"text":"label","name":"cfg_num","fontSize":25,"color":"#ffca57","anchorY":0.5,"anchorX":0.5}}]},{"type":"ScaleButton","props":{"y":207,"x":96,"visible":true,"skin":"ddz/share_yao.png","name":"lignqu_4","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":200,"x":96,"visible":false,"skin":"ddz/share_lingqu.png","name":"accomplish","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":658,"x":241,"width":192,"skin":"ddz/share_chang.png","name":"hongbao_bg5","height":242},"child":[{"type":"Image","props":{"y":90,"x":96,"width":80,"skin":"ddz/share_icon.png","name":"icon","height":80,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":101,"x":95,"width":131,"skin":"ddz/share_hongbao4.png","name":"hongbao","height":168,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":-2,"x":65,"visible":false,"text":"label","name":"nick","fontSize":23,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":19,"x":17,"skin":"ddz/share_hongbao_gold.png","name":"gold_bg"}},{"type":"Label","props":{"y":122,"x":65,"visible":false,"text":"label","name":"cfg_num","fontSize":25,"color":"#ffca57","anchorY":0.5,"anchorX":0.5}}]},{"type":"ScaleButton","props":{"y":207,"x":96,"visible":true,"skin":"ddz/share_yao.png","name":"lignqu_5","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":200,"x":96,"visible":false,"skin":"ddz/share_lingqu.png","name":"accomplish","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":658,"x":454,"width":192,"skin":"ddz/share_hongbao10.png","height":242},"child":[{"type":"ScaleButton","props":{"y":121,"x":96,"var":"all_lingqu","skin":"ddz/share_hongbtn.png","name":"all_lingqu","label":"","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":658,"x":454,"visible":false,"skin":"ddz/share_chang.png","name":"hongbao_bg6"},"child":[{"type":"Image","props":{"y":90,"x":96,"width":80,"skin":"ddz/share_icon.png","name":"icon","height":80,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":101,"x":95,"width":157,"skin":"ddz/share_hongbao6.png","name":"hongbao","height":156,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":-2,"x":65,"visible":false,"text":"label","name":"nick","fontSize":23,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":19,"x":17,"visible":false,"skin":"ddz/share_hongbao_gold.png","name":"gold_bg"}},{"type":"Label","props":{"y":122,"x":78,"visible":false,"text":"label","name":"cfg_num","fontSize":25,"color":"#ffca57","anchorY":0.5,"anchorX":0.5}}]},{"type":"ScaleButton","props":{"y":207,"x":96,"visible":false,"skin":"ddz/share_yao.png","name":"lignqu_6","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":200,"x":96,"visible":false,"skin":"ddz/share_lingqu.png","name":"accomplish","anchorY":0.5,"anchorX":0.5}}]},{"type":"ScaleButton","props":{"y":337,"x":1046,"visible":true,"var":"share","skin":"ddz_sj/share.png","name":"share","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":36,"x":635,"visible":true,"var":"closeBtn","skin":"ddz/share_close.png","scaleY":0.8,"scaleX":0.8,"name":"closeBtn","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":919,"x":280,"visible":false,"text":"新玩家点入，即可获得","fontSize":24,"color":"#5c6187","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":919,"x":459,"visible":false,"text":"2倍奖励","fontSize":24,"color":"#ff6600","anchorY":0.5,"anchorX":0.5}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.sjddz.DailyshareUI.uiView);

        }

    }
}

module ui.sjddz {
    export class ddz_sjgameUI extends View {
		public main:Laya.Panel;
		public room_ID:Laya.Label;
		public room_ju:Laya.Label;
		public roomTime:Laya.Label;
		public game:Laya.Box;
		public Panel_3:Laya.Box;
		public Panel_2:Laya.Box;
		public Panel_1:Laya.Box;
		public out_panel1:Laya.Box;
		public eff4:Laya.Image;
		public player1:Laya.Button;
		public head1:Laya.Image;
		public cardValue:Laya.Label;
		public eff1:Laya.Box;
		public player2:Laya.Button;
		public head2:Laya.Image;
		public player3:Laya.Button;
		public head3:Laya.Image;
		public opt:Laya.Box;
		public opt1:Laya.Box;
		public opt2:Laya.Box;
		public opt3:Laya.Box;
		public center:Laya.Box;
		public delRoom:component.ScaleButton;
		public getFriend:component.ScaleButton;
		public startBtn:component.ScaleButton;
		public effmain:Laya.Box;
		public voice_bg:Laya.Image;
		public voice_list:Laya.List;
		public gold_number:Laya.Box;
		public gold_difen:Laya.FontClip;
		public gold_beishu:Laya.FontClip;
		public backBtn:component.ScaleButton;
		public settingBtn:component.ScaleButton;
		public is_music:component.ScaleButton;
		public msgBtn:component.ScaleButton;
		public win_ju:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":90,"x":90,"width":720,"pivotY":90,"pivotX":90,"height":1280},"child":[{"type":"Panel","props":{"y":0,"x":-3,"width":720,"var":"main","name":"main","height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"ddz_sj/bg.png","height":1280}},{"type":"Panel","props":{"y":0,"x":0,"width":720,"name":"room_stat","height":40},"child":[{"type":"Label","props":{"y":20,"x":515,"var":"room_ID","text":"房间号:123456","name":"room_ID","fontSize":24,"color":"#ffffff","anchorY":0.5,"anchorX":0}},{"type":"Label","props":{"y":20,"x":331,"var":"room_ju","text":"0/5局","name":"room_ju","fontSize":24,"color":"#ffffff","anchorY":0.5,"anchorX":0}},{"type":"Label","props":{"y":20,"x":40,"var":"roomTime","text":"00:00 21:23","name":"roomTime","fontSize":24,"color":"#ffffff","anchorY":0.5,"anchorX":0}}]},{"type":"Box","props":{"y":0,"x":0,"width":720,"var":"game","name":"game","height":1280},"child":[{"type":"Box","props":{"y":470,"x":65,"width":1,"var":"Panel_3","name":"Panel_3","height":1,"anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":470,"x":640,"width":1,"var":"Panel_2","name":"Panel_2","height":1,"anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":1104,"x":320,"width":1,"var":"Panel_1","name":"Panel_1","height":1}},{"type":"Box","props":{"y":707,"x":362,"width":1,"var":"out_panel1","name":"out_panel1","height":1}},{"type":"Image","props":{"y":48,"x":226,"var":"eff4","skin":"ddz_sj/dipai_bg.png","name":"eff4","height":120},"child":[{"type":"Image","props":{"y":11,"x":11,"skin":"poker/poker_back.png","scaleY":0.6,"scaleX":0.6,"name":"eff4_pk1"}},{"type":"Image","props":{"y":11,"x":96,"skin":"poker/poker_back.png","scaleY":0.6,"scaleX":0.6,"name":"eff4_pk2"}},{"type":"Image","props":{"y":11,"x":180,"skin":"poker/poker_back.png","scaleY":0.6,"scaleX":0.6,"name":"eff4_pk3"}}]},{"type":"Button","props":{"y":1134,"x":20,"width":100,"visible":true,"var":"player1","stateNum":1,"skin":"ddz_sj/head_kuang.png","name":"player1","height":100},"child":[{"type":"Image","props":{"y":65,"x":50,"skin":"ddz_sj/tou_kuangti.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":0,"x":0,"width":100,"var":"head1","skin":"head/2.png","name":"head1","height":100}},{"type":"Image","props":{"y":0,"x":0,"width":100,"visible":false,"skin":"ddz_sj/head.png","name":"off","height":100}},{"type":"Image","props":{"y":15,"x":20,"width":60,"visible":false,"skin":"ddz/game_ok.png","name":"ready","height":70}},{"type":"Label","props":{"y":114,"x":50,"text":"我的名字","name":"nameText","fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":124,"x":171,"text":"9999999","name":"coinText","fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":111,"x":250,"visible":false,"skin":"ddz_sj/gold_bg.png","name":"gold_bg","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":0,"x":0,"width":48,"skin":"ddz_sj/gold.png","scaleY":0.8,"scaleX":0.8,"height":48}},{"type":"Label","props":{"y":20,"x":101,"text":"123456","name":"goldValue","fontSize":24,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":111,"x":473,"visible":false,"skin":"ddz_sj/gold_bg.png","name":"fuhuoka_bg","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":19,"x":29,"skin":"ddz_sj/card.png","scaleY":0.8,"scaleX":0.8,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":20,"x":101,"var":"cardValue","text":"123456","name":"cardValue","fontSize":24,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":-90,"x":50,"width":0,"var":"eff1","name":"eff1","height":0,"anchorY":0,"anchorX":0}},{"type":"Image","props":{"y":0,"x":40,"width":60,"visible":false,"skin":"ddz_sj/dizhu.png","name":"zhuang","height":70}},{"type":"Image","props":{"y":-37,"x":14,"width":72,"visible":false,"skin":"text/double_2.png","name":"double","height":28}},{"type":"Image","props":{"y":-467,"x":300,"width":83,"visible":false,"skin":"ddz_sj/time_bg.png","name":"time_bg","height":96},"child":[{"type":"Label","props":{"y":48,"x":41,"text":"5","name":"js_time","fontSize":30,"color":"#000000","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":21,"x":105,"visible":false,"skin":"ddz_sj/yyDialog.png","sizeGrid":"18,33,14,25","scaleX":-1,"name":"voice1","anchorX":1},"child":[{"type":"Text","props":{"y":17,"x":89,"text":"fffffffffffffffffffffffffff","scaleX":-1,"name":"msgText","fontSize":28,"color":"#ffffff"}}]}]},{"type":"Button","props":{"y":233,"x":597,"width":100,"visible":false,"var":"player2","stateNum":1,"skin":"ddz_sj/head_kuang.png","scaleX":1,"name":"player2","height":100},"child":[{"type":"Image","props":{"y":64,"x":50,"skin":"ddz_sj/tou_kuangti.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":0,"x":0,"width":100,"var":"head2","skin":"head/2.png","name":"head2","height":100}},{"type":"Image","props":{"y":0,"x":0,"width":100,"visible":false,"skin":"ddz_sj/head.png","name":"off","height":100}},{"type":"Image","props":{"y":15,"x":20,"width":60,"visible":false,"skin":"ddz/game_ok.png","name":"ready","height":70}},{"type":"Image","props":{"y":-33,"x":59,"width":150,"visible":false,"skin":"ddz_sj/gold_bg.png","scaleY":0.8,"scaleX":0.8,"name":"gold_bg","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":0,"x":0,"width":48,"skin":"ddz_sj/gold.png","scaleY":0.8,"scaleX":0.8,"height":48}},{"type":"Label","props":{"y":19,"x":90,"text":"123456","name":"goldValue","fontSize":24,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":113,"x":50,"text":"我的名字","name":"nameText","fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":156,"x":51,"text":"9999999","name":"coinText","fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":-61,"x":50,"width":0,"name":"eff2","height":0,"anchorY":0,"anchorX":0}},{"type":"Image","props":{"y":0,"x":47,"width":66,"visible":false,"skin":"ddz_sj/dizhu.png","scaleY":0.8,"scaleX":0.8,"name":"zhuang","height":78}},{"type":"Image","props":{"y":-41,"x":14,"width":72,"visible":false,"skin":"text/double_2.png","name":"double","height":28}},{"type":"Image","props":{"y":46,"x":-68,"width":64,"visible":false,"skin":"public/poker_back.png","scaleY":0.8,"scaleX":0.8,"name":"pk_bg","height":81},"child":[{"type":"Label","props":{"y":40,"x":32,"text":"17","name":"pker_num","fontSize":26,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":-42,"x":-74,"width":83,"visible":false,"skin":"ddz_sj/time_bg.png","scaleY":0.8,"scaleX":0.8,"name":"time_bg","height":96},"child":[{"type":"Label","props":{"y":48,"x":41,"text":"5","name":"js_time","fontSize":30,"color":"#000000","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":21,"x":-16,"visible":false,"skin":"ddz_sj/yyDialog.png","sizeGrid":"14,26,13,21","name":"voice1","anchorX":1},"child":[{"type":"Text","props":{"y":17,"x":89,"text":"fffffffffffffffffffffffffff","scaleX":-1,"name":"msgText","fontSize":28,"color":"#ffffff"}}]}]},{"type":"Button","props":{"y":283,"x":74,"width":100,"visible":false,"var":"player3","stateNum":1,"skin":"ddz_sj/head_kuang.png","scaleX":1,"name":"player3","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":64,"x":50,"skin":"ddz_sj/tou_kuangti.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":0,"x":0,"width":100,"var":"head3","skin":"head/2.png","name":"head3","height":100}},{"type":"Image","props":{"y":0,"x":0,"width":100,"visible":false,"skin":"ddz_sj/head.png","name":"off","height":100,"disabled":true}},{"type":"Image","props":{"y":15,"x":20,"width":60,"visible":false,"skin":"ddz/game_ok.png","name":"ready","height":70}},{"type":"Image","props":{"y":-33,"x":50,"width":150,"visible":false,"skin":"ddz_sj/gold_bg.png","scaleY":0.8,"scaleX":0.8,"name":"gold_bg","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":0,"x":0,"width":48,"skin":"ddz_sj/gold.png","scaleY":0.8,"scaleX":0.8,"height":48}},{"type":"Label","props":{"y":17,"x":93,"text":"123456","name":"goldValue","fontSize":24,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":113,"x":50,"text":"我的名字","name":"nameText","fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":154,"x":50,"text":"9999999","name":"coinText","fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":-48,"x":50,"name":"eff3","anchorY":0,"anchorX":0}},{"type":"Image","props":{"y":0,"x":34,"width":66,"visible":false,"skin":"ddz_sj/dizhu.png","name":"zhuang","height":78}},{"type":"Image","props":{"y":-33,"x":14,"width":72,"visible":false,"skin":"text/double_2.png","name":"double","height":28}},{"type":"Image","props":{"y":46,"x":127,"width":64,"visible":false,"skin":"public/poker_back.png","scaleY":0.8,"scaleX":0.8,"name":"pk_bg","height":81},"child":[{"type":"Label","props":{"y":40,"x":32,"text":"17","name":"pker_num","fontSize":26,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":-42,"x":120,"width":83,"visible":false,"skin":"ddz_sj/time_bg.png","scaleY":0.8,"scaleX":0.8,"name":"time_bg","height":96},"child":[{"type":"Label","props":{"y":48,"x":41,"text":"5","name":"js_time","fontSize":30,"color":"#000000","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":21,"x":104,"visible":false,"skin":"ddz_sj/yyDialog.png","sizeGrid":"18,33,14,25","scaleX":-1,"name":"voice1","anchorX":1},"child":[{"type":"Text","props":{"y":17,"x":89,"text":"fffffffffffffffffffffffffff","scaleX":-1,"name":"msgText","fontSize":28,"color":"#ffffff"}}]}]},{"type":"Box","props":{"y":787,"x":326,"width":100,"var":"opt","name":"opt","height":100},"child":[{"type":"Box","props":{"y":-13,"x":-600,"width":1,"visible":false,"var":"opt1","name":"opt1","height":1},"child":[{"type":"ScaleButton","props":{"y":50,"x":383,"skin":"ddz_sj/bujiaobtn.png","name":"btn_1","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":50,"x":553,"skin":"ddz_sj/1fen.png","name":"btn_2","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":50,"x":722,"skin":"ddz_sj/2fen.png","name":"btn_3","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":50,"x":892,"skin":"ddz_sj/3fen.png","name":"btn_4","label":"","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":-28,"x":-609,"width":19,"visible":false,"var":"opt2","name":"opt2","height":31},"child":[{"type":"ScaleButton","props":{"y":46,"x":553,"skin":"ddz_sj/jiabei.png","name":"btn_2","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":46,"x":782,"skin":"ddz_sj/bujiabei.png","name":"btn_1","label":"","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":-28,"x":-609,"width":19,"visible":false,"var":"opt3","name":"opt3","height":31},"child":[{"type":"ScaleButton","props":{"y":40,"x":429,"skin":"ddz_sj/buchu_btn.png","name":"btn_1","labelStrokeColor":"#ffffff","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":40,"x":658,"skin":"ddz_sj/tishi.png","name":"btn_3","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":40,"x":886,"skin":"ddz_sj/chupai1.png","name":"btn_2","label":"","disabled":false,"anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":39,"x":661,"visible":false,"skin":"ddz/button_yaobuqi.png","name":"buchuBtn","label":"","disabled":false,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":10,"x":22,"text":"要不起(1s)","fontSize":28,"color":"#ffffff"}}]},{"type":"ScaleButton","props":{"y":39,"x":659,"visible":false,"skin":"ddz_sj/chupai1.png","name":"chupai","label":"","disabled":false,"anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":39,"x":660,"visible":false,"skin":"ddz_sj/buchu_btn.png","name":"buchu","labelStrokeColor":"#ffffff","label":"","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"Box","props":{"y":416,"x":227,"width":300,"var":"center","name":"center","height":300},"child":[{"type":"ScaleButton","props":{"y":239,"x":313,"var":"delRoom","skin":"ddz/room_del_room.png","name":"delRoom","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":237,"x":-22,"var":"getFriend","skin":"ddz/room_get_friend.png","name":"getFriend","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":327,"x":158,"var":"startBtn","skin":"ddz/ready.png","name":"startBtn","label":"","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":550,"x":372,"width":1,"var":"effmain","name":"effmain","height":1,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":1202,"x":723,"width":400,"visible":false,"var":"voice_bg","skin":"ddz_sj/chatPt_bg.png","renderType":"render","name":"voice_bg","mouseEnabled":true,"height":350,"anchorY":1,"anchorX":1}},{"type":"List","props":{"y":1202,"x":723,"width":400,"visible":false,"var":"voice_list","repeatY":5,"repeatX":1,"name":"voice_list","height":350,"anchorY":1,"anchorX":1},"child":[{"type":"Box","props":{"y":0,"x":0,"width":400,"renderType":"render","height":60},"child":[{"type":"Image","props":{"y":54,"x":0,"width":400,"skin":"chat/xixian.png","renderType":"render","mouseEnabled":true}},{"type":"Label","props":{"y":27,"x":200,"text":"label","name":"msgText","fontSize":26,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"Box","props":{"y":252,"x":360,"width":280,"visible":false,"var":"gold_number","name":"gold_number","height":50,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"FontClip","props":{"y":27,"x":10,"var":"gold_difen","value":"798","skin":"ddz_sj/beishu_num.png","sheet":"0123456789","name":"gold_difen","anchorY":0.5,"anchorX":0}},{"type":"Image","props":{"y":6,"x":235,"skin":"ddz_sj/bei_dan.png"}},{"type":"FontClip","props":{"y":29,"x":235,"var":"gold_beishu","value":"3","skin":"ddz_sj/beishu_num.png","sheet":"0123456789","name":"gold_beishu","anchorY":0.5,"anchorX":1}}]}]},{"type":"ScaleButton","props":{"x":333,"var":"backBtn","top":-176,"skin":"ddz/room_close.png","name":"backBtn","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":97,"x":622,"width":70,"var":"settingBtn","skin":"ddz_sj/shezhi.png","name":"settingBtn","label":"","height":90,"anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":92,"x":84,"var":"is_music","skin":"ddz_sj/music_kai.png","name":"is_music","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":1220,"x":667,"var":"msgBtn","skin":"ddz_sj/msg.png","pivotY":34,"pivotX":39,"name":"msgBtn","label":""}},{"type":"Image","props":{"y":185,"x":260,"width":200,"visible":false,"var":"win_ju","skin":"ddz_sj/name_bg.png","sizeGrid":"15","name":"win_ju"},"child":[{"type":"Label","props":{"y":13,"x":100,"text":"(0/4)局连胜奖励","name":"win_num","fontSize":24,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":0,"x":0,"width":720,"visible":false,"skin":"hall_ddz/bg.png","sizeGrid":"0,0,0,0","name":"loading","height":1280},"child":[{"type":"Image","props":{"y":734,"x":360,"width":150,"skin":"hall_ddz/loading_image.png","name":"jiazai","height":150,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":558,"x":257,"skin":"hall_ddz/voteUI_graybox.png"},"child":[{"type":"Label","props":{"y":5,"x":25,"text":"请稍等...","fontSize":40,"color":"#d9d9d9"}}]}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.sjddz.ddz_sjgameUI.uiView);

        }

    }
}

module ui.sjddz {
    export class ddz_sjgame_testUI extends View {
		public main:Laya.Panel;
		public room_ID:Laya.Label;
		public room_ju:Laya.Label;
		public roomTime:Laya.Label;
		public game:Laya.Box;
		public Panel_3:Laya.Box;
		public Panel_2:Laya.Box;
		public Panel_1:Laya.Box;
		public out_panel1:Laya.Box;
		public eff4:Laya.Image;
		public player1:Laya.Button;
		public head1:Laya.Image;
		public eff1:Laya.Box;
		public player2:Laya.Button;
		public head2:Laya.Image;
		public player3:Laya.Button;
		public head3:Laya.Image;
		public opt:Laya.Box;
		public opt1:Laya.Box;
		public opt2:Laya.Box;
		public opt3:Laya.Box;
		public center:Laya.Box;
		public delRoom:component.ScaleButton;
		public getFriend:component.ScaleButton;
		public startBtn:component.ScaleButton;
		public effmain:Laya.Box;
		public voice_bg:Laya.Image;
		public voice_list:Laya.List;
		public gold_number:Laya.Box;
		public gold_difen:Laya.FontClip;
		public gold_beishu:Laya.FontClip;
		public JiPaiQi:component.ScaleButton;
		public jpq_panel:Laya.Box;
		public backBtn:component.ScaleButton;
		public settingBtn:component.ScaleButton;
		public is_music:component.ScaleButton;
		public msgBtn:component.ScaleButton;
		public win_ju:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":90,"x":90,"width":720,"pivotY":90,"pivotX":90,"height":1280},"child":[{"type":"Panel","props":{"y":0,"x":-3,"width":720,"var":"main","name":"main","height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"ddz_sj/bg.png","height":1280}},{"type":"Panel","props":{"y":0,"x":0,"width":720,"name":"room_stat","height":40},"child":[{"type":"Label","props":{"y":20,"x":515,"var":"room_ID","text":"房间号:123456","name":"room_ID","fontSize":24,"color":"#ffffff","anchorY":0.5,"anchorX":0}},{"type":"Label","props":{"y":20,"x":331,"var":"room_ju","text":"0/5局","name":"room_ju","fontSize":24,"color":"#ffffff","anchorY":0.5,"anchorX":0}},{"type":"Label","props":{"y":20,"x":40,"var":"roomTime","text":"00:00 21:23","name":"roomTime","fontSize":24,"color":"#ffffff","anchorY":0.5,"anchorX":0}}]},{"type":"Box","props":{"y":0,"x":0,"width":720,"var":"game","name":"game","height":1280},"child":[{"type":"Box","props":{"y":470,"x":65,"width":1,"var":"Panel_3","name":"Panel_3","height":1,"anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":470,"x":640,"width":1,"var":"Panel_2","name":"Panel_2","height":1,"anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":1005,"x":320,"width":1,"var":"Panel_1","name":"Panel_1","height":1}},{"type":"Box","props":{"y":608,"x":362,"width":1,"var":"out_panel1","name":"out_panel1","height":1}},{"type":"Image","props":{"y":48,"x":226,"var":"eff4","skin":"ddz_sj/dipai_bg.png","name":"eff4","height":120},"child":[{"type":"Image","props":{"y":11,"x":11,"skin":"poker/poker_back.png","scaleY":0.6,"scaleX":0.6,"name":"eff4_pk1"}},{"type":"Image","props":{"y":11,"x":96,"skin":"poker/poker_back.png","scaleY":0.6,"scaleX":0.6,"name":"eff4_pk2"}},{"type":"Image","props":{"y":11,"x":180,"skin":"poker/poker_back.png","scaleY":0.6,"scaleX":0.6,"name":"eff4_pk3"}}]},{"type":"Button","props":{"y":1071,"x":20,"width":100,"visible":true,"var":"player1","stateNum":1,"skin":"ddz_sj/head_kuang.png","name":"player1","height":100},"child":[{"type":"Image","props":{"y":65,"x":50,"skin":"ddz_sj/tou_kuangti.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":0,"x":0,"width":100,"var":"head1","skin":"head/2.png","name":"head1","height":100}},{"type":"Image","props":{"y":0,"x":0,"width":100,"visible":false,"skin":"ddz_sj/head.png","name":"off","height":100}},{"type":"Image","props":{"y":15,"x":20,"width":60,"visible":false,"skin":"ddz/game_ok.png","name":"ready","height":70}},{"type":"Label","props":{"y":114,"x":50,"text":"我的名字","name":"nameText","fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":124,"x":171,"text":"9999999","name":"coinText","fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":111,"x":250,"visible":false,"skin":"ddz_sj/gold_bg.png","name":"gold_bg","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":0,"x":0,"width":48,"skin":"ddz_sj/gold.png","scaleY":0.8,"scaleX":0.8,"height":48}},{"type":"Label","props":{"y":20,"x":101,"text":"123456","name":"goldValue","fontSize":24,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":-90,"x":50,"width":0,"var":"eff1","name":"eff1","height":0,"anchorY":0,"anchorX":0}},{"type":"Image","props":{"y":0,"x":40,"width":60,"visible":false,"skin":"ddz_sj/dizhu.png","name":"zhuang","height":70}},{"type":"Image","props":{"y":-37,"x":14,"width":72,"visible":false,"skin":"text/double_2.png","name":"double","height":28}},{"type":"Image","props":{"y":-467,"x":300,"width":83,"visible":false,"skin":"ddz_sj/time_bg.png","name":"time_bg","height":96},"child":[{"type":"Label","props":{"y":48,"x":41,"text":"5","name":"js_time","fontSize":30,"color":"#000000","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":21,"x":105,"visible":false,"skin":"ddz_sj/yyDialog.png","sizeGrid":"18,33,14,25","scaleX":-1,"name":"voice1","anchorX":1},"child":[{"type":"Text","props":{"y":17,"x":89,"text":"fffffffffffffffffffffffffff","scaleX":-1,"name":"msgText","fontSize":28,"color":"#ffffff"}}]}]},{"type":"Button","props":{"y":233,"x":597,"width":100,"visible":false,"var":"player2","stateNum":1,"skin":"ddz_sj/head_kuang.png","scaleX":1,"name":"player2","height":100},"child":[{"type":"Image","props":{"y":64,"x":50,"skin":"ddz_sj/tou_kuangti.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":0,"x":0,"width":100,"var":"head2","skin":"head/2.png","name":"head2","height":100}},{"type":"Image","props":{"y":0,"x":0,"width":100,"visible":false,"skin":"ddz_sj/head.png","name":"off","height":100}},{"type":"Image","props":{"y":15,"x":20,"width":60,"visible":false,"skin":"ddz/game_ok.png","name":"ready","height":70}},{"type":"Image","props":{"y":-33,"x":59,"width":150,"visible":false,"skin":"ddz_sj/gold_bg.png","scaleY":0.8,"scaleX":0.8,"name":"gold_bg","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":0,"x":0,"width":48,"skin":"ddz_sj/gold.png","scaleY":0.8,"scaleX":0.8,"height":48}},{"type":"Label","props":{"y":19,"x":90,"text":"123456","name":"goldValue","fontSize":24,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":113,"x":50,"text":"我的名字","name":"nameText","fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":156,"x":51,"text":"9999999","name":"coinText","fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":-61,"x":50,"width":0,"name":"eff2","height":0,"anchorY":0,"anchorX":0}},{"type":"Image","props":{"y":0,"x":47,"width":66,"visible":false,"skin":"ddz_sj/dizhu.png","scaleY":0.8,"scaleX":0.8,"name":"zhuang","height":78}},{"type":"Image","props":{"y":-41,"x":14,"width":72,"visible":false,"skin":"text/double_2.png","name":"double","height":28}},{"type":"Image","props":{"y":46,"x":-68,"width":64,"visible":false,"skin":"public/poker_back.png","scaleY":0.8,"scaleX":0.8,"name":"pk_bg","height":81},"child":[{"type":"Label","props":{"y":40,"x":32,"text":"17","name":"pker_num","fontSize":26,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":-42,"x":-74,"width":83,"visible":false,"skin":"ddz_sj/time_bg.png","scaleY":0.8,"scaleX":0.8,"name":"time_bg","height":96},"child":[{"type":"Label","props":{"y":48,"x":41,"text":"5","name":"js_time","fontSize":30,"color":"#000000","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":21,"x":-16,"visible":false,"skin":"ddz_sj/yyDialog.png","sizeGrid":"14,26,13,21","name":"voice1","anchorX":1},"child":[{"type":"Text","props":{"y":17,"x":89,"text":"fffffffffffffffffffffffffff","scaleX":-1,"name":"msgText","fontSize":28,"color":"#ffffff"}}]}]},{"type":"Button","props":{"y":283,"x":74,"width":100,"visible":false,"var":"player3","stateNum":1,"skin":"ddz_sj/head_kuang.png","scaleX":1,"name":"player3","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":64,"x":50,"skin":"ddz_sj/tou_kuangti.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":0,"x":0,"width":100,"var":"head3","skin":"head/2.png","name":"head3","height":100}},{"type":"Image","props":{"y":0,"x":0,"width":100,"visible":false,"skin":"ddz_sj/head.png","name":"off","height":100,"disabled":true}},{"type":"Image","props":{"y":15,"x":20,"width":60,"visible":false,"skin":"ddz/game_ok.png","name":"ready","height":70}},{"type":"Image","props":{"y":-33,"x":50,"width":150,"visible":false,"skin":"ddz_sj/gold_bg.png","scaleY":0.8,"scaleX":0.8,"name":"gold_bg","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":0,"x":0,"width":48,"skin":"ddz_sj/gold.png","scaleY":0.8,"scaleX":0.8,"height":48}},{"type":"Label","props":{"y":17,"x":93,"text":"123456","name":"goldValue","fontSize":24,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":113,"x":50,"text":"我的名字","name":"nameText","fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":154,"x":50,"text":"9999999","name":"coinText","fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":-48,"x":50,"name":"eff3","anchorY":0,"anchorX":0}},{"type":"Image","props":{"y":0,"x":34,"width":66,"visible":false,"skin":"ddz_sj/dizhu.png","name":"zhuang","height":78}},{"type":"Image","props":{"y":-33,"x":14,"width":72,"visible":false,"skin":"text/double_2.png","name":"double","height":28}},{"type":"Image","props":{"y":46,"x":127,"width":64,"visible":false,"skin":"public/poker_back.png","scaleY":0.8,"scaleX":0.8,"name":"pk_bg","height":81},"child":[{"type":"Label","props":{"y":40,"x":32,"text":"17","name":"pker_num","fontSize":26,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":-42,"x":120,"width":83,"visible":false,"skin":"ddz_sj/time_bg.png","scaleY":0.8,"scaleX":0.8,"name":"time_bg","height":96},"child":[{"type":"Label","props":{"y":48,"x":41,"text":"5","name":"js_time","fontSize":30,"color":"#000000","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":21,"x":104,"visible":false,"skin":"ddz_sj/yyDialog.png","sizeGrid":"18,33,14,25","scaleX":-1,"name":"voice1","anchorX":1},"child":[{"type":"Text","props":{"y":17,"x":89,"text":"fffffffffffffffffffffffffff","scaleX":-1,"name":"msgText","fontSize":28,"color":"#ffffff"}}]}]},{"type":"Box","props":{"y":724,"x":326,"width":100,"var":"opt","name":"opt","height":100},"child":[{"type":"Box","props":{"y":-13,"x":-600,"width":1,"visible":false,"var":"opt1","name":"opt1","height":1},"child":[{"type":"ScaleButton","props":{"y":50,"x":383,"skin":"ddz_sj/bujiaobtn.png","name":"btn_1","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":50,"x":553,"skin":"ddz_sj/1fen.png","name":"btn_2","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":50,"x":722,"skin":"ddz_sj/2fen.png","name":"btn_3","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":50,"x":892,"skin":"ddz_sj/3fen.png","name":"btn_4","label":"","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":-28,"x":-609,"width":19,"visible":false,"var":"opt2","name":"opt2","height":31},"child":[{"type":"ScaleButton","props":{"y":46,"x":553,"skin":"ddz_sj/jiabei.png","name":"btn_2","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":46,"x":782,"skin":"ddz_sj/bujiabei.png","name":"btn_1","label":"","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":-28,"x":-609,"width":19,"visible":false,"var":"opt3","name":"opt3","height":31},"child":[{"type":"ScaleButton","props":{"y":40,"x":429,"skin":"ddz_sj/buchu_btn.png","name":"btn_1","labelStrokeColor":"#ffffff","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":40,"x":658,"skin":"ddz_sj/tishi.png","name":"btn_3","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":40,"x":886,"skin":"ddz_sj/chupai1.png","name":"btn_2","label":"","disabled":false,"anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":39,"x":661,"visible":false,"skin":"ddz/button_yaobuqi.png","name":"buchuBtn","label":"","disabled":false,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":10,"x":22,"text":"要不起(1s)","fontSize":28,"color":"#ffffff"}}]},{"type":"ScaleButton","props":{"y":39,"x":659,"visible":false,"skin":"ddz_sj/chupai1.png","name":"chupai","label":"","disabled":false,"anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":39,"x":660,"visible":false,"skin":"ddz_sj/buchu_btn.png","name":"buchu","labelStrokeColor":"#ffffff","label":"","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"Box","props":{"y":416,"x":227,"width":300,"var":"center","name":"center","height":300},"child":[{"type":"ScaleButton","props":{"y":239,"x":313,"var":"delRoom","skin":"ddz/room_del_room.png","name":"delRoom","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":237,"x":-22,"var":"getFriend","skin":"ddz/room_get_friend.png","name":"getFriend","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":327,"x":158,"var":"startBtn","skin":"ddz/ready.png","name":"startBtn","label":"","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":550,"x":372,"width":1,"var":"effmain","name":"effmain","height":1,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":1202,"x":723,"width":400,"visible":false,"var":"voice_bg","skin":"ddz_sj/chatPt_bg.png","renderType":"render","name":"voice_bg","mouseEnabled":true,"height":350,"anchorY":1,"anchorX":1}},{"type":"List","props":{"y":1202,"x":723,"width":400,"visible":false,"var":"voice_list","repeatY":5,"repeatX":1,"name":"voice_list","height":350,"anchorY":1,"anchorX":1},"child":[{"type":"Box","props":{"y":0,"x":0,"width":400,"renderType":"render","height":60},"child":[{"type":"Image","props":{"y":54,"x":0,"width":400,"skin":"chat/xixian.png","renderType":"render","mouseEnabled":true}},{"type":"Label","props":{"y":27,"x":200,"text":"label","name":"msgText","fontSize":26,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"Box","props":{"y":252,"x":360,"width":280,"visible":false,"var":"gold_number","name":"gold_number","height":50,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"FontClip","props":{"y":27,"x":10,"var":"gold_difen","value":"798","skin":"ddz_sj/beishu_num.png","sheet":"0123456789","name":"gold_difen","anchorY":0.5,"anchorX":0}},{"type":"Image","props":{"y":6,"x":235,"skin":"ddz_sj/bei_dan.png"}},{"type":"FontClip","props":{"y":29,"x":235,"var":"gold_beishu","value":"3","skin":"ddz_sj/beishu_num.png","sheet":"0123456789","name":"gold_beishu","anchorY":0.5,"anchorX":1}}]},{"type":"ScaleButton","props":{"y":1241,"x":545,"var":"JiPaiQi","skin":"ddz/JiPaiQi.png","name":"JiPaiQi","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":1211,"x":6,"width":460,"var":"jpq_panel","name":"jpq_panel","height":60},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"ddz/dawang.png"},"child":[{"type":"Image","props":{"y":30,"x":0,"skin":"ddz/card_bg.png"},"child":[{"type":"FontClip","props":{"y":15,"x":15,"visible":false,"value":"1","skin":"ddz_sj/shunzi_num.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"name":"card_1","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"Image","props":{"y":0,"x":31,"skin":"ddz/xiaowang.png"},"child":[{"type":"Image","props":{"y":30,"x":0,"skin":"ddz/card_bg.png"},"child":[{"type":"FontClip","props":{"y":15,"x":15,"visible":false,"value":"1","skin":"ddz_sj/shunzi_num.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"name":"card_2","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"Image","props":{"y":0,"x":62,"skin":"ddz/card_2.png"},"child":[{"type":"Image","props":{"y":30,"x":0,"skin":"ddz/card_bg.png"},"child":[{"type":"FontClip","props":{"y":15,"x":15,"visible":false,"value":"1","skin":"ddz_sj/shunzi_num.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"name":"card_3","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"Image","props":{"y":0,"x":93,"skin":"ddz/card_a.png"},"child":[{"type":"Image","props":{"y":30,"x":0,"skin":"ddz/card_bg.png"},"child":[{"type":"FontClip","props":{"y":15,"x":15,"visible":false,"value":"1","skin":"ddz_sj/shunzi_num.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"name":"card_4","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"Image","props":{"y":0,"x":123,"skin":"ddz/card_k.png"},"child":[{"type":"Image","props":{"y":30,"x":0,"skin":"ddz/card_bg.png"},"child":[{"type":"FontClip","props":{"y":15,"x":15,"visible":false,"value":"1","skin":"ddz_sj/shunzi_num.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"name":"card_5","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"Image","props":{"y":0,"x":154,"skin":"ddz/card_q.png"},"child":[{"type":"Image","props":{"y":30,"x":0,"skin":"ddz/card_bg.png"},"child":[{"type":"FontClip","props":{"y":15,"x":15,"visible":false,"value":"1","skin":"ddz_sj/shunzi_num.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"name":"card_6","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"Image","props":{"y":0,"x":185,"skin":"ddz/card_j.png"},"child":[{"type":"Image","props":{"y":30,"x":0,"skin":"ddz/card_bg.png"},"child":[{"type":"FontClip","props":{"y":15,"x":15,"visible":false,"value":"1","skin":"ddz_sj/shunzi_num.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"name":"card_7","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"Image","props":{"y":0,"x":216,"skin":"ddz/card_10.png"},"child":[{"type":"Image","props":{"y":30,"x":0,"skin":"ddz/card_bg.png"},"child":[{"type":"FontClip","props":{"y":15,"x":15,"visible":false,"value":"1","skin":"ddz_sj/shunzi_num.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"name":"card_8","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"Image","props":{"y":0,"x":247,"skin":"ddz/card_9.png"},"child":[{"type":"Image","props":{"y":30,"x":0,"skin":"ddz/card_bg.png"},"child":[{"type":"FontClip","props":{"y":15,"x":15,"visible":false,"value":"1","skin":"ddz_sj/shunzi_num.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"name":"card_9","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"Image","props":{"y":0,"x":278,"skin":"ddz/card_8.png"},"child":[{"type":"Image","props":{"y":30,"x":0,"skin":"ddz/card_bg.png"},"child":[{"type":"FontClip","props":{"y":15,"x":15,"visible":false,"value":"1","skin":"ddz_sj/shunzi_num.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"name":"card_10","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"Image","props":{"y":0,"x":308,"skin":"ddz/card_7.png"},"child":[{"type":"Image","props":{"y":30,"x":0,"skin":"ddz/card_bg.png"},"child":[{"type":"FontClip","props":{"y":15,"x":15,"visible":false,"value":"1","skin":"ddz_sj/shunzi_num.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"name":"card_11","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"Image","props":{"y":0,"x":339,"skin":"ddz/card_6.png"},"child":[{"type":"Image","props":{"y":30,"x":0,"skin":"ddz/card_bg.png"},"child":[{"type":"FontClip","props":{"y":15,"x":15,"visible":false,"value":"1","skin":"ddz_sj/shunzi_num.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"name":"card_12","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"Image","props":{"y":0,"x":369,"skin":"ddz/card_5.png"},"child":[{"type":"Image","props":{"y":30,"x":0,"skin":"ddz/card_bg.png"},"child":[{"type":"FontClip","props":{"y":15,"x":15,"visible":false,"value":"1","skin":"ddz_sj/shunzi_num.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"name":"card_13","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"Image","props":{"y":0,"x":400,"skin":"ddz/card_4.png"},"child":[{"type":"Image","props":{"y":30,"x":0,"skin":"ddz/card_bg.png"},"child":[{"type":"FontClip","props":{"y":15,"x":15,"visible":false,"value":"1","skin":"ddz_sj/shunzi_num.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"name":"card_14","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"Image","props":{"y":0,"x":430,"skin":"ddz/card_3.png"},"child":[{"type":"Image","props":{"y":30,"x":0,"skin":"ddz/card_bg.png"},"child":[{"type":"FontClip","props":{"y":15,"x":15,"visible":false,"value":"1","skin":"ddz_sj/shunzi_num.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"name":"card_15","anchorY":0.5,"anchorX":0.5}}]}]}]}]},{"type":"ScaleButton","props":{"x":752,"var":"backBtn","top":-183,"skin":"ddz/room_close.png","name":"backBtn","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":97,"x":622,"width":70,"var":"settingBtn","skin":"ddz_sj/shezhi.png","name":"settingBtn","label":"","height":90,"anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":92,"x":84,"var":"is_music","skin":"ddz_sj/music_kai.png","name":"is_music","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":1220,"x":667,"var":"msgBtn","skin":"ddz_sj/msg.png","pivotY":34,"pivotX":39,"name":"msgBtn","label":""}},{"type":"Image","props":{"y":185,"x":260,"width":200,"visible":false,"var":"win_ju","skin":"ddz_sj/name_bg.png","sizeGrid":"15","name":"win_ju"},"child":[{"type":"Label","props":{"y":13,"x":100,"text":"(0/4)局连胜奖励","name":"win_num","fontSize":24,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":0,"x":0,"width":720,"visible":false,"skin":"hall_ddz/bg.png","sizeGrid":"0,0,0,0","name":"loading","height":1280},"child":[{"type":"Image","props":{"y":734,"x":360,"width":150,"skin":"hall_ddz/loading_image.png","name":"jiazai","height":150,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":558,"x":257,"skin":"hall_ddz/voteUI_graybox.png"},"child":[{"type":"Label","props":{"y":5,"x":25,"text":"请稍等...","fontSize":40,"color":"#d9d9d9"}}]}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.sjddz.ddz_sjgame_testUI.uiView);

        }

    }
}

module ui.sjddz {
    export class dissolve_ddzUI extends Dialog {
		public Button_back:component.ScaleButton;
		public Button_close:component.ScaleButton;

        public static  uiView:any ={"type":"Dialog","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"public/mask.png","sizeGrid":"0,0,0,0","height":1280,"alpha":0.7}},{"type":"Image","props":{"y":432,"x":30,"width":648,"skin":"ddz_sj/jiesan_bg.png","height":459},"child":[{"type":"Box","props":{"y":0,"x":0,"width":648,"height":459},"child":[{"type":"ScaleButton","props":{"y":340,"x":269,"var":"Button_back","skin":"ddz_sj/jiesan_room.png","name":"Button_back","label":"","centerX":-9,"bottom":83}},{"type":"ScaleButton","props":{"y":41,"x":621,"var":"Button_close","skin":"ddz_sj/close.png","name":"Button_close","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":18,"x":239,"skin":"ddz_sj/room_jiesanzi.png"}},{"type":"Label","props":{"y":129,"x":98,"width":480,"text":"游戏未开始，解散房间将不会","name":"Text_1","height":45,"fontSize":35,"font":"SimHei","color":"#9b6535","anchorY":0,"anchorX":0}},{"type":"Label","props":{"y":175,"x":94,"width":187,"text":"扣除房卡！","name":"Text_1","height":51,"fontSize":35,"font":"SimHei","color":"#9b6535","anchorY":0,"anchorX":0}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.sjddz.dissolve_ddzUI.uiView);

        }

    }
}

module ui.sjddz {
    export class Earn_cardUI extends Dialog {
		public icon_bg:Laya.Image;
		public share:component.ScaleButton;
		public closeBtn:component.ScaleButton;

        public static  uiView:any ={"type":"Dialog","props":{"width":720,"popupCenter":true,"height":1280,"alpha":1},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"public/mask.png","sizeGrid":"0,0,0,0","height":1280,"alpha":0.7}},{"type":"Image","props":{"y":141,"x":23,"width":674,"skin":"ddz/share_bg.png","name":"bankrupt","height":941},"child":[{"type":"Image","props":{"y":18,"x":251,"skin":"ddz/zhuan_zhuangka.png"}},{"type":"Image","props":{"y":77,"x":35,"var":"icon_bg","skin":"ddz/zhuan_action_bg.png","name":"huodong_bg"}},{"type":"Image","props":{"y":375,"x":28,"skin":"ddz/zhuan_juxingbg.png","name":"invite_imgbg1"},"child":[{"type":"ScaleButton","props":{"y":58,"x":504,"width":151,"visible":true,"skin":"ddz/zhuan_qianwang.png","name":"qiangwang1","label":"","height":63,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":32,"x":41,"text":"成功邀请到2位新人（    /2）","name":"invit_text_bg1","fontSize":24,"color":"#5c6187","anchorY":0.5,"anchorX":0},"child":[{"type":"Label","props":{"y":12,"x":241,"text":"0","name":"invitation1","fontSize":24,"color":"#ff6600","anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":81,"x":41,"text":"奖励","fontSize":28,"color":"#ff6600","anchorY":0.5,"anchorX":0},"child":[{"type":"Image","props":{"y":-21,"x":55,"skin":"ddz/zhuan_fuhukcard.png"}}]},{"type":"Label","props":{"y":81,"x":169,"text":"×2","name":"card_num1","fontSize":28,"color":"#ff6600","anchorY":0.5,"anchorX":0}},{"type":"Image","props":{"y":59,"x":505,"visible":false,"skin":"ddz/share_lingqu.png","name":"receive","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":509,"x":28,"skin":"ddz/zhuan_juxingbg.png","name":"invite_imgbg2"},"child":[{"type":"ScaleButton","props":{"y":58,"x":504,"visible":true,"skin":"ddz/zhuan_qianwang.png","name":"qiangwang2","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":32,"x":41,"text":"成功邀请到6位新人（    /6）","name":"invit_text_bg2","fontSize":24,"color":"#5c6187","anchorY":0.5,"anchorX":0},"child":[{"type":"Label","props":{"y":12,"x":241,"text":"0","name":"invitation2","fontSize":24,"color":"#ff6600","anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":81,"x":41,"text":"奖励","fontSize":28,"color":"#ff6600","anchorY":0.5,"anchorX":0},"child":[{"type":"Image","props":{"y":-21,"x":55,"skin":"ddz/zhuan_fuhukcard.png"}}]},{"type":"Label","props":{"y":81,"x":169,"text":"×8","name":"card_num2","fontSize":28,"color":"#ff6600","anchorY":0.5,"anchorX":0}},{"type":"Image","props":{"y":59,"x":505,"visible":false,"skin":"ddz/share_lingqu.png","name":"receive","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":643,"x":28,"skin":"ddz/zhuan_juxingbg.png","name":"invite_imgbg3"},"child":[{"type":"ScaleButton","props":{"y":58,"x":504,"visible":true,"skin":"ddz/zhuan_qianwang.png","name":"qiangwang3","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":32,"x":41,"text":"成功邀请到15位新人（    /15）","name":"invit_text_bg3","fontSize":24,"color":"#5c6187","anchorY":0.5,"anchorX":0},"child":[{"type":"Label","props":{"y":12,"x":254,"text":"0","name":"invitation3","fontSize":24,"color":"#ff6600","anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":81,"x":41,"text":"奖励","fontSize":28,"color":"#ff6600","anchorY":0.5,"anchorX":0},"child":[{"type":"Image","props":{"y":-21,"x":55,"skin":"ddz/zhuan_fuhukcard.png"}}]},{"type":"Label","props":{"y":81,"x":169,"text":"×20","name":"card_num3","fontSize":28,"color":"#ff6600","anchorY":0.5,"anchorX":0}},{"type":"Image","props":{"y":59,"x":505,"visible":false,"skin":"ddz/share_lingqu.png","name":"receive","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":777,"x":28,"skin":"ddz/zhuan_juxingbg.png","name":"invite_imgbg4"},"child":[{"type":"ScaleButton","props":{"y":58,"x":504,"visible":true,"skin":"ddz/zhuan_qianwang.png","name":"qiangwang4","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":32,"x":41,"text":"成功邀请到40位新人（    /40）","name":"invit_text_bg4","fontSize":24,"color":"#5c6187","anchorY":0.5,"anchorX":0},"child":[{"type":"Label","props":{"y":12,"x":254,"text":"0","name":"invitation4","fontSize":24,"color":"#ff6600","anchorY":0.5,"anchorX":0.5}}]},{"type":"Label","props":{"y":81,"x":41,"text":"奖励","fontSize":28,"color":"#ff6600","anchorY":0.5,"anchorX":0},"child":[{"type":"Image","props":{"y":-21,"x":55,"skin":"ddz/zhuan_fuhukcard.png"}}]},{"type":"Label","props":{"y":81,"x":169,"text":"×50","name":"card_num4","fontSize":28,"color":"#ff6600","anchorY":0.5,"anchorX":0}},{"type":"Image","props":{"y":59,"x":505,"visible":false,"skin":"ddz/share_lingqu.png","name":"receive","anchorY":0.5,"anchorX":0.5}}]},{"type":"ScaleButton","props":{"y":337,"x":1046,"visible":true,"var":"share","skin":"ddz_sj/share.png","name":"share","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":36,"x":630,"visible":true,"var":"closeBtn","skin":"ddz/share_close.png","scaleY":0.8,"scaleX":0.8,"name":"closeBtn","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":919,"x":280,"visible":false,"text":"新玩家点入，即可获得","fontSize":24,"color":"#5c6187","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":919,"x":459,"visible":false,"text":"复活卡","fontSize":24,"color":"#ff6600","anchorY":0.5,"anchorX":0.5}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.sjddz.Earn_cardUI.uiView);

        }

    }
}

module ui.sjddz {
    export class envelopeUI extends Dialog {
		public content:Laya.Image;
		public envelope_bg:Laya.Image;
		public shagnjin_p:Laya.Button;
		public jinbi_p:Laya.Button;
		public button_1:Laya.Button;
		public button_2:Laya.Button;
		public button_3:Laya.Button;
		public flock:component.ScaleButton;
		public closeBtn:component.ScaleButton;
		public user_bg_tu:Laya.Image;
		public player_name:Laya.Label;
		public player_money:Laya.Label;
		public RankingList:Laya.List;
		public user_content:laya.display.Text;
		public user_name:laya.display.Text;
		public user_img:Laya.Image;
		public user_icon:Laya.Image;
		public user_icon_clip:Laya.FontClip;
		public zanweikaifang:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"width":720,"popupCenter":true,"height":1280,"alpha":1},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"var":"content","skin":"ddz/envelope_bg.png","name":"content","height":1280},"child":[{"type":"Image","props":{"y":164,"x":360,"var":"envelope_bg","skin":"ddz/envelope_bg2.png","name":"envelope_bg","anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":135,"x":161,"width":138,"var":"shagnjin_p","name":"shagnjin_p","labelStrokeColor":"#5d8de1","labelSize":30,"labelFont":"SimHei","label":"赏金排行","height":58}},{"type":"Button","props":{"y":134,"x":420,"width":138,"var":"jinbi_p","name":"jinbi_p","labelStrokeColor":"#5d8de1","labelSize":30,"labelFont":"SimHei","label":"金币排行","height":58}},{"type":"Image","props":{"y":249,"x":45,"width":634,"skin":"ddz/p1.png","height":58},"child":[{"type":"Button","props":{"y":0,"x":62,"width":106,"var":"button_1","name":"button_1","labelStrokeColor":"#5d8de1","labelSize":30,"labelFont":"SimHei","label":"好友榜","height":58},"child":[{"type":"Image","props":{"y":56,"x":-17,"visible":false,"skin":"ddz/envelope_pai.png","name":"xiahua"}}]},{"type":"Button","props":{"y":0,"x":266,"width":106,"var":"button_2","name":"button_2","labelStrokeColor":"#5d8de1","labelSize":30,"labelFont":"SimHei","label":"世界榜","height":58},"child":[{"type":"Image","props":{"y":56,"x":-17,"visible":false,"skin":"ddz/envelope_pai.png","name":"xiahua"}}]},{"type":"Button","props":{"y":0,"x":470,"width":106,"var":"button_3","name":"button_3","labelStrokeColor":"#5d8de1","labelSize":30,"labelFont":"SimHei","label":"群友榜","height":58},"child":[{"type":"Image","props":{"y":56,"x":-17,"visible":false,"skin":"ddz/envelope_pai.png","name":"xiahua"}}]}]},{"type":"ScaleButton","props":{"y":1213,"x":372,"var":"flock","skin":"ddz/share_qunliao.png","name":"flock","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":40,"x":43,"visible":true,"var":"closeBtn","skin":"ddz_sj/hongbao_close.png","scaleY":0.8,"scaleX":0.8,"name":"closeBtn","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":1038,"x":43,"width":634,"var":"user_bg_tu","skin":"ddz/p4.png","name":"user_bg_tu","height":98},"child":[{"type":"Label","props":{"y":28,"x":217,"var":"player_name","text":"玩家昵称","name":"player_name","fontSize":40,"color":"#5d8del"}},{"type":"Label","props":{"y":48,"x":579,"var":"player_money","text":"排名:10","name":"player_money","fontSize":40,"color":"#5d8del","anchorY":0.5,"anchorX":1}}]},{"type":"List","props":{"y":329,"x":45,"width":630,"var":"RankingList","spaceY":10,"repeatY":8,"repeatX":1,"name":"RankingList","height":707},"child":[{"type":"Box","props":{"y":0,"x":0,"width":630,"renderType":"render","height":70},"child":[{"type":"Image","props":{"skin":"ddz_sj/pai_juxing1.png"}},{"type":"Text","props":{"y":15,"x":455,"width":143,"var":"user_content","text":"12345678","name":"user_content","height":40,"fontSize":30,"font":"Microsoft YaHei","color":"#dc8700"}},{"type":"Text","props":{"y":15,"x":250,"width":130,"var":"user_name","text":"洋洋宝宝","overflow":"hidden","name":"user_name","height":40,"fontSize":30,"font":"Microsoft YaHei","color":"#939393","align":"left"}},{"type":"Image","props":{"y":5,"x":90,"width":60,"var":"user_img","skin":"head/10.png","name":"user_img","height":60}},{"type":"Image","props":{"y":8,"x":22,"visible":false,"var":"user_icon","skin":"ddz_sj/jiangpai1.png","name":"user_icon"}},{"type":"FontClip","props":{"y":39,"x":45,"visible":false,"var":"user_icon_clip","value":"1","skin":"ddz_sj/beishu_num.png","sheet":"0123456789","name":"user_icon_clip","anchorY":0.5,"anchorX":0.5}}]}]}]},{"type":"Label","props":{"y":630,"x":280,"visible":false,"var":"zanweikaifang","text":"暂未开放","name":"zanweikaifang","fontSize":40,"color":"#5d8del"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.sjddz.envelopeUI.uiView);

        }

    }
}

module ui.sjddz {
    export class fileApplication_sjddzUI extends Dialog {
		public Button_2:component.ScaleButton;
		public Text_2:Laya.Label;
		public Button_3:component.ScaleButton;
		public Text_3:Laya.Label;
		public Button_1:component.ScaleButton;
		public Text_1:Laya.Label;
		public Text_xuan:Laya.TextArea;

        public static  uiView:any ={"type":"Dialog","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"public/mask.png","sizeGrid":"0,0,0,0","height":1280,"alpha":0.7}},{"type":"Image","props":{"y":410,"x":36,"width":648,"skin":"ddz_sj/jiesan_bg.png","height":459},"child":[{"type":"Box","props":{"y":0,"x":0,"width":648,"height":459},"child":[{"type":"Image","props":{"y":20,"x":188,"top":20,"skin":"ddz_sj/fileApplication_sjddz.png","centerX":0}},{"type":"ScaleButton","props":{"y":361,"x":203,"width":164,"visible":true,"var":"Button_2","skin":"fileApplication/butongyi.png","name":"Button_2","label":"","height":62,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":7,"x":15,"var":"Text_2","text":"同意(90)","name":"Text_2","fontSize":35,"color":"#ffffff"}}]},{"type":"ScaleButton","props":{"y":361,"x":454,"visible":true,"var":"Button_3","skin":"fileApplication/btn.png","name":"Button_3","label":"","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":10,"x":29,"var":"Text_3","text":"不同意","name":"Text_3","fontSize":35,"color":"#ffffff"}}]},{"type":"ScaleButton","props":{"y":361,"x":324,"visible":false,"var":"Button_1","skin":"fileApplication/big_btn.png","scaleY":0.8,"scaleX":0.8,"name":"Button_1","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":20,"x":39,"var":"Text_1","text":"等待选择","name":"Text_1","fontSize":35,"color":"#ffffff"}}]},{"type":"TextArea","props":{"y":115,"x":26,"width":574,"var":"Text_xuan","text":"玩家申请解散当前游戏，您是否同意（若未选择，90秒后自动解散房间）！","name":"Text_xuan","height":150,"fontSize":40,"editable":false,"color":"#823e19"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.sjddz.fileApplication_sjddzUI.uiView);

        }

    }
}

module ui.sjddz {
    export class Friends_ddzUI extends Dialog {
		public Button_back:component.ScaleButton;
		public Button_close:component.ScaleButton;

        public static  uiView:any ={"type":"Dialog","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"public/mask.png","sizeGrid":"0,0,0,0","height":1280,"alpha":0.7}},{"type":"Image","props":{"y":432,"x":30,"width":648,"skin":"ddz_sj/jiesan_bg.png","height":459},"child":[{"type":"Box","props":{"y":0,"x":0,"width":648,"height":459},"child":[{"type":"ScaleButton","props":{"y":340,"x":269,"var":"Button_back","skin":"ddz_sj/jiesan_room.png","name":"Button_back","label":"","centerX":-9,"bottom":83}},{"type":"ScaleButton","props":{"y":41,"x":621,"var":"Button_close","skin":"ddz_sj/close.png","name":"Button_close","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":18,"x":239,"skin":"ddz_sj/room_jiesanzi.png"}},{"type":"Label","props":{"y":129,"x":98,"width":480,"text":"游戏未开始，解散房间将不会","name":"Text_1","height":45,"fontSize":35,"font":"SimHei","color":"#9b6535","anchorY":0,"anchorX":0}},{"type":"Label","props":{"y":175,"x":94,"width":187,"text":"扣除房卡！","name":"Text_1","height":51,"fontSize":35,"font":"SimHei","color":"#9b6535","anchorY":0,"anchorX":0}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.sjddz.Friends_ddzUI.uiView);

        }

    }
}

module ui.sjddz {
    export class gold_common_tipsUI extends Dialog {
		public pochang:Laya.Label;
		public share:component.ScaleButton;
		public closeBtn:component.ScaleButton;

        public static  uiView:any ={"type":"Dialog","props":{"width":720,"popupCenter":true,"height":1280,"alpha":1},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"public/mask.png","sizeGrid":"0,0,0,0","height":1280,"alpha":0.7}},{"type":"Image","props":{"y":413,"x":36,"width":648,"skin":"ddz_sj/create_bg.png","name":"bankrupt","height":453},"child":[{"type":"Label","props":{"y":25,"x":328,"text":"金币补助","fontSize":30,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":179,"x":326,"var":"pochang","text":"云帆斗地主为您奉上5000金币~","name":"pochang","fontSize":36,"color":"#9b6535","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":343,"x":323,"visible":true,"var":"share","skin":"ddz_sj/share.png","name":"share","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":44,"x":612,"visible":true,"var":"closeBtn","skin":"ddz_sj/close.png","scaleY":0.8,"scaleX":0.8,"name":"closeBtn","label":"","anchorY":0.5,"anchorX":0.5}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.sjddz.gold_common_tipsUI.uiView);

        }

    }
}

module ui.sjddz {
    export class gold_typeUI extends Dialog {
		public closeBtn:component.ScaleButton;
		public session1:component.ScaleButton;
		public session2:component.ScaleButton;
		public session3:component.ScaleButton;
		public Button_start:component.ScaleButton;
		public user_info:Laya.Button;
		public headImg:Laya.Image;
		public addGold:component.ScaleButton;
		public goldValue:Laya.Label;
		public addCard:component.ScaleButton;
		public cardValue:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"ddz_sj/bg.png","height":1280},"child":[{"type":"ScaleButton","props":{"y":56,"x":65,"var":"closeBtn","skin":"ddz_sj/hongbao_close.png","name":"closeBtn","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":322,"x":199,"var":"session1","skin":"gold_ui/345.png","name":"session1","label":"","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":20,"x":142,"text":"4000金币","name":"start","fontSize":25,"color":"#0e7d53","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":300,"x":136,"text":"7局奖励数0.01红包","name":"award","fontSize":25,"color":"#000000","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":340,"x":34,"width":20,"skin":"gold_ui/rentou1.png","height":30},"child":[{"type":"Label","props":{"y":15,"x":48,"text":"1000","name":"people","fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":340,"x":169,"width":30,"skin":"gold_ui/jingbi1.png","height":30},"child":[{"type":"Label","props":{"y":15,"x":49,"width":22.24609375,"text":"50","name":"line","height":20,"fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"ScaleButton","props":{"y":316,"x":529,"var":"session2","skin":"gold_ui/234.png","name":"session2","label":"","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":20,"x":142,"text":"20000金币","name":"start","fontSize":25,"color":"#0e7d53","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":300,"x":136,"text":"7局奖励数0.02红包","name":"award","fontSize":25,"color":"#000000","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":340,"x":34,"width":20,"skin":"gold_ui/rentou1.png","height":30},"child":[{"type":"Label","props":{"y":15,"x":48,"text":"530","name":"people","fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":340,"x":169,"width":30,"skin":"gold_ui/jingbi1.png","height":30},"child":[{"type":"Label","props":{"y":15,"x":49,"width":22.24609375,"text":"33","name":"line","height":20,"fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"ScaleButton","props":{"y":771,"x":364,"var":"session3","skin":"gold_ui/123.png","name":"session3","label":"","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":22,"x":142,"text":"80000金币","name":"start","fontSize":25,"color":"#0e7d53","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":300,"x":136,"text":"7局奖励数0.03红包","name":"award","fontSize":25,"color":"#000000","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":340,"x":34,"width":20,"skin":"gold_ui/rentou1.png","height":30},"child":[{"type":"Label","props":{"y":15,"x":48,"text":"320","name":"people","fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":340,"x":169,"width":30,"skin":"gold_ui/jingbi1.png","height":30},"child":[{"type":"Label","props":{"y":15,"x":49,"width":22.24609375,"text":"10","name":"line","height":20,"fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"ScaleButton","props":{"y":1086,"x":363,"var":"Button_start","skin":"ddz_sj/quick_start.png","name":"Button_start","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":1130,"x":0,"width":720,"height":150},"child":[{"type":"Button","props":{"y":69,"x":91,"width":100,"var":"user_info","stateNum":1,"skin":"ddz_sj/lobbyUI_headFrame.png","name":"user_info","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":52,"width":100,"var":"headImg","skin":"head/1.png","name":"headImg","height":100,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":50,"x":50,"width":100,"visible":false,"skin":"ddz_sj/lobbyUI_headFrame.png","height":100,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":96,"x":282,"width":180,"skin":"ddz_sj/brand_bg.png","height":40,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"ScaleButton","props":{"y":20,"x":160,"width":45,"var":"addGold","skin":"ddz_sj/add.png","name":"addGold","label":"","height":45,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":0,"x":0,"width":48,"skin":"ddz_sj/brand.png","scaleY":0.8,"scaleX":0.8,"height":48}},{"type":"Label","props":{"y":20,"x":90,"var":"goldValue","text":"123456","name":"goldValue","fontSize":24,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":96,"x":539,"width":180,"skin":"ddz_sj/brand_bg.png","height":40,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"ScaleButton","props":{"y":20,"x":160,"width":45,"var":"addCard","skin":"ddz_sj/add.png","name":"addCard","label":"","height":45,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":-6,"x":0,"width":60,"skin":"ddz_sj/card.png","scaleY":0.8,"scaleX":0.8,"height":65}},{"type":"Label","props":{"y":20,"x":90,"var":"cardValue","text":"123456","name":"cardValue","fontSize":24,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.sjddz.gold_typeUI.uiView);

        }

    }
}

module ui.sjddz {
    export class hall_sjddzUI extends View {
		public Panel_1:Laya.Image;
		public Text_1:Laya.Label;
		public create_money:component.ScaleButton;
		public sjc_jushu:Laya.Label;
		public goldRoom:component.ScaleButton;
		public createRoom:component.ScaleButton;
		public notice:component.ScaleButton;
		public emil:component.ScaleButton;
		public closeBtn:component.ScaleButton;
		public envelope:component.ScaleButton;
		public resurrection:component.ScaleButton;
		public ranking:component.ScaleButton;
		public setting_sjddz:component.ScaleButton;
		public enterRoom:component.ScaleButton;
		public Daily:component.ScaleButton;
		public zhuan_card:component.ScaleButton;
		public treasure:component.ScaleButton;
		public Advertising:component.ScaleButton;
		public user_info:Laya.Box;

        public static  uiView:any ={"type":"View","props":{"width":720,"visible":true,"height":1280},"child":[{"type":"Image","props":{"width":720,"skin":"ddz_sj/bg.png","name":"bg","height":1280,"centerY":0}},{"type":"Box","props":{"width":720,"pivotY":0.5,"pivotX":0.5,"name":"center","height":1280},"child":[{"type":"Image","props":{"y":83,"x":35,"skin":"hall_ddz/sjddz_bg.png"}},{"type":"Image","props":{"y":301,"x":25,"var":"Panel_1","skin":"hall_ddz/quxing.png","name":"Panel_1"},"child":[{"type":"Panel","props":{"y":-1,"x":100,"width":512,"height":60},"child":[{"type":"Label","props":{"y":29,"x":648,"wordWrap":false,"var":"Text_1","text":"text","name":"Text_1","fontSize":30,"color":"#ffffff","anchorY":0.5}}]},{"type":"Image","props":{"y":8,"x":57,"skin":"hall_ddz/guangbo.png"}}]},{"type":"ScaleButton","props":{"y":485,"x":360,"var":"create_money","skin":"hall_ddz/createRoom.png","name":"create_money","label":"","centerY":-155,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":221,"x":269,"text":"七连胜瓜分百万红包","fontSize":20,"color":"#ffffff","anchorY":1,"anchorX":0}},{"type":"Image","props":{"y":62,"x":333,"width":120,"skin":"hall_ddz/juxing.png","height":29,"anchorY":1,"anchorX":0},"child":[{"type":"Label","props":{"y":26,"x":14,"var":"sjc_jushu","text":"连胜:2/7","name":"sjc_jushu","fontSize":25,"color":"#ffffff","anchorY":1,"anchorX":0}}]}]},{"type":"ScaleButton","props":{"y":737,"x":360,"width":469,"var":"goldRoom","skin":"hall_ddz/create_gold.png","name":"goldRoom","label":"","height":250,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":216,"x":308,"text":"经典7局拿红包","fontSize":20,"color":"#ffffff","anchorY":1,"anchorX":0}}]},{"type":"ScaleButton","props":{"y":993,"x":360,"var":"createRoom","skin":"hall_ddz/enterRoom.png","name":"createRoom","label":"","centerY":353,"anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"x":72,"var":"notice","skin":"hall_ddz/tongzhi.png","name":"notice","label":"","centerY":-577,"anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"x":206,"visible":false,"var":"emil","skin":"hall_ddz/youxiang.png","name":"emil","label":"","centerY":-577,"anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":-36,"x":844,"visible":false,"var":"closeBtn","skin":"ddz_sj/hongbao_close.png","scaleY":0.8,"scaleX":0.8,"name":"closeBtn","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"x":102,"var":"envelope","skin":"hall_ddz/paihangbang.png","name":"envelope","label":"","centerY":544,"anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"x":269,"var":"resurrection","skin":"hall_ddz/duihuan.png","name":"resurrection","label":"","centerY":544,"anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"x":441,"var":"ranking","skin":"hall_ddz/jiangping.png","name":"ranking","label":"","centerY":546,"anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"x":606,"var":"setting_sjddz","skin":"hall_ddz/user_info.png","name":"setting_sjddz","label":"","centerY":545,"anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"x":403,"width":100,"visible":false,"var":"enterRoom","skin":"hall_ddz/hall_item_1.png","name":"enterRoom","label":"","height":100,"centerY":-579,"anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":458,"x":653,"visible":true,"var":"Daily","skin":"hall_ddz/everyday.png","name":"Daily","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":589,"x":653,"visible":true,"var":"zhuan_card","skin":"hall_ddz/zhuan_card.png","name":"zhuan_card","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":728,"x":653,"visible":true,"var":"treasure","skin":"hall_ddz/baibaoxiang.png","name":"treasure","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":449,"x":71,"visible":true,"var":"Advertising","skin":"hall_ddz/Advertisin.png","name":"Advertising","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":1140,"x":0,"width":720,"visible":false,"var":"user_info","name":"user_info","height":150},"child":[{"type":"Button","props":{"y":69,"x":91,"width":100,"stateNum":1,"skin":"ddz_sj/lobbyUI_headFrame.png","name":"user_info","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":52,"width":100,"skin":"head/1.png","name":"headImg","height":100,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":50,"x":50,"width":100,"visible":false,"skin":"ddz_sj/lobbyUI_headFrame.png","height":100,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":96,"x":282,"width":180,"skin":"ddz_sj/brand_bg.png","height":40,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"ScaleButton","props":{"y":20,"x":160,"width":45,"skin":"ddz_sj/add.png","name":"addGold","label":"","height":45,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":0,"x":0,"width":48,"skin":"ddz_sj/brand.png","scaleY":0.8,"scaleX":0.8,"height":48}},{"type":"Label","props":{"y":20,"x":90,"text":"123456","name":"goldValue","fontSize":24,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":96,"x":539,"width":180,"skin":"ddz_sj/brand_bg.png","height":40,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"ScaleButton","props":{"y":20,"x":160,"width":45,"skin":"ddz_sj/add.png","name":"addCard","label":"","height":45,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":-6,"x":0,"width":60,"skin":"ddz_sj/card.png","scaleY":0.8,"scaleX":0.8,"height":65}},{"type":"Label","props":{"y":20,"x":90,"text":"123456","name":"cardValue","fontSize":24,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.sjddz.hall_sjddzUI.uiView);

        }

    }
}

module ui.sjddz {
    export class is_fuhuoUI extends Dialog {
		public sjddz_ju:Laya.FontClip;
		public closeBtn:component.ScaleButton;
		public share_per:component.ScaleButton;
		public employ:component.ScaleButton;
		public anew:component.ScaleButton;

        public static  uiView:any ={"type":"Dialog","props":{"width":720,"popupCenter":true,"height":1280,"alpha":1},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"public/mask.png","sizeGrid":"0,0,0,0","height":1280,"alpha":0.7}},{"type":"Image","props":{"y":395,"x":73,"skin":"ddz_sj/fuhuo_bg.png","name":"bankrupt"},"child":[{"type":"Image","props":{"y":16,"x":184,"skin":"ddz_sj/fuhuo_ju.png"},"child":[{"type":"FontClip","props":{"y":19,"x":57,"var":"sjddz_ju","value":"0","skin":"ddz_sj/shunzi_num.png","sheet":"0123456789","name":"sjddz_ju","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":71,"x":4,"width":566,"height":175},"child":[{"type":"Label","props":{"y":26,"x":71,"text":"使用","fontSize":36,"color":"#5c6187"}},{"type":"Image","props":{"y":20,"x":172,"skin":"ddz_sj/fuhuo_ka.png"}},{"type":"Label","props":{"y":26,"x":233,"text":"×1继续体验本局","name":"resurrection","fontSize":36,"color":"#5c6187"}},{"type":"Label","props":{"y":116,"x":167,"text":"已有","fontSize":36,"color":"#5c6187"}},{"type":"Image","props":{"y":110,"x":258,"skin":"ddz_sj/fuhuo_ka.png"}},{"type":"Label","props":{"y":116,"x":321,"text":"×13","name":"fuhuo_card","fontSize":36,"color":"#5c6187"}}]},{"type":"ScaleButton","props":{"y":34,"x":534,"width":60,"visible":true,"var":"closeBtn","skin":"ddz_sj/fuhuo_close.png","scaleY":0.8,"scaleX":0.8,"name":"closeBtn","label":"","height":60,"anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":379,"x":-326,"visible":true,"var":"share_per","skin":"ddz_sj/fuhuo_share.png","name":"share_per","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":339,"x":298,"visible":true,"var":"employ","skin":"ddz_sj/fuhuo_shiyong.png","name":"employ","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":426,"x":302,"visible":true,"var":"anew","skin":"ddz_sj/fuhuo_tiaoguo.png","scaleY":0.8,"scaleX":0.8,"name":"anew","label":"","anchorY":0.5,"anchorX":0.5}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.sjddz.is_fuhuoUI.uiView);

        }

    }
}

module ui.sjddz {
    export class loadingUI extends Dialog {
		public jiazai:Laya.Image;

        public static  uiView:any ={"type":"Dialog","props":{"width":720,"popupCenter":true,"height":1280,"alpha":1},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"wxlocal/game_bg.png","sizeGrid":"0,0,0,0","height":1280},"child":[{"type":"Image","props":{"y":895,"x":360,"width":150,"var":"jiazai","skin":"hall_ddz/loading_image.png","name":"jiazai","height":150,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":558,"x":257,"visible":false,"skin":"hall_ddz/voteUI_graybox.png"},"child":[{"type":"Label","props":{"y":5,"x":25,"text":"请稍等...","fontSize":40,"color":"#d9d9d9"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.sjddz.loadingUI.uiView);

        }

    }
}

module ui.sjddz {
    export class login_shuUI extends View {
		public login:Laya.Button;
		public account:Laya.TextInput;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"wxlocal/login_bg.png","height":1280},"child":[{"type":"Button","props":{"y":1014,"x":360,"var":"login","stateNum":1,"skin":"wxlocal/loginUI_startBtn.png","hitTestPrior":false,"anchorY":0.5,"anchorX":0.5}},{"type":"TextInput","props":{"y":851,"x":259,"wordWrap":false,"width":202,"var":"account","skin":"public/mask.png","promptColor":"#fff4f4","prompt":"点击输入账号","height":61,"fontSize":30,"color":"#000000","align":"center"}},{"type":"Image","props":{"y":213,"x":5,"visible":false,"skin":"wxlocal/ddz.png"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.sjddz.login_shuUI.uiView);

        }

    }
}

module ui.sjddz {
    export class noticeUI extends Dialog {
		public content:Laya.Image;
		public closeBtn:component.ScaleButton;

        public static  uiView:any ={"type":"Dialog","props":{"width":720,"popupCenter":true,"height":1280,"alpha":1},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"public/mask.png","sizeGrid":"0,0,0,0","height":1280,"alpha":0.7}},{"type":"Image","props":{"y":309,"x":36,"var":"content","skin":"ddz_sj/create_bg.png","name":"content"},"child":[{"type":"ScaleButton","props":{"y":44,"x":617,"visible":true,"var":"closeBtn","skin":"ddz_sj/close.png","scaleY":0.8,"scaleX":0.8,"name":"closeBtn","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":19,"x":280,"skin":"ddz_sj/gonggao.png"}},{"type":"Image","props":{"y":123,"x":22,"skin":"ddz_sj/xiaoxikuang.png"},"child":[{"type":"Label","props":{"y":27,"x":42,"text":"金币场———正式上线","fontSize":36,"color":"#9b6535"}},{"type":"Label","props":{"y":81,"x":42,"text":"2018/08/10","fontSize":30,"color":"#9b6535"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.sjddz.noticeUI.uiView);

        }

    }
}

module ui.sjddz {
    export class password_sjddzUI extends Dialog {
		public num1:Laya.Label;
		public num2:Laya.Label;
		public num3:Laya.Label;
		public num4:Laya.Label;
		public num5:Laya.Label;
		public num6:Laya.Label;
		public btn1:Laya.Button;
		public btn2:Laya.Button;
		public btn3:Laya.Button;
		public btn4:Laya.Button;
		public btn5:Laya.Button;
		public btn6:Laya.Button;
		public btn7:Laya.Button;
		public btn8:Laya.Button;
		public btn9:Laya.Button;
		public btn0:Laya.Button;
		public btnClear:Laya.Button;
		public btnDel:Laya.Button;
		public closeBtn:component.ScaleButton;

        public static  uiView:any ={"type":"Dialog","props":{"width":720,"renderType":"mask","popupCenter":true,"height":1280},"child":[{"type":"Panel","props":{"y":0,"x":0,"width":720,"renderType":"render","height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"public/mask.png","sizeGrid":"0,0,0,0","height":1280,"alpha":0.7}},{"type":"Image","props":{"y":360,"x":640,"skin":"password/password_bg1.png","centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":55,"x":275,"skin":"password/room_num.png","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":92,"x":30,"width":484,"height":419},"child":[{"type":"Image","props":{"y":19,"x":19,"skin":"password/public_box2.png"},"child":[{"type":"Label","props":{"y":22,"x":25,"var":"num1","fontSize":50,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":19,"x":99,"skin":"password/public_box2.png"},"child":[{"type":"Label","props":{"y":22,"x":25,"var":"num2","fontSize":50,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":19,"x":179,"skin":"password/public_box2.png"},"child":[{"type":"Label","props":{"y":22,"x":25,"var":"num3","fontSize":50,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":19,"x":259,"skin":"password/public_box2.png"},"child":[{"type":"Label","props":{"y":22,"x":25,"var":"num4","fontSize":50,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":19,"x":339,"skin":"password/public_box2.png"},"child":[{"type":"Label","props":{"y":22,"x":25,"var":"num5","fontSize":50,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":19,"x":419,"skin":"password/public_box2.png"},"child":[{"type":"Label","props":{"y":22,"x":25,"var":"num6","fontSize":50,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Button","props":{"y":118,"x":83,"var":"btn1","stateNum":1,"skin":"password/public_box1.png","name":"btn1","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":30,"x":70,"skin":"password/1.png","anchorY":0.5,"anchorX":0.5}}]},{"type":"Button","props":{"y":83,"x":170,"var":"btn2","stateNum":1,"skin":"password/public_box1.png","name":"btn2"},"child":[{"type":"Image","props":{"y":30,"x":70,"skin":"password/2.png","anchorY":0.5,"anchorX":0.5}}]},{"type":"Button","props":{"y":83,"x":330,"var":"btn3","stateNum":1,"skin":"password/public_box1.png","name":"btn3"},"child":[{"type":"Image","props":{"y":30,"x":70,"skin":"password/3.png","anchorY":0.5,"anchorX":0.5}}]},{"type":"Button","props":{"y":166,"x":9,"var":"btn4","stateNum":1,"skin":"password/public_box1.png","name":"btn4"},"child":[{"type":"Image","props":{"y":30,"x":70,"skin":"password/4.png","anchorY":0.5,"anchorX":0.5}}]},{"type":"Button","props":{"y":166,"x":170,"var":"btn5","stateNum":1,"skin":"password/public_box1.png","name":"btn5"},"child":[{"type":"Image","props":{"y":30,"x":70,"skin":"password/5.png","anchorY":0.5,"anchorX":0.5}}]},{"type":"Button","props":{"y":166,"x":330,"var":"btn6","stateNum":1,"skin":"password/public_box1.png","name":"btn6"},"child":[{"type":"Image","props":{"y":30,"x":70,"skin":"password/6.png","anchorY":0.5,"anchorX":0.5}}]},{"type":"Button","props":{"y":250,"x":9,"var":"btn7","stateNum":1,"skin":"password/public_box1.png","name":"btn7"},"child":[{"type":"Image","props":{"y":30,"x":70,"skin":"password/7.png","anchorY":0.5,"anchorX":0.5}}]},{"type":"Button","props":{"y":250,"x":170,"var":"btn8","stateNum":1,"skin":"password/public_box1.png","name":"btn8"},"child":[{"type":"Image","props":{"y":30,"x":70,"skin":"password/8.png","anchorY":0.5,"anchorX":0.5}}]},{"type":"Button","props":{"y":250,"x":330,"var":"btn9","stateNum":1,"skin":"password/public_box1.png","name":"btn9"},"child":[{"type":"Image","props":{"y":30,"x":70,"skin":"password/9.png","anchorY":0.5,"anchorX":0.5}}]},{"type":"Button","props":{"y":334,"x":170,"var":"btn0","stateNum":1,"skin":"password/public_box1.png","name":"btn0"},"child":[{"type":"Image","props":{"y":30,"x":70,"skin":"password/0.png","anchorY":0.5,"anchorX":0.5}}]},{"type":"Button","props":{"y":334,"x":9,"var":"btnClear","stateNum":1,"skin":"password/chongshu.png"}},{"type":"Button","props":{"y":334,"x":330,"var":"btnDel","stateNum":1,"skin":"password/public_returnBtn.png"}}]},{"type":"ScaleButton","props":{"y":24,"x":516,"var":"closeBtn","skin":"password/close.png","label":"","anchorY":0.5,"anchorX":0.5}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.sjddz.password_sjddzUI.uiView);

        }

    }
}

module ui.sjddz {
    export class rankingUI extends Dialog {
		public content:Laya.Image;
		public zhuangtai1:Laya.Box;
		public closeBtn:component.ScaleButton;
		public balance:Laya.Label;
		public withdraw:component.ScaleButton;
		public history_jilu:Laya.List;
		public zhuangtai2:Laya.Box;
		public tixian:Laya.TextInput;

        public static  uiView:any ={"type":"Dialog","props":{"width":720,"popupCenter":true,"height":1280,"alpha":1},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"public/mask.png","sizeGrid":"0,0,0,0","height":1280,"alpha":0.7}},{"type":"Image","props":{"y":0,"x":0,"width":720,"var":"content","skin":"ddz_sj/hongbao_bg.png","name":"content","height":1280},"child":[{"type":"Box","props":{"y":0,"x":0,"width":720,"var":"zhuangtai1","name":"zhuangtai1","height":1280},"child":[{"type":"ScaleButton","props":{"y":58,"x":54,"visible":true,"var":"closeBtn","skin":"ddz_sj/hongbao_close.png","name":"closeBtn","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":143,"x":174,"text":"历史总奖励（元）","fontSize":50,"color":"#ffffff"}},{"type":"Label","props":{"y":263,"x":359,"text":"789","name":"all_money","fontSize":80,"font":"Microsoft YaHei","color":"#ffff00","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":501,"x":83,"var":"balance","text":"余额(元):0","name":"balance","fontSize":45,"color":"#000000","anchorY":0.5,"anchorX":0}},{"type":"ScaleButton","props":{"y":503,"x":537,"width":220,"var":"withdraw","skin":"ddz_sj/hongbao_tixian.png","name":"withdraw","label":"","height":90,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":575,"x":14,"skin":"ddz_sj/yuanxing_juxing.png","scaleY":1,"scaleX":0.9}},{"type":"Image","props":{"y":580,"x":123,"skin":"ddz_sj/hongbao_monye.png"}},{"type":"List","props":{"y":695,"x":70,"width":579,"var":"history_jilu","spaceY":10,"spaceX":5,"repeatY":6,"repeatX":1,"name":"history_jilu","height":504},"child":[{"type":"Box","props":{"y":0,"x":-26,"width":630,"renderType":"render","height":70},"child":[{"type":"Label","props":{"y":35,"x":181,"text":"12345678","name":"user_time","fontSize":40,"color":"#ff0400","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":35,"x":450,"text":"0","name":"user_money","fontSize":40,"color":"#ff0400","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"Label","props":{"y":788,"x":178,"text":"......","name":"diandiandian","fontSize":40,"color":"#000000","anchorY":0.5,"anchorX":0}}]},{"type":"Box","props":{"y":0,"x":0,"width":720,"visible":false,"var":"zhuangtai2","name":"zhuangtai2","height":1280},"child":[{"type":"ScaleButton","props":{"y":56,"x":55,"visible":true,"skin":"ddz_sj/hongbao_close.png","name":"closeBtn","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":143,"x":177,"text":"提现金额","fontSize":40,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":240,"x":121,"text":"¥","fontSize":60,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"TextInput","props":{"y":243,"x":172,"width":300,"var":"tixian","promptColor":"#fff4f4","prompt":"0","name":"tixian","height":50,"fontSize":50,"color":"#ffffff","anchorY":0.5,"align":"left"}},{"type":"Label","props":{"y":320,"x":101,"text":"余额：0","name":"money_yue","fontSize":40,"color":"#ffffff","anchorY":0.5,"anchorX":0}},{"type":"Image","props":{"y":280,"x":99,"skin":"ddzsj_Result/line.png"}},{"type":"ScaleButton","props":{"y":418,"x":393,"width":220,"skin":"ddz_sj/hongbao_tixian.png","name":"money","label":"","height":90,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":528,"x":92,"text":"1.单笔提现金额最低5元","fontSize":30,"color":"#000000","anchorY":0.5,"anchorX":0}},{"type":"Label","props":{"y":585,"x":92,"text":"2.单笔提现金额最多500元","fontSize":30,"color":"#000000","anchorY":0.5,"anchorX":0}},{"type":"Label","props":{"y":641,"x":92,"text":"3.每天只能提现一次","fontSize":30,"color":"#000000","anchorY":0.5,"anchorX":0}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.sjddz.rankingUI.uiView);

        }

    }
}

module ui.sjddz {
    export class resurrectionUI extends Dialog {
		public content:Laya.Image;
		public closeBtn:component.ScaleButton;
		public fuhuoka_num:Laya.Label;
		public share:component.ScaleButton;

        public static  uiView:any ={"type":"Dialog","props":{"width":720,"popupCenter":true,"height":1280,"alpha":1},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"public/mask.png","sizeGrid":"0,0,0,0","height":1280,"alpha":0.7}},{"type":"Image","props":{"y":309,"x":36,"var":"content","skin":"ddz_sj/create_bg.png","name":"content"},"child":[{"type":"Image","props":{"y":17,"x":269,"skin":"ddz_sj/fuhuoka.png"}},{"type":"ScaleButton","props":{"y":59,"x":605,"visible":true,"var":"closeBtn","skin":"ddz_sj/close.png","scaleY":0.8,"scaleX":0.8,"name":"closeBtn","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":138,"x":236,"text":"复活卡说明","fontSize":36,"color":"#9b6535"}},{"type":"Label","props":{"y":201,"x":143,"text":"每日首次登陆奖励:复活卡×1","fontSize":30,"color":"#9b6535"}},{"type":"Label","props":{"y":265,"x":84,"text":"邀请好友每日首次登陆奖励:复活卡×1","fontSize":30,"color":"#9b6535"}},{"type":"Label","props":{"y":331,"x":237,"text":"已有复活卡","fontSize":36,"color":"#9b6535"}},{"type":"Image","props":{"y":397,"x":267,"skin":"ddz_sj/fuhuoka_ka.png"}},{"type":"Label","props":{"y":409,"x":333,"var":"fuhuoka_num","text":"×1","name":"fuhuoka_num","fontSize":36,"color":"#9b6535"}},{"type":"ScaleButton","props":{"y":541,"x":324,"visible":true,"var":"share","skin":"ddz_sj/share.png","name":"share","label":"","anchorY":0.5,"anchorX":0.5}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.sjddz.resurrectionUI.uiView);

        }

    }
}

module ui.sjddz {
    export class setting_sjddzUI extends Dialog {
		public clearBtn:component.ScaleButton;
		public closeBtn:component.ScaleButton;

        public static  uiView:any ={"type":"Dialog","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"public/mask.png","sizeGrid":"0,0,0,0","height":1280,"alpha":0.7}},{"type":"Image","props":{"y":309,"x":36,"skin":"ddz_sj/create_bg.png","height":550},"child":[{"type":"Box","props":{"y":0,"x":0,"width":691,"height":506},"child":[{"type":"Label","props":{"y":179,"x":54,"text":"音乐","fontSize":48,"font":"SimHei","color":"#9b6535"}},{"type":"Label","props":{"y":273,"x":54,"text":"音效","fontSize":48,"font":"SimHei","color":"#9b6535"}},{"type":"HSlider","props":{"x":188,"width":440,"value":0,"skin":"setting/hslider.png","sizeGrid":"0,0,0,0","showLabel":false,"height":45,"centerY":-50,"allowClickBack":true}},{"type":"HSlider","props":{"x":186,"width":440,"value":0,"skin":"setting/hslider.png","sizeGrid":"0,15,0,15","showLabel":false,"height":45,"centerY":50,"allowClickBack":true}},{"type":"ScaleButton","props":{"y":447,"x":280,"visible":false,"var":"clearBtn","skin":"ddz_sj/jiesan_room.png","name":"clearBtn","label":"","centerX":-3,"bottom":29}},{"type":"ScaleButton","props":{"y":25,"x":622,"var":"closeBtn","skin":"ddz_sj/close.png","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"top":16,"skin":"ddz_sj/setting.png","centerX":-21}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.sjddz.setting_sjddzUI.uiView);

        }

    }
}

module ui.sjddz {
    export class share_goldUI extends Dialog {
		public share:component.ScaleButton;
		public closeBtn:component.ScaleButton;
		public pochan_num:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"width":720,"popupCenter":true,"height":1280,"alpha":1},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"public/mask.png","sizeGrid":"0,0,0,0","height":1280,"alpha":0.7}},{"type":"Image","props":{"y":324,"x":111,"skin":"ddz/pochan_bg.png","name":"bankrupt"},"child":[{"type":"Image","props":{"y":214,"x":154,"skin":"ddz/pochan_gold.png"}},{"type":"Label","props":{"y":49,"x":190,"text":"运气不佳，破产啦~","fontSize":36,"color":"#9b6535","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":134,"x":473,"text":"云帆斗地主为你奉上","fontSize":36,"color":"#9b6535","anchorY":0.5,"anchorX":1}},{"type":"ScaleButton","props":{"y":518,"x":248,"visible":true,"var":"share","skin":"ddz/pochan_share.png","name":"share","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":707,"x":248,"width":250,"visible":true,"var":"closeBtn","skin":"ddz/pochan_tou.png","name":"closeBtn","label":"","height":35,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":385,"x":251,"var":"pochan_num","text":"5000金币","name":"pochan_num","fontSize":36,"color":"#9b6535","anchorY":0.5,"anchorX":0.5}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.sjddz.share_goldUI.uiView);

        }

    }
}

module ui.sjddz {
    export class shoppingUI extends Dialog {
		public content:Laya.Image;
		public shoplist:Laya.List;
		public user_info:Laya.Button;
		public headImg:Laya.Image;
		public addGold:component.ScaleButton;
		public goldValue:Laya.Label;
		public addCard:component.ScaleButton;
		public cardValue:Laya.Label;
		public closeBtn:component.ScaleButton;

        public static  uiView:any ={"type":"Dialog","props":{"width":720,"popupCenter":true,"height":1280,"alpha":1},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"var":"content","skin":"ddz/envelope_bg.png","name":"content","height":1280},"child":[{"type":"List","props":{"y":67,"x":32,"width":655,"var":"shoplist","spaceY":8,"spaceX":1,"repeatY":6,"repeatX":1,"name":"shoplist","height":1047},"child":[{"type":"Box","props":{"y":30,"x":0,"width":655,"visible":true,"renderType":"render","height":160},"child":[{"type":"Image","props":{"y":0,"x":0,"width":655,"skin":"ddz/111_bg.png","height":160}},{"type":"Image","props":{"y":79,"x":109,"skin":"ddz/1.png","name":"gold_img","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":60,"x":254,"text":"3000","name":"jinbi_text","fontSize":40,"color":"#ffffff"}},{"type":"ScaleButton","props":{"y":81,"x":518,"visible":true,"skin":"ddz/shopping_btn.png","name":"shopping_btn","label":"","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":15,"x":31,"skin":"ddz/fuhuo_ka.png"}},{"type":"Label","props":{"y":39,"x":135,"text":"3000","name":"fuhuoka","fontSize":40,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]}]}]},{"type":"Button","props":{"y":1203,"x":96,"width":100,"var":"user_info","stateNum":1,"skin":"ddz_sj/lobbyUI_headFrame.png","name":"user_info","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":50,"x":50,"width":100,"var":"headImg","skin":"head/1.png","name":"headImg","height":100,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":50,"x":50,"width":100,"visible":false,"skin":"ddz_sj/lobbyUI_headFrame.png","height":100,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":1213,"x":286,"width":180,"skin":"ddz_sj/brand_bg.png","height":40,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"ScaleButton","props":{"y":20,"x":160,"width":45,"var":"addGold","skin":"ddz_sj/add.png","name":"addGold","label":"","height":45,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":0,"x":0,"width":48,"skin":"ddz_sj/brand.png","scaleY":0.8,"scaleX":0.8,"height":48}},{"type":"Label","props":{"y":20,"x":90,"var":"goldValue","text":"123456","name":"goldValue","fontSize":24,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":1213,"x":541,"width":180,"skin":"ddz_sj/brand_bg.png","height":40,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"ScaleButton","props":{"y":20,"x":160,"width":45,"var":"addCard","skin":"ddz_sj/add.png","name":"addCard","label":"","height":45,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":-6,"x":0,"width":60,"skin":"ddz_sj/card.png","scaleY":0.8,"scaleX":0.8,"height":65}},{"type":"Label","props":{"y":20,"x":90,"var":"cardValue","text":"123456","name":"cardValue","fontSize":24,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"ScaleButton","props":{"y":50,"x":53,"visible":true,"var":"closeBtn","skin":"ddz_sj/hongbao_close.png","scaleY":0.8,"scaleX":0.8,"name":"closeBtn","label":"","anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.sjddz.shoppingUI.uiView);

        }

    }
}

module ui.sjddz {
    export class sjddz_commonUI extends Dialog {
		public ddz_result:Laya.Image;
		public player1:Laya.Box;
		public player2:Laya.Box;
		public player3:Laya.Box;
		public closeBtn:component.ScaleButton;
		public confirmBtn:component.ScaleButton;

        public static  uiView:any ={"type":"Dialog","props":{"width":720,"popupCenter":true,"height":1280,"alpha":1},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"ddzsj_Result/bg.png","sizeGrid":"0,0,0,0","height":1280,"alpha":0.7}},{"type":"Box","props":{"y":130,"x":8,"width":704,"height":1000},"child":[{"type":"Image","props":{"y":233,"x":75,"skin":"ddzsj_Result/background.png"}},{"type":"Image","props":{"y":63,"x":6,"var":"ddz_result","skin":"ddzsj_Result/ying_bg.png","name":"ddz_result"}},{"type":"Label","props":{"y":328,"x":184,"text":"昵称","fontSize":40,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":328,"x":365,"text":"倍数","fontSize":40,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":328,"x":546,"text":"分数","fontSize":40,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":398,"x":11,"width":700,"var":"player1","name":"player1","height":60},"child":[{"type":"Image","props":{"y":-8,"x":25,"visible":false,"skin":"ddzsj_Result/line_bg.png"}},{"type":"Label","props":{"y":30,"x":174,"text":"-24","name":"name","fontSize":35,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":30,"x":353,"text":"-24","name":"beishu","fontSize":35,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":30,"x":542,"text":"-24","name":"score","fontSize":35,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":0,"x":39,"width":50,"visible":false,"skin":"ddzsj_Result/dizhu.png","name":"dizhu","height":60}}]},{"type":"Box","props":{"y":506,"x":11,"width":700,"var":"player2","name":"player2","height":60},"child":[{"type":"Image","props":{"y":-8,"x":25,"visible":false,"skin":"ddzsj_Result/line_bg.png"}},{"type":"Label","props":{"y":30,"x":174,"text":"-24","name":"name","fontSize":35,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":30,"x":353,"text":"-24","name":"beishu","fontSize":35,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":30,"x":542,"text":"-24","name":"score","fontSize":35,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":0,"x":39,"width":50,"visible":false,"skin":"ddzsj_Result/dizhu.png","name":"dizhu","height":60}}]},{"type":"Box","props":{"y":614,"x":11,"width":700,"var":"player3","name":"player3","height":60},"child":[{"type":"Image","props":{"y":-8,"x":25,"visible":false,"skin":"ddzsj_Result/line_bg.png"}},{"type":"Label","props":{"y":30,"x":174,"text":"-24","name":"name","fontSize":35,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":30,"x":353,"text":"-24","name":"beishu","fontSize":35,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":30,"x":542,"text":"-24","name":"score","fontSize":35,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":0,"x":39,"width":50,"visible":false,"skin":"ddzsj_Result/dizhu.png","name":"dizhu","height":60}}]}]},{"type":"ScaleButton","props":{"y":60,"x":66,"visible":true,"var":"closeBtn","skin":"ddzsj_Result/return.png","name":"closeBtn","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":1020,"x":360,"var":"confirmBtn","skin":"ddzsj_Result/jixuyouxi.png","name":"confirmBtn","label":"","anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.sjddz.sjddz_commonUI.uiView);

        }

    }
}

module ui.sjddz {
    export class sjddz_dajiesuanUI extends View {
		public Text_ID:Laya.Label;
		public Text_JU:Laya.Label;
		public Text_TIME:Laya.Label;
		public cell_1:Laya.Box;
		public cell_2:Laya.Box;
		public cell_3:Laya.Box;
		public Button_again:component.ScaleButton;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"public/mask.png","name":"Image_dn","height":1280},"child":[{"type":"Image","props":{"y":115,"x":56,"skin":"ddzsj_Result/result_win.png","name":"Image_2"}},{"type":"Label","props":{"y":435,"x":34,"var":"Text_ID","text":"房号:888888","name":"Text_ID","fontSize":28,"color":"#ffffff","anchorY":0.5,"anchorX":0}},{"type":"Label","props":{"y":435,"x":285,"var":"Text_JU","text":"局数:8","name":"Text_JU","fontSize":28,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":435,"x":686,"var":"Text_TIME","text":"时间:2018/7/31 11.16.22","name":"Text_TIME","fontSize":28,"color":"#ffffff","anchorY":0.5,"anchorX":1}},{"type":"Box","props":{"y":479,"x":23,"width":214,"var":"cell_1","name":"cell_1","height":449},"child":[{"type":"Image","props":{"y":224,"x":107,"width":214,"skin":"ddzsj_Result/result_zhajibg.png","height":449,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":224,"x":107,"skin":"ddzsj_Result/result_bg.png","name":"win","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":18,"x":9,"skin":"ddzsj_Result/result_kuang1.png"},"child":[{"type":"Image","props":{"y":3,"x":6,"width":70,"skin":"head/2.png","name":"icon","height":70}},{"type":"Label","props":{"y":23,"x":130,"width":80,"text":"我的名字","overflow":"visible","name":"nameText","height":20,"fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":53,"x":134,"text":"id:888888","name":"Text_Id","fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":-1,"x":164,"width":50,"visible":false,"skin":"ddzsj_Result/dizhu.png","name":"manager","height":60}},{"type":"Label","props":{"y":128,"x":37,"text":"赢","fontSize":30,"color":"#ffffff"}},{"type":"Image","props":{"y":130,"x":99,"skin":"ddzsj_Result/result_kuang2.png"},"child":[{"type":"Label","props":{"y":4,"x":31,"text":"0","name":"winnum","fontSize":20,"color":"#ffffff"}}]},{"type":"Label","props":{"y":207,"x":37,"text":"输","fontSize":30,"color":"#ffffff"}},{"type":"Image","props":{"y":209,"x":99,"skin":"ddzsj_Result/result_kuang2.png"},"child":[{"type":"Label","props":{"y":4,"x":31,"text":"0","name":"losenum","fontSize":20,"color":"#ffffff"}}]},{"type":"Label","props":{"y":287,"x":52,"text":"炸弹","fontSize":30,"color":"#ffffff","anchorY":0.05,"anchorX":0.5}},{"type":"Image","props":{"y":288,"x":99,"skin":"ddzsj_Result/result_kuang2.png"},"child":[{"type":"Label","props":{"y":4,"x":31,"text":"0","name":"zhadannum","fontSize":20,"color":"#ffffff"}}]},{"type":"Image","props":{"y":365,"x":17,"skin":"ddzsj_Result/result_kuang3.png"},"child":[{"type":"Image","props":{"y":12,"x":10,"skin":"ddzsj_Result/+.png","name":"sign"}},{"type":"FontClip","props":{"y":30,"x":106,"value":"798","skin":"ddzsj_Result/num1.png","sheet":"0123456789","name":"final_score","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"Box","props":{"y":481,"x":253,"width":214,"var":"cell_2","name":"cell_2","height":449},"child":[{"type":"Image","props":{"y":224,"x":107,"width":214,"skin":"ddzsj_Result/result_zhajibg.png","height":449,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":224,"x":107,"skin":"ddzsj_Result/result_bg.png","name":"win","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":18,"x":9,"skin":"ddzsj_Result/result_kuang1.png"},"child":[{"type":"Image","props":{"y":3,"x":6,"width":70,"skin":"head/2.png","name":"icon","height":70}},{"type":"Label","props":{"y":23,"x":130,"width":80,"text":"我的名字","overflow":"visible","name":"nameText","height":20,"fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":53,"x":134,"text":"id:888888","name":"Text_Id","fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":-1,"x":164,"width":50,"visible":false,"skin":"ddzsj_Result/dizhu.png","name":"manager","height":60}},{"type":"Label","props":{"y":128,"x":37,"text":"赢","fontSize":30,"color":"#ffffff"}},{"type":"Image","props":{"y":130,"x":99,"skin":"ddzsj_Result/result_kuang2.png"},"child":[{"type":"Label","props":{"y":4,"x":31,"text":"0","name":"winnum","fontSize":20,"color":"#ffffff"}}]},{"type":"Label","props":{"y":207,"x":37,"text":"输","fontSize":30,"color":"#ffffff"}},{"type":"Image","props":{"y":209,"x":99,"skin":"ddzsj_Result/result_kuang2.png"},"child":[{"type":"Label","props":{"y":4,"x":31,"text":"0","name":"losenum","fontSize":20,"color":"#ffffff"}}]},{"type":"Label","props":{"y":287,"x":52,"text":"炸弹","fontSize":30,"color":"#ffffff","anchorY":0.05,"anchorX":0.5}},{"type":"Image","props":{"y":288,"x":99,"skin":"ddzsj_Result/result_kuang2.png"},"child":[{"type":"Label","props":{"y":4,"x":31,"text":"0","name":"zhadannum","fontSize":20,"color":"#ffffff"}}]},{"type":"Image","props":{"y":365,"x":17,"skin":"ddzsj_Result/result_kuang3.png"},"child":[{"type":"Image","props":{"y":12,"x":10,"skin":"ddzsj_Result/+.png","name":"sign"}},{"type":"FontClip","props":{"y":30,"x":106,"value":"798","skin":"ddzsj_Result/num1.png","sheet":"0123456789","name":"final_score","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"Box","props":{"y":476,"x":482,"width":214,"var":"cell_3","name":"cell_3","height":449},"child":[{"type":"Image","props":{"y":224,"x":107,"width":214,"skin":"ddzsj_Result/result_zhajibg.png","height":449,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":224,"x":107,"skin":"ddzsj_Result/result_bg.png","name":"win","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":18,"x":9,"skin":"ddzsj_Result/result_kuang1.png"},"child":[{"type":"Image","props":{"y":3,"x":6,"width":70,"skin":"head/2.png","name":"icon","height":70}},{"type":"Label","props":{"y":23,"x":130,"width":80,"text":"我的名字","overflow":"visible","name":"nameText","height":20,"fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":53,"x":134,"text":"id:888888","name":"Text_Id","fontSize":20,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":-1,"x":164,"width":50,"visible":false,"skin":"ddzsj_Result/dizhu.png","name":"manager","height":60}},{"type":"Label","props":{"y":128,"x":37,"text":"赢","fontSize":30,"color":"#ffffff"}},{"type":"Image","props":{"y":130,"x":99,"skin":"ddzsj_Result/result_kuang2.png"},"child":[{"type":"Label","props":{"y":4,"x":31,"text":"0","name":"winnum","fontSize":20,"color":"#ffffff"}}]},{"type":"Label","props":{"y":207,"x":37,"text":"输","fontSize":30,"color":"#ffffff"}},{"type":"Image","props":{"y":209,"x":99,"skin":"ddzsj_Result/result_kuang2.png"},"child":[{"type":"Label","props":{"y":4,"x":31,"text":"0","name":"losenum","fontSize":20,"color":"#ffffff"}}]},{"type":"Label","props":{"y":287,"x":52,"text":"炸弹","fontSize":30,"color":"#ffffff","anchorY":0.05,"anchorX":0.5}},{"type":"Image","props":{"y":288,"x":99,"skin":"ddzsj_Result/result_kuang2.png"},"child":[{"type":"Label","props":{"y":4,"x":31,"text":"0","name":"zhadannum","fontSize":20,"color":"#ffffff"}}]},{"type":"Image","props":{"y":365,"x":17,"skin":"ddzsj_Result/result_kuang3.png"},"child":[{"type":"Image","props":{"y":12,"x":10,"skin":"ddzsj_Result/+.png","name":"sign"}},{"type":"FontClip","props":{"y":30,"x":106,"value":"798","skin":"ddzsj_Result/num1.png","sheet":"0123456789","name":"final_score","anchorY":0.5,"anchorX":0.5}}]}]},{"type":"ScaleButton","props":{"y":1129,"x":360,"var":"Button_again","skin":"ddzsj_Result/result_again.png","name":"Button_again","label":"","anchorY":0.5,"anchorX":0.5}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.sjddz.sjddz_dajiesuanUI.uiView);

        }

    }
}

module ui.sjddz {
    export class sjddz_moneyUI extends Dialog {
		public containing:Laya.Panel;
		public hongbao:Laya.Image;
		public liansheng:Laya.Label;
		public chai_red:component.ScaleButton;
		public share_qun:component.ScaleButton;
		public close_btn:component.ScaleButton;
		public hongbao_close:component.ScaleButton;
		public sed_include:Laya.Label;
		public tc_btn:component.ScaleButton;
		public Anim_money:Laya.Box;
		public share_qun_ewai:component.ScaleButton;

        public static  uiView:any ={"type":"Dialog","props":{"width":720,"popupCenter":true,"height":1280,"alpha":1},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"ddzsj_Result/bg.png","sizeGrid":"0,0,0,0","height":1280,"alpha":0.7}},{"type":"Panel","props":{"width":720,"visible":false,"var":"containing","name":"containing","height":1280},"child":[{"type":"Image","props":{"width":720,"skin":"public/mask.png","height":1280,"alpha":0.5}},{"type":"Image","props":{"y":640,"x":360,"var":"hongbao","skin":"ddzsj_Result/hongbao_bg.png","name":"hongbao","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":269,"x":223,"text":"赏金斗地主","fontSize":30,"color":"#ffff00","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":323,"x":223,"text":"给你发了一个红包","name":"sed_text","fontSize":30,"color":"#ffff00","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":410,"x":229,"var":"liansheng","text":"恭喜获得连胜奖励","name":"liansheng","fontSize":35,"font":"Microsoft YaHei","color":"#ffff00","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":558,"x":229,"visible":false,"var":"chai_red","skin":"ddzsj_Result/hongbao__chai.png","name":"chai_red","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":571,"x":229,"visible":true,"var":"share_qun","skin":"ddz/pochan_share.png","name":"share_qun","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":-249,"x":-66,"visible":true,"var":"close_btn","skin":"ddzsj_Result/return.png","name":"close_btn","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":39,"x":44,"width":60,"visible":false,"var":"hongbao_close","skin":"ddz_sj/fuhuo_close.png","name":"hongbao_close","label":"","height":60,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":640,"x":360,"visible":false,"skin":"ddzsj_Result/hongbao_down.png","name":"lingjiang","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":507,"x":229,"var":"sed_include","text":"恭喜获得连胜奖励","name":"sed_include","fontSize":35,"font":"Microsoft YaHei","color":"#ffff00","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":724,"x":224,"text":"红包金额请到领奖界面领取","fontSize":30,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":108,"x":238,"text":"领奖金额（元）","fontSize":35,"color":"#ff1400","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":221,"x":229,"text":"1.36","name":"score_money","fontSize":70,"font":"Helvetica","color":"#ff1400","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":-182,"x":-66,"visible":true,"var":"tc_btn","skin":"ddzsj_Result/return.png","name":"tc_btn","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"Box","props":{"y":82,"x":229,"width":1,"var":"Anim_money","name":"Anim_money","height":1,"anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":881,"x":229,"visible":false,"var":"share_qun_ewai","skin":"ddz/share_qun_hongbao.png","name":"share_qun_ewai","label":"","anchorY":0.5,"anchorX":0.5}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.sjddz.sjddz_moneyUI.uiView);

        }

    }
}

module ui.sjddz {
    export class sjddz_ResultUI extends Dialog {
		public showResult:Laya.Box;
		public ddz_win:Laya.Image;
		public office:Laya.Image;
		public fuhuoka_bg:Laya.Image;
		public fuhuoka_num:Laya.Label;
		public continue_game:component.ScaleButton;
		public confirmBtn:component.ScaleButton;
		public time_num:Laya.Label;
		public closeBtn:component.ScaleButton;
		public show_shibai:Laya.Box;
		public share_text:Laya.Label;
		public count_time_bg:Laya.Image;
		public fanhui:component.ScaleButton;
		public share_flock:component.ScaleButton;
		public free_fuhuo:component.ScaleButton;

        public static  uiView:any ={"type":"Dialog","props":{"width":720,"popupCenter":true,"height":1280,"alpha":1},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"ddzsj_Result/bg.png","sizeGrid":"0,0,0,0","height":1280,"alpha":0.7}},{"type":"Box","props":{"y":138,"x":14,"width":691,"var":"showResult","name":"showResult","height":1100},"child":[{"type":"Image","props":{"y":177,"x":66,"skin":"ddzsj_Result/background.png"}},{"type":"Image","props":{"var":"ddz_win","skin":"ddzsj_Result/shu_bg.png","name":"ddz_win"},"child":[{"type":"Image","props":{"y":225,"x":245,"skin":"ddzsj_Result/number_game.png"},"child":[{"type":"Image","props":{"y":2,"x":81,"var":"office","skin":"ddzsj_Result/1.png","name":"office"}}]},{"type":"Image","props":{"y":321,"x":89,"skin":"ddzsj_Result/line.png"}},{"type":"Box","props":{"y":336,"x":85,"width":521,"height":100},"child":[{"type":"Image","props":{"y":9,"x":10,"skin":"ddzsj_Result/game2.png","name":"schedule1"},"child":[{"type":"Image","props":{"y":14,"x":9,"skin":"ddzsj_Result/1.png"}}]},{"type":"Image","props":{"y":9,"x":82,"skin":"ddzsj_Result/game2.png","name":"schedule2"},"child":[{"type":"Image","props":{"y":14,"x":9,"skin":"ddzsj_Result/2.png"}}]},{"type":"Image","props":{"y":9,"x":154,"skin":"ddzsj_Result/game2.png","name":"schedule3"},"child":[{"type":"Image","props":{"y":14,"x":9,"skin":"ddzsj_Result/3.png"}}]},{"type":"Image","props":{"y":9,"x":226,"skin":"ddzsj_Result/game2.png","name":"schedule4"},"child":[{"type":"Image","props":{"y":14,"x":9,"skin":"ddzsj_Result/4.png"}}]},{"type":"Image","props":{"y":9,"x":298,"skin":"ddzsj_Result/game2.png","name":"schedule5"},"child":[{"type":"Image","props":{"y":14,"x":9,"skin":"ddzsj_Result/5.png"}}]},{"type":"Image","props":{"y":9,"x":370,"skin":"ddzsj_Result/game2.png","name":"schedule6"},"child":[{"type":"Image","props":{"y":14,"x":9,"skin":"ddzsj_Result/6.png"}}]},{"type":"Image","props":{"y":7,"x":442,"skin":"ddzsj_Result/game2.png","name":"schedule7"},"child":[{"type":"Image","props":{"y":14,"x":9,"skin":"ddzsj_Result/7.png"}}]}]},{"type":"Image","props":{"y":442,"x":85,"skin":"ddzsj_Result/line.png"}},{"type":"Image","props":{"y":752,"x":343,"visible":false,"var":"fuhuoka_bg","skin":"ddzsj_Result/card.png","name":"fuhuoka_bg","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":40,"x":-55,"text":"剩余:","fontSize":36,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":40,"x":88,"var":"fuhuoka_num","text":"×3","name":"fuhuoka_num","fontSize":36,"color":"#ffffff","anchorY":0.5,"anchorX":0}}]}]},{"type":"ScaleButton","props":{"y":1009,"x":329,"var":"continue_game","skin":"ddzsj_Result/continue_game.png","name":"continue_game","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":884,"x":345,"var":"confirmBtn","skin":"ddzsj_Result/show.png","name":"confirmBtn","label":"","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":35,"x":217,"width":51,"visible":false,"var":"time_num","text":"5(s)","name":"time_num","height":30,"fontSize":25,"font":"Microsoft YaHei","color":"#7e3200","bold":true,"anchorY":0.5,"anchorX":0.5}}]},{"type":"ScaleButton","props":{"y":-80,"x":49,"visible":true,"var":"closeBtn","skin":"ddzsj_Result/return.png","name":"closeBtn","label":"","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":90,"x":0,"width":720,"visible":false,"var":"show_shibai","name":"show_shibai","height":1100},"child":[{"type":"Image","props":{"y":183,"x":360,"skin":"ddzsj_Result/share_touxiang.png","name":"show_bgtu","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":622,"x":360,"text":"云帆斗地主为你准备了复活卡X1","name":"label_text","fontSize":30,"font":"SimHei","color":"#ffd440","bold":true,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":75,"x":214,"var":"share_text","text":"赶紧分享领取吧！","name":"share_text","fontSize":30,"font":"SimHei","color":"#ffd440","bold":true,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":358,"x":274,"var":"count_time_bg","skin":"ddzsj_Result/share_zhuan.png","name":"count_time_bg"},"child":[{"type":"Label","props":{"y":96,"x":96,"text":"0","name":"count_time","fontSize":100,"font":"SimHei","color":"#ffd440","bold":true,"anchorY":0.5,"anchorX":0.5}}]},{"type":"ScaleButton","props":{"y":-20,"x":73,"visible":true,"var":"fanhui","skin":"ddzsj_Result/return.png","name":"fanhui","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":838,"x":360,"var":"share_flock","skin":"ddzsj_Result/share_linqu.png","name":"share_flock","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":842,"x":360,"visible":false,"var":"free_fuhuo","skin":"ddzsj_Result/fuhuo_btn.png","name":"free_fuhuo","label":"","anchorY":0.5,"anchorX":0.5}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.sjddz.sjddz_ResultUI.uiView);

        }

    }
}

module ui.sjddz {
    export class sjddz_Result_goldUI extends Dialog {
		public ddz_result:Laya.Image;
		public hongbao:Laya.Image;
		public closeBtn:component.ScaleButton;
		public confirmBtn:component.ScaleButton;

        public static  uiView:any ={"type":"Dialog","props":{"width":720,"popupCenter":true,"height":1280,"alpha":1},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"ddzsj_Result/bg.png","sizeGrid":"0,0,0,0","height":1280,"alpha":0.7}},{"type":"Box","props":{"y":182,"x":20,"height":750},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"ddz_result","skin":"ddzsj_Result/win.png","name":"ddz_result"}},{"type":"Image","props":{"y":473,"x":15,"skin":"ddzsj_Result/line_bg.png"},"child":[{"type":"Image","props":{"y":39,"x":429,"visible":false,"skin":"ddzsj_Result/coin.png","name":"item1","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":21,"x":478,"text":"-24","name":"score","fontSize":35,"color":"#ffffff"}},{"type":"Label","props":{"y":15,"x":113,"text":"本局输赢:","fontSize":36,"color":"#ffffff"}}]},{"type":"Image","props":{"y":606,"x":15,"visible":false,"var":"hongbao","skin":"ddzsj_Result/line_bg.png","name":"hongbao"},"child":[{"type":"Image","props":{"y":39,"x":429,"visible":false,"skin":"ddzsj_Result/packet_xiao.png","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":21,"x":478,"text":"-24","name":"packet","fontSize":35,"color":"#ffffff"}},{"type":"Label","props":{"y":15,"x":113,"text":"连胜红包:","fontSize":36,"color":"#ffffff"}}]}]},{"type":"ScaleButton","props":{"y":60,"x":71,"var":"closeBtn","skin":"ddzsj_Result/return.png","name":"closeBtn","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"ScaleButton","props":{"y":1012,"x":360,"var":"confirmBtn","skin":"ddzsj_Result/jixuyouxi.png","name":"confirmBtn","label":"","anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.sjddz.sjddz_Result_goldUI.uiView);

        }

    }
}

module ui.sjddz {
    export class userinfo_shuUI extends Dialog {
		public content:Laya.Image;
		public close_Btn:component.ScaleButton;
		public user_head:Laya.Image;
		public user_name:laya.display.Text;
		public Gender:laya.display.Text;
		public user_id:laya.display.Text;
		public user_ip:laya.display.Text;
		public panle_skill:Laya.List;

        public static  uiView:any ={"type":"Dialog","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"width":720,"skin":"public/mask.png","sizeGrid":"0,0,0,0","height":1280,"alpha":0.7}},{"type":"Image","props":{"y":640,"x":360,"width":648,"var":"content","skin":"ddz_sj/jiesan_bg.png","name":"content","height":550,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"ScaleButton","props":{"y":46,"x":620,"width":51,"var":"close_Btn","skin":"ddz_sj/close.png","name":"close_Btn","label":"","height":51,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":19,"x":255,"skin":"ddz_sj/userinfo_shu.png"}},{"type":"Image","props":{"y":162,"x":78,"skin":"userinfo/playerInfoUI_headbox.png"}},{"type":"Image","props":{"y":167,"x":83,"width":118,"var":"user_head","skin":"head/10.png","name":"user_head","height":121}},{"type":"Text","props":{"y":167,"x":240,"text":"姓名:","fontSize":28,"color":"#823e19"}},{"type":"Text","props":{"y":209,"x":240,"text":"性别:","fontSize":28,"color":"#823e19"}},{"type":"Text","props":{"y":252,"x":254,"text":"ID:","fontSize":28,"color":"#823e19"}},{"type":"Text","props":{"y":294,"x":226,"visible":false,"text":"IP地址:","fontSize":28,"color":"#823e19"}},{"type":"Button","props":{"y":317,"x":76,"width":496,"stateNum":1,"skin":"userinfo/btn_changenickname.png","height":11}},{"type":"Text","props":{"y":167,"x":335,"width":251,"var":"user_name","text":"123456789","overflow":"hidden","name":"user_name","height":31,"fontSize":25,"font":"Microsoft YaHei","color":"#000000","align":"left"}},{"type":"Text","props":{"y":212,"x":333,"width":38,"var":"Gender","text":"男","name":"Gender","height":31,"fontSize":25,"font":"Microsoft YaHei","color":"#000000","align":"left"}},{"type":"Text","props":{"y":256,"x":333,"width":163,"var":"user_id","text":"100058","overflow":"hidden","name":"user_id","height":27,"fontSize":30,"color":"#000000","align":"left"}},{"type":"Text","props":{"y":297,"x":333,"width":228,"visible":false,"var":"user_ip","text":"122.139.128.166","overflow":"hidden","name":"user_ip","height":27,"fontSize":30,"color":"#000000","align":"left"}},{"type":"List","props":{"y":365,"x":49,"width":550,"var":"panle_skill","spaceY":30,"spaceX":30,"repeatY":1,"repeatX":4,"name":"panle_skill","height":120},"child":[{"type":"Box","props":{"y":12,"x":30,"width":96,"renderType":"render","height":96},"child":[{"type":"ScaleButton","props":{"y":48,"x":48,"skin":"userinfo/hudong_1.png","name":"Button_","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":0,"x":0,"skin":"userinfo/hudong_bg.png"}}]}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.sjddz.userinfo_shuUI.uiView);

        }

    }
}

module ui.sjddz {
    export class user_messageUI extends Dialog {
		public user_id:Laya.Label;
		public goldValue:Laya.Label;
		public cardValue:Laya.Label;
		public moneyValue:Laya.Label;
		public closeBtn:component.ScaleButton;
		public version_text:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"public/mask.png","sizeGrid":"0,0,0,0","height":1280,"alpha":0.7}},{"type":"Image","props":{"y":-27,"x":-15,"skin":"setting/user_bg.png"},"child":[{"type":"Image","props":{"y":844,"x":16,"visible":false,"skin":"setting/kongbai.png"},"child":[{"type":"Label","props":{"y":47,"x":50,"text":"胜率:","fontSize":30,"font":"SimHei","color":"#000000","anchorY":0.5,"anchorX":0}},{"type":"Label","props":{"y":47,"x":211,"text":"0%","name":"shenglv","fontSize":30,"font":"SimHei","color":"#b86400","anchorY":0.5,"anchorX":0}},{"type":"Label","props":{"y":44,"x":395,"text":"对局次数:","fontSize":30,"font":"SimHei","color":"#000000","anchorY":0.5,"anchorX":0}},{"type":"Label","props":{"y":43,"x":554,"text":"0","name":"jushu","fontSize":30,"font":"SimHei","color":"#b86400","anchorY":0.5,"anchorX":0}},{"type":"Label","props":{"y":122,"x":45,"text":"最大倍数:","fontSize":30,"font":"SimHei","color":"#000000","anchorY":0.5,"anchorX":0}},{"type":"Label","props":{"y":122,"x":211,"text":"0","name":"beishu","fontSize":30,"font":"SimHei","color":"#b86400","anchorY":0.5,"anchorX":0}},{"type":"Label","props":{"y":122,"x":395,"text":"总赢金币:","fontSize":30,"font":"SimHei","color":"#000000","anchorY":0.5,"anchorX":0}},{"type":"Label","props":{"y":120,"x":554,"text":"0","name":"gold_num","fontSize":30,"font":"SimHei","color":"#b86400","anchorY":0.5,"anchorX":0}}]},{"type":"Button","props":{"y":143,"x":381,"width":150,"stateNum":1,"skin":"setting/user_tx.png","name":"user_info","height":150,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":0,"x":0,"width":150,"skin":"head/1.png","name":"headImg","height":150}},{"type":"Text","props":{"y":163,"x":-50,"width":251,"text":"我的名字","overflow":"hidden","name":"user_name","height":41,"fontSize":30,"font":"Microsoft YaHei","color":"#ff9c08","align":"center"}},{"type":"Label","props":{"y":236,"x":75,"var":"user_id","text":"id:100000","name":"user_id","fontSize":30,"font":"SimHei","color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":374,"x":147,"width":180,"skin":"ddz_sj/brand_bg.png","height":40,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":0,"x":0,"width":48,"skin":"ddz_sj/brand.png","scaleY":0.8,"scaleX":0.8,"height":48}},{"type":"Label","props":{"y":20,"x":106,"var":"goldValue","text":"123456","name":"goldValue","fontSize":24,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":374,"x":374,"width":180,"skin":"ddz_sj/brand_bg.png","height":40,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":-14,"x":-5,"skin":"ddz_sj/card.png","scaleY":0.8,"scaleX":0.8}},{"type":"Label","props":{"y":20,"x":108,"var":"cardValue","text":"123456","name":"cardValue","fontSize":24,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":374,"x":601,"width":180,"skin":"ddz_sj/brand_bg.png","height":40,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":-11,"x":5,"skin":"setting/user_money.png","scaleY":0.8,"scaleX":0.8}},{"type":"Label","props":{"y":20,"x":103,"var":"moneyValue","text":"123456","name":"moneyValue","fontSize":24,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Button","props":{"y":508,"x":194,"stateNum":1,"skin":"setting/buxuan.png","name":"music1"},"child":[{"type":"Label","props":{"y":3,"x":-119,"text":"音乐","fontSize":48,"font":"SimHei","color":"#9b6535"}}]},{"type":"Button","props":{"y":506,"x":539,"stateNum":1,"skin":"setting/buxuan.png","name":"music2"},"child":[{"type":"Label","props":{"y":5,"x":-118,"text":"音效","fontSize":48,"font":"SimHei","color":"#9b6535"}}]},{"type":"ScaleButton","props":{"y":73,"x":85,"var":"closeBtn","skin":"setting/hongbao_close.png","label":"","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":1228,"x":375,"var":"version_text","text":"v1.1.7","name":"version_text","fontSize":30,"font":"SimHei","color":"#9b6535","anchorY":0.5,"anchorX":0.5}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("ScaleButton",component.ScaleButton);

            super.createChildren();
            this.createView(ui.sjddz.user_messageUI.uiView);

        }

    }
}
