import { useState, useEffect } from 'react';

function App() {
  return (
    <div className="center">
      <Loading text="Loading" dotsChangeFrequencyMilliseconds="300" />
    </div>
  );
};


function Loading({ text, dotsChangeFrequencyMilliseconds }) {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots(prevCount => prevCount + 1);
    }, Number(dotsChangeFrequencyMilliseconds));

    return () => clearInterval(intervalId);
  }, [dotsChangeFrequencyMilliseconds]);

  return (
    <div>
      <h1 className="text">{currLoadingState({text} ,dots % 4)}</h1>
    </div>
  );
}

function currLoadingState({text}, dotsAmount) {
  const repeatedDots = ".".repeat(dotsAmount);
  return text + repeatedDots
}

export default App;
