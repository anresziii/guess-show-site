import { Button } from '@mui/material'
import React, { FC, useState } from 'react'
import "../style/App.css"
import { useHistory } from "react-router-dom"
import MyModal from '../components/ui/modal/MyModal'

const StartPage: FC = () => {
    const router = useHistory()
    const [modal, setModal] = useState(false)

    return (
        <div>
            <div className="app__up">
                <div className="up__title">Guess the Film</div>
                <div className="up__subtitle">Find the hidden letters</div>
            </div>
            <hr />
            <div className="app__down">
                <div className="button__start">
                    <Button variant="contained" onClick={() => router.push("/guess")}>Start</Button>
                </div>
                <div className="hint__block">
                    <MyModal visible={modal} setVisible={setModal}>
                        Wrong Answer: {localStorage.getItem("wrongAnswer")} <br />
                        Right Answer: {localStorage.getItem("rightAnswer")}
                    </MyModal>
                </div>
                <Button variant="contained" onClick={() => setModal(true)}>Stats</Button>
            </div>
        </div>
    )
}

export default StartPage

