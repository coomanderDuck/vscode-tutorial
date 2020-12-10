import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
  
  class Board extends React.Component {
    renderSquare(i) {
      return (
      <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
      />
      );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        lastCage: [],
        xIsNext: true,
      };
    }

    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1, );
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      const cages = this.state.lastCage.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      cages[this.state.stepNumber + 1] = i+1;
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        stepNumber: history.length,
        lastCage: cages,
        xIsNext: !this.state.xIsNext,
      });
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }

    render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const cages = this.state.lastCage;
    let cageDesc = null;  
    /*if (this.state.lastCage[this.state.stepNumber]) {*/ cageDesc =   (parseInt((this.state.lastCage[this.state.stepNumber]-1)/3)+1) + " " + (parseInt((this.state.lastCage[this.state.stepNumber]-1)%3)+1)//}

    const moves = history.map((step, move) => {
      const desc = move ?
        'Перейти к ходу #' + move :
        'К началу игры';
      return (
        <ul key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button> {/*cageDesc*/}
        </ul>
      ); 
    });
   const lastPoints = cages.map((cage) => {
    return (
      <ul key={cage}>
        {cage = (parseInt((cage-1)/3)+1) + " " + (parseInt((cage-1)%3)+1)}
      </ul>
    );
   });
 
    let status;
    if (winner) {
      status = 'Выиграл ' + winner;
    } else {
      status = 'Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O');
    }
      return (
        <div className="game">
          <div className="game-board">
            <Board
             squares={current.squares}
             onClick={(i) => this.handleClick(i)} 
            />
          </div>
          <div className="game-info">
          <div>{status}</div>
          <table>
            <tr>
            <td>{moves}</td>

          </tr>
          </table>
          </div>
          <div>          
            <table>
              <tr>              <td>Ходы</td></tr>
            <tr>

              <td>{lastPoints}</td>
            </tr>
          </table>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }