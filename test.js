/// DO NOT MODIFY THIS
const tiles = Array.from(document.querySelectorAll('.tile'));
const playerDisplay = document.querySelector('.display-player');
const resetButton = document.querySelector('#reset');
const announcer = document.querySelector('.announcer');

const pvpButton = document.querySelector('#pvp')
const pvaiButton = document.querySelector('#pvai');
//AI vs AI
/*
document.getElementById('pvai').onclick = function() {
    gamemode="pvai"
    aiMove()
}
*/
document.getElementById('pvai').onclick = function() {
    gamemode="pvai"

}
console.log(gamemode)
tiles.forEach( (tile, index) => {
    tile.addEventListener('click', () => {
        userAction(tile, index)
    });
    
});


/// START CODE AFTER THIS
function getEmptyBoard() {
     board = [
        ['.', '.', '.'],
        ['.', '.', '.'],
        ['.', '.', '.']
        ]
    return board;
}
getEmptyBoard()
let gamemode
let player = 'X';
let gameOver = false;


function getPlayerMove(tile, index) {
    //meghatározni a row and column from index to know which tile im in
    //which column ramainder of 9
    let column = index % 3
    //which row
    let row = (index - column) / 3
    if(board[row][column] === '.' && gameOver === false) {
        board[row][column] = player 
        tile.innerText = player;
        tile.classList.add(`player${player}`); 
    }   
}


function aiMove() {
    let emptyCells = [];
    let random
  
  /*  for (var i = 0; i < cells.length; i++) {
      if (cells[i].textContent == '') {
        emptyCells.push(cells[i]);
      }
    }*/
    if(gamemode === 'pvai') {
    //push index of tile
    tiles.forEach(function(tile, index){
      if (tile.innerText == '') {
        emptyCells.push({tile, index});
      }
    });
    
    // computer marks a random EMPTY cell
    random = Math.ceil(Math.random() * emptyCells.length) - 1;
    emptyCells[random].tile.innerText = player;
    //get tile index
    let column = emptyCells[random].index % 3
    //which row
    let row = (emptyCells[random].index - column) / 3
    board[row][column] = player
    changePlayer();
    getWinningPlayer()
    console.log(emptyCells)
}
}



//placing X or O
const userAction = function(tile, index) {  
    if (tile.innerText === 'X' || tile.innerText === 'O'){
        return ;
    }
    if(!gameOver) {
        getPlayerMove(tile, index)
    
        console.log(board)
        getWinningPlayer()
        changePlayer()
    }
}



function changePlayer(){
    playerDisplay.classList.remove(`player${player}`);
    if (player === 'X') {
        player = 'O';
      } else {
        player = 'X';
      }
    playerDisplay.innerText = player;
    playerDisplay.classList.add(`player${player}`);
}

/*function getWinningPlayer() {
    for( index = 0; index < board.length; index++){
        if(board[index][index] = 'X') {
            console.log('X won!')
        }
    }
}
*/
function getWinningPlayer() {
    // Check rows and columns
    for(let i = 0; i < board.length; i++) {
        let rowSum = board[i][0] + board[i][1] + board[i][2];
        let colSum = board[0][i] + board[1][i] + board[2][i];
        if(rowSum === 'XXX' || colSum === 'XXX') {
        // Player 1 wins   
        endGame('X')
        return;
        } else if (rowSum === 'OOO' || colSum === 'OOO') {
        // Player 2 wins     
        endGame('O')
        return;
        }
    }
    //check diagonal
    let diagonalSum1= board[0][0] + board[1][1] + board[2][2];
    let diagonalSum2= board[0][2] + board[1][1] + board[2][0];
    if(diagonalSum1 === 'XXX' || diagonalSum2 === 'XXX') {
        endGame('X')
        return;
    } else if (diagonalSum1 === 'OOO' || diagonalSum2 === 'OOO') {
        endGame('O')
        return;
    }
    if (isBoardFull(true)){
        endGame(null)
        return;
    }

}

function isBoardFull() {
    if(board.some(row => row.includes('.'))){
        //console.log(false)
        return false
    } else {
        //console.log(true)
        return true
    }   
}

function endGame(winner) {
    // Trigger game over
    gameOver = true;
    // Check if game ended in a tie
    if(winner === null) {      
    announcer.innerHTML = 'Tie';
    }else {
    announcer.innerHTML = `Player ${winner} has won!`
    }
    announcer.classList.remove('hide');
}

const resetBoard = () => {
    getEmptyBoard()
    gameOver = false;
    announcer.classList.add('hide');

    if (player === 'O') {
        changePlayer();
    }

    tiles.forEach(tile => {
        tile.innerText = '';
        tile.classList.remove('playerX');
        tile.classList.remove('playerO');
    });
}
resetButton.addEventListener('click', resetBoard);
