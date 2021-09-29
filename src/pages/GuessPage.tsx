import { Button } from '@mui/material'
import React, { FC, useContext, useEffect, useState } from 'react'
import "../style/App.css"
import { IMovie } from '../types/types'
import MyModal from '../components/ui/modal/MyModal'
import data from "../movie.json"
import { useHistory } from "react-router-dom"
import MyModalTwo from '../components/ui/modalTwo/MyModalTwo'

const GuessPage: FC = () => {
    let limit = 10
    const router = useHistory()
    const [word, setWord] = useState<string>("")
    const [modal, setModal] = useState(false)
    const [modalTwo, setModalTwo] = useState(false)
    const [lives, setLives] = useState<number>(3)
    const [idPage, setIdPage] = useState<number>(1)
    const nameMovie = data.results[idPage].title
    const hintMovie = data.results[idPage].overview

    const checkLives = () => {
        setWord(word)
        if (word === nameMovie) {
            setIdPage(idPage + 1)
            setLives(3)
            let rightAnswerLocal = parseInt(JSON.parse(localStorage.getItem("rightAnswer")!))
            rightAnswerLocal += 1
            localStorage.setItem("rightAnswer", rightAnswerLocal.toString())
        } else {
            setLives(lives - 1)
            let wrongAnswerLocal = parseInt(JSON.parse(localStorage.getItem("wrongAnswer")!))
            wrongAnswerLocal += 1
            localStorage.setItem("wrongAnswer", wrongAnswerLocal.toString())
        }
        if (lives == 1) {
            setModalTwo(true)
        }
    }

    return (
        <div>
            <div className="app__up">
                <div className="up__title">Guess the Film</div>
                <div className="up_subtitle">Find the hidden letters</div>
            </div>
            <hr />
            <div className="app__down">
                <h3>{data.name}</h3>
                <div className="down__lives">Your lives: {lives}</div>
                <div className="down__word">
                    <input type="text" placeholder={nameMovie} value={word} onChange={(e) => setWord(e.target.value)} />
                </div>
                <div className="button__send">
                    <Button variant="contained" onClick={() => {
                        checkLives()
                        setWord("")
                    }}>Send</Button>
                </div>
                <div className="hint__block">
                    <MyModal visible={modal} setVisible={setModal}>
                        {hintMovie}
                    </MyModal>
                </div>
                <div className="hint__button">
                    <Button variant="contained" onClick={() => setModal(true)}>Hint</Button>
                </div>
                <Button variant="contained" onClick={() => router.push("/home")}>Back</Button>
                <MyModalTwo visible={modalTwo} setVisible={setModalTwo}>
                    Text
                </MyModalTwo>
            </div>
        </div>
    )
}

export default GuessPage