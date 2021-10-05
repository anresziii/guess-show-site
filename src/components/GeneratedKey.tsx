import React, { FC, useState } from 'react'
import LettersView from './LettersView';
import data from "../movie.json"

interface IGenerated {
    props: any
    idpage: number
}

const GeneratedKey: FC<IGenerated> = (props) => {

    const [keyBoard, setKeyBoard] = useState("")
    const idPage: number = parseInt(JSON.parse(localStorage.getItem("idPage")!))
    const nameMovie = data.results[props.idpage].title
    const indexArray: number[] = []
    const arrayNameMovie = nameMovie.split(" ").join("").split("");

    const changeArrayNameMovie = () => {
        for (let i = 3; i >= 0; i--) {
            const randomIndex = Math.floor(Math.random() * arrayNameMovie.length)
            arrayNameMovie.splice(randomIndex, 1, " ")
            indexArray.push(randomIndex)
        }
        return arrayNameMovie
    }
    const newArrayNameMovie = changeArrayNameMovie()

    const getKey = (e: any) => {
        const key = e.key
        setKeyBoard(key)
        document.removeEventListener('keyup', getKey);
    }

    document.addEventListener("keyup", getKey)

    return (
        <div>
            {newArrayNameMovie.map((letter: any) =>
                <LettersView letters={letter} props={undefined} />
            )}
        </div>
    )
}

export default GeneratedKey
