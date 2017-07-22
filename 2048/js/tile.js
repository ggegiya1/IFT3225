function Tile(size){
    this.value = 0;
    this.size = size;
    this.merged = false;
    this.new = true;
}

Tile.prototype.toHtml = function(parentNode){
    parentNode.append(this.value)
        .addClass("tile")
        .addClass("tile-" + this.value)
        .css("width", this.size + "px !important")
        .css("height", this.size + "px !important");
};

Tile.prototype.isEmpty = function(){
    return this.value == 0;
};

Tile.prototype.setEmpty = function(){
    this.value = 0;
    this.merged = false;
};


