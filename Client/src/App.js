import { useEffect, useState } from 'react';
import Game from './Components/Game';
import User from './Components/User';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useSelector } from 'react-redux';
import Alert from './Components/Alert';
import Leaderboard from './Components/Leaderboard';
import Header from './Components/Header';

function App() {
  // check if user is present in persistent redux 
  const user = useSelector(state => state.user.user);
  const [phase, setPhase] = useState(user ? "game" : "user")
  const [alert, setAlert] = useState()
  const [leaderboard, setLeaderboard] = useState(false)

  // remove pre existing value of alert everytime component renders 
  useEffect(() => {
    setAlert()
  }, [])

  return (
    <>
      <Header phase={phase} user={user} setPhase={setPhase} setLeaderboard={setLeaderboard}/>
      {leaderboard && <Leaderboard setLeaderboard={setLeaderboard} />}
      {alert && <Alert user={user} setAlert={setAlert} alert={alert} />}
      {phase === 'user' && <User setPhase={setPhase} />}
      {phase === 'game' && <Game user={user} setAlert={setAlert} alert={alert} />}
      {/* for notifications */}
      <ToastContainer theme='dark' autoClose={3000} position='top-center' />
    </>

  )
}
export default App;
