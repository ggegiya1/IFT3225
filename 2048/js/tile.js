function Tile(x, y, size){
    this.x = x;
    this.y = y;
    this.value = 0;
    this.size = size;
}

Tile.prototype.toHtml = function(parentNode){
    parentNode.append(this.value)
        .addClass("tile")
        .addClass("tile-" + this.value)
        .css("width", this.size + "px")
        .css("height", this.size + "px");
};

