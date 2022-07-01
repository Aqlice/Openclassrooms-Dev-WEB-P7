import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Poster from '../components/Poster';
import Posts from '../components/Posts'
import Comments from '../components/Comments'

const Home = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {

        getAllPosts()
        setPages((pages) => pages + 1)

        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [Poster])

    const token = JSON.parse(localStorage.token)
    const userId = JSON.parse(localStorage.userId)

    const [totalItems, setTotalItems] = useState(0)
    const [pages, setPages] = useState(0)


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
            if (res.data.error) {
                console.log("ici222", res.data.errors)

            }
        })
            .catch((err) => {
                console.log(err)
            })

    }
    return (
        <main>
            <section>
                <div home-container>
                    <Poster getAllPosts={getAllPosts}/>
                </div>
                <div className='post-container'>
                    {posts.map(posts =>
                    (
                        <Posts
                            key={posts.id}
                            fname={posts.fname}
                            message={posts.message}
                            postUserId={posts.post_user_id}
                            postId={posts.post_id}
                            date={posts.creation_time} />
                    )
                    )}
                </div>
            </section>
        </main>
    )
}

export default Home;