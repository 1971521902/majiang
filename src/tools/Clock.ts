class ClockClass{
    private list:Object;

    constructor(){
        this.list = {};
        var self = this;
        Laya.timer.loop(1000, null, function(dt){
            for(var k in self.list){
               if(self.list[k]){
                   self.list[k].count += 1;
                   if( self.list[k] && self.list[k].count >= self.list[k].delay){
                        self.list[k].func();
                        if(self.list[k]){
                            self.list[k].count = 0 
                        }
                     }
               }
            }
        });
    }

    public addTimeFun(key:string, func, delay=1):void{
        this.list[key] = {
            func:func,
            delay:delay,
            count:0,
        };
    }

    public removeTimeFun(key:string):void{
        this.list[key] = null;
    }
    public removeshijian(that,func){
        Laya.timer.clear(that,func);
    }
    public clear(){
        this.list = {}
    }
}