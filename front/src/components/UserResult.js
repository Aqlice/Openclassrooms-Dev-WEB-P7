import React, { useEffect, useState } from 'react'
import axios from 'axios'
import avatar from "../image/avatar.png"
import Comments from "./Comments"
import getAllPosts from "../pages/Home"
import heart from "../image/icons/heart.svg"
import { NavLink } from 'react-router-dom'

function UserResult({ fname, name, mail, pic, UID }) {


    const userId = JSON.parse(localStorage.userId)
    const token = JSON.parse(localStorage.token)
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
