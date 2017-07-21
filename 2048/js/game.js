function Game(rows){
    this.rows = rows;
}

Game.prototype.drawField = function(){
    var table = "<table>";
    for (var i=0; i < rows; i++){
        table += "<tr>";
        for (var j=0; j < rows; j++){
            table += "<td>";
            table += (i + j);
            table += "</td>";
        }
        table += "</tr>";
    }
    table += "</table";
    document.getElementById("game_field").innerHTML = table;
};