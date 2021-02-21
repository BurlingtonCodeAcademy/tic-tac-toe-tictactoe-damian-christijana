//Start Game





//DOM
let start = document.getElementById("start");
let status = document.getElementById("status");
let compMove = document.getElementById("compMove");

let playerScore = 0;
let compScore = 0;
let secondsTimer;
const xClass = "X"
const oClass = "O"
let circleTurn;

let cells = ['0','1','2','3','4','5','6','7','8']


const allCells = document.querySelectorAll("[cells]")
allCells.forEach(cell =>{
    console.log(cell);
    cell.addEventListener("click", handleClick, {once:true})
})

function handleClick(event){
    const cell = event.target
    const currentClass = circleTurn ?oClass:xClass
    placeMark(cell, currentClass)
}
function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}