import React, { Component } from 'react';
import './App.css';

const player_one = "X", player_two = "O"

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      currentTurn: player_one,
      board: [
          "", "", "", "", "", "", "", "", ""
      ],
      winner: null,
      moveCount: 0
    }
  }

  handleClick(index){
    if(this.state.board[index] === "" && !this.state.winner) {
      let currentBoard = this.state.board,
        count = this.state.moveCount;

      currentBoard[index] = this.state.currentTurn;
      count += 1;

      this.setState({
        board: this.state.board,
        winner: this.checkForWinner(),
        currentTurn: this.state.currentTurn === player_one ? player_two : player_one,
        moveCount: count
      });
    }
  }

  handleReset(){
    console.log("RESET");
    this.setState({
      currentTurn: player_one,
      board: [
          "", "", "", "", "", "", "", "", ""
      ],
      winner: null,
      moveCount: 0
    })
  }

  checkForWinner() {
    let currentTurn = this.state.currentTurn;
    let symbols = this.state.board;
    let winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    return winningCombos.find(function(combo) {
      if(symbols[combo[0]] !== "" && symbols[combo[1]] !== ""  && symbols[combo[2]] !== ""  && symbols[combo[0]] === symbols[combo[1]] && symbols[combo[1]] === symbols[combo[2]]) {
        console.log("Found a winner", currentTurn, [combo[0],combo[1],combo[2]]);
        return currentTurn;
      } else {
        return null;
      }
    })
  }

  render() {
    return (
      <div className="app-container">
        <h1>Tic-React-Toe</h1>
        {this.state.winner ? <h2 className="winner">{`${this.state.currentTurn===player_one ? player_two : player_one} WINS!!!`}</h2> : null}
        <div className="board">
          {this.state.board.map((cell, index) => {
              return <div onClick={() => this.handleClick(index)} key={index} className="square"><p className="playerSymbol">{cell}</p></div>
          })}
        </div>
        <div className="reset">
          <button onClick={() => this.handleReset()} className="resetButton">RESET</button>
        </div>
      </div>
    )
  }
}

export default App;
