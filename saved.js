// render piece function 
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
  
}; 

function recordPosition(board, player) {
    console.log('board', board); 
    console.log('player', player.matrix.length); 
    console.log("player matrix", player.matrix); 
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                board.push(value); 
            }
        }); 
    }); 
}
let board = createBoard(10, 20); 
function createBoard(width, height) {
    const board = []; 
    while (height--) {
        board.push(new Array(width).fill(0)); 
    } return board; 
}; 



[y + player.pos.y][x + player.pos.x] 