import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import avatar from "../image/avatar.png"

function Poster(){

    useEffect(() => {
        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });
    const [name, setname]= useState('');
    const [fname, setfname] = useState('');
    const [message, setMessage] = useState('')

    const userId = JSON.parse(localStorage.userId)
	const token = JSON.parse(localStorage.token)

    

    const getUser = () =>{
		axios ({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}api/auth/${userId} `,
            
        //    headers:{
        //        authorization:`Bearer ${token}`
        //    }
        }).then((res) => {
            console.log(res);
			setname(res.data.name);
			setfname(res.data.fname);
			
            
            if (res.data.error) {
                console.log("la",res.data.errors)
               
            } 
          })
          .catch((err) => {
            console.log(err);
          });

      };

      const createPost = () =>{
        axios ({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}api/posts/ `,
            data: {
                user_id : userId,
                message: message
            },
            
            /*headers:{
                authorization:`Bearer ${token}`
            }*/
        }).then((res) => {
            console.log(res);
			setMessage(res.data.message)
            if (res.data.error) {
                console.log("la",res.data.errors)
               
            } 
          })
          .catch((err) => {
            console.log(err);
          });


    }

    
    return(
        <section>
        <div className='poster-container'>

            <div>
                <img src={avatar} alt="avatar"></img>
                username:{fname}
                <form>
                <input type="text" name="post" id='post' placeholder="Que souhaitez vous partager" onChange={(e) => setMessage
                (e.target.value)} value={message}></input>
                <li onClick={createPost} id="create-post" className="active-btn">Poster</li>
                </form>
            </div>
        </div>
        </section>
    )
}

export default Poster;