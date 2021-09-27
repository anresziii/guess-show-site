import { Button } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import axios from "axios"
import "./style/App.css"
import { IMovie } from './types/types'

interface IFunction {
  result: any[]
}

const App: FC<IFunction> = () => {
  let [lives, setLives] = useState<number>(3)
  const [movie, setMovie] = useState<IMovie | null>(null)
  const [word, setWord] = useState<string>("")
  let timeWord = ""

  useEffect(() => {
    fetchMovie()
  }, [])

  async function fetchMovie() {
    try {
      const response = await axios.get<IMovie>("https://api.themoviedb.org/4/list/1?api_key=444c52fd849cb709c3c163664ef393b8")
      setMovie(response.data)
      console.log(movie?.results.map(result => console.log(result.overview)))
    } catch (e) {
      alert(e) 
    }
  }

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