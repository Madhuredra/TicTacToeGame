const X_CLASS  = 'x'
const CIRCLE_CLASS = 'circle'

const winningCombination = [
    [0,1,2],
    [2,3,4],
    [5,6,7],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6]
]

const winningMessage = document.querySelector('[data-winning-message-text]')

const restart = document.getElementById('restart');

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board');

const winningMessageElement = document.getElementById('winning');

let circleTurn

startGame()

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.addEventListener('click' , handleClick , { once:true });
    })
    addHoverOnBoard();
}

function handleClick(e){
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell , currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    }else if(isDraw()){
        endGame(true);
    }else{
        swapTurn();
        addHoverOnBoard();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurn() {
    circleTurn = !circleTurn;
}

function addHoverOnBoard(params) {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);   
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClss) {
    return winningCombination.some(combination => {
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClss);
        })
    })   
}

function endGame(draw) {
    if(draw){
        winningMessage.innerText = 'Draw !';
    }else{
        winningMessage.innerText = `${circleTurn?"O's":"X's"} Wins! `;
    }
    winningMessageElement.classList.add('show');
}

function isDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    })
}