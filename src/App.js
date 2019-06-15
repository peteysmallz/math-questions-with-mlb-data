import React, { useState, useEffect } from 'react';

import { fetchPlayerInfo, fetchPlayerStats, fetchTeams, fetchTeamRoster } from './services/mlb/api';
import { getRandomPlayerId, getRandomRosterId } from './services/mlb/util';


import './App.css';

function App() {
  const [player, setPlayer] = useState('Jose')
  const [playerStats, setPlayerStats] = useState([])
  const [answer, setAnswer] = useState()
  const [mark, setMark] = useState()
  const [questionCount, setNewQuestionCount] = useState(0)
  const [questionId, setQuestionId] = useState('')
  let correctAnswer;

  useEffect(() => {
    async function fetchData() {
      const playerId = await getRandomPlayerId()
      const result = await fetchPlayerInfo(playerId)
      setPlayer(result)

      const stats = await fetchPlayerStats(playerId)
      setPlayerStats(stats)
    }
    
    fetchData();
  }, [questionId])

  const handleSetAnswer = event => {
    setAnswer(event.target.value)
  }

  const hitterAnswer = () => {
    return (playerStats.atBats/playerStats.homeRuns).toFixed(1)
  }

  const pitcherAnswer = () => {
    return (playerStats.atBats/playerStats.homeRuns).toFixed(1)
  }

  const getCorrectAnswer = () => {
    let correctAnwer;
    if (isPitcher()) {
      correctAnswer = pitcherAnswer()
    } else {
      correctAnswer = hitterAnswer()
    }
    return correctAnswer;
  }


  const handleSubmit = event => {
    event.preventDefault()

    const correctAnswer = getCorrectAnswer()
    
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
    setMark('')
    setAnswer('')
    setQuestionId(() => Math.floor((Math.random() * 100000) + 1))
  }

  const isPitcher = () => playerStats.era ? true : false;

  return (
    <div className="App">
      
      <header className="App-header">
      <img width="1600" src={`https://securea.mlb.com/images/players/action_shots/${player.id}.jpg`} />

      { 
          !isPitcher() ? (
            <div>
              <p>This year {player.fullName} has {playerStats.atBats} at bats, he has {playerStats.homeRuns} home runs.</p>
              <p>On average, how many at bats per home run?</p>
            </div>
          ) : (
            <div>
              <p>This year {player.fullName} has thrown {playerStats.numberOfPitches} pitches, he has thrown {playerStats.strikes} strikes.</p>
              <p>What percentage of the pitches have been strikes?</p>
            </div>
          )
      }

      <div>
        <p>(Round to one decial place)</p>
      </div>

      <p>anser: {getCorrectAnswer()}</p>


      <form onSubmit={handleSubmit}>
        Answer:
        <br />
        <br />  
        <input
          type="text"
          value={answer}
          onChange={handleSetAnswer}
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
  )
}

export default App;
