<<<<<<< HEAD
import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import './styles.css'

import CarPool from './components/carpool/CarPool'
import Header from './components/carpool/Header'
import SignUp from './components/signup/SignUp'
import Login from './components/login/Login'
import Profile from './components/profile/Profile'
import { AppContext } from './AppContext'

const App = () => {  

  const { user } = useContext(AppContext)

  
  if (user === null) {
  return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </div>
    )
  }

  if (user !== null) {
    return (
      <div className='app-container'>    
        <Router>
          <Routes>
            <Route path="/" element={<><Header /><CarPool /></>} />
            <Route path="/profile" element={<Profile />}/>
          </Routes>
        </Router>
      </div>
    )
  }
}

export default App


=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
>>>>>>> 8325f8ade864eee6e7af0bc46d995d5e52c6960b
