var gameView;
(function (gameView) {
    var GameScene = /** @class */ (function () {
        function GameScene(data) {
            this.curGame = new games.GameCtr(data);
            playMusic("res/music/game.mp3");
        }
        GameScene.prototype.recvData = function (cmd, data) {
            this.curGame.recvData(cmd, data);
        };
        GameScene.prototype.updateUI = function (key, data) {
            this.curGame.updateUI(key, data);
        };
        return GameScene;
    }());
    gameView.GameScene = GameScene;
})(gameView || (gameView = {}));
//# sourceMappingURL=GameScene.js.map