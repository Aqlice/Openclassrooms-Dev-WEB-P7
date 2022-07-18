import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

function UserResult({ fname, name, mail, pic, UID }) {

    return (
        <div className='user-presentation' id="showProfil2">
            <div className='image-container'>
                <NavLink to={`/account/${UID}`}>
                    <img src={pic} id="image" alt="image" />
                </NavLink>
            </div>
            <div id='user-info'>
            <p> nom: {name}</p>
            <p> Prenom: {fname}</p>
            <p>Contact: {mail}</p>
            </div>
        </div>
    )
}

export default UserResult
