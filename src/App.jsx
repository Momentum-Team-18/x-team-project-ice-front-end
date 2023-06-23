import { useState } from 'react'
import './App.css'
import Home from './Home'
import Questions from './Questions'

const App = () => {
  const [ token, setToken ] = useState("")

  if(!token) {
    return <Home setToken={setToken} />
  }

  return (
    <>
      <Questions />
    </>
  )
}

export default App