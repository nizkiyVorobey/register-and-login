import React, { useState, useContext } from 'react';
import { useHTTP } from '../hooks/http.hooks';
import { AuthContext } from '../context/authContext';

export const AuthPage = () => {
    const { request, loading, error } = useHTTP();
    const auth = useContext(AuthContext)

    const [form, setForm] = useState({
        emailOrLogin: '',
        password: ''
    })

    const [registerForm, setRegisterForm] = useState({
        email: '',
        userName: '',
        password: ''
    })


    const handleForm = (name, value) => {
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleLogin = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', JSON.stringify({...form}), { 'Content-Type': 'application/json' })

            auth.login(data.token, data.user['_id']);
            // console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleRegisterForm = (name, value) => {
        setRegisterForm({
            ...registerForm,
            [name]: value
        })
    }

    const handleRegister = async () => {
        const formData = new FormData()
        const field  = document.querySelector('#register-avatar');

        formData.append("avatar", field.files[0]);
        formData.append("email", registerForm.email);
        formData.append("userName", registerForm.userName);
        formData.append("password", registerForm.password);

        try {

            const data = await request('/api/auth/register', 'POST', formData)

            const loginData = await {
                emailOrLogin: data.user.email || data.user.userName ,
                password: registerForm.password
            }

            const loginRequest = await request('/api/auth/login', 'POST', JSON.stringify({...loginData}), { 'Content-Type': 'application/json' })
            auth.login(loginRequest.token, loginRequest.user['_id']);

        } catch (err) {
            console.log(err);
        }
    }

    const hest = () => {
        const field  = document.querySelector('#register-avatar');
        console.log(field.files[0]);
    }

    return (
        <div>
            <div className="form-item">
                <label htmlFor="email"> Email or login </label>
                <input id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleForm('emailOrLogin', e.target.value)}
                />
            </div>

            <div className="form-item">
                <label htmlFor="password"> Pssword </label>
                <input id="password"
                    type="password"
                    value={form.password}
                    onChange={(e) => handleForm('password', e.target.value)}
                />
            </div>

            <button onClick={handleLogin} > LOIGN </button>

            <div className="form-item">
                <label htmlFor="register-email" > Email </label>
                <input id="register-email"
                    type="email"
                    value={registerForm.email}
                    onChange={(e) => handleRegisterForm('email', e.target.value)}
                />
            </div>
            <div className="form-item" >
                <label htmlFor="register-userName" > userName </label>
                <input id="register-userName"
                    type="text"
                    value={registerForm.userName}
                    onChange={(e) => handleRegisterForm('userName', e.target.value)}
                />
            </div>
            <div className="form-item">
                <label htmlFor="register-password"> Pssword </label>
                <input id="register-password"
                    type="password"
                    value={registerForm.password}
                    onChange={(e) => handleRegisterForm('password', e.target.value)}
                />
            </div>

            <div className="form-item">
                <label htmlFor="register-avatar"> avatar </label>
                <input id="register-avatar"
                    type="file"
                    onChange={hest}
                />
            </div>


            <button onClick={handleRegister}> REGISTER </button>
        </div>
    )
}