import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Poster({ getAllPosts }) {

    useEffect(() => {
        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });
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
            setImageProfile(res.data.pic)


            if (res.data.error) {
                console.log(res.data.errors)

            }
        })
            .catch((err) => {
                console.log(err);
            });

    };

    const createPost = (e) => {
        console.log(message, postPic)
        if (message.length == 0 && postPic.length == 0)
            return
        const form = new FormData()
        form.append('user_id', userId)
        form.append('message', message)
        if (postPic[0])
            form.append('image', postPic[0])
        axios
            .post(`${process.env.REACT_APP_API_URL}api/posts/ `, form, {
                headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                setMessage(res.data.message)
                getAllPosts()
                if (res.data.error) {
                    console.log(res.data.errors)

                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <section className='all-poster-container'>
            <div className='poster-container'>
                <img src={imageProfile} id="profileImage" alt="avatar"></img>
                <form>
                    <textarea type="text" name="post" id='post' placeholder="Que souhaitez vous partager" onChange={(e) => setMessage
                        (e.target.value)} value={message}></textarea>
                    <input type="file" name="post-picture" id='post-picture' className='input-file' onChange={(e) => setPostPic(e.target.files)} filename={postPic}></input>
                    <label htmlFor="post-picture">Choisir un fichier</label>
                    <li onClick={createPost} id="create-post" className="active-btn">Poster</li>
                </form>
            </div>
        </section>
    )
}

export default Poster;