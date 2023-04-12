console.log('JS LOADED'); 

//==============VARIABLES==============// 

//getting html elements
const game = document.getElementById('game'); 
const ctx = game.getContext('2d'); 

//game variables 
// let lives = 5; 
// let gameTime = 0; 
// let winCondition = false; 
// let loseCondition = false; 
let currentPiece; 
let newPiece; 

//=================== CREATING THE BOARD ==================//
window.addEventListener('DOMContentLoaded', function() {

    currentPiece = new gamePiece(player.matrix, player.pos); 
    newPiece = new gamePiece(player.matrix, player.pos); 

    const runGame = setInterval(gameLoop, 60); 
    const pieceFunction = setInterval(scrollPiece, 60); 
    

})

game.setAttribute('height', getComputedStyle(game)['height']); 
game.setAttribute('width', getComputedStyle(game)['width']); 

function createBoard(width, height) {
    const board = []; 
    while (height--) {
        board.push(new Array(width).fill(0)); 
    } return board; 
}; 

let board = createBoard(10, 20); 

function merge(board, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0 && value !== 2){
                board[y][x] = value; 
            } else if (value !== 0 && value !==1){
                board[y][x] = value; 
            }
        }); 
    }); 
}




// ================ BUILDING THE PIECES =============== // 

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

console.log(piecesArray); 

//Creating a random piece index 
let randomPieceIndex = Math.floor(Math.random() * (piecesArray.length)); 
let randomPiece = piecesArray[randomPieceIndex]; 

//setting up the player variable that will allow for player control
let player = {
    pos: {x: 5, y: 5}, 
    matrix: randomPiece,
    landed: false,
    collided: false, 
    width: 60, 
    height: 60
}; 

//game piece class to add new pieces 
class gamePiece {
    constructor(matrix, position) {
        this.position = position;  
        this.matrix = matrix; 
        this.landed = false; 
        this.render = function(matrix, offset) { 
            matrix.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0 && value !== 2) {
                        ctx.strokeStyle = 'white';
                        ctx.strokeRect(x * 30 + offset.x, y * 30 + offset.y, 30, 30);  
                    } else if (value !== 0 && value !== 1) {
                        ctx.strokeStyle = 'red';
                        ctx.strokeRect(x * 30 + offset.x, y * 30 + offset.y, 30, 30); 
                    } 
                }); 
            }); 

        }
    }
}

//creating the game board with a function 





//===============GAME OPERATIONS=============//
function gameLoop() {

    ctx.clearRect(0, 0, game.width, game.height);  

    currentPiece.render(player.matrix, player.pos); 
    
    if(player.landed) {
        spawnNewPiece(); 
        newPiece.render(player.matrix, player.pos); 
    }

    document.addEventListener('keydown', movementHandler); 

}

// auto-scrolling and border hit detection
function scrollPiece() {

    player.pos.y += 3; 
   
    if (player.pos.x < 0) {
        player.pos.x = 0 + 2;
      }
      else if (player.pos.x + player.width > game.width) {
        player.pos.x = game.width - (player.width + 2);
      }
      else if (player.pos.y < 0) {
        player.pos.y = 0 + 2;
      }
      else if (player.pos.y + player.height > game.height) {
        player.pos.y = game.height - (player.height + 2);
        player.landed = true; 
        merge(board, player); 
        console.log('player landed?', player.landed); 
      }


}

// =================MOVEMENT HANDLER======================== //
function movementHandler(e){
    console.log('Movement:', e.key); 
    if (player.landed === false){
        if (e.key === 'a') {
        player.pos.x -= 30; 
        } else if (e.key === 'd') {
        player.pos.x += 30; 
        } else if (e.key === 's') {
        player.pos.y += 12; 
        } else if (e.key === 'w') {
            rotate(player.matrix, -1); 
        }
        else if (e.key === ' ') {
            player.pos.y = game.height - (player.height + 2); 
            player.landed = true; 
            spawnNewPiece(player.matrix, player.pos); 
        }
    }
};        

//rotating the pieces 90 degrees 
function rotate(matrix, direction) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < y; x++) {
            [
                matrix[x][y],
                matrix[y][x]
            ] = 
            [
                matrix[y][x],
                matrix[x][y]
            ]; 
        }
    }

    if (direction > 0) {
        matrix.forEach(row => row.reverse)
    } else {
        matrix.reverse(); 
    }
}



// spawning in a new piece after one has landed 
function spawnNewPiece() {
   player.landed = false; 
   newPiece = new gamePiece(player.matrix, {x: 180, y:10}); 
   newPiece.render(); 
   return true; 
   
}; 












