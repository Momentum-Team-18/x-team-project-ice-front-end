import { useState } from 'react'
import './App.css'
import Home from './Home'

function App() {
  const isLoggedIn = false

  if(!isLoggedIn) {
    return <Home />
  }
  return (
    <>
      <h1>Hello World</h1>
    </>
  )
}

export default App
