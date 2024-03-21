import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import {useState} from 'react';
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";

const initGameBoard = [
    [null,null,null],
    [null,null,null],
    [null,null,null]

];

const WINNING_COMBINATIONS =[
    [
        {row:0,col:0},
        {row:0,col:1},
        {row:0,col:2},
    ],
    [
        {row:1,col:0},
        {row:1,col:1},
        {row:1,col:2},
    ],
    [
        {row:2,col:0},
        {row:2,col:1},
        {row:2,col:2},
    ],
    [
        {row:0,col:0},
        {row:1,col:0},
        {row:2,col:0},
    ],
    [
        {row:0,col:1},
        {row:1,col:1},
        {row:2,col:1},
    ],
    [
        {row:0,col:2},
        {row:1,col:2},
        {row:2,col:2},
    ],
    [
        { row: 0, col: 0 },
        { row: 1, col: 1 },
        { row: 2, col: 2 },
    ],
    [
        { row: 0, col: 2 },
        { row: 1, col: 1 },
        { row: 2, col: 0 },
    ],
];
function deriveActivePlayer(gameTurns){
    let currentPlayer = 'X';

    if(gameTurns.length>0 && gameTurns[0].player === 'X'){
    currentPlayer = '0';
    }
    return currentPlayer;
}
function App() {
    const [players, setPlayers]= useState({
        X:'Player 1',
        O:'Player 2',

    });
    const [gameTurns, setGameTurns] = useState([]);
    //const [activePlayer, setActivePlayer] = useState('X');
    const activePlayer = deriveActivePlayer(gameTurns);

    let gameBoard = [...initGameBoard.map(array => [...array])];



    for(const turn of gameTurns){
        const {square, player} = turn;
        const {row, col} = square;

        gameBoard[row][col] = player;
    }

    let winner;

    for (const combination of WINNING_COMBINATIONS){
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];

        if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
            winner = players[firstSquareSymbol];
        }
    }

    const hasDraw = gameTurns.length === 9 && !winner;

    function handleSelectSquare(rowIndex,colIndex ){
        //setActivePlayer((curActivePlayer) => curActivePlayer === 'X'?'O':'X');
        setGameTurns(prevTurns => {
            const currentPlayer = deriveActivePlayer(prevTurns);
            return [{square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns];
        });

    }
    function handleRestart(){
        setGameTurns([]);
    }

    function handlePlayerNameChange(symbol, newName){
        setPlayers(prevPlayers => {
            return {
                ...prevPlayers,
                [symbol]:newName
            };
        });
    }
  return (
      <main>
        <div id ="game-container">
          <ol id ="players" className="highlight-player">
             <Player initialName="Player 1" symbol="X" isActiveProp={activePlayer === 'X'} onNameChange={handlePlayerNameChange} />
              <Player initialName="Player 2" symbol="O" isActiveProp={activePlayer === 'O'} onNameChange={handlePlayerNameChange}/>
          </ol>
            {(winner || hasDraw)  && <GameOver winner={winner} onRestart={handleRestart}/>}
          <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
        </div>
       <Log turns={gameTurns}/>
      </main>
  )
}

export default App
