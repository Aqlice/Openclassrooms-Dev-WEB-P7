import React, { useState } from 'react';
import axios from "axios";

const SignUpForm = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    //const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = async (e) =>{
        e.preventDefault();
        const emailError = document.querySelector(".email.error");
        const passwordError = document.querySelector(".password.error");
        const lastNameError = document.querySelector(".last-name.error");
        const firstNameError = document.querySelector(".first-name.error");

        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
            data: {
              fname: firstName,
              name: lastName,
              mail: email,
              password: password,
            },
          })
            .then((res) => {
              console.log(res.data);
              if (res.data.errors) {
                firstNameError.innerHTML = res.data.errors.firstName;
                lastNameError.innerHTML = res.data.errors.lastName;
                emailError.innerHTML = res.data.errors.email;
                passwordError.innerHTML = res.data.errors.password;
              } else {
                console.log(localStorage)
                window.location = "/login"
              }
            })
            .catch((err) => console.log(err));
        }
     

    
    return (
        <form action="" onSubmit={handleSignUp} id="sign-up-form">
            
            <label htmlFor='first-name'>prenom</label>
            <br />
            <input type="text" name="first-name" id='first-name' onChange={(e) => setFirstName
                (e.target.value)} value={firstName}></input>
            <div className='first-name error'></div>
            <br />

            <label htmlFor='last-name'> nom</label>
            <br />
            <input type="text" name="last-name" id='last-name' onChange={(e) => setLastName
                (e.target.value)} value={lastName}></input>
            <div className='last-name error'></div>
            <br />
            
            <label htmlFor="email">Email</label>
            <br />
            <input type="text" name="email" id='email' onChange={(e) => setEmail
                (e.target.value)} value={email}></input>
            <div className='email error'></div>
            <br />
            
            <label htmlFor='password'>Mot de passe</label>
            <br />
            <input type="password" name='password' id='password' onChange={(e) => setPassword
                (e.target.value)} value={password}></input>
            <div className='password error'></div>
            <br />
            <input type="submit" value="S'inscrire"></input>
        </form>
    )
}


export default SignUpForm;

