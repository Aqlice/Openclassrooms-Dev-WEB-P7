import React,  { useState } from 'react';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
console.log("ici1");

function Log() {
    //console.log("ici2");
    const[signUpModal, setSignUpModal] = useState(false);
    const[signInModal, setSignInModal] = useState(true);
    
    const handleModals = (e) =>{
        if (e.target.id === "sign-up"){
            setSignInModal(false);
            setSignUpModal(true);
        }
        else if (e.target.id === "login"){
            setSignInModal(true);
            setSignUpModal(false);
        }
    }
   
    return(
        
        <div className='connexion-form'>
            <div className='form-container'>
                <ul>
                    <li onClick={handleModals} id="sign-up" className={signUpModal ? "active-btn" : null}>Inscription</li>
                    <li onClick={handleModals} id="login" className={signInModal ? "active-btn" : null}>Se connecter</li>
                </ul>
                {signUpModal && <SignUpForm />}
                {signInModal && <SignInForm />}
            </div>
        </div>
    )
}

export default Log;