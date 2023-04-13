describe('createBoard()', function(){
    it('should create an object', function() {
        let result = createBoard(10, 10); 
        expect(typeof(result)).toBe('object'); 
    })
    it('should create a length of the second argument', function() {
        let result = createBoard(10, 20); 
        expect(result.length).toBe(20); 
    })

})

describe('collisionDetection()', function(){
    it('should return false if the player.position does not match board.length', function() {
        let board = createBoard(10, 10); 
        const player = {
            pos: {x: 0, y: 0},
            matrix: [
                [1, 1, 1], 
                [0, 1, 0], 
                [0, 0, 0]
            ]
           
        };
        let result = collisionDetection(board, player); 
        expect(result).toBe(false); 
    }); 

    it('should return true if the player.position exceeds board.length', function() {
        let board = createBoard(10, 10); 
        const player = {
            pos: {x: 100, y: 100},
            matrix: [
                [1, 1, 1], 
                [0, 1, 0], 
                [0, 0, 0]
            ]
           
        };
        let result = collisionDetection(board, player); 
        expect(result).toBe(true); 
    }); 
})

describe('rotate()', function(){
    it('should rotate the matrix', function() {
       let matrix = [
                [1, 1, 1], 
                [0, 1, 0], 
                [0, 0, 0]
            ]
       rotate(matrix); 
       expect(matrix).toEqual([
        [1, 0, 0], 
        [1, 1, 0],
        [1, 0, 0]
       ]); 
    })
})

