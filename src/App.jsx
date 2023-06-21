import { useState } from 'react'
import './App.css'
import Home from './Home'

const App = () => {
  // const isLoggedIn = false
  const [ token, setToken] = useState("")

  if(!token) {
    return <Home setToken={setToken} />
  }
  // if(!isLoggedIn) {
  //   return <Home />
  // }
  return (
    <>
      <h1>Hello World</h1>
    </>
  )
}

export default App
