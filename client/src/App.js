import React, { useState } from 'react';
import './App.css';
import { useAuth } from './hooks/useAuth.hooks';
import { BrowserRouter } from 'react-router-dom';
import { routers } from './routes';
import { AuthContext } from './context/authContext';


function App() {
    const { token, login, logout, userId } = useAuth();
    const isAuthentificated = !!token;
    const routes = routers(isAuthentificated);

    return (
        <AuthContext.Provider value={{ login, logout, token, isAuthentificated }}>
            <BrowserRouter>
                {routes}
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;