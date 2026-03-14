import { useState } from 'react'
import './App.css'
import { type Player} from './models'
import classesData from './ClassData';
import { PointDivider, randomNumberInRange } from './PointDivider';
import starterCount from './CountData';

function App() {
  const [players, setPlayers] = useState<Map<number, Player>>(new Map<number, Player>([
    [
      1, 
      {
        id: 1,
        name: "default",
        points: 86,
        class: classesData["warrior"],
        counters: starterCount
      }
    ]
  ]));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currPlayer, setCurrPlayer] = useState<Player>({
    id: 1,
    name: "default",
    points: 86,
    class: classesData["warrior"],
    counters: starterCount
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const addPlayer = ( name: string, className: string ) => {
      const newId: number = players.size + 1;

      setPlayers(prevPlayers => {
        const newMap = new Map(prevPlayers);
        newMap.set(newId, createNewplayer(newId, name, className));
        return newMap;
      });
  };

  const createNewplayer = (iId: number, iName: string, iClassName: string) => {
    const iNewPlayer: Player = {
      id: iId,
      name: iName,
      points: randomNumberInRange(85, 89),
      class: classesData[iClassName],
      counters: starterCount
    }

    return iNewPlayer;
  }

  const HandlePlayerClick = (player: Player) => {
    const totalSum = currPlayer.counters.reduce((sum, counter) => sum + counter.count, 0);
    if (totalSum === currPlayer.points) {
      setCurrPlayer(player)
    };
  };

  const HandleModalClick = () => {
    const totalSum = currPlayer.counters.reduce((sum, counter) => sum + counter.count, 0);
    if (totalSum === currPlayer.points) {
      handleOpenModal();
    };
  }

  return (
    <div className='main-screen'>
      <div>
        <h2>Players List</h2>
        <div>
          {Array.from(players.entries()).map(([id, player]) => (
            <div key={id} 
            className='player-box'
            onClick={() => HandlePlayerClick(player)}
            style={{ backgroundColor: currPlayer?.id === player.id ? 'pink' : 'white' }} >
              <img src={player.class.imgUrl} alt={player.class.name} className='class-img'></img>
              <div>
                <h3 className='no-margin'>
                  {player.name}
                </h3>
                <h5 className='no-margin'>
                  {player.class.name}
                </h5>
              </div>
            </div>
          ))}
        </div>
        <br />
        <button type="button" onClick={HandleModalClick}>
          + Add Player
        </button>
        <Modal show={isModalOpen} handleClose={handleCloseModal} handleAddPlayer={addPlayer}/>
      </div>
      <div>
          <PointDivider currPlayer={currPlayer} setCurrPlayer={setCurrPlayer} setPlayers={setPlayers} players={players}/>
      </div>
    </div>
  );
};


function AddPlayerForm(props: {closeModal: () => void, addPlayer: (name: string, className: string) => void}) {
  const [playerName, setPlayerName] = useState('');
  const [playerClass, setPlayerClass] = useState('');

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    props.addPlayer(playerName, playerClass);

    setPlayerName("");
    setPlayerClass("");

    event.target.reset();
    props.closeModal();
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)} className='modal-main'>
      <label>
        Player Name: &nbsp; &nbsp; &nbsp;
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter name"
          required
        />
      </label>
      <label>
      Pick a class: &nbsp; &nbsp; &nbsp;
        <select 
          id="select-bitch"
          required 
          onChange={(e) => setPlayerClass(e.target.value)}
          defaultValue={playerClass}
          >
          <option value="" disabled hidden>-- Select an option --</option>
          <option value="warrior">Warrior</option>
          <option value="wizard">Wizard</option>
          <option value="archer">Archer</option>
          <option value="assassin">Assassin</option>
          <option value="paladin">Paladin</option>
          <option value="captain">Captain</option>
        </select>
      </label>
      <button type="submit">Add Player</button>
    </form>
  );
};

const Modal = (props: { show: boolean, handleClose: () => void, handleAddPlayer: (name: string, className: string) => void }) => {
  const showHideClassName = props.show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <button id="close-button" type="button" onClick={props.handleClose}>X</button>
        <AddPlayerForm closeModal={props.handleClose} addPlayer={props.handleAddPlayer}/>
    </div>
  );
};


export default App;
