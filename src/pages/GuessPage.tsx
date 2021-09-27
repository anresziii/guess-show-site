import { Button } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import "../style/App.css"
import { IMovie } from '../types/types'
import axios from "axios"

const GuessPage: FC = () => {
    const [word, setWord] = useState<string>("")
    let timeWord = ""
    const [movie, setMovie] = useState<IMovie | null>(null)
    let [lives, setLives] = useState<number>(3)

    const checkLives = () => {
        timeWord = word
        if (timeWord === "lives") {
            setLives(lives - 1)
        }
    }

    useEffect(() => {
        fetchMovie()
    }, [])

    async function fetchMovie() {
        try {
            const response = await axios.get<IMovie>("https://api.themoviedb.org/4/list/1?api_key=444c52fd849cb709c3c163664ef393b8")
            setMovie(response.data)
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div>
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
                    <Button variant="contained" onClick={() => {
                        checkLives()
                        setWord("")
                    }}>Send</Button>
                </div>
                <Button variant="contained" onClick={() => console.log(timeWord)}>Hint</Button>
            </div>
        </div>
    )
}

export default GuessPage
