import React, { useContext } from 'react';
import {AuthContext} from '../context/authContext';

export const MainPage = (props) => {
    const auth = useContext(AuthContext);

    const handleLogout = () => {
        auth.logout()
    }

    return (
        <h1>
            MAIN PAGE

            <button onClick={handleLogout}>LOGOUT</button>
        </h1>
    )
}