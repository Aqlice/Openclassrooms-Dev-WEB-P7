import React, { useEffect, useState } from 'react';
import axios from "axios";



function ChangePost({postId, getAllPosts}) {

    const [message, setMessage] = useState("")
    const [imagePost, setImagePost] = useState([])
    const [postMessage, setPostMessage] = useState('')

    const token = JSON.parse(localStorage.token)

    useEffect(() => {
        getPostMessage()
    }, [])

    const getPostMessage  = async () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}api/posts/modifypost/${postId} `, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setPostMessage(res.data[0].message)
            })
    }

    const handlePost = (e) => {
        e.preventDefault()
        const form = new FormData()
        form.append('message', message)
        form.append('image', imagePost[0])
        axios
            .put(`${process.env.REACT_APP_API_URL}api/posts/modifypost/${postId} `, form, {
                headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                getAllPosts()
            })
    }

    return (
        <div id="post-change-form">
        <form onSubmit={handlePost} id="post-form">
            <label htmlFor='message'>message</label>
            <br />
            <textarea type="text" defaultValue={postMessage} name='message' id='nessage' onChange={(e) => setMessage
                (e.target.value)} value={message}></textarea>
            <br />
            <input type="file" name="post-picture" id='post-picture' onChange={(e) => setImagePost(e.target.files)} filename={imagePost}></input>
            <br />
            <input type="submit" classename="active-btn" id="change-post" value="modifier mon post"></input>
        </form>
        </div>
    )
}

export default ChangePost;