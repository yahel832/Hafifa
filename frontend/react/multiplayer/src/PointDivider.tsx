import { type ChangeEvent, type ChangeEventHandler, type MouseEventHandler, type FocusEvent, type FocusEventHandler } from 'react'
import './PointDivider.css'
import Alert from '@mui/material/Alert';
import type { Player, PlayerCount } from './models';

const CountButton = (props: { value: number, text: string, class: string,
                    onIncrement: MouseEventHandler<HTMLButtonElement>,
                    onDecrement: MouseEventHandler<HTMLButtonElement>,
                    onInputChange: ChangeEventHandler<HTMLInputElement>,
                    onBlur: FocusEventHandler<HTMLInputElement> }) => {

  return (
    <div className="button-container" >
      <h3>{props.text}</h3>
      {(props.text === props.class) && <h3>After Bonus: {props.value + 5}</h3>}
      <div>
        <button onClick={props.onDecrement}>-</button>
        &nbsp; &nbsp;
        <input
          type="number"
          min={6} 
          max={30}
          value={props.value}
          onChange={props.onInputChange}
          onBlur={props.onBlur}
        />
        &nbsp; &nbsp;
        <button onClick={props.onIncrement}>+</button>
      </div>
    </div>
  );
};

export const PointDivider = (props: {currPlayer: Player, setCurrPlayer:React.Dispatch<React.SetStateAction<Player>>, setPlayers: React.Dispatch<React.SetStateAction<Map<number, Player>>>,  players: Map<number, Player>}) => {

  return (
    <div>
      <h1>DND PLAYER</h1>
      <div className="board">
        <Counters currPlayer={props.currPlayer} setCurrPlayer={props.setCurrPlayer} setPlayers={props.setPlayers} players={props.players}/>
      </div>
    </div>
  )
}; 

const Counters = (props: {currPlayer: Player, setCurrPlayer: React.Dispatch<React.SetStateAction<Player>>, setPlayers: React.Dispatch<React.SetStateAction<Map<number, Player>>>,  players: Map<number, Player>}) => {
  

  const handleIncrement = (id: number) => {
    const newCounters = props.currPlayer.counters.map((counter) => {
      if (counter.id === id) {
        const newCount = Math.min(30, counter.count + 1);
        return { ...counter, count: newCount };
      }
      return counter;
    });

    updatePlayers(newCounters);
  };

  const handleDecrement = (id: number) => {
    const newCounters = props.currPlayer.counters.map((counter) => {
      if (counter.id === id) {
        const newCount = Math.max(6, counter.count - 1);
        return { ...counter, count: newCount };
      }
      return counter;
    });

    updatePlayers(newCounters);
  };

  const handleInputChange = (id: number, event: ChangeEvent<HTMLInputElement>) => {
    let inputValue: number = Number(event.target.value);

    const newCounters = props.currPlayer.counters.map((counter) => {
      if (counter.id === id) {
        return { ...counter, count: inputValue };
      }
      return counter;
    });

    updatePlayers(newCounters);
  };

  const handleBlur = (id: number, event: FocusEvent<HTMLInputElement>) => {
    let inputValue = Number(event.target.value);
    if (inputValue < 6) {
      inputValue = 6;
    } else if (inputValue > 30) {
      inputValue = 30;
    }

    const newCounters = props.currPlayer.counters.map((counter) => {
      if (counter.id === id) {
        return { ...counter, count: inputValue };
      }
      return counter;
    });

    updatePlayers(newCounters);
  };

  const handleReset = () => {
    const newCounters = props.currPlayer.counters.map((counter) => {
      return { ...counter, count: 6 };
    });

    updatePlayers(newCounters);
  };

  const handleRandom = () => {
    const randomPoints = generateRandomNumbers(props.currPlayer.points);
    const newCounters = props.currPlayer.counters.map((counter) => {
      return { ...counter, count: randomPoints[counter.id - 1] };
    });

    updatePlayers(newCounters);
  };

  const updatePlayers = (newCounters: PlayerCount[]) => {
    const newPlayers = Array.from(props.players.entries()).map(([id, player]) => {
      if (id === props.currPlayer.id) {
        return { ...player, counters: newCounters};
      }
      return player;
    });

    props.setPlayers(new Map(newPlayers.map(player => [player.id, player])));
    props.setCurrPlayer({...props.currPlayer, counters: newCounters});
  };

  const totalSum = props.currPlayer.counters.reduce((sum, counter) => sum + counter.count, 0);
  
  return (
    <div>
      <h2 className="button-container">Total skill points: {props.currPlayer.points + 5}</h2>
      <h2 className="button-container"> Free skill points: {props.currPlayer.points - totalSum}</h2>
      <AlertPoints points={props.currPlayer.points - totalSum}/>
      {props.currPlayer.counters.map((counter) => (
        <CountButton
          key={counter.id}
          value={counter.count}
          text={counter.text}
          class={props.currPlayer.class.skill}
          onIncrement={() => handleIncrement(counter.id)}
          onDecrement={() => handleDecrement(counter.id)}
          onInputChange={(event) => handleInputChange(counter.id, event)}
          onBlur={(event) => handleBlur(counter.id, event)}
        />
      ))}
      <div>
          <br />
          <button className="function-button"
                  onClick={handleRandom}>Random</button>
          &nbsp; &nbsp; &nbsp; &nbsp;
          <button className="function-button"
                  onClick={handleReset}>Reset</button>
        </div>
    </div>
  );
};

function AlertPoints(props: {points: number}) {
  if (props.points > 0) {
    return (
      <Alert severity="error">You have to split the points between all the skills</Alert>
    )
  } else if (props.points < 0) {
    return (
      <Alert severity="error">The character has more points than allowed</Alert>
    )
  };
};

export const randomNumberInRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function generateRandomNumbers(targetSum: number) {
  const numbers = [];
  let remainingSum = targetSum;

  for (let remainingCount = 6; remainingCount > 0; remainingCount--) {
    const currentMin = Math.max(6, remainingSum - (remainingCount - 1) * 30);
    const currentMax = Math.min(30, remainingSum - (remainingCount - 1) * 6);

    const newNumber = randomNumberInRange(currentMin, currentMax);

    numbers.push(newNumber);
    remainingSum -= newNumber;
  }

  return numbers;
};

