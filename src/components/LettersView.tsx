import React, { useState, FC } from 'react'
import '../style/App.css'

interface ILetters {
    props: any
}

const LettersView: FC<ILetters> = (props) => {
    const [letter, setLetter] = useState<string>("")
    return (
        <div className="letters__block">
            <ul className="letters__list">
                <li>
                    <input type="text" className="letters__input" />
                </li>
            </ul>
        </div>
    )
}

export default LettersView
