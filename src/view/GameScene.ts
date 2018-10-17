module gameView{
    export class GameScene implements BaseView{
        private curGame:games.GameCtr;

        constructor(data){
            this.curGame = new games.GameCtr(data);
            playMusic("res/music/game.mp3");
        }

        public recvData(cmd, data):void{
            this.curGame.recvData(cmd, data);
        }

        public updateUI(key, data):void{
              this.curGame.updateUI(key, data);

        }
    }
}