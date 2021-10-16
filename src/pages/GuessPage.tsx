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
    const [idPage, setIdPage] = useState<number>(0)
    const [idPageView, setIdPageView] = useState<number>(1)
    const [modal, setModal] = useState(false)
    const [modalTwo, setModalTwo] = useState(false)
    const [keyBoard, setKeyBoard] = useState("")
    const [value, setValue] = useState<any>({})
    const [word, setWord] = useState<string>("")
    const [lives, setLives] = useState<number>(3)
    const [arrayMovie, setArrayMovie] = useState<string[]>([])
    const [idLetter, setIdLetter] = useState<number>(0)
    const [indexArray, setIndexArray] = useState<number[]>([])
    const nameMovie = data.results[idPage].title
    const hintMovie = data.results[idPage].overview
    const arrayNameMovie = nameMovie.split(" ").join("").split("");

    const checkLives = () => {
        const nameWord = arrayMovie.join("")
        setWord(nameWord)
        console.log(word)
        console.log(nameMovie)
        if (word === nameMovie) {
            setIdPage(idPage + 1)
            setIdPageView(idPageView + 1)
            const idPageX = idPageView + 1
            router.push(`/guess/${idPageX}`)
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

    const refresh = () => {
        setValue({});
    }

    const sortArrays = () => {
        for (let i = 3; i >= 0; i--) {
            const randomIndex = Math.floor(Math.random() * arrayNameMovie.length)
            if (randomIndex in indexArray) {
                const randomIndex = Math.floor(Math.random() * arrayNameMovie.length)
                arrayNameMovie.splice(randomIndex, 1, " ")
                indexArray.push(randomIndex)
            } else {
                arrayNameMovie.splice(randomIndex, 1, " ")
                indexArray.push(randomIndex)
            }
        }
        indexArray.sort(function (a: any, b: any) {
            return a - b;
        })
        setArrayMovie(arrayNameMovie)
    }

    useEffect(() => {
        sortArrays()
    }, [])

    useEffect(() => {
        const getKey = (e: any) => {
            const key = e.key
            let count = 0
            for (let i = 65; i <= 90; i++) {
                if (key.toUpperCase() == String.fromCharCode(i)) {
                    count = 1
                } else if (key.toLowerCase() == "backspace") {
                    count = 10
                }
            }
            if (count == 1) {
                if (idLetter <= 3) {
                    arrayMovie.splice(indexArray[idLetter], 1, key)
                    setIdLetter(idLetter + 1)
                    console.log(idLetter)
                    console.log(indexArray[idLetter])
                }
            } else if (count == 10) {
                if (idLetter >= 1) {
                    setIdLetter(idLetter - 1)
                    arrayMovie.splice(indexArray[idLetter], 1, "")
                    console.log(idLetter)
                    console.log(indexArray[idLetter])
                }
            }
            setKeyBoard(key)
        }
        document.addEventListener("keydown", getKey)
        return () => {
            document.removeEventListener("keydown", getKey);
        }
    }, [idLetter])

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
                    {arrayMovie.map((letter: any) =>
                        <LettersView letters={letter} props={undefined} />
                    )}
                    <div className="button__send">
                        <Button variant="contained" onClick={() => {
                            checkLives()
                            refresh()
                        }}>Send</Button>
                    </div>
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
                    <Button variant="contained" onClick={() => window.location.reload()}>Restart</Button>
                </MyModalTwo>
            </div>
        </div>
    )
}

export default GuessPage