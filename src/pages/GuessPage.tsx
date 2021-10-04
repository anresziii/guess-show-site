import { Button } from '@mui/material'
import { truncateSync } from 'fs'
import React, { FC, useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import LettersView from '../components/LettersView'
import MyModal from '../components/ui/modal/MyModal'
import MyModalTwo from '../components/ui/modalTwo/MyModalTwo'
import data from "../movie.json"
import "../style/App.css"

const GuessPage: FC = () => {
    const router = useHistory()
    const [word, setWord] = useState<string>("")
    const [modal, setModal] = useState(false)
    const [modalTwo, setModalTwo] = useState(false)
    const [lives, setLives] = useState<number>(3)
    const [idPage, setIdPage] = useState<number>(1)
    const [keyBoard, setKeyBoard] = useState("")
    const nameMovie = data.results[idPage].title
    const hintMovie = data.results[idPage].overview
    const indexArray: number[] = []
    const arrayNameMovie = nameMovie.split(" ").join("").split("");

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

    document.addEventListener("keydown", e => {
        const key = e.key
        setKeyBoard(key)
    })

    const changeArrayNameMovie = () => {
        for (let i = arrayNameMovie.length / 3; i >= 0; i--) {
            const randomIndex = Math.floor(Math.random() * arrayNameMovie.length)
            arrayNameMovie.splice(randomIndex, 1, " ")
            indexArray.push(randomIndex)
        }
        return arrayNameMovie
    }
    const newArrayNameMovie = changeArrayNameMovie()

    return (
        <div>
            <div className="app__up">
                <div className="up__title">Guess the Film</div>
                <div className="up__subtitle">Find the hidden letters</div>
            </div>
            <hr />
            <div className="app__down">
                <h3>Theme: {data.name}</h3>
                <div className="down__lives">Your lives: {lives}</div>
                <div className="down__word">
                    {newArrayNameMovie.map(letter =>
                        <LettersView letters={letter} props={letter} />
                    )}
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