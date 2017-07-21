function Game(rows){
    this.rows = rows;
}

Game.prototype.drawBoard = function(){
    var table = "<table>";
    for (var i=0; i < this.rows; i++){
        table += "<tr>";
        for (var j=0; j < this.rows; j++){
            table += "<td>";
            table += (i + j);
            table += "</td>";
        }
        table += "</tr>";
    }
    table += "</table";
    $("#game_board").html(table);
};


$(document).ready(function(){
    $("#start_btn").click(function(){
        //alert("Start new game with " + $("#num_rows").val() + " rows");
        var game = new Game($("#num_rows").val());
        game.drawBoard();
    });
});