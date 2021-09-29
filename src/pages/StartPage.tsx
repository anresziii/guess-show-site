import { Button } from '@mui/material'
import React, { FC, useState } from 'react'
import "../style/App.css"
import { useHistory } from "react-router-dom"
import MyModal from '../components/ui/modal/MyModal'
import MyHint from '../components/ui/hint/MyHint'

const StartPage: FC = () => {
    const router = useHistory()
    const [modal, setModal] = useState(false)

    return (
        <div>
            <div className="app__up">
                <div className="up__title">Guess the TV show</div>
                <div className="up__subtitle">Find the hidden letters</div>
            </div>
            <hr />
            <div className="app__down">
                <div className="button__send">
                    <Button variant="contained" onClick={() => router.push("/guess/1")}>Start</Button>
                </div>
                <div className="hint__block">
                    <MyModal visible={modal} setVisible={setModal}>
                        Wrong Answer: {localStorage.getItem("wrongAnswer")}
                    </MyModal>
                </div>
                <Button variant="contained" onClick={() => setModal(true)}>Stats</Button>
            </div>
        </div>
    )
}

export default StartPage

