import { Button } from '@mui/material'
import React, { FC, useState } from 'react'
import "../style/App.css"
import { useHistory } from "react-router-dom"

const StartPage: FC = () => {
    const router = useHistory()

    return (
        <div>   
            <div className="app__up">
                <div className="up__title">Guess the TV show</div>
                <div className="up__subtitle">Find the hidden letters</div>
            </div>
            <hr />
            <div className="app__down">
                <div className="button__send">
                    <Button variant="contained" onClick={() => router.push("/guess")}>Start</Button>
                </div>
                <Button variant="contained">Stats</Button>
            </div>
        </div>
    )
}

export default StartPage

