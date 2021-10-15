import React, { FC, useState, useMemo, useEffect } from 'react'
import LettersView from './LettersView';
import data from "../movie.json"

interface IGenerated {
    props: any
    idpage: number
}

const GeneratedKey: FC<IGenerated> = (props) => {

    const [keyBoard, setKeyBoard] = useState("")
    const [arrayMovie, setArrayMovie] = useState<string[]>([])
    const idPage = props.idpage
    const nameMovie = data.results[idPage].title
    const [idLetter, setIdLetter] = useState<number>(0)
    const [indexArray, setIndexArray] = useState<number[]>([])
    const arrayNameMovie = nameMovie.split(" ").join("").split("");

    const getKey = (e: any) => {
        const key = e.key
        let count = 0
        console.log(key)
        for (let i = 65; i <= 90; i++) {
            if (key.toUpperCase() == String.fromCharCode(i)) {
                count = 1
            } else if (key.toLowerCase() == "backspace") {
                count = 10
            }
        }
        console.log(count)
        if (count == 1) {
            indexArray.sort(function (a: any, b: any) {
                return a - b;
            })
            arrayMovie.splice(indexArray[idLetter], 1, key)
            console.log("test")
            setIdLetter(idLetter + 1)
        } else if (count == 10) {
            if (idLetter >= 1) {
                setIdLetter(idLetter - 1)
                arrayMovie.splice(indexArray[idLetter], 1, "")
            }
        }
        setKeyBoard(key)
        document.removeEventListener("keydown", getKey);
    }

    document.addEventListener("keydown", getKey)

    useEffect(() => {
        for (let i = 3; i >= 0; i--) {
            const randomIndex = Math.floor(Math.random() * arrayNameMovie.length)
            arrayNameMovie.splice(randomIndex, 1, " ")
            indexArray.push(randomIndex)
        }
        setArrayMovie(arrayNameMovie)
    }, [])

    return (
        <div>
            {arrayMovie.map((letter: any) =>
                <LettersView letters={letter} props={undefined} />
            )}
        </div>
    )
}

export default GeneratedKey