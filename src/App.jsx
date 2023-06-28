import { useState } from 'react'
import './App.css'
import Home from './Home'
import Questions from './Questions'
import Profile from './Profile'
import Answers from './Answers'

const App = () => {
    const [ token, setToken ] = useState("")

    if(!token) {
    return (
    <>
        <Home updateToken={setToken}/>
            <Questions token={token} />
            <Answers token={token} />
    </>
    )
}

    return (
    <>
    <Home updateToken={setToken} />
    <Questions token={token} />
    <Answers token={token} />
    </>
)
}

export default App
    
    
    
    
    
    
    
    
    
//   return (
//     <>
//       <Home setToken={setToken} />
//       {token && (
//         <>
//           <Questions token={token} />
//           <Answers token={token} />
//         </>
