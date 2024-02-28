const form = document.querySelector("#form");
const turnDisplay = document.querySelector("#turn")
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

form.addEventListener("submit",(event) =>{
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    document.querySelector(".modal").style.display = "none"
    startGame(data)
})

const startGame = (data) => {
    addGameVariables(data)
    assignEventListeners(data)
    turnDisplay.innerHTML = `${data.player1name}'s turn`
    data.displayedPlayer = data.player1name
}

const assignEventListeners = (data) => {
    document.querySelectorAll(".box").forEach(box => {
        box.addEventListener("click", (e) => {
            handleClick(e.target,data)
        })
    })
    document.querySelector("#restart").addEventListener("click",  () =>{
        addGameVariables(data)
        resetBoard(data)
        turnDisplay.innerHTML = `${data.player1name}'s turn`
        data.displayedPlayer = data.player1name
    })
}

const resetBoard = (data) => {
    document.querySelectorAll(".box").forEach(box => {
        box.innerHTML = ""
        })
    data.board.fill(null)
}

const handleClick = (e,data) => {
    if(data.endGame)return
    if(data.board[e.id] !== null) return
    if(data.board[e.id] === null){
    data.board[e.id] = data.currentPlayer
    e.innerText = data.currentPlayer;
} 
    data.endGame = checkForWin(data)
    if(data.endGame) {
    turnDisplay.innerText = `${data.displayedPlayer} has won`;
    console.log(data.displayedPlayer);
    return
}
if(data.choice == 1){
    let nullArr = []
    for(let i = 0;i < data.board.length ; i++){
        if(data.board[i] == null){
            nullArr.push(i)
        } 
    }
    let randommove = nullArr[Math.floor(Math.random() * nullArr.length)];
    if(data.board[randommove] == null){
        data.board[randommove] = "O"
        const boxxes = document.querySelectorAll(".box")
        boxxes[randommove].textContent = "O"

        data.endGame = checkForWin(data)
        if(data.endGame) {
        turnDisplay.innerText = `${data.player2name} has won`;
        return
    }
    }

} else if(data.choice == 2){


    
}
 else
{
data.currentPlayer = data.currentPlayer === "X" ? "O" : "X"
data.displayedPlayer = data.displayedPlayer == data.player1name ? data.player2name : data.player1name 
turnDisplay.innerHTML = `${data.displayedPlayer}'s turn`
}
}

const checkForWin = (data) =>{
for(condition of winConditions){
    let [a, b, c] = condition
    if(data.board[a] &&(data.board[a] == data.board[b] && data.board[a] == data.board[c])){
        return true
    } 
}
}

const addGameVariables = (data) => {
    data.choice = +data.choice;
    data.board = Array(9).fill(null);
    data.player1 = "";
    data.player2 = "";
    data.displayedPlayer = "";
    data.currentPlayer = "X"
    data.round = 0;
    data.endGame = false
}
