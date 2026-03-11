import { useState, type ChangeEvent, type ChangeEventHandler, type MouseEventHandler, type FocusEvent, type FocusEventHandler } from 'react'
import './App.css'
import Alert from '@mui/material/Alert';

const CountButton = (props: { value: number, text: string,
                    onIncrement: MouseEventHandler<HTMLButtonElement>,
                    onDecrement: MouseEventHandler<HTMLButtonElement>,
                    onInputChange: ChangeEventHandler<HTMLInputElement>,
                    onBlur: FocusEventHandler<HTMLInputElement> }) => {

  return (
    <div className="button-container" >
      <h3>{props.text}</h3>
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

const App = () => {
  const rndPoints = randomNumberInRange(85, 89);

  return (
    <div>
      <h1>DND PLAYER</h1>
      <div className="board">
        <Counters rndPoints = {rndPoints}/>
      </div>
    </div>
  )
} 

const Counters = (props: {rndPoints: number}) => {
  const [counters, setCounters] = useState([
    { id: 1, count: 6, text: "STR" },
    { id: 2, count: 6, text: "DEX" },
    { id: 3, count: 6, text: "INT" },
    { id: 4, count: 6, text: "WIS" },
    { id: 5, count: 6, text: "CHR" },
    { id: 6, count: 6, text: "CON" }
  ]);

  const handleIncrement = (id: number) => {
    const newCounters = counters.map((counter) => {
      if (counter.id === id) {
        const newCount = Math.min(30, counter.count + 1);
        return { ...counter, count: newCount };
      }
      return counter;
    });
    setCounters(newCounters);
  };

  const handleDecrement = (id: number) => {
    const newCounters = counters.map((counter) => {
      if (counter.id === id) {
        const newCount = Math.max(6, counter.count - 1);
        return { ...counter, count: newCount };
      }
      return counter;
    });
    setCounters(newCounters);
  };

  const handleInputChange = (id: number, event: ChangeEvent<HTMLInputElement>) => {
    let inputValue: number = Number(event.target.value);

    const newCounters = counters.map((counter) => {
      if (counter.id === id) {
        return { ...counter, count: inputValue };
      }
      return counter;
    });
    setCounters(newCounters);
  };

  const handleBlur = (id: number, event: FocusEvent<HTMLInputElement>) => {
    let inputValue = Number(event.target.value);
    if (inputValue < 6) {
      inputValue = 6;
    } else if (inputValue > 30) {
      inputValue = 30;
    }

    const newCounters = counters.map((counter) => {
      if (counter.id === id) {
        return { ...counter, count: inputValue };
      }
      return counter;
    });

    setCounters(newCounters);
  };

  const handleReset = () => {
    const newCounters = counters.map((counter) => {
      return { ...counter, count: 6 };
    });
    setCounters(newCounters);
  };

  const handleRandom = () => {
    const randomPoints = generateRandomNumbers(props.rndPoints);
    const newCounters = counters.map((counter) => {
      return { ...counter, count: randomPoints[counter.id - 1] };
    });
    setCounters(newCounters);
  };

  const totalSum = counters.reduce((sum, counter) => sum + counter.count, 0);
  
  return (
    <div>
      <h2 className="button-container">Total skill points: {props.rndPoints}</h2>
      <h2 className="button-container"> Free skill points: {props.rndPoints - totalSum}</h2>
      <AlertPoints points={props.rndPoints - totalSum}/>
      {counters.map((counter) => (
        <CountButton
          key={counter.id}
          value={counter.count}
          text={counter.text}
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
  }
}

const randomNumberInRange = (min: number, max: number) => {
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
}

export default App;
