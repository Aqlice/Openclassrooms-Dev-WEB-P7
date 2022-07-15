import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Poster from '../components/Poster';
import Posts from '../components/Posts'
import Comments from '../components/Comments'
import UserSearch from "./UserSearch"

const Home = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {

        getAllPosts()
        getUser()

        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [Poster])

    const token = JSON.parse(localStorage.token)
    const userId = JSON.parse(localStorage.userId)

    const [totalItems, setTotalItems] = useState(0)
    const [pages, setPages] = useState(0)
    const [admin, setAdmin] = useState(0)
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])


    const getAllPosts = async () => {

        await axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}api/posts/ `,

            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setPosts(res.data)
            setTotalItems(res.data.length)
            if (res.data.error)
                console.log(res.data.errors)
        })
            .catch((err) => {
                console.log(err)
            })

    }

    const getUser = () => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}api/auth/${userId} `,

            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setAdmin(res.data.admin)
            if (res.data.error) 
                console.log(res.data.errors)
        })
            .catch((err) => {
                console.log(err);
            });

    };

    const searchUser = async () => {
        window.location = `/UserSearch/${search}`
    }

    return (
        <main>
            <div className='home'>

                <div className=' search-bar'>
                    <input type="text" name="search-bar" id='search-bar' placeholder="recherche" onChange={(e) => setSearch
                        (e.target.value)} value={search}></input>
                    <li onClick={searchUser} id="searchUser" className="name">rechercher</li>
                </div>
                <div home-container>
                    <Poster getAllPosts={getAllPosts} />
                </div>
                <div className='post-container'>
                    {posts.map(posts =>
                    (
                        <Posts
                            key={posts.id}
                            fname={posts.post_user_name}
                            message={posts.message}
                            postUserId={posts.post_user_id}
                            postId={posts.post_id}
                            date={posts.creation_time}
                            like={posts.total_like}
                            pic={posts.post_pic}
                            userPic={posts.pic}
                            getAllPosts={getAllPosts}
                            admin={admin} />
                    )
                    )}
                </div>
            </div>
        </main>
    )
}
export default Home;