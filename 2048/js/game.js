function GameBoard(rows, max, onGameLostListener, onGameWinListener){
    this.init(rows);
    this.onGameLostListener = onGameLostListener;
    this.onGameWinListener = onGameWinListener;
    this.max = max;
    this.changed = false;
    this.finished = false;
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

GameBoard.prototype.isFull = function(){
    return this.getAvailable().length == 0;
};


GameBoard.prototype.getTile = function(row, col){
    return this.board[row][col];
};


GameBoard.prototype.init = function(rows){
    this.finished = false;
    this.rows = rows;
    this.board = new Array(this.rows);
    // calculate tile size dynamically based on the window size
    this.tileSize = Math.floor($(window).height() / parseInt(rows) / 1.5);
    // populate the 2 dimensional table with empty tiles
    for (var row=0; row<this.rows; row++){
        var rowVector = new Array(this.rows);
        for (var col=0; col < this.rows; col++){
            rowVector[col] = new Tile(row, col);
        }
        this.board[row] = rowVector;
    }
};

GameBoard.prototype.addNewTile = function(){
    var available = this.getAvailable();
    if (available.length == 0){
        this.onGameLostListener();
    }else{
        // pick randomly one free position
        var idx = Math.floor(Math.random() * available.length);
        var pos = available[idx];
        var tile = this.board[pos[0]][pos[1]];
        tile.value = this.newRandomValue();
        tile.draw();
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
    this.changed = false;
    for(var i=0; i < this.rows; i++){
        this.traverse(this.row(i));
    }
};

GameBoard.prototype.moveRight = function(){
    this.changed = false;
    for(var i=0; i < this.rows; i++){
        var cur = this.row(i);
        cur.reverse();
        this.traverse(cur);
    }
};

GameBoard.prototype.moveUp = function(){
    this.changed = false;
    for(var i=0; i < this.rows; i++){
        this.traverse(this.column(i));
    }
};

GameBoard.prototype.moveDown = function(){
    this.changed = false;
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
            // merge two tiles with same value
            if (tilePrev.value == tileCurrent.value){
                this.merge(tilePrev, tileCurrent);
                this.changed = true;
            }
            // move tile to the empty neighbour place
            if (tilePrev.isEmpty()){
                this.move(tilePrev, tileCurrent);
                this.changed = true;
            }
        }
    }
};


GameBoard.prototype.merge = function(tilePrev, tileCurrent){
    tilePrev.mergeTile(tileCurrent);
    // re-draw only the modified tiles
    tilePrev.draw();
    tileCurrent.draw();
    // check if the max value (2048) is reached
    if (tilePrev.value == this.max){
        this.finished = true;
        this.onGameWinListener();
    }
};

GameBoard.prototype.move = function(tilePrev, tileCurrent){
    tilePrev.setTile(tileCurrent);
    // re-draw only the modified tiles
    tilePrev.draw();
    tileCurrent.draw();
};

GameBoard.prototype.initView = function(){
    var table = $("<table></table>");
    for (var row=0; row < this.rows; row++){
        var tr = $("<tr></tr>");
        for (var col=0; col < this.rows; col++){
            // set an id to the cell to bind with Tile object
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
    // redraw all the tiles
    for (var row=0; row < this.rows; row++){
        for (var col=0; col < this.rows; col++){
            var tile = this.getTile(row, col);
            tile.draw();
        }
    }
};