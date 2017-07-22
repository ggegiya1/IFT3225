function GameBoard(){
}

GameBoard.prototype.newRandomValue = function(){
    // assign 2 or 4
    return 2 * (Math.floor(Math.random() * 2) + 1);
};

GameBoard.prototype.getAvailable = function(){
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


GameBoard.prototype.getTile = function(row, col){
    return this.board[row][col];
};

GameBoard.prototype.start = function(rows){
    this.init(rows);
    this.initView();
    this.addNewTile();
    this.addNewTile();
    this.draw();
};


GameBoard.prototype.init = function(rows){
    this.rows = rows;
    this.board = new Array(this.rows);
    console.log("window size: " + $(window).height());
    this.tileSize = Math.floor($(window).height() / parseInt(rows) / 2);
    console.log("tile size: " + this.tileSize);
    for (var row=0; row<this.rows; row++){
        var rowVector = new Array(this.rows);
        for (var col=0; col < this.rows; col++){
            rowVector[col] = new Tile(row, col);
        }
        this.board[row] = rowVector;
    }
};

GameBoard.prototype.addNewTile = function(onError){
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

GameBoard.prototype.row = function(idx){
    return this.board[idx].slice();
};

GameBoard.prototype.column = function(idx){
    var column = new Array(this.rows);
    for (var i=0; i<this.rows; i++){
        column[i] = this.board[i][idx];
    }
    return column;
};

GameBoard.prototype.moveLeft = function(){
    console.log("moving left");
    for(var i=0; i < this.rows; i++){
        this.traverse(this.row(i));
    }
};

GameBoard.prototype.moveRight = function(){
    console.log("moving right");
    for(var i=0; i < this.rows; i++){
        var cur = this.row(i);
        cur.reverse();
        this.traverse(cur);
    }
};

GameBoard.prototype.moveUp = function(){
    console.log("moving up");
    for(var i=0; i < this.rows; i++){
        this.traverse(this.column(i));
    }
};

GameBoard.prototype.moveDown = function(){
    console.log("moving down");
    for(var i=0; i < this.rows; i++){
        var cur = this.column(i);
        cur.reverse();
        this.traverse(cur);
    }
};

GameBoard.prototype.traverse = function(vector){
    for (var i=0; i<this.rows; i++){
        if (vector[i].isEmpty()){
            continue;
        }
        vector[i].merged = false;
        var posCurrent = i;
        while(posCurrent > 0){
            var tileCurrent = vector[posCurrent];
            var tilePrev = vector[--posCurrent];
            // allow only one merge
            if (tilePrev.merged || tileCurrent.merged){
                break;
            }
            if (tilePrev.value == tileCurrent.value){
                tilePrev.mergeTile(tileCurrent);
                // re-draw only the modified tiles
                tilePrev.draw();
                tileCurrent.draw();
            }
            if (tilePrev.isEmpty()){
                tilePrev.setTile(tileCurrent);
                // re-draw only the modified tiles
                tilePrev.draw();
                tileCurrent.draw();
            }
        }
    }
};


GameBoard.prototype.initView = function(){
    var table = $("<table></table>");
    for (var row=0; row < this.rows; row++){
        var tr = $("<tr></tr>");
        for (var col=0; col < this.rows; col++){
            var tileId = "tile-col" + col + "-row" + row;
            var td = $("<td></td>").attr("id", tileId).attr("style",
                "width: " + this.tileSize + "px !important; " +
                "height: " + this.tileSize + "px !important;");
            tr.append(td);
        }
        table.append(tr);
    }
    $("#game_board").html(table);
};

GameBoard.prototype.draw = function(){
    for (var row=0; row < this.rows; row++){
        for (var col=0; col < this.rows; col++){
            var tile = this.getTile(row, col);
            tile.draw();
        }
    }
};