//getting html elements
const game = document.getElementById('game'); 
const ctx = game.getContext('2d'); 

//game variables 
// let lives = 5; 
// let gameTime = 0; 
// let winCondition = false; 
// let loseCondition = false; 

//main event listener
window.addEventListener('DOMContentLoaded', function() {


    const runGame = setInterval(gameLoop, 60); 
    const pieceFunction = setInterval(scrollPiece, 60); 
    

})

game.setAttribute('height', getComputedStyle(game)['height']); 
game.setAttribute('width', getComputedStyle(game)['width']); 


//random color operations 
const colorIndex = ['#c92a2a', 'white']; 
let randomIndex = Math.floor(Math.random() * (colorIndex.length)); 
let randomColor = colorIndex[randomIndex]; 

console.log(randomColor); 

// class tetrimino {
//     constructor(x, y, width, height) {

//         this.x = x; 
//         this.y = y; 
//         this.width = width; 
//         this.height = height; 
//         this.landed = false; 
//         this.alive = true; 
//         this.render = function() {

//             ctx.strokeStyle = randomColor; 
//             ctx.strokeRect(this.x, this.y, this.width, this.height); 
//         }

//     }
// }

//creating the pieces 
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



function render(matrix, offset) {
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
// if (player.matrix.randomPiece === zigMatrix || player.matrix.randomPiece === zagMatrix) {
//     player.width === 60; 
//     player.height === 90; 
// } else if (player.matrix.randomPiece == tMatrix) {
//     player.width == 120; 
//     player.height == 60; 
// }
}; 


const piecesArray = [
    tMatrix, 
    zigMatrix,
    zagMatrix,
    sqMatrix,
    invTMatrix,
]; 

console.log(piecesArray); 

//variable that pulls a random piece from an array 
let randomPieceIndex = Math.floor(Math.random() * (piecesArray.length)); 
let randomPiece = piecesArray[randomPieceIndex]; 

//setting up the player variable that will let me control the piece later
let player = {
    pos: {x: 175, y: 5}, 
    matrix: randomPiece,
    landed: false,
    width: 60, 
    height: 60
}; 





function gameLoop() {

    ctx.clearRect(0, 0, game.width, game.height); 

    render(player.matrix, player.pos);  

    document.addEventListener('keydown', movementHandler); 

    spawnNewPiece(); 
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
        } else if (e.key === ' ') {
            player.pos.y = game.height - (player.height + 2); 
            player.landed === true; 
        } return player.landed; 
    }
};        


// spawning in a new piece after one has landed 
function spawnNewPiece() {
    if (player.landed === true) {
        const newPiece = render(player.matrix, player.pos); 
        player.landed === false;
    }
}; 










