import React, { useState, FC } from 'react'
import '../style/App.css'

interface ISettings {
    letters: any
}

interface ILetters {
    props: any
    letters: any
}

const LettersView: FC<ILetters> = (props) => {

    return (
        <div className="letters__block">
            <p className="letter__string">
                {props.letters}
            </p>
        </div>
    )
}

export default LettersView
