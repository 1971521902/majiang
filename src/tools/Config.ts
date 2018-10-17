class GameConfig{
    private data:Object;
    constructor(){
        this.data = {}
        var preload = [
            ["room","res/config/room"],
            ["adr","res/config/adr"],
            ["room_sjddz","res/config/room_sjddz"],
            ["word","res/config/word"]

        ]
        for(var k in preload){
            Laya.loader.load(preload[k][1] + (window["DOMParser"] != null ? ".xml" : ".txt"), Handler.create(this, function(arg, data){
                var group = [];
                if(typeof(data) == "object"){
                     if(arg == "word"){
                        this.recursNode(data.childNodes[0],group);
                     }else{
                        this.recursNode(data.childNodes[0].childNodes[0],group);
                     }
                }else if(typeof(data) == "string"){
                     var ps = new Parse.DOMParser();
                    var root = ps.parseFromString(data);
                     if(arg == "word"){
                        this.recursDom(root.childNodes[2], group);
                     }else{
                        this.recursDom(root.childNodes[2].childNodes[1], group);
                     }
                }
                this.data[arg] = group;
            }, [preload[k][0]]))
        }
    }

    private recursDom(node, group){
      if (node.hasChildNodes()){
        var sub = node.childNodes;
        var num = 0
        for(var k in sub){
           if(sub[k].nodeType == 1){
             group[sub[k].nodeName + num] = [];
             this.recursDom(sub[k], group[sub[k].nodeName + num]);
            
             num += 1;
           }
         }
        group["len"] = num;
      }
     

      if(node.hasAttributes()){
        for (var k in node.attributes){
          var attr = node.attributes[k];
          if(typeof(attr.nodeValue) == "string"){
            group[attr.name] = attr.nodeValue;
          }
         }
      }
    }

    private recursNode(node, group){
        var sub = node.children;
        if(this.getLen(sub) > 0){
            for(var i = 0; i < this.getLen(sub); i++){
                if(sub[i] != null){
                    group[sub[i].nodeName + i] = [];
                    this.recursNode(sub[i], group[sub[i].nodeName + i]);
                }
            }
        }

        var attrMap = node.attributes;
        for(var attr in attrMap){
            if(typeof(attrMap[attr]) != "function" && attrMap[attr].nodeName){
                group[attrMap[attr].nodeName] = attrMap[attr].nodeValue
            }
        }
        group["len"] = this.getLen(sub);
    }

    private getLen(obj){
        var count = 0;
        if(obj.length != null){
            return obj.length;
        }
        for(var k in obj){
            if(obj[k] && typeof(obj[k]) != "function"){
                count = count + 1
            }
        }
        return count;
    }

    public getCfg(key:string){
        return this.data[key];
    }

    public getConfigById(key, id){
        var find = function(table, fId){
            var result;
            for(var k in table){
                if(result){
                    break;
                }

                if(typeof table[k] == "object"){
                    if((table[k].ID || table[k].id) == fId){
                        result = table[k];
                        break
                    }else{
                        result = find(table[k], fId);
                    }
                }
            }
            return result;
        }
        if(typeof key == "string"){
            if(this.data[key] != null){
                return find(this.data[key], id);
            }else{
                return find(key, id);    
            }
        }
    }
}

