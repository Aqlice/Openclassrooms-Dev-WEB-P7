import React, { useState } from 'react';
import axios from "axios";

function SignInForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {

        e.preventDefault();
        const passwordError = document.querySelector(".password .error");

        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/auth/signin`,
            data: {
                mail: email,
                password: password,
            },
        })
            .then((res) => {
                console.log(res);
                if (res.data.error) {
                    passwordError.innerHTML = res.data.error;
                } else {
                    localStorage.token = JSON.stringify(res.data.token);
                    localStorage.userId = JSON.stringify(res.data.userId)
                    console.log(localStorage)
                    window.location = "/home"
                }
            })
            .catch((err) => {
                console.log(err);
            });
        }


    return (
        <form action="" onSubmit={handleLogin} id="sign-in-form">
            <label htmlFor="email">Email</label>
            <br />
            <input type="text" name="email" id='email' onChange={(e) => setEmail
                (e.target.value)} value={email}></input>
            <div className='email-error'></div>
            <br />
            <label htmlFor='password'>Mot de passe</label>
            <br />
            <input type="password" name='password' id='password' onChange={(e) => setPassword
                (e.target.value)} value={password}></input>
            <div className='password error'></div>
            <br />
            <input type="submit" value="Se connecter"></input>
        </form>
    )
}


export default SignInForm;