var FORWARD = 1;

function Game(){

}

Game.prototype.newRandomValue = function(){
    // assign 2 or 4
    return 2 * (Math.floor(Math.random() * 2) + 1);
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

Game.prototype.draw = function(){
    var table = $("<table></table>");
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

Game.prototype.start = function(rows){
    this.init(rows);
    this.addNewTile();
    this.addNewTile();
    this.draw();
};


Game.prototype.init = function(rows){
    this.rows = rows;
    this.board = new Array(this.rows);
    console.log("window size: " + $(window).height());
    this.tileSize = Math.floor($(window).height() / parseInt(rows) / 2);
    console.log("tile size: " + this.tileSize);
    for (var i=0; i<this.rows; i++){
        var row = new Array(this.rows);
        for (var j=0; j < this.rows; j++){
            row[j] = new Tile(this.tileSize);
        }
        this.board[i] = row;
    }
};

Game.prototype.addNewTile = function(onError){
    var available = this.getAvailable();
    if (available.length == 0 && onError){
        onError();
    }else{
        // pick randomly one free position
        var idx = Math.floor(Math.random() * available.length);
        var pos = available[idx];
        this.board[pos[0]][pos[1]].value =  this.newRandomValue();
        this.draw();
    }
};

Game.prototype.row = function(idx){
    return this.board[idx].slice();
};

Game.prototype.column = function(idx){
    var column = new Array(this.rows);
    for (var i=0; i<this.rows; i++){
        column[i] = this.board[i][idx];
    }
    return column;
};

Game.prototype.moveLeft = function(){
    console.log("moving left");
    for(var i=0; i < this.rows; i++){
        this.traverse(this.row(i));
    }
};

Game.prototype.moveRight = function(){
    console.log("moving right");
    for(var i=0; i < this.rows; i++){
        var cur = this.row(i);
        cur.reverse();
        this.traverse(cur);
    }
};

Game.prototype.moveUp = function(){
    console.log("moving up");
    for(var i=0; i < this.rows; i++){
        this.traverse(this.column(i));
    }
};

Game.prototype.moveDown = function(){
    console.log("moving down");
    for(var i=0; i < this.rows; i++){
        var cur = this.column(i);
        cur.reverse();
        this.traverse(cur);
    }
};

Game.prototype.traverse = function(vector){
    for (var i=0; i<this.rows; i++){
        if (vector[i].isEmpty()){
            continue;
        }
        vector[i].merged = false;
        var posCurrent = i;
        while(posCurrent > 0){
            var tileCurrent = vector[posCurrent];
            var tilePrev = vector[--posCurrent];
            if (tilePrev.merged){
                break;
            }
            if (tilePrev.value == tileCurrent.value){
                tilePrev.value += tileCurrent.value;
                tilePrev.merged = true;
                tileCurrent.setEmpty();
            }
            if (tilePrev.isEmpty()){
                tilePrev.value = tileCurrent.value;
                tileCurrent.setEmpty();
            }
            this.draw();
        }
    }
};

$(document).ready(function(){
    var game = new Game();
    $("#start_btn").click(function(){
        var rows = $("#num_rows").val();
        if (rows > 1){
            game.start(rows);
        }else{
            alert("Please enter number of rows > 1")
        }
        return false;
    });
    $(document).keydown(function(e) {
        switch(e.which) {
            case 37: // left
                game.moveLeft();
                break;

            case 38: // up
                game.moveUp();
                break;

            case 39: // right
                game.moveRight();
                break;

            case 40: // down
                game.moveDown();
                break;

            default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
        game.addNewTile(function(){
            var replay = confirm("Game Over\nPress OK to play again");
            if (replay){
                game.start($("#num_rows").val());
            }
        })
    });
});