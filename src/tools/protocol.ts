var protocol = {
    "user_login":500,
    "user_keep_alive":505,
    "user_create_room":601,
    "user_enter_room":602, // 进入房间
    "game_logic_start":603,// 开始游戏
    "user_get_card":604, //摸牌
    "user_peng_card":605, //碰牌
    "user_gang_card":606, //杠牌
    "user_pass_card":607, //出牌
    "user_game_ting": 701,//听牌
    "game_logic_restart":608,  // 要牌
    "user_game_ting_tip":700,//可以听牌 
    "user_exit_game":609,
    "user_game_win_tip":610,  //胡牌提示
    "user_game_win":611,  //胡牌
    "user_choose_cards":614, //捉码
    "user_single_result":615, //单局结算
    "user_final_result":616, //单局总结算
    "user_send_chat":617,
    "user_send_record":618,
    "user_out_room":619, //用户不在房间中，掉线或退出
    "user_re_connect":620,
    "user_turn_card":621, //主动翻牌
    "user_choose_end":622,
    "user_send_rank":623,
    "user_update_room_card":624,
    
    "user_reenter_room":627,
    "user_update_socre":628,            //小结分数
    "user_disagree_exit":630,
    "user_send_voice":640,
    "user_recv_voice_idx":642,
    "user_get_buy_info":650, //获取代理信息

    // 竖版 赏金斗地主
    "user_switcher_vertical":666, //获取代理信息
    "user_get_envelope":1085, //获取排行榜
    "user_join_money":1155, // 加入赏金场
    "user_join_quit":1156, //退出赏金场
    "user_get_resurrection":1161, // 新增复活卡
    "user_con_resurrection":1162, // 消耗复活卡
    "user_get_ranking":1163,    // 获取奖品:
    "user_get_money":1167,    // 领取红包:

    "user_update_yxb":670, //刷新金币
    "user_opt_pass":710, //过
    "user_result_end":711, //结算结束  // 准备
    "user_recv_msg":722,//系统广播
    "user_send_xiazhu":714,    //下注(新)
    "user_self_state":810, //个人状态同步
    "user_room_state":831,//房间状态切换
    "user_room_exit_state":835,//解散房间状态
    "user_opt_buhua":850,//补花
    "user_get_buhua_card":851,
    "user_broadcast_pos":852,//通知位置信息
    "user_chi_card":870,
    "user_replay_fight":1891,//回放
    "user_get_friend":750,//邀请数据
    "user_friend_commit":751,//提交
    "user_gold_create":752,//金币场
	"user_get_share_success":1110,
    "user_zjh_start":1050,//准备

    //扑克
    "user_update_yes_exit_room":626,
    "user_update_exit_room":625,
    "user_update_qiangzhuang":1100, // 抢庄
    "user_update_beishu":1102, //   抢分的倍数 （下注）
    "user_update_two_fapai":1103, // 第二次发牌
    "user_update_liang_pai":1105, // 亮牌

    // "user_zjh_bet":1012,//
    "user_zjh_bet":1053,//   --隐藏桌面按钮及其他
    "user_zjh_bc":1051,//八叉,斗地主
    "user_game_js":1052,//斗地主解散
    "user_zjh_result":1006,//结算
    "user_zjh_update_score":1010,//更新分数
    "user_zjh_final_result":1011,//总结算
    "user_jbc_again":1069,//金币场继续游戏
    "user_jbc_join_game":1070, //金币场加入比赛
    "user_jbc_change_table":1071, //金币场换桌
    "user_match_rank_list":1072, //金币排行榜数据列表

    // 新版跑得快 斗地主
    "user_card_ready" : 1050, // 准备
    "user_card_passcard": 607, // 出牌
    "user_card_pass": 710, //过
    "user_card_once_over": 615, //小结算
    "user_card_all_over": 616, //总结算
    "user_card_tishi": 810, //该自己出时的状态
    "user_card_restart": 711, //重新开始 -- 也是十三水和牛牛准备
    "user_card_huan_pai":1170, //换牌
    "user_card_qiang_di_zhu":3000, //抢地主
    "user_card_jia_bei":3001, //加倍

    "user_sign_list":1073, //签到列表
    "user_sign":1074, //签到

    "user_yqm_bind":2000,//邀请码绑定
    "user_bind_state":2001,//绑定状态
    "user_pay_record":2002,//充值记录
    "user_shop_data":2003,//商场里的金币和房卡

    "user_agency":1734, //代开房
    "user_agency_list": 724, //代开房数据信息
    "user_agency_dissolve" : 1016, //-代开房解散房间
    "user_club_add_player": 1030 ,//-俱乐部添加玩家
    "user_club_delete_player": 1012 ,//-俱乐部删除玩家
    "user_club_get_recod_list": 1024, //-获取代开房间记录列表
    "user_club_quit_club": 1025, //-退出俱乐部
    "user_club_update_add": 1040, //-代开房加入玩家通知
    "user_club_update_del": 1041, //-代开房退出玩家通知
    "user_club_search": 1714, //-搜索俱乐部
    "user_club_join": 1704, //-加入俱乐部
    "user_club_create": 1716, //-创建俱乐部
    "user_club_jiesan": 1712, //-解散俱乐部
    "user_club_rename": 1733, //-俱乐部改名
    "user_club_join_audit_list": 1698, //-俱乐部审核玩家列表
    "user_club_join_audit": 1706, //-俱乐部审核玩家
    "user_club_get_rule": 1700,//获取房间设置列表
    "user_club_set_rule": 1699,//俱乐部房间设置 
    "user_club_join_room": 1696,//加入俱乐部房间
    "user_club_get_club_num": 1715,//获取俱乐部数量
    "user_club_get_change_club": 1730,//切换俱乐部
    "user_is_or_not_gps_room": 1804,//-是否GPS房间
    "user_club_get_player_list":1711, //获取俱乐部玩家列表

    "user_zjh_begin_contrast":1607, //  psz 时
    "user_zjh_continue" : 1603, //--跟注
    "user_zjh_state"  : 1605, //--明牌，弃牌，正常
    "user_zjh_contrast"  : 1604, //--比牌
    "user_read_go" :801, //--准备
    "user_begin_bet"  : 807, //--确定庄家
    "user_begin_qiang"  : 830, //--开始抢庄
    "user_ready_state"  : 811, //--准备状态
    "user_broadcast_zhuang"  : 805, //--广播抢庄
    "user_weit_open" : 804, //--等待开牌
    "user_get_notice"  : 1019, //--获取滚屏信息
    "user_broadcast_bet"  : 808, //--广播下注
    "user_bet"  : 803, //--下注
    "user_last_poker"  : 812, //--开始抢庄
    "user_get_zhuang"  : 802, //--抢庄
    "user_hudong_biaoqing" : 1315, // 互动表情

    "user_gold_compensate" : 2005, //金币补助推送
    "user_gold_compensate_get": 2006, //金币补助领取

    "user_hudong_gold_server" : 1177,   // 创建房间 金币场数据
    "user_hudong_sjddz_hall" : 1164,    // 赏金场失败后返回大厅  1  退出 2 重新开始
    // "user_hudong_fuhuo" : 1162,   // 复活
    "user_sjddz_paihangbang" : 1805,   // 排行榜

    "user_sjddz_haunjingbi" : 1806,   // 换金币获取配置
    "user_sjddz_duihuanfangka" : 1807,   // 兑换  发房卡数给我
    "user_update_fuhuoka":1168,    // 领取红包:

    "user_sjddz_new_hongbao":667,          // 新手红包分享好友:
    "user_sjddz_yaoqing":4000,          // 邀请有礼    大厅邀请按钮:
    "user_sjddz_yijian_lingqu":4002,          // 一键领取    
    "user_sjddz_share_touch":4001,         // 邀请成功    分享后其他玩家点击链接的带回参数返回值:
    "user_sjddz_share_new_player":4005,    // 邀请成功新玩家    分享后其他玩家点击链接的带回参数返回值:
    "user_sjddz_share_fuhuoka":4003,       // 挑战失败获取复活卡
    "user_sjddz_share_new_fuhuoka":4004,      // 挑战失败获取复活卡
    "user_sjddz_share_new_lingqu":4006,      // 新玩家分享后领取


}
// 分享协议
var share = {
    "hongbao_share_qun": "红包分享到群里"
} 
var errorcode={
    10008:"还没轮到你出牌！",
	10009:"你要出的牌不存在！",
	10010:"您还没有加入房间！",
	10011:"您已在房间中！",
	10012:"房间人数已满 ！",
    10031:"房卡数量不足！",
    11807:"复活卡参数不对！",
    11808:"复活卡数量不足！",
    10100:"房间不存在！",
    10040:"游戏已开始，不能退出！",
    10041:"小伙伴掉线啦，请他上线再出牌吧！",
    11620:"复活卡不足",
    24001:"记录不存在",
    23102:"没有这个玩家ID",
    23401:"此房为私密房，同一个俱乐部成员才能进入，请联系群主代理！",
    22234:"没有俱乐部成员",
    22236:"没有俱乐部成员",
    23301:"已经添加过该玩家",
    23305:"已添加玩家人数达到上限",
    23322:"该玩家已经添加过俱乐部了",
}
