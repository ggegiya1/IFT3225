function Tile(row, col){
    this.col = col;
    this.row = row;
    this.value = 0;
    this.merged = false;
    this.new = true;
}

Tile.prototype.isEmpty = function(){
    return this.value == 0;
};

Tile.prototype.setEmpty = function(){
    this.value = 0;
    this.merged = false;
};

Tile.prototype.mergeTile = function(tile){
    this.value+=tile.value;
    this.merged = true;
    tile.setEmpty();
};

Tile.prototype.setTile = function(tile){
    this.value = tile.value;
    this.merged = tile.merged;
    tile.setEmpty();
};


Tile.prototype.draw = function(){
    var tileId = "#tile-col" + this.col + "-row" + this.row;
    var tileHtml = $("<div></div>").append(this.value)
        .addClass("tile")
        .addClass("tile-" + this.value);
    $(tileId).html(tileHtml);
};
