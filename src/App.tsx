import React, { FC } from 'react'
import StartPage from './pages/StartPage'
import "./style/App.css"
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import GuessPage from './pages/GuessPage'

const App: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home">
          <StartPage />
        </Route>
        <Route path="/guess">
          <GuessPage />
        </Route>
        <Redirect to="/home" />
      </Switch>
    </BrowserRouter>
  )
}
export default App