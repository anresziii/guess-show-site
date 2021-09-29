import React, { FC } from 'react'
import cl from './MyModalTwo.module.css'

interface modalObject {
    children: any 
    visible: boolean
    setVisible: any
}

const MyModalTwo: FC<modalObject> = ({ children, visible, setVisible }) => {

    const rootClasses = [cl.myModal]
    if (visible) {
        rootClasses.push(cl.active)
    }

    return (
        <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
            <div className={cl.myModalContent} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default MyModalTwo;