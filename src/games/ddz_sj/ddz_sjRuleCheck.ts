module games{
    export class ddz_sjRuleCheck{
        DDZCardType:Object;
        data:Object;
        constructor(arg){
            this.data = arg;
            this.DDZCardType = {
                dan_zhang : 1,
                dan_dui : 2,
                lian_dui:3,
                shun_zi :4,
                san_zhang : 5,
                san_dai1:6,
                san_dai2:7,
                fei_ji:8, // 飞机不带 飞机带两个单  飞机带两队
                zhan_dan:9, //炸弹
                si_dai_1:10, // 四带两张单牌
                si_dai_2:11, // 四带两队
                wang_zha:12, 
            }
        }

      public getType(card){
            var onenum =0
            var twonum =0
            var sannum =0
            var sinum =0
            for (var k = 0; k<card.length; k++){
                if(card[k] && card[k].num ==1 ){
                    onenum=onenum+1
                }else if (card[k] && card[k].num ==2){
                    twonum=twonum+1
                }else if (card[k] && card[k].num ==3){
                    sannum=sannum+1
                }else if (card[k] && card[k].num ==4){
                    sinum=sinum+1
                }
            }
            if(card.length == 1 && onenum == 1){       // 单张
                return this.DDZCardType["dan_zhang"]
            }else if(card.length == 1 && twonum == 1){       // 一对
                return this.DDZCardType["dan_dui"]
            }else if(twonum>=3 && onenum==0 && sannum==0 &&  sinum==0){       // 连对
                var temp = card[0].value
                for (var k = 0; k<card.length;k++){
                    if (temp == card[k].value){
                        temp ++
                    }else{
                        return
                    }
                } 
                return this.DDZCardType["lian_dui"]
            }else if(onenum>=5 && twonum==0 && sannum==0 &&  sinum==0){       // 顺子
                var temp = card[0].value
                for (var k = 0; k<card.length;k++){
                    if (temp == card[k].value){
                        temp ++
                    }else{
                        return
                    }
                } 
                return this.DDZCardType["shun_zi"]
            }else if(onenum==0 && twonum==0 && sannum==1 &&  sinum==0){       // 三张
                return this.DDZCardType["san_zhang"]
            }else if(sannum==1 &&  sinum==0 && onenum==1 && twonum==0){       // 三带一
                return this.DDZCardType["san_dai1"]
            }else if(sannum==1 &&  sinum==0 && onenum==0 && twonum==1){       // 三带一对
                return this.DDZCardType["san_dai2"]
            }else if(sannum+sinum>=2){       // 飞机 全模式
                return this.DDZCardType["fei_ji"]
            }else if(sinum==1 && sannum==0 && ((twonum==0 && onenum==2) ||  (twonum==1 && onenum==0))){       // 四带两个单
                return this.DDZCardType["si_dai_1"]
            }else if(sinum==1 && sannum==0 && twonum==2 && onenum==0){       // 四带两个对
                return this.DDZCardType["si_dai_2"]
            }else if(card.length ==1 && card[0].num==4){       // 炸弹
                return this.DDZCardType["zhan_dan"]
            }else if(card.length ==2 && card[0].card[0]=="gui1" && card[1].card[0]=="gui2"){       // 炸弹
                return this.DDZCardType["wang_zha"]
            }else{
                return
            }

        }
         public changRuleData(data){  // 转换成便于逻辑的数据{value=1,card={fan1,mei1},num=2}
            var data_list =[]
            var bijiaovaule =this.getCardValue(data[0]) // 值从最小开始
            var base_data = null
            for(var k = 0;k<data.length;k++){
                var cardValue =this.getCardValue(data[k])
                if(cardValue == bijiaovaule){
                    if(base_data){
                        base_data["card"].push(data[k])
                        base_data.num = base_data.card.length
                    }else{
                        var cards = []
                        cards.push(data[k])
                        base_data={value:cardValue,card:cards,num:1}
                    }
                }else{
                    bijiaovaule=cardValue
                    data_list.push(base_data)
                    var cards = []
                    cards.push(data[k])
                    base_data={value : bijiaovaule,card:cards,num:1}
                }
            }
            console.log(typeof(data_list))
            if ((base_data && !(data_list && typeof(data_list)=="object" && data_list.length >0 ) ) || 
                ((data_list && typeof(data_list)=="object"&& data_list.length > 0 ) && base_data && base_data.value!=data_list[data_list.length-1].value) ){
                    data_list.push(base_data)
            } 
            return data_list
        }
        public getCanPassCard(last,poker){
           var lastcard = copy_Array(last)
           var userpoker = copy_Array(poker)
           this.sortPoker(lastcard)
           this.sortPoker(userpoker)
           var lastcardRule = this.changRuleData(lastcard)
           var userpokerRule = this.changRuleData(userpoker)
           return this.cardRule(lastcardRule,userpokerRule)  // 得到 比上家牌大的集合 逻辑
        }
        
        public cardRule(lastcardRule,userpokerRule){
            var cartype = this.getType(lastcardRule)
            var temp = null
            if(cartype == this.DDZCardType["dan_zhang"]){           //单张
                temp = this.sangle(lastcardRule,userpokerRule)
            }else if(cartype == this.DDZCardType["dan_dui"]){       //对子
                temp = this.sangle2(lastcardRule,userpokerRule)
            }else if(cartype == this.DDZCardType["lian_dui"]){       //连队
                temp = this.liandui(lastcardRule,userpokerRule)
            }else if(cartype == this.DDZCardType["shun_zi"]){        //顺子
                temp = this.shunzi(lastcardRule,userpokerRule)
            }else if(cartype == this.DDZCardType["san_dai1"]){       //三代一
                temp = this.sanzhang1(lastcardRule,userpokerRule)
            }else if(cartype == this.DDZCardType["san_dai2"]){       //三代二
                temp = this.sanzhang2(lastcardRule,userpokerRule)
            }else if(cartype == this.DDZCardType["si_dai_1"]){       //四带一
                temp = this.sidai1(lastcardRule,userpokerRule)
            }else if(cartype == this.DDZCardType["si_dai_2"]){       //四带二
                temp = this.sidai2(lastcardRule,userpokerRule)
            }else if(cartype == this.DDZCardType["fei_ji"]){         //飞机
                temp = this.feiji(lastcardRule,userpokerRule)
            }
            var zhan_dan_list = null
            if (cartype ==this.DDZCardType["zhan_dan"]){
                zhan_dan_list= this.zhadan(lastcardRule,userpokerRule)
            }else if (cartype !=this.DDZCardType["wang_zha"] &&  cartype !=this.DDZCardType["zhan_dan"]){
                zhan_dan_list =this.zhadan(null,userpokerRule)
            }
            var wang_zha_list =null
            if (cartype ==this.DDZCardType["wang_zha"]){
                return []
            }
            if (!temp){
                temp=[]
            }
            wang_zha_list =this.wangzha(userpokerRule)
            if (zhan_dan_list && typeof(zhan_dan_list)=="object" && zhan_dan_list.length>0){
                for (var k in zhan_dan_list){
                    temp.push(zhan_dan_list[k])
                }
            }
            if (wang_zha_list && typeof(wang_zha_list)=="object" && wang_zha_list.length>0){
                for (var m in wang_zha_list){
                    temp.push(wang_zha_list[m])
                }
            }

            return temp && temp || []
        }
        public wangzha(userpokerRule){   //  王炸
            var result_list=[]
            var netdata = []
            if  (userpokerRule.length >=2 && userpokerRule[userpokerRule.length-2].card[0]=="gui1" && userpokerRule[userpokerRule.length-1].card[0]=="gui2"){
                netdata.push(this.changnetData(userpokerRule[userpokerRule.length-2].card[0]))
                netdata.push(this.changnetData(userpokerRule[userpokerRule.length-1].card[0]))
                result_list.push(netdata)
            }
            return result_list
        }
        public zhadan(lastcardRule,userpokerRule){  //炸弹
            var result_list=[]
            var bijiaovalue = lastcardRule && lastcardRule[0].value || 0
            for (var k in userpokerRule){
                var netdata =[]
                if (userpokerRule[k].value > bijiaovalue && userpokerRule[k].num==4 ){
                    netdata.push(this.changnetData(userpokerRule[k].card[0]))
                    netdata.push(this.changnetData(userpokerRule[k].card[1]))
                    netdata.push(this.changnetData(userpokerRule[k].card[2]))
                    netdata.push(this.changnetData(userpokerRule[k].card[3]))
                    result_list.push(netdata)
                }
            }
            return result_list
        }
        public feiji(lastcardRule,userpokerRule){     // 飞机
            var result_list = []
            var feijiLenth = 0 
            var bijiaovalue = 0
            var shoupaicount=0
            var count=0
            for (var v in userpokerRule){
                shoupaicount =shoupaicount+ userpokerRule[v].num
            }
            for (var k in lastcardRule){
                count=count+lastcardRule[k].num
            }
            if (count>shoupaicount){
                return result_list
            }
            if (count%4 ==0){
                var allvalue=this.feijidai1(lastcardRule,count)
                bijiaovalue=allvalue[allvalue.length-1][0]
                feijiLenth=((allvalue[allvalue.length-1].length))
            }else if(count%5 ==0){
                var allvalue=this.feijidai2(lastcardRule,count)
                bijiaovalue=allvalue[allvalue.length-1][0]
                feijiLenth=((allvalue[allvalue.length-1].length))
            }
            var i=0
            var tempfeiji = []
            var num = 0 
            var tnetdata = [] 
            var temp = 0
            var feijitouvalue =[]
            while(i<userpokerRule.length){
                if(userpokerRule[i].value > bijiaovalue &&  userpokerRule[i].num>=3){
                    if (num==0){     // 第一次 
                        temp=userpokerRule[i].value
                        num=num+1
                        feijitouvalue.push( userpokerRule[i].value)
                        tnetdata.push(this.changnetData( userpokerRule[i].card[0]))
                        tnetdata.push(this.changnetData( userpokerRule[i].card[1]))
                        tnetdata.push(this.changnetData( userpokerRule[i].card[2]))
                    }else if( num>0 &&  temp+1==userpokerRule[i].value){   // 有连续的
                        temp=userpokerRule[i].value
                        num=num+1
                        feijitouvalue.push( userpokerRule[i].value)
                        tnetdata.push(this.changnetData( userpokerRule[i].card[0]))
                        tnetdata.push(this.changnetData( userpokerRule[i].card[1]))
                        tnetdata.push(this.changnetData( userpokerRule[i].card[2]))
                        if(num == feijiLenth){
                            i=i-num+1
                            num=0
                            if(count%4==0){
                                result_list=this.getFeijicibangdan(userpokerRule,result_list,tnetdata,count,feijitouvalue)
                            }else if(count%5==0){
                                result_list=this.getFeijicibangddui(userpokerRule,result_list,tnetdata,count,feijitouvalue)
                            }
                            feijitouvalue=[]
                            tnetdata=[]
                        }
                    }else if(num>0 &&  temp+1!=userpokerRule[i].value){
                        tnetdata=[]
                        feijitouvalue=[]
                        num=1
                        temp=userpokerRule[i].value
                        feijitouvalue.push( userpokerRule[i].value)
                        tnetdata.push(this.changnetData( userpokerRule[i].card[0]))
                        tnetdata.push(this.changnetData( userpokerRule[i].card[1]))
                        tnetdata.push(this.changnetData( userpokerRule[i].card[2]))
                    }
                }
                i ++
            }

            return result_list
        }
        public getFeijicibangdan(userpokerRule,result_list,tnetdata,count,feijitou){
            var findtemp=function (list,temp){
                for(var k in list){
                    if(list[k] == temp){
                        return true
                    }
                }
                return false
            }
            var restCard =[]
            for (var k in userpokerRule) {
                if(findtemp(feijitou,userpokerRule[k].value)){
                    if(userpokerRule[k].num == 4){
                        restCard.push(userpokerRule[k].card[3])
                    }
                }else{
                    for(var m in userpokerRule[k].card){
                        restCard.push(userpokerRule[k].card[m])
                    }
                }
            }
            var tounum =count/4 
            var ttnetdata =copy_Array(tnetdata)
            var num=0
            if (restCard.length >= tounum){
                var i =0
                while (i < restCard.length){
                    num=num+1
                    ttnetdata.push(this.changnetData(restCard[i]))
                    if (num==tounum){
                        num=0
                        i=i-tounum+1
                        result_list.push(ttnetdata)
                        ttnetdata=copy_Array(tnetdata)
                    }
                    i=i+1
                }
            }else{
                return result_list
            }
            return result_list
        }
        public getFeijicibangddui(userpokerRule,result_list,tnetdata,count,feijitou){
            var findtemp=function (list,temp){
                for(var k in list){
                    if(list[k] == temp){
                        return true
                    }
                }
                return false
            }
            var restCard =[]
            var pipeishu=0
            for (var k in userpokerRule){
                if(! findtemp(feijitou,userpokerRule[k].value) && userpokerRule[k].num>1){
                    if(userpokerRule[k].num == 4){
                        var m=copy_Array(userpokerRule[k])
                        var n=copy_Array(userpokerRule[k])
                        var m_card = m["card"]
                        var n_card = n["card"]
                        m_card.splice(m_card.length,1)
                        m_card.splice(m_card.length,1)
                        n_card.splice(0,1)
                        n_card.splice(0,1)
                        restCard.push(m)
                        restCard.push(n)
                    }else{
                        restCard.push(userpokerRule[k])
                    }
                    if (userpokerRule[k].num==4){
                        pipeishu=pipeishu+1
                    }else{
                        pipeishu=pipeishu+2
                    }
                }
            }
            var tounum =count/5
            var ttnetdata =copy_Array(tnetdata)
            var num=0
            if (pipeishu>=tounum ){
                var i=0
                while (i < restCard.length){
                    num=num+1
                    ttnetdata.push(this.changnetData(restCard[i].card[0]))
                    ttnetdata.push(this.changnetData(restCard[i].card[1]))
                    if (num==tounum){
                        num=0
                        i=i-tounum+1
                        result_list.push(ttnetdata)
                        ttnetdata=copy_Array(tnetdata)
                    }
                    i=i+1
                }
            }else{
                return result_list
            }
            return result_list
        }
        public feijidai2(luojidata,cardcount){
            var allvalue = []
            var oncevalue = []
            var temp = null 
            var num = 0
            var i = 0
            while(i<luojidata.length){
                if(luojidata[i].num>=3){
                    if(num == 0){
                        temp = luojidata[i].value
                        num=1
                        oncevalue.push(temp)
                    }else if(num>0 && temp +1 ==luojidata[i].value){
                        temp = luojidata[i].value 
                        oncevalue.push(temp)
                        num=num+1
                        if(num == (cardcount/5)){
                            var j=0
                            var doublebum=0
                            var findtemp = function (temp){
                                for (var key in oncevalue){
                                    if(oncevalue[key] == temp){
                                        return true
                                    }
                                }
                                return false
                            }
                            while (j<luojidata.length){
                                if(!findtemp(luojidata[j].value)){
                                    if (luojidata[j].num ==2){
                                        doublebum=doublebum+1
                                    }else if (luojidata[j].num ==4){
                                        doublebum=doublebum+2
                                    }
                                }
                                j= j+1
                            }
                            if (doublebum==(cardcount/5)){
                                allvalue.push(oncevalue)
                            }
                            oncevalue=[]
                            i=i-(cardcount/5)+1
                            num=0 
                            temp=0
                        }
                    }else if(num>0  && temp+1!=luojidata[i].value){
                        temp = luojidata[i].value
                        num=1
                        oncevalue.push(temp)
                    }
                }
                i++
            }
            return allvalue
        }
        public feijidai1(luojidata,cardcount){
            var allvalue = []
            var oncevalue = []
            var temp = null 
            var num = 0
            var i = 0
            while(i<luojidata.length){
                if(luojidata[i].num>=3){
                    if(num == 0){
                        temp = luojidata[i].value
                        num=1
                        oncevalue.push(temp)
                    }else if(num>0 && temp +1 ==luojidata[i].value){
                        temp = luojidata[i].value 
                        oncevalue.push(temp)
                        num=num+1
                        if(num == (cardcount/4)){
                            allvalue.push(oncevalue)
                            oncevalue = []
                            i=i-(cardcount/4)+1
                            num=0 
                            temp=0
                        }
                    }else if(num>0  && temp+1!=luojidata[i].value){
                        temp = luojidata[i].value
                        num=1
                        oncevalue.push(temp)
                    }
                }
                i++
            }
            return allvalue
        }
        public sidai2(lastcardRule,userpokerRule){     // 四带二
            var result_list=[]
            var sanzhang =0
            var shoupainum =0
            for (var k in lastcardRule){
                if(lastcardRule[k].num == 4){
                    sanzhang = lastcardRule[k].value
                    break
                }
            }
            for (var v in userpokerRule){
                shoupainum =shoupainum+ userpokerRule[v].num
            }
            if (shoupainum<8){
                return result_list
            }
            for(var i =0;i <userpokerRule.length;i++){
                if(userpokerRule[i].value > sanzhang && userpokerRule[i].num>=4 ){
                    var tnetdata = []
                    tnetdata.push(this.changnetData(userpokerRule[i].card[0]))
                    tnetdata.push(this.changnetData(userpokerRule[i].card[1]))
                    tnetdata.push(this.changnetData(userpokerRule[i].card[2]))
                    tnetdata.push(this.changnetData(userpokerRule[i].card[3]))
                    var ttnetdata=copy_Array(tnetdata)
                    var m=0
                    var num=0
                    while(m<userpokerRule.length){
                        if(userpokerRule[i].value != userpokerRule[m].value && userpokerRule[m].num>=2){
                            ttnetdata.push(this.changnetData(userpokerRule[m].card[0]))
                            ttnetdata.push(this.changnetData(userpokerRule[m].card[1]))
                            num=num+1
                            if (num==2){
                                result_list.push(ttnetdata)
                                ttnetdata = []
                                ttnetdata=copy_Array(tnetdata)
                                m=m-1
                                num=0
                            }
                        }
                        m=m+1
                    }
                }
            }
            return result_list
        }
        public sidai1(lastcardRule,userpokerRule){     // 四带一
            var result_list=[]
            var sanzhang =0
            var shoupainum =0
            for (var k in lastcardRule){
                if(lastcardRule[k].num == 4){
                    sanzhang = lastcardRule[k].value
                    break
                }
            }
            for (var v in userpokerRule){
                shoupainum =shoupainum+ userpokerRule[v].num
            }
            if (shoupainum<6){
                return result_list
            }
            for(var i =0;i <userpokerRule.length;i++){
                if(userpokerRule[i].value > sanzhang && userpokerRule[i].num>=4 ){
                    var tnetdata = []
                    tnetdata.push(this.changnetData(userpokerRule[i].card[0]))
                    tnetdata.push(this.changnetData(userpokerRule[i].card[1]))
                    tnetdata.push(this.changnetData(userpokerRule[i].card[2]))
                    tnetdata.push(this.changnetData(userpokerRule[i].card[3]))
                    var ttnetdata=copy_Array(tnetdata)
                    var m=0
                    var num=0
                    var isdouble =true
                    while(m<userpokerRule.length){
                        if(userpokerRule[i].value != userpokerRule[m].value && userpokerRule[m].num>=1){
                            if (userpokerRule[m].num>1){
                                if (ttnetdata.length==4){
                                    if (isdouble){
                                        ttnetdata.push(this.changnetData(userpokerRule[m].card[0]))
                                        ttnetdata.push(this.changnetData(userpokerRule[m].card[1]))
                                        isdouble=false
                                        ttnetdata=[]
                                        ttnetdata=copy_Array(tnetdata)
                                        num=0
                                    }else{
                                        isdouble=true
                                        ttnetdata.push(this.changnetData(userpokerRule[m].card[0]))
                                        num=num+1
                                    }
                                }else if(ttnetdata.length == 5){
                                    ttnetdata.push(this.changnetData(userpokerRule[m].card[0]))
                                    result_list.push(ttnetdata)
                                    ttnetdata = []
                                    ttnetdata=copy_Array(tnetdata)
                                    m=m-1
                                }
                            }else if(userpokerRule[m].num==1){
                                ttnetdata.push(this.changnetData(userpokerRule[m].card[0]))
                                num=num+1
                                if (num==2){
                                    result_list.push(ttnetdata)
                                    ttnetdata = []
                                    ttnetdata=copy_Array(tnetdata)
                                    m=m-1
                                    num=0
                                }
                            }
                            
                        }
                        m=m+1
                    }
                }
            }

            return result_list
        }
        public sanzhang2(lastcardRule,userpokerRule){     // 三代二
            var result_list=[]
            var sanzhang =0
            var shoupainum =0
            for (var k in lastcardRule){
                if(lastcardRule[k].num == 3){
                    sanzhang = lastcardRule[k].value
                    break
                }
            }
            for (var v in userpokerRule){
                shoupainum =shoupainum+ userpokerRule[v].num
            }
            if (shoupainum<5){
                return result_list
            }
            for(var i =0;i <userpokerRule.length;i++){
                if(userpokerRule[i].value > sanzhang && userpokerRule[i].num>=3 ){
                    var tnetdata = []
                    tnetdata.push(this.changnetData(userpokerRule[i].card[0]))
                    tnetdata.push(this.changnetData(userpokerRule[i].card[1]))
                    tnetdata.push(this.changnetData(userpokerRule[i].card[2]))
                    var ttnetdata=copy_Array(tnetdata)
                    var m=0
                    while(m<userpokerRule.length){
                        if(userpokerRule[i].value != userpokerRule[m].value && userpokerRule[m].num>=2){
                            ttnetdata.push(this.changnetData(userpokerRule[m].card[0]))
                            ttnetdata.push(this.changnetData(userpokerRule[m].card[1]))
                            result_list.push(ttnetdata)
                            ttnetdata = []
                            ttnetdata=copy_Array(tnetdata)
                        }
                        m=m+1
                    }
                }
            }

            return result_list
        }
        public sanzhang1(lastcardRule,userpokerRule){     // 三代一
            var result_list=[]
            var sanzhang =0
            var shoupainum =0
            for (var k in lastcardRule){
                if(lastcardRule[k].num == 3){
                    sanzhang = lastcardRule[k].value
                    break
                }
            }
            for (var v in userpokerRule){
                shoupainum =shoupainum+ userpokerRule[v].num
            }
            if (shoupainum<4){
                return result_list
            }
            for(var i =0;i <userpokerRule.length;i++){
                if(userpokerRule[i].value > sanzhang && userpokerRule[i].num>=3 ){
                    var tnetdata = []
                    tnetdata.push(this.changnetData(userpokerRule[i].card[0]))
                    tnetdata.push(this.changnetData(userpokerRule[i].card[1]))
                    tnetdata.push(this.changnetData(userpokerRule[i].card[2]))
                    var ttnetdata=copy_Array(tnetdata)
                    var m=0
                    while(m<userpokerRule.length){
                        if(userpokerRule[i].value != userpokerRule[m].value && userpokerRule[m].num>=1){
                            ttnetdata.push(this.changnetData(userpokerRule[m].card[0]))
                            result_list.push(ttnetdata)
                            ttnetdata = []
                            ttnetdata=copy_Array(tnetdata)
                        }
                        m=m+1
                    }
                }
            }

            return result_list
        }
        public shunzi(lastcardRule,userpokerRule){     // 得到 顺子集合
            var result_list = []
            var shunziLenth = lastcardRule.length
            var bijiaovalue=lastcardRule[0].value
            var num=0
            var k = 0
            var temp =0
            var tnetdata = []
            while(k < userpokerRule.length){
                var v = userpokerRule[k]
                if(userpokerRule[k].value > bijiaovalue && v.num >=1){
                    if(num == 0){                   // 第一次
                        temp = userpokerRule[k].value
                        num = num + 1
                        tnetdata.push(this.changnetData(v.card[0]))
                    }else if(num>0 && temp+1 == userpokerRule[k].value){    // 有连续
                        temp = userpokerRule[k].value
                        num = num + 1
                        tnetdata.push(this.changnetData(v.card[0]))
                        if(num == shunziLenth){
                            k=k-num+1
                            num = 0
                            result_list.push(tnetdata)
                            tnetdata = []
                        }
                    }else if(num > 0 && temp+1 != userpokerRule[k].value){
                        tnetdata = []
                        temp = userpokerRule[k].value
                        num = 1
                        tnetdata.push(this.changnetData(v.card[0]))
                    }
                }
                k ++
            }
            return result_list

        }
        public liandui(lastcardRule,userpokerRule){     // 得到 连对集合
            var result_list = []
            var lianduinum = lastcardRule.length
            var bijiaovalue=lastcardRule[0].value
            var num=0
            var k = 0
            var temp =0
            var tnetdata = []
            while(k < userpokerRule.length){
                var v = userpokerRule[k]
                if(userpokerRule[k].value > bijiaovalue && v.num >=2){
                    if(num == 0){                   // 第一次
                        temp = userpokerRule[k].value
                        num = num + 1
                        tnetdata.push(this.changnetData(v.card[0]))
                        tnetdata.push(this.changnetData(v.card[1]))
                    }else if(num>0 && temp+1 == userpokerRule[k].value){    // 有连续
                        temp = userpokerRule[k].value
                        num = num + 1
                        tnetdata.push(this.changnetData(v.card[0]))
                        tnetdata.push(this.changnetData(v.card[1]))
                        if(num == lianduinum){
                            k=k-num+1
                            num = 0
                            result_list.push(tnetdata)
                            tnetdata = []
                        }
                    }else if(num > 0 && temp+1 != userpokerRule[k].value){
                        tnetdata = []
                        temp = userpokerRule[k].value
                        num = 1
                        tnetdata.push(this.changnetData(v.card[0]))
                        tnetdata.push(this.changnetData(v.card[1]))
                    }
                }
                k ++
            }
            return result_list
        }
        public sangle(lastcardRule,userpokerRule){     // 得到 单张集合
            var result_list = []
            for (var k =0 ; k<userpokerRule.length;k++){
                if(userpokerRule[k].value > lastcardRule[0].value){
                    var netdata = this.changnetData(userpokerRule[k].card[0])
                    var tnetdata =  []
                    tnetdata.push(netdata)
                    result_list.push(tnetdata)
                }
            }
            return result_list
        }
        public sangle2(lastcardRule,userpokerRule){     // 得到 单张集合
            var result_list = []
            for (var k =0 ; k<userpokerRule.length;k++){
                if(userpokerRule[k].value > lastcardRule[0].value && userpokerRule[k].num >= 2 ){
                    var tnetdata = []
                    tnetdata.push(this.changnetData(userpokerRule[k].card[0]))
                    tnetdata.push(this.changnetData(userpokerRule[k].card[1]))
                    result_list.push(tnetdata)
                }
            }
            return result_list
        }
        public changnetData(data){    // 转换成牌的16进制 的值
            var hua = {"fan":1,"mei":2,"xin":3,"hei":4,"gui":4}
            var value = null
            var huaname = data.slice(0,3)
            if(hua[huaname] ){
                value = hua[huaname] *16 + Number(data.slice(3))
                if(huaname == "gui"){
                    value = value + 13
                }
            }
            return value
        }
        public getCardValue(card){      // 3,4,5,6,7,8,9,10,11(J),12(Q),13(K),14(A),16(2),18(xiaowang),20(dawang)
            var value = Number(card.slice(3))
            if (value < 3){
                value = 2*(value-1)+1 + 13
                if(card.slice(0,3) == "gui"){
                    value = value + 4
                }
            }
            return value
        }
        public getRealCardValue(card){      // 3,4,5,6,7,8,9,10,11(J),12(Q),13(K),14(A),15(2),16(xiaowang),17 (dawang)
            var value = Number(card.slice(3))
            if (value < 3){
                value = value +13
                if(card.slice(0,3) == "gui"){
                    value = value + 2
                }
            }
            return value
        }
        public sortPoker(pool){
            var self =this
            if(pool){
                pool.sort(function(l, r){
                    var obj1 = self.addValue(l)
                    var obj2= self.addValue(r)
                    var lv = obj1["value"]
                    var rv = obj2["value"]
                    if (lv == rv  ){
                        return obj1["huatype"] > obj1["huatype"] ? -1 : 1;
                    }else{
                        return lv > rv ? 1 :-1
                    }
                })
            }
        }
        //--对2和鬼牌加权重
        public addValue(name):Object{
            var value=Number(name.slice(3))
            var hua = {"fan":1,"mei":2,"xin":3,"hei":4,"gui":4}
            if (value < 3 || name.slice(0,3) == "gui"){
                value = value + 20
                if (name.slice(0,3) == "gui"){
                    value = value + 5
                }
            }
            let huatype = hua[name.slice(0,3)]
            return {"value":value,"huatype":huatype }
        }
        public bijiaorule(cardType,luojiPoker,hand,lastcardType,luojilastcard){
            var self = this
            var bijiaovalue =luojilastcard && luojilastcard[0].value || 0
            var  netdata =[]
            if (!cardType){
                return 1    //--不合规则
            }else if(lastcardType && lastcardType== this.DDZCardType["wang_zha"]){
                return 1    //--不合规则
            }else if(cardType && cardType == this.DDZCardType["wang_zha"]){
                for(var k in luojiPoker){
                    netdata.push(this.changnetData(luojiPoker[k].card[0]) )
                }
            }else if( (cardType && lastcardType &&  cardType != lastcardType && cardType == this.DDZCardType["zhan_dan"])
                    ||  (cardType==this.DDZCardType["zhan_dan"] && !lastcardType) ){
                for(var k in luojiPoker[0].card){
                    netdata.push(this.changnetData(luojiPoker[0].card[k] ) )
                }
            }else if( (cardType && lastcardType &&  cardType == lastcardType && cardType==this.DDZCardType["dan_zhang"]) 
                    ||   (cardType==this.DDZCardType["dan_zhang"] && !lastcardType ) ){
                if(luojiPoker[0].value >  bijiaovalue){
                    netdata.push(self.changnetData(luojiPoker[0].card[0]) )
                }
            }else if( cardType && lastcardType && cardType == lastcardType && cardType==this.DDZCardType["dan_dui"] 
                ||    (cardType==this.DDZCardType["dan_dui"] && !lastcardType) ){
                if (luojiPoker[0].value >  bijiaovalue){
                    netdata.push(self.changnetData(luojiPoker[0].card[0]))
                    netdata.push(self.changnetData(luojiPoker[0].card[1]))
                }
            }else if( cardType && lastcardType && cardType == lastcardType && cardType==this.DDZCardType["lian_dui"] 
                ||  (cardType==this.DDZCardType["lian_dui"] && !lastcardType) ){
                if (( luojiPoker[0].value > bijiaovalue  && luojilastcard &&  luojiPoker.length==luojilastcard.length ) || bijiaovalue==0 ){
                    for (var k in luojiPoker){
                        netdata.push(self.changnetData(luojiPoker[k].card[0]))
                        netdata.push(self.changnetData(luojiPoker[k].card[1]))
                    }
                }
            }else if( cardType &&  lastcardType && cardType == lastcardType && cardType==this.DDZCardType["shun_zi"] 
                ||  (cardType==this.DDZCardType["shun_zi"] && !lastcardType) ){
                if ((luojiPoker[0].value >  bijiaovalue  && luojilastcard &&  luojiPoker.length==luojilastcard.length) || bijiaovalue==0 ){
                    for(var k in luojiPoker){
                        netdata.push(self.changnetData(luojiPoker[k].card[0]))
                    }
                }
            }else if( cardType &&  lastcardType  && cardType==this.DDZCardType["san_zhang"] && (lastcardType==this.DDZCardType["san_zhang"]) 
                ||  (cardType==this.DDZCardType["san_zhang"] && !lastcardType)){
                if (luojiPoker[0].value >  bijiaovalue && hand.length==3 ){
                    for(var k in luojiPoker){
                        netdata.push(self.changnetData(luojiPoker[k].card[0]))
                        netdata.push(self.changnetData(luojiPoker[k].card[1]))
                        netdata.push(self.changnetData(luojiPoker[k].card[2]))
                    }
                }
            }else if(cardType &&  lastcardType && cardType == lastcardType && (cardType==this.DDZCardType["san_dai1"] || cardType==this.DDZCardType["san_dai2"])
                ||  ((cardType==this.DDZCardType["san_dai1"] || cardType==this.DDZCardType["san_dai2"])  && !lastcardType) ){
                var temp1 =0
                var temp2 =0
                for (var k in luojiPoker){
                    if(luojiPoker[k].num == 3){
                        temp1=luojiPoker[k].value
                    }
                }
                if (luojilastcard){
                    for(var m in luojilastcard){
                        if(luojilastcard[m].num == 3){
                            temp2=luojilastcard[m].value
                        }
                    }
                }
                if (temp1>temp2){
                    var issan =false
                    var i=0
                    while (i <luojiPoker.length){
                        if (issan && (luojiPoker[i].num ==1 ||  luojiPoker[i].num ==2)){
                            for (var m in luojiPoker[i].card){
                                netdata.push(self.changnetData(luojiPoker[i].card[m]))
                            }
                        }
                        if ((luojiPoker[i].num ==3 ) && !issan ){
                            netdata.push(self.changnetData(luojiPoker[i].card[0]))
                            netdata.push(self.changnetData(luojiPoker[i].card[1]))
                            netdata.push(self.changnetData(luojiPoker[i].card[2]))
                            issan=true
                                i= -1
                        }
                        i=i+1
                    }
                }
                
            }else if( cardType &&  lastcardType && cardType == lastcardType && (cardType==this.DDZCardType["si_dai_1"] || cardType==this.DDZCardType["si_dai_2"])
                 ||  ((cardType==this.DDZCardType["si_dai_1"] || cardType==this.DDZCardType["si_dai_2"])  && !lastcardType)){
                var temp1 =0
                var temp2 =0
                for (var k in luojiPoker){
                    if(luojiPoker[k].num == 4){
                        temp1=luojiPoker[k].value
                    }
                }
                if (luojilastcard){
                    for(var m in luojilastcard){
                        if(luojilastcard[m].num == 4){
                            temp2=luojilastcard[m].value
                        }
                    }
                }
                if (temp1>temp2){
                    var issan =false
                    var i=0
                    while (i <luojiPoker.length){
                        if (issan && (luojiPoker[i].num ==1 ||  luojiPoker[i].num ==2)){
                            for (var m in luojiPoker[i].card){
                                netdata.push(self.changnetData(luojiPoker[i].card[m]))
                            }
                        }
                        if ((luojiPoker[i].num ==4 ) && !issan ){
                            netdata.push(self.changnetData(luojiPoker[i].card[0]))
                            netdata.push(self.changnetData(luojiPoker[i].card[1]))
                            netdata.push(self.changnetData(luojiPoker[i].card[2]))
                            netdata.push(self.changnetData(luojiPoker[i].card[3]))
                            issan=true
                            i=0
                        }
                        i=i+1
                    }
                }
            }else if( cardType &&  lastcardType && cardType == lastcardType && cardType==this.DDZCardType["fei_ji"] 
                ||  (cardType==this.DDZCardType["fei_ji"] && ! lastcardType) ){
                    return self.panduanFeiJi(luojiPoker,hand,luojilastcard)
            }else if( cardType &&  lastcardType && cardType == lastcardType && cardType==this.DDZCardType["zhan_dan"] 
                ||  (cardType==this.DDZCardType["zhan_dan"] && ! lastcardType) ){
                if (luojiPoker[0].value > bijiaovalue){
                    for(var k in luojiPoker[0].card ){
                        netdata.push(self.changnetData(luojiPoker[0].card[k]))
                    }
                }
 
            }
            if (netdata && netdata.length >0){
                return netdata
            }else{
                return null
            }

        }

        public panduanFeiJi(luojipokerUp,hand,lastcard){
            var self = this
            var netdata=[]
            var bijiaovalue =0
            var feiji_0 =0
            var feiji_1 =0
            var feiji_2 =0
            var lastcount = 0
            var shoupaicount =0
            for (var k in luojipokerUp){
                shoupaicount =shoupaicount+luojipokerUp[k].num  // --出牌的个数
            }
            if (lastcard){
                for(var key in lastcard){
                    lastcount =lastcount+lastcard[key].num    //--shangjia的个数
                }
            }
            var isfeiji_0=[]
            var isfeiji_1=[]
            var isfeiji_2=[]
            var callback=function (feijitype,tempvalue){
                var findtemp=function (list,temp){
                    for (var k  in list){
                        if (Number(list[k]) == Number(temp) ){
                            return true
                        }
                    }
                    return false
                }
                if (feijitype==1){    //-- feijibudai 
                    for (var k in luojipokerUp){
                        isfeiji_0.push(self.changnetData(luojipokerUp[k].card[0]))
                        isfeiji_0.push(self.changnetData(luojipokerUp[k].card[1]))
                        isfeiji_0.push(self.changnetData(luojipokerUp[k].card[2]))
                    }
                    feiji_0=luojipokerUp[1].value
                }else if(feijitype==2){   // feiji dai dan zhang 
                    feiji_1=tempvalue[0]
                    for (var k in tempvalue){
                        for(var m in luojipokerUp){
                            if(luojipokerUp[m].value ==tempvalue[k] ){
                                isfeiji_1.push(self.changnetData(luojipokerUp[m].card[0]))
                                isfeiji_1.push(self.changnetData(luojipokerUp[m].card[1]))
                                isfeiji_1.push(self.changnetData(luojipokerUp[m].card[2]))
                            }
                        }
                    }
                    for (var k in luojipokerUp){
                        if(findtemp(tempvalue,luojipokerUp[k].value) && luojipokerUp[k].num == 4){
                            isfeiji_1.push(self.changnetData(luojipokerUp[k].card[3]))
                        }else if(!findtemp(tempvalue,luojipokerUp[k].value)){
                            for(var m in luojipokerUp[k].card){
                                isfeiji_1.push(self.changnetData(luojipokerUp[k].card[m]))
                            }
                        }
                    }
                }else if(feijitype==3){
                    feiji_2=tempvalue[1]
                    for (var k in tempvalue){
                        for(var m in luojipokerUp){
                            if(luojipokerUp[m].value ==tempvalue[k] ){
                                isfeiji_2.push(self.changnetData(luojipokerUp[m].card[0]))
                                isfeiji_2.push(self.changnetData(luojipokerUp[m].card[1]))
                                isfeiji_2.push(self.changnetData(luojipokerUp[m].card[2]))
                            }
                        }
                    }
                    for (var k in luojipokerUp){
                        if(findtemp(tempvalue,luojipokerUp[k].value) && luojipokerUp[k].num == 4){
                            isfeiji_2.push(self.changnetData(luojipokerUp[k].card[3]))
                        }else if(!findtemp(tempvalue,luojipokerUp[k].value)){
                            for(var m in luojipokerUp[k].card){
                                isfeiji_2.push(self.changnetData(luojipokerUp[k].card[m]))
                            }
                        }
                    }
                }

            }
            if(shoupaicount %3 ==0){   // 飞机不带
                var temp = null
                var num = 0 
                var maxcount = 0
                var i=0
                while(i<luojipokerUp.length){
                    if(luojipokerUp[i].num==3){
                        if(num == 0){
                            temp = luojipokerUp[i].value 
                            num=1
                        }else if(num>0 &&  temp +1 ==luojipokerUp[i].value){
                            temp = luojipokerUp[i].value 
                            num=num+1
                        }else if(num>0 && temp>0 && temp+1!=luojipokerUp[i].value){
                            temp = luojipokerUp[i].value 
                            maxcount= (num>maxcount)  && num || maxcount
                            num=1
                        }
                    }
                    i++
                }
                
                maxcount=(num>maxcount)  && num || maxcount
                if (maxcount==(shoupaicount/3) ){
                    callback(1,null)
                }
            }
            if (shoupaicount % 4 == 0){
                var allvalue=self.feijidai1(luojipokerUp,shoupaicount)
                if(allvalue.length){
                    callback(2,allvalue[allvalue.length-1])
                }
            }
            if (shoupaicount % 5 == 0){
                var allvalue=self.feijidai2(luojipokerUp,shoupaicount)
                if(allvalue.length){
                    callback(3,allvalue[allvalue.length-1])
                }
            }
            if (!lastcard && (hand.length==shoupaicount) && isfeiji_0.length>0){
                return isfeiji_0
            }else if ((! lastcard && isfeiji_1.length>0) || (lastcard && isfeiji_1.length>0 && (lastcount%4==0) && (lastcount==shoupaicount))){
                if (lastcard){
                    var allvalue=self.feijidai1(lastcard,lastcount)
                    if (allvalue.length> 0 && feiji_1> allvalue[allvalue.length-1][0]){
                        return isfeiji_1
                    }
                }else{
                    return isfeiji_1
                }
            }else if( (! lastcard && isfeiji_2.length>0) || (lastcard && isfeiji_2.length>0 && (lastcount%5==0) && (lastcount==shoupaicount))){
                if (lastcard){
                    var allvalue=self.feijidai2(lastcard,lastcount)
                    if (allvalue.length> 0 && feiji_2> allvalue[allvalue.length-1][0]){
                        return isfeiji_2
                    }
                }else{
                    return isfeiji_2
                }
            }else{
                return null
            }
        }
        public isChuPai(pokerUp,handcard,lastcard){
            var self = this
            //   选择要出的牌 ，手牌，上家出的牌，是不是第一次出牌（首轮必出黑桃3的情况下）
            var shoupaiSelect=copy_Array(pokerUp)
            if( !(shoupaiSelect && typeof(shoupaiSelect) && shoupaiSelect.length > 0 ) ) {  // && shoupaiSelect.length >0) ){
                return 1
            }
            var hand =copy_table(handcard)
            self.sortPoker(shoupaiSelect)
            var luojiPoker =self.changRuleData(shoupaiSelect)
            var cardType= self.getType(luojiPoker)
            var last  = null
            var luojilastcard = null
            var lastcardType= null
            if (lastcard){
                last=copy_Array(lastcard)
                self.sortPoker(last)
                luojilastcard=self.changRuleData(last)
                lastcardType =self.getType(luojilastcard)
            }

            return self.bijiaorule(cardType,luojiPoker,hand,lastcardType,luojilastcard)
        }
        public getPassCardType(passcard){
            var self = this
            var card =copy_table(passcard)
            var pass = getPokerstr(card)
            self.sortPoker(pass)
            var luojiPoker =self.changRuleData(pass)
            var cardType= self.getType(luojiPoker)
            var value =null
            if (cardType== this.DDZCardType["dan_zhang"]  ||  cardType== this.DDZCardType["dan_dui"]){
                value  = this.getRealCardValue(luojiPoker[0].card[0])
            }
            return {value :value,cardType:cardType}
        }

    }
}