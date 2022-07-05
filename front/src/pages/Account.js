import axios from 'axios';
import React, { useEffect, useState, } from 'react';
import { NavLink, useLocation, useParams } from "react-router-dom";
import ChangeProfil from '../components/changeProfil';
import avatar from "../image/avatar.png"


const Account = () =>{
    useEffect(() => {
        getUser()
    })
	const [name, setname]= useState('')
	const [fname, setfname]= useState('')
	const [mail, setmail] = useState('')
	const [imageProfile, setImageProfile ]= useState('')
	const [admin, setAdmin] = useState(0)
	

	const[profilModal, setProfilModal]= useState(false);
	let { id } = useParams();
	const userId = JSON.parse(localStorage.userId)
	const token = JSON.parse(localStorage.token)

	const handleProfil = (e) =>{
		setProfilModal(true)
	}
                  
	const getUser = () =>{
		axios ({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}api/auth/${id} `,
            
            headers:{
                authorization:`Bearer ${token}`
            }
        }).then((res) => {
            console.log(res);
			if (res.data.name)
				setname(res.data.name);
			if (res.data.fname )
				setfname(res.data.fname);
			if (res.data.mail)
				setmail(res.data.mail);
			setAdmin(res.data.admin)
			setImageProfile(res.data.pic)
            
            if (res.data.error) {
                console.log("ici",res.data.errors)
               
            } 
          })
          .catch((err) => {
            console.log(err);
          });

      };

	const deleteProfil = () => {
        axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_API_URL}api/auth/${id} `,
            headers: {
                authorization: `Bearer ${token}`
            },
        })
            .then((res) => {
                if (res.data.error)
                    console.log(res.data.error)
            })
            .catch((err) => {
                console.log(err)
            }
            )
    }

	return(
		<section>
            <div className='account-container'>
				<div className='image-container'>
                	<img src={imageProfile} id ="image" alt="image"/>
				</div>
            
                {userId === id ? (
					<div className='user-presentation'>
					<p >nom: {name}</p>
					<p> Prenom {fname}:</p>
					<p>Contact : {mail}</p>
					<li onClick={handleProfil} id="showProfil" className="active-btn">Modifier</li>
					{profilModal && <ChangeProfil />}
					{userId === id || admin === 1 ? (
					<li onClick={deleteProfil} id="deleteProfil" className="active-btn">Supprimer</li>)
					:("")}
					</div>

					
                 
                ) : (
                    <div className='user-presentation' id="showProfil2">
					<p> nom: {name}</p>
					<p> Prenom: {fname}</p>
					<p>Contact: {mail}</p>
					</div>
                )}
				
				</div>  
    </section>
	)
}

export default Account;