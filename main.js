//getting html elements
const game = document.getElementById('game'); 
const ctx = game.getContext('2d'); 

//setting up the pieces 
let piece1; 
let piece2; 
let piece3; 
let piece4; 

//main event listener
window.addEventListener('DOMContentLoaded', function() {

    piece1 = new tetrimino(200, 10, 30, 30); 

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

class tetrimino {
    constructor(x, y, width, height) {

        this.x = x; 
        this.y = y; 
        this.width = width; 
        this.height = height; 
        this.landed = false; 
        this.alive = true; 
        this.render = function() {

            ctx.strokeStyle = randomColor; 
            ctx.strokeRect(this.x, this.y, this.width, this.height); 
        }

    }
}

function gameLoop() {

    ctx.clearRect(0, 0, game.width, game.height); 

    piece1.render(); 

    document.addEventListener('keydown', movementHandler); 
}

//auto-scrolling and border hit detection
function scrollPiece() {

    piece1.y += 3; 

    if (piece1.x < 0) {
        piece1.x = 0 + 2;
      }
      else if (piece1.x + piece1.width > game.width) {
        piece1.x = game.width - (piece1.width + 2);
      }
      else if (piece1.y < 0) {
        piece1.y = 0 + 2;
      }
      else if (piece1.y + piece1.height > game.height) {
        piece1.y = game.height - (piece1.height + 2);
        piece1.landed = true; 
      }
}

// =================MOVEMENT HANDLER======================== //
function movementHandler(e){
    console.log('Movement:', e.key); 
    if (piece1.landed === false){
        if (e.key === 'a') {
        piece1.x -= 20; 
        } else if (e.key === 'd') {
        piece1.x += 20; 
        } else if (e.key === 's') {
        piece1.y += 12; 
        } else if (e.key === ' ') {
            piece1.y = game.height - (piece1.height + 2); 
        }
    }
}










