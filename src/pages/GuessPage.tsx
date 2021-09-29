import { Button } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import "../style/App.css"
import { IMovie } from '../types/types'
import MyModal from '../components/ui/modal/MyModal'
import data from "../movie.json"
import MyHint from '../components/ui/hint/MyHint'
import { useHistory } from "react-router-dom"

const GuessPage: FC = () => {
    const [word, setWord] = useState<string>("")
    const [modal, setModal] = useState(false)
    let timeWord = ""
    const [movie, setMovie] = useState<IMovie | null>(null)
    let [lives, setLives] = useState<number>(3)
    const router = useHistory()

    useEffect(() => {
        localStorage.setItem("wrongAnswer", "0");
    }, [])

    const checkLives = () => {
        timeWord = word
        if (timeWord === "lives") {
            setLives(lives - 1)
            let wrongAnswerLocal = parseInt(JSON.parse(localStorage.getItem("wrongAnswer")!))
            wrongAnswerLocal += 1
            localStorage.setItem("wrongAnswer", wrongAnswerLocal.toString())
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
                <div className="hint__block">
                    <MyModal visible={modal} setVisible={setModal}>
                        <MyHint />
                    </MyModal>
                </div>
                <Button variant="contained" onClick={() => setModal(true)}>Hint</Button>
                <Button variant="contained" onClick={() => router.push("/home")}>Back</Button>
            </div>
        </div>
    )
}

export default GuessPage