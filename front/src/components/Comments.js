import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import avatar from "../image/avatar.png"

function Comments({ id, comment, comUserId, date, fname, getComments }) {
    const token = JSON.parse(localStorage.token)
    const userId = JSON.parse(localStorage.userId)
    const [name, setname]= useState('')
	const [mail, setmail] = useState('')
	const [imageProfile, setImageProfile ]= useState('')
	const [admin, setAdmin] = useState(0)
    const [postFname, setPostfname] = useState('')
    console.log(id)
    console.log(fname)

    const getUser = () => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}api/auth/${comUserId} `,

            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res);
            if (res.data.name)
                setname(res.data.name);
            if (res.data.fname)
                setPostfname(res.data.fname);
            if (res.data.mail)
                setmail(res.data.mail);
            setAdmin(res.data.admin)
            setImageProfile(res.data.pic)
            window.location = `/account/${comUserId}`
            if (res.data.error) {
                console.log("ici", res.data.errors)

            }
        })
            .catch((err) => {
                console.log(err);
            });

    };

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

            <li onClick={getUser} id="showProfil" className="active-btn">posté par {fname}</li>
            <p>posté par {fname}</p>
            <p>{comment}</p>
            {
        comUserId === userId ? (
            <li onClick={deleteCom} id="delete-com" className="active-btn">supprimer</li>)
        : ("")
    }
        </div >
    )
}

export default Comments

