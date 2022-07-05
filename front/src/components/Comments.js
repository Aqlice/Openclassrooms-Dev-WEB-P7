import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import avatar from "../image/avatar.png"

function Comments({ id, comment, comUserId, date, fname, getComments }) {
    const token = JSON.parse(localStorage.token)
    const userId = JSON.parse(localStorage.userId)
    console.log(id)
    const deleteCom = () => {
        axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_API_URL}api/posts/com/${id} `,
            headers: {
                authorization: `Bearer ${token}`
            },
        })
            .then((res) => {
                if (res.data.error)
                    console.log(res.data.error)
                getComments()
            })
            .catch((err) => {
                console.log(err)
            }
            )
    }

    return (
        <div className="comment-box">

            <p>posté par {fname}</p>
            <p>{comment}</p>
            {comUserId === userId ? (
                <li onClick={deleteCom} id="delete-com" className="active-btn">supprimer</li>)
                : ("")
            }
        </div>
    )
}

export default Comments

