import { Divider, message } from 'antd';
import React, { useState } from 'react';
import logo from "../../assets/logo.png";
import "./signin.css";

import api from "../../connection/api";

export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loadingAuth, setLoadingAuth] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email !== '' && password !== '') {
            logIn(email, password);
        } else {
            return message.error('Valores vazios')
        }
    }


    async function logIn(email, password) {
        setLoadingAuth(true);

        try {
            const response = await api.post('/login', { email, password });
            const data = response.data[0];
            const idUser = data.id;
            const nameUser = data.name;
            const emailUser = data.email;
            localStorage.setItem('token', idUser);
            localStorage.setItem('id', idUser);
            localStorage.setItem('name', nameUser);
            localStorage.setItem('email', emailUser);
            message.success(`Bem vindo de volta ${data.name}!`);

            setTimeout(() => {
                window.location.reload();
                setLoadingAuth(false);
            }, 2000);

        } catch (err) {
            console.log(err);
            message.error('Ops algo deu errado!');
            setLoadingAuth(false);
        }
    }

    const sendEnter = (e) => {
        if (email !== '' && password !== '') {
            if (e.key === 'Enter') {
                e.preventDefault();
                logIn(email, password);
            }
        } else {
            return message.error('Valores vazios')
        }
    }

    return (
        <div className="container">
            <div className="container-left">
                <img src={logo} width='250' height='250' alt="logo" />
            </div>
            <div className="container-right">
                <div className='enter-login'>
                    <h1 className='title-default-login'>Entrar</h1>
                    <Divider style={{ backgroundColor: "rgb(255, 192, 70)", width: "156px" }} />
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type='email'
                        placeholder='Digite seu email'
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <input
                        type='password'
                        placeholder='*********'
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <button type='submit' onClick={handleSubmit} onKeyDown={sendEnter}>{loadingAuth ? 'Carregando...' : 'Acessar'}</button>
                </form>
            </div>
        </div>
    );
}