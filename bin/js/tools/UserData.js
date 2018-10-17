var UserDataClass = /** @class */ (function () {
    function UserDataClass() {
        this.data = null;
        this.session = null;
        this.custom = [];
        this.nick = null;
    }
    UserDataClass.prototype.getUserData = function (key) {
        if (key) {
            return this.data[key];
        }
        else {
            return this.data;
        }
    };
    UserDataClass.prototype.setUserData = function (d) {
        this.data = d;
    };
    UserDataClass.prototype.setUserDataByKey = function (k, d) {
        this.data[k] = d;
    };
    UserDataClass.prototype.setUserDataBy_data_key = function (k, d, y) {
        this.data[y][k] = d;
    };
    UserDataClass.prototype.getUserDataBy_data_key = function (k, y) {
        return this.data[y][k];
    };
    UserDataClass.prototype.setSessionData = function (s) {
        this.session = s;
    };
    UserDataClass.prototype.setnickData = function (k, d) {
        this.nick[k] = d;
    };
    UserDataClass.prototype.getSessionData = function (key) {
        return this.session[key];
    };
    UserDataClass.prototype.getnickData = function (key) {
        return this.nick[key];
    };
    UserDataClass.prototype.setCustomByKey = function (key, v) {
        this.custom[key] = v;
    };
    UserDataClass.prototype.getCustomByKey = function (key) {
        return this.custom[key];
    };
    return UserDataClass;
}());
//# sourceMappingURL=UserData.js.map