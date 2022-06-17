import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom"
import axios from 'axios'
import avatar from "../image/avatar.png"
import Poster from './Poster'

function Posts({ key, fname, message, postUserId, postId, date }) {
    const token = JSON.parse(localStorage.token)
    const userId = JSON.parse(localStorage.userId)
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState('')

    const deletePost = () => {
        axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_API_URL}api/posts/${postId} `,
            headers: {
                authorization: `Bearer ${token}`
            },
        })
            .then((res) => {
                setPosts(res.data)
                if (res.data.error)
                    console.log(res.data.error)
            })
            .catch((err) => {
                console.log(err)
            }
            )
    }

    const getComments = () => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}api/posts/${postId} `,
            /*headers: {
                authorization: `Bearer ${token}`
            },*/
        })
            .then((res) => {
                setComments(res.data)
                console.log(comments)
                console.log(comments[0].comment)
                if (res.data.error)
                    console.log(res.data.error)
            })
            .catch((err) => {
                console.log(err)
            }
            )
    }

    return (
        <>
            <div className="post-container">
                <p>{message}</p>
                <p>{date}</p>
                <li onClick={getComments} id="getComments">afficher les commentaires</li>
                {comments ? (
                    <p>{comments[0].comment}</p>
                ) : ('')}
                {postUserId === userId ? (
                    <li onClick={deletePost} id="delete-post" className="active-btn">supprimer</li>)
                    : ("")
                }
            </div>
        </>
    )
}


export default Posts