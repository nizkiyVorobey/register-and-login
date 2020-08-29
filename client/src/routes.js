import React from 'react';
import {Switch, BrowserRouter, Route, Redirect} from 'react-router-dom'
import { MainPage } from './pages/Main'
import { AuthPage } from './pages/Auth'

export const routers = (isAuthentificated) => {
    if (isAuthentificated) {
        return (
            <Switch>
                <Route to="/" exact>
                    <MainPage />
                </Route>
            </Switch>
        )
    }

    return (
        <Switch>
             <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/"/> 
        </Switch>
    )
}