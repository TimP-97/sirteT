//===============HTML ELEMENTS======================
let gameState = "paused"; 

const playButton = document.getElementById('play-button'); 
const learnButton = document.getElementById('learn-button'); 
const rulesDisplay = document.getElementById('instructions'); 
const closeButton = document.getElementById('close-button'); 
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

game.setAttribute('height', getComputedStyle(game)['height']);
game.setAttribute('width', getComputedStyle(game)['width']);

//==============CREATING THE BOARD=================
context.scale(33, 33);

//function to create the game board
function createBoard(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

//init the board at 12 columns and 20 rows based off the function
const board = createBoard(12, 20);

//checks the board array to see if there all the spaces in a row are filled up. 
//If so, a new row is created and filled with 0s. 
function clearRow() {
    let rowCount = 1;
    outer: for (let y = board.length -1; y > 0; --y) {
        for (let x = 0; x < board[y].length; ++x) {
            if (board[y][x] === 0) {
                continue outer;
            }
        }

        const row = board.splice(y, 1)[0].fill(0);
        board.unshift(row);
        ++y;

        player.score += rowCount * 100;
        rowCount *= 2;
    }

    console.log('clear row'); 
}

//checks to see if the pieces have collided with the edge of the board
function collisionDetection(board, player) {
    const m = player.matrix;
    const o = player.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
               (board[y + o.y] &&
                board[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}



//creating the pieces in a matrix
const tMatrix = [
    [1, 1, 2],
    [0, 2, 0],
    [0, 0, 0],
]; 

const zigMatrix = [
    [0, 2, 0],
    [1, 2, 0], 
    [1, 0, 0],
 
]; 

const zagMatrix = [
    [1, 0, 0], 
    [1, 2, 0], 
    [0, 2, 0],
    
]; 

const sqMatrix = [
    [1, 1, 0], 
    [2, 2, 0],
    [0, 0, 0],
]; 

const invTMatrix = [
    [2, 2, 1], 
    [0, 1, 0], 
    [0, 0, 0],
]; 



const piecesArray = [
    tMatrix, 
    zigMatrix,
    zagMatrix,
    sqMatrix,
    invTMatrix,
]; 

//draws the piece on init
function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0 && value !== 1) {
                context.fillStyle = 'white';
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            } else if (value !== 0 && value !== 2) {
                context.fillStyle = 'red';
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

//redraws pieces on the board when position is recorded 
function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(board, {x: 0, y: 0});
    drawMatrix(player.matrix, player.pos);
}

//records position on board if landed 
function recordPosition(board, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                board[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
    console.log('record position'); 
}



//resets the pieces and checks for collision if piece is 
function pieceReset() {
    player.matrix = piecesArray[Math.floor(Math.random() * (piecesArray.length))];
    player.pos.y = 0;
    player.pos.x = (board[0].length / 2 | 0) -
                   (player.matrix[0].length / 2 | 0);
    if (collisionDetection(board, player)) {
        resetBoard(); 
    }
     
}

function resetBoard() {
    board.forEach(row => row.fill(0));
    player.score = 0;
    updateScore();
    console.log('board reset'); 
}

//drops the player 1 position down every second
function playerDrop() {
    player.pos.y++;
    if (collisionDetection(board, player)) {
        player.pos.y--;
        recordPosition(board, player);
        pieceReset();
        clearRow();
        updateScore();
    }
    dropCounter = 0;
}

function playerMove(direction) {
    player.pos.x += direction;
    if (collisionDetection(board, player)) {
        player.pos.x -= direction;
    }
}

//function that reverses the matrix and rotates 90 degrees 
function rotate(matrix) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }

    
        matrix.reverse();
    
}

//rotating the player and checking to see if rotating will move it out of the board
function playerRotate(direction) {
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, direction);
    while (collisionDetection(board, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -direction);
            player.pos.x = pos;
            return;
        }
    }
}

//movement control based on key press. passes through a direction
document.addEventListener('keydown', e => {
    if (e.key === 'a') {
        playerMove(-1);
    } else if (e.key === 'd') {
        playerMove(1);
    } else if (e.key === 's') {
        playerDrop();
    } else if (e.key === 'w') {
        playerRotate(-1);
    } 
});


//automatic dropping of the piece on a set interval
let dropCounter = 0;
let dropInterval = 500;

let lastTime = 0;
function gameLoop(time = 0) {
    const deltaTime = time - lastTime;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }
     

    lastTime = time;

    draw();
    requestAnimationFrame(gameLoop);
}


function updateScore() {
    document.getElementById('score').innerText = player.score;
}


const player = {
    pos: {x: 0, y: 0},
    matrix: null,
    score: 0,
};

function runGame() {
gameState = 'playing'
if (gameState === 'playing') {
pieceReset();
updateScore();
gameLoop();
console.log('is game running?'); 
}
}; 
//============UI ELEMENTS==============

learnButton.addEventListener('click', () => {
    rulesDisplay.style.display = "inline"; 
    gameState === 'paused'; 

    closeButton.addEventListener('click', () => {
        rulesDisplay.style.display = 'none';
        gameState === 'playing'; 
    })

    return gameState; 
})

playButton.addEventListener('click', () => {
    runGame(); 
})