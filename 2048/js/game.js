function Game(rows){
    this.rows = rows;
    this.board = new Array(this.rows);
    console.log("window size: " + $(window).height());
    this.tileSize = Math.floor($(window).height() / parseInt(rows) / 2);
    console.log("tile size: " + this.tileSize);
    for (var i=0; i<this.rows; i++){
        var row = new Array(this.rows);
        for (var j=0; j < this.rows; j++){
                row[j] = new Tile(i, j, this.tileSize);
        }
        this.board[i] = row;
    }
}


Game.prototype.addNewTile = function(x, y){
    // assign 2 or 4
    this.board[x][y].value = 2 * (Math.floor(Math.random() * 2) + 1);
};

Game.prototype.firstAvailable = function(){
    var available = this.getAvailable();
    // find randomly a free position
    var idx = Math.floor(Math.random() * available.length);
    var pos = available[idx];
    return this.board[pos[0]][pos[1]];
};

Game.prototype.getAvailable = function(){
    var available = [];
    for (var i=0; i < this.rows; i++){
        for (var j=0; j < this.rows; j++){
            if (this.board[i][j].value==0){
                available.push([i, j]);
            }
        }
    }
    return available;
};

Game.prototype.drawBoard = function(){
    var table = $("<table></table>").addClass("table-bordered");
    for (var i=0; i < this.rows; i++){
        var row = $("<tr></tr>");
        for (var j=0; j < this.rows; j++){
            var cell = $("<td></td>");
            this.board[i][j].toHtml(cell);
            row.append(cell);
        }
        table.append(row);
    }
    $("#game_board").html(table);
};

Game.prototype.start = function(){
    var tile = this.firstAvailable();
    tile.value = 2;
    this.drawBoard();
};


$(document).ready(function(){
    $("#start_btn").click(function(){
        var game = new Game($("#num_rows").val());
        game.start();
        return false; // prevent form from posting
    });
});