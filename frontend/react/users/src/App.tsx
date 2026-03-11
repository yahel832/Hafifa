import { useState, useEffect } from 'react'
import './App.css'
import type { User, LoadingInfo } from './models'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./users.json');
        await delay(2000); 
        if (!response.ok) {
          throw new Error('Shilat Buchnik');
        }
        const data = await response.json();
        setItems(data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("מועדים לשמחה");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loading text="Loading" dotsChangeFrequencyMilliseconds="300" />
  }

  return (
    <CreateUsers users={items} />
  );
};

function CreateUsers({ users }: { users: User[] }) {
  return (
    <div>
      <h1>Users:</h1>
      <div className="grid-container">
        {users.map(user => (
          <div className="grid-item" key={user.id}>
            {user.id} <br />
            {user.name} <br />
            {user.age} <br />
            {user.email} <br />
            {user.company}
          </div>
        ))}
      </div>
    </div>
  );
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function Loading( props: LoadingInfo ) {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots(prevCount => prevCount + 1);
    }, Number(props.dotsChangeFrequencyMilliseconds));

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>{currLoadingState(props.text ,dots % 4)}</h1>
    </div>
  );
}

function currLoadingState(text: string, dotsAmount: number) {
  const repeatedDots = ".".repeat(dotsAmount);
  return text + repeatedDots
}

export default App
