import { useState } from 'react'
import './App.css'
import Home from './Home'
import Questions from './Questions'
import Profile from './Profile'
import Answers from './Answers'

const App = () => {
  const [ token, setToken ] = useState("")

  if(!token) {
    return <Questions token={token} />
  }

  return (
    <>
      <Home setToken={setToken} />
      <Questions token={token} />
    </>
  )
}

export default App