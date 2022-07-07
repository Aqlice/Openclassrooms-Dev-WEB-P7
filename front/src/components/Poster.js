import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import avatar from "../image/avatar.png"

function Poster({ getAllPosts }) {

    useEffect(() => {
        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });
    const [name, setname] = useState('');
    const [fname, setfname] = useState('');
    const [message, setMessage] = useState('')
    const [imageProfile, setImageProfile] = useState()
    const [postPic, setPostPic] = useState([])

    const userId = JSON.parse(localStorage.userId)
    const token = JSON.parse(localStorage.token)



    const getUser = () => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}api/auth/${userId} `,

            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res);
            setname(res.data.name);
            setfname(res.data.fname);
            setImageProfile(res.data.pic)


            if (res.data.error) {
                console.log("la", res.data.errors)

            }
        })
            .catch((err) => {
                console.log(err);
            });

    };

    const createPost = (e) => {
        const form = new FormData()
        form.append('user_id', userId)
        form.append('message', message)
        if (postPic[0])
            form.append('image', postPic[0])
        console.log("dewfdw", userId)
        console.log(form.get('user_id'))
        axios
            .post(`${process.env.REACT_APP_API_URL}api/posts/ `, form, {
                headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            })
        /*axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}api/posts/ `,
            form,
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        })*/
        .then((res) => {
            console.log(res);
            setMessage(res.data.message)
            getAllPosts()
            if (res.data.error) {
                console.log("la", res.data.errors)

            }
        })
            .catch((err) => {
                console.log(err);
            });


    }


    return (
        <section>
            <div className='poster-container'>
                <img src={imageProfile} id="profileImage" alt="avatar"></img>
                <form>
                    <textarea type="text" name="post" id='post' placeholder="Que souhaitez vous partager" onChange={(e) => setMessage
                        (e.target.value)} value={message}></textarea>
                    <input type="file" name="post-picture" id='post-picture' onChange={(e) => setPostPic(e.target.files)} filename={postPic}></input>
                    <li onClick={createPost} id="create-post" className="active-btn">Poster</li>
                </form>
            </div>
        </section>
    )
}

export default Poster;