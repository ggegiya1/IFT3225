function GameController(){
    this.newGame(4); // default game
}

GameController.prototype.move = function(keyCode){
    if (this.gameBoard.finished) return;
    switch(keyCode) {
        case 37: // left
            this.gameBoard.moveLeft();
            break;

        case 38: // up
            this.gameBoard.moveUp();
            break;

        case 39: // right
            this.gameBoard.moveRight();
            break;

        case 40: // down
            this.gameBoard.moveDown();
            break;

        default: return; // exit this handler for other keys
    }
    // prevent adding new tile if the board remains unchanged
    if (this.gameBoard.changed){
        this.moves++;
        this.gameBoard.addNewTile();
        this.updateStats();
    }
};

GameController.prototype.newGame = function(rows){
    this.gameBoard = new GameBoard(rows, 2048, this.onGameLostCallback, this.onGameWinCallback, this.onScoreUpdated);
    this.gameBoard.initView();
    this.gameBoard.addNewTile();
    this.gameBoard.addNewTile();
    this.gameBoard.draw();
    this.moves = 0;
    this.updateStats();
};

GameController.prototype.onGameLostCallback = function(){
    $("#game_lost").modal();
};

GameController.prototype.onGameWinCallback = function(){
    $("#game_win").modal();
};


GameController.prototype.updateStats = function(){
    $("#moves_count").text("" + this.moves);
    $("#score_count").text("" + this.gameBoard.score);
};

GameController.prototype.onScoreUpdated = function(score){
    $("#score_count").text("" + score);
};

$(document).ready(function(){
    var game = new GameController();
    $(document).keydown(
        function(e){
            game.move(e.keyCode);
        }
    );

    $("#start_btn").click(function(){
        var rows = $("#num_rows").val();
        if (rows > 1){
            $("#wrong_num_alert").addClass("hidden");
            game.newGame(rows);
        }else{
            $("#wrong_num_alert").removeClass("hidden");
        }
        return false;
    });

    $("#replay_win").click(function(){
        game.newGame($("#num_rows").val());
    });

    $("#replay_lost").click(function(){
        game.newGame($("#num_rows").val());
    });

});