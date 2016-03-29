//
// This program draws a maze with a player at one end and a shiny prize at the other.
// 

//
// The maze is represented by a string that is formatted into a grid.
// Each cell in the grid represents either:
// - the start point ('A');
// - the end point ('B');
// - a wall ('#').
// - a walkable empty space (' ').
//
//         --------------
var maze = ' #################    #################  #A #   ######### #'
         + '  ###############  ##  ###############  ##  # #  ######## #'
         + '#  #############  ####  #############  ###  # ##  ####### #'
         + '##  ###########  ######  ###########  ####  # ###  ###### #'
         + '###  #########  ########  #########  #####  # ####  ##### #'
         + '####  #######  ##########  #######  ######  # #####  #### #'
         + '#####  #####  ############  #####  #######  # ######  ### #'
         + '######  ###  ##############  ###  ########  # #######  ## #'
         + '#######  #  ################  #  #########  # ########  # #'
         + '########   ##################   ########## B# #########   #';
//         --------------
var columns = 59;
var rows = 12;

var pathColor = 0xFFFFFF;
var wallColor = 0x95CFB7;
var endColor = 0xFFBFA0;
var playerColor = 0xDAF5FF;
var playerBorder = 0x7FD4FF;

var startLocation, endLocation, playerLocation;
var wallStartX, wallStartY, wallSize;
var endAngle;
var playerWonHooray;

function setup() {
    renderer.backgroundColor = wallColor;
    buildMaze();
    playerLocation = {'row':startLocation.row, 'column':startLocation.column};
    playerWonHooray = false;
    endAngle = -90;
}

function update() {
    graphics.clear();
    drawPath();
    drawEnd();
    drawPlayer();
    checkWin();
    deltaRow = +1;
}

function onKeyDown(event) {
    deltaRow = 0;
    deltaColumn = 0;
    switch (event.keyCode) {
        case 39: // Left Arrow
            keyTimer();
            deltaColumn = -1;
            break;

        case 40: // Up Arrow
            keyTimer();
            deltaRow = -1;
            break;
            
        case 37: // Right Arrow
            deltaColumn = +1;
            break;
            
        case 38: // Down Arrow
            deltaRow = +1;
            break;
            
    }

    
    // Look at the location we want to move to. if it's out of bounds or
    // there's a wall, cancel the move.
    var nr = playerLocation.row + deltaRow;
    var nc = playerLocation.column + deltaColumn;
    if (nr<0 || nr>=rows || nc<0 || nc>=columns || isWall(nr, nc)) {
        deltaRow = 0;
        deltaColumn = 0;

    }

    playerLocation = {
        'row': playerLocation.row + deltaRow,
        'column': playerLocation.column + deltaColumn
    };
}

function buildMaze() {
    // Calculate the best-fit size of a wall block based on the canvas size
    // and number of columns or rows in the grid.
    wallSize = Math.min(renderer.width/(columns+2), renderer.height/(rows+2));

    // Calculate the starting position when drawing the maze.
    wallStartX = (renderer.width - (wallSize*columns)) / 2;
    wallStartY = (renderer.height - (wallSize*rows)) / 2;

    // Find the start and end locations.
    for (var r=0; r<rows; r++) {
        for (var c=0; c<columns; c++) {
            var i = (r * columns) + c;
            var ch = maze[i];
            if (ch == 'A') {
                startLocation = {'row':r, 'column':c};
            } else if (ch == 'B') {
                endLocation = {'row':r, 'column':c};
            }
        }
    }
}

function drawPath() {
    for (var r=0; r<rows; r++) {
        for (var c=0; c<columns; c++) {
            var i = (r * columns) + c;
            var ch = maze[i];
            // The start and end locations are also on the path,
            // so check for them too.
            if (ch==' ' || ch=='A' || ch=='B') {
                var x = wallStartX + c * wallSize;
                var y = wallStartY + r * wallSize;
                drawRect(x, y, wallSize, wallSize, pathColor);
            }
        }
    }
}

function drawEnd() {
    if (playerWonHooray)
        return;
    var x = wallStartX + endLocation.column * wallSize + wallSize/2;
    var y = wallStartY + endLocation.row * wallSize + wallSize/2;
    endAngle -= 5;
    drawPolygon(x, y, wallSize/3, 5, endAngle, endColor);
}

function drawPlayer() {
    var x = wallStartX + playerLocation.column * wallSize + wallSize/2;
    var y = wallStartY + playerLocation.row * wallSize + wallSize/2;
    drawCircle(x, y, wallSize/3, playerColor, wallSize/12, playerBorder);
}

function isWall(r, c) {
    var i = (r * columns) + c;
    var ch = maze[i];
    return ((ch != ' ') && (ch != 'A') && (ch != 'B'));
}

function checkWin() {
    if (playerWonHooray)
        return;
    if ((playerLocation.row == endLocation.row) && (playerLocation.column == endLocation.column)) {
        playerWonHooray = true;
        playerBorder = playerColor;
        playerColor = endColor;
        window.location = "nextpart/index.html"
    }
}

var timer = 'off'

function keyTimer(){
    
    setTimeout(function(){timer='off'},200);
    if(timer == 'on'){
        location.reload();
    }
    timer = 'on';
}

function finishW(){

    if ((playerLocation.row == 2) && (playerLocation.column == 1)) {
        playerLocation.column == 44;
    }
     playerLocation.column == 44;

}

