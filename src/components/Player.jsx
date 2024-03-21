import {useState} from "react";

export default function Player({initialName, symbol, isActiveProp, onNameChange}){
    const [isEditing, setIsEditing] = useState(false);
    const [pname, setPName ] = useState(initialName);

    function handleChange(event){
       setPName(event.target.value);
       console.log(event);
    }
    function  handleOnClick(){
        setIsEditing(editing => !editing);
        onNameChange(symbol, playerName);
    }
    let playerName = <span className="player-name">{pname}</span>

    if(isEditing){
        playerName = <input type="text" value={pname} onChange={handleChange}/>
    }
    return (
        <li className={isActiveProp?'active': undefined}>
              <span className="player">
                  {playerName}
                <span className="player-symbol">{symbol}</span>
              </span>
            <button onClick={handleOnClick}>{isEditing?'Save':'Edit'}</button>
        </li>
    );
}