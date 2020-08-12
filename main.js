// display module to handle DOM manipulation
const displayController = (() => {
  const gameboard = document.getElementById("gameboard")

  // render
  const render = (board) => {
    console.log("rendering")
    while (gameboard.firstChild) {
      gameboard.removeChild(gameboard.firstChild)
    }
    board.forEach((symbol, index) => {
      const box = document.createElement("div")
      if (symbol != "") {
        const symbolDiv = document.createElement("div")
        if (symbol == "X") {
          symbolDiv.classList.add("cross")
        }
        if (symbol == "O") {
          symbolDiv.classList.add("naught")
        }
        box.appendChild(symbolDiv)
      }
      box.id = index
      gameboard.appendChild(box)
    })
  }
  // handleClick
  const handleClick = (event) => {
    event.preventDefault()
    const square = event.target.id
    game.takeTurn(square)
  }
  // Game Over
  const gameOver = (winner) => {
    const winH2 = document.getElementById("winner")
    winH2.innerText = `${winner} wins!`
  }


  // listen for click on board
  gameboard.addEventListener("click", handleClick)
  return {
    render,
    gameOver
  }
})()

// Create one revealing module this is concerned with the game logic

const game = (() => {
  //setup game
  let turn = "X"
  //init game board
  const board = ["", "", "", "", "", "", "", "", ""]

  // game funcs
  const changeTurn = () => {
    (turn == "X") ? turn = "O" : turn = "X";
  }

  const checkWinner = () => {
    let winner = null
    for (let i = 0; i < 3; i++) {
      const index = i * 3
      // horizontal
      if (board[index] != "" && board[index] === board[index + 1] && board[index + 1] === board[index + 2]) {
        winner = board[index]
      }
      // vertical
      else if (board[i] != "" && board[i] === board[i + 3] && board[i + 3] === board[i + 6]) {
        winner = board[i]
      }
    }
    if (board[0] != "" && board[0] === board[4] && board[4] === board[8]) {
      winner = board[0]
    } else if (board[2] != "" && board[2] === board[4] && board[4] === board[6]) {
      winner = board[2]
    }
    return winner
  }

  const endGame = (winner) => {
    displayController.gameOver(winner)
  }

  const endTurn = () => {
    //test for game status, win? draw? neither?
    const winner = checkWinner();
    (!winner) ? changeTurn() : endGame(winner)
  }

  //attempt turn
  const takeTurn = (square) => {
    // check if square is available
    if (board[square] != "") {
      return;
    }
    board[square] = turn
    displayController.render(board)
    endTurn()
  }

  return {
    board,
    takeTurn
  }
})()

displayController.render(game.board);