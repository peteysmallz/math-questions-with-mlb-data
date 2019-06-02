import React, { useState, useEffect } from 'react';

import { fetchPlayerInfo, fetchPlayerStats, fetchTeamRoster } from './mlb/api';

import './App.css';

function App() {
  const [player, setPlayer] = useState('Jose');
  const [playerStats, setPlayerStats] = useState([]);
  const [answer, setAnswer] = useState();
  const [mark, setMark] = useState();
  const [questionCount, setNewQuestionCount] = useState(0);
  const [questionId, setQuestionId] = useState('');

  useEffect(() => {
    async function fetchData() {
      const playerId = await getRandomPlayerId();
      const result = await fetchPlayerInfo(playerId);
      setPlayer(result);

      const stats = await fetchPlayerStats(playerId);
      setPlayerStats(stats);
    }
    
    fetchData();
  }, [questionId]);

  async function getRandomPlayerId() {
    const roster = await fetchTeamRoster()
    const randomNumber = Math.floor(Math.random() * roster.length) + 1
    return roster[randomNumber].player_id
  }

  const handleChangeAnswer = event => {
    setAnswer(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    const correctAnswer = (playerStats.atBats/playerStats.homeRuns).toFixed(1);
    
    if (answer === correctAnswer) {
      setMark('success')
      setNewQuestionCount(questionCount + 1)
      // Post points to the user table
    } else {
      setMark('Incorrect, try again')
      // Remove points from the user table
    }
  }

  const generateNewQuestion = () => { 
    setMark('');
    setAnswer('');
    setQuestionId(() => Math.floor((Math.random() * 100000) + 1));
  };

  return (
    <div className="App">
      <header className="App-header">
        {questionId}
        <p>This year {player.fullName} has {playerStats.atBats} at bats, he has {playerStats.homeRuns} home runs.</p>
        <p>On average, how many at bats per home run? (Round to 1 decimal place)</p>
      <form onSubmit={handleSubmit}>
        Answer:
        <br />
        <input
          type="text"
          value={answer}
          onChange={handleChangeAnswer}
        />
        <input 
          type="submit" 
          value="Submit" 
          style={{ display: mark === 'success' ? "none" : "inline" }}/>
      </form>

      <p>{mark}</p>

      <button 
        onClick={generateNewQuestion}
        style={{ display: mark === 'success' ? "block" : "none" }}
      >Next Question</button>

      <p>Questions Completed: {questionCount}</p>

      </header>
    </div>
  );
}

export default App;
