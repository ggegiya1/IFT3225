$(document).ready(function(){
    var game = new GameBoard();
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