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
    const nameMovie = data.results[props.idpage].title
    const [indexArray, setIndexArray] = useState<number[]>([])
    const arrayNameMovie = nameMovie.split(" ").join("").split("");

    document.addEventListener("keydown", function getKey(e) {
        const keyArray = [e.key]
        setKeyBoard(keyArray[0])
        arrayMovie.push(keyArray[0])
        console.log(indexArray.sort(function (a: any, b: any) {
            return a - b;
        }))
        document.removeEventListener("keydown", getKey);
    })

    useEffect(() => {
        for (let i = 2; i >= 0; i--) {
            const randomIndex = Math.floor(Math.random() * arrayNameMovie.length)
            arrayNameMovie.splice(randomIndex, 1, " ")
            indexArray.push(randomIndex)
            setArrayMovie(arrayNameMovie)
        }
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