var ClockClass = /** @class */ (function () {
    function ClockClass() {
        this.list = {};
        var self = this;
        Laya.timer.loop(1000, null, function (dt) {
            for (var k in self.list) {
                if (self.list[k]) {
                    self.list[k].count += 1;
                    if (self.list[k] && self.list[k].count >= self.list[k].delay) {
                        self.list[k].func();
                        if (self.list[k]) {
                            self.list[k].count = 0;
                        }
                    }
                }
            }
        });
    }
    ClockClass.prototype.addTimeFun = function (key, func, delay) {
        if (delay === void 0) { delay = 1; }
        this.list[key] = {
            func: func,
            delay: delay,
            count: 0,
        };
    };
    ClockClass.prototype.removeTimeFun = function (key) {
        this.list[key] = null;
    };
    ClockClass.prototype.removeshijian = function (that, func) {
        Laya.timer.clear(that, func);
    };
    ClockClass.prototype.clear = function () {
        this.list = {};
    };
    return ClockClass;
}());
//# sourceMappingURL=Clock.js.map