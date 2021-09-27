import { Button } from '@mui/material'
import React, { useState } from 'react'
import "./style/App.css"

const App = () => {
  let [lives, setLives] = useState(3)
  const [word, setWord] = useState("")
  let timeWord = ""

  const checkLives = () => {
    timeWord = word
    if (timeWord === "lives") {
      setLives(lives - 1)
    }
  }

  return (
    <div className="app">
      <div className="app__up">
        <div className="up__title">Guess the TV show</div>
        <div className="up_subtitle">Find the hidden letters</div>
      </div>
      <hr />
      <div className="app__down">
        <div className="down__lives">Your lives: {lives}</div>
        <div className="down__word">
          <input type="text" placeholder="word" value={word} onChange={(e) => setWord(e.target.value)} />
        </div>
        <div className="button__send">
          <Button variant="contained" onClick={() => checkLives()}>Send</Button>
        </div>
        <Button variant="contained" onClick={() => console.log(timeWord)}>Hint</Button>
      </div>
    </div>
  )
}

export default App