// canvas 18 by 18 squares 
// board[row][column] | board[15][3]
// (x,y) | (3,15)

// board
var blockSize = 25;
var rows = 20;
var columns = 20;
var board;
var context; // drawing object

// snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5; // starting at (5,5)

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

// food
var foodX;
var foodY;

var gameOver = false;

window.onload = function() {
    board = document.getElementById("board"); // accessing the board tag
    board.height = rows * blockSize;
    board.width = columns * blockSize;
    context = board.getContext("2d"); // used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000/10); // 100 millliseconds
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height); // starting from the corner to 500 (20*25)

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]); // growing segment
        placeFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--) { // starting at tail of snake
        snakeBody[i] = snakeBody[i-1]; // getting previous (x,y)
    }

    if (snakeBody.length) { // if there are body parts in the array
        snakeBody[0] = [snakeX, snakeY]; // setting one before the head as the head
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blockSize; // reflecting it by painting it on the canvas
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize); // x coord, y coord, width, height

    for (let i = 0; i < snakeBody.length; i++) { // starting from the head and moving each segment forward by 1
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // gameOver conditions
    if (snakeX < 0 || snakeX > (columns * blockSize) || snakeY < 0 || snakeY > (rows * blockSize)) { // going out of bounds
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) { // colliding with yourself
            gameOver = true;
            alert("Game Over");
        }
    }

}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) { // not allowed to go in the opposite direction
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * columns) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}
