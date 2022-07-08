import React, { useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function ChangeProfil() {

    const [mail, setmail] = useState("");
    const [fname, setfname] = useState("");
    const [name, setname] = useState("");
    const [imageProfileUpload, setImageProfileUpload] = useState([]);
    const navigate = useNavigate()
    let { id } = useParams();
    const token = JSON.parse(localStorage.token)

    const handleProfile = (e) => {
        e.preventDefault()
        const form = new FormData()
        form.append('mail', mail)
        form.append('fname', fname)
        form.append('name', name)
        form.append('image', imageProfileUpload[0])
        console.log(imageProfileUpload)
        console.log("test")
        /*axios({
            method: "PUT",
            url: `${process.env.REACT_APP_API_URL}api/auth/${id} `,
            data: form,
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }*/
        axios
            .put(`${process.env.REACT_APP_API_URL}api/auth/${id} `, form, {
                headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                navigate(`/account/${id}`)
                console.log(res)
            })
    }
    //})
    //        .then((res) => {
    //console.log(res);

    /*if (res.data.error) {
        console.log("ici", res.data.errors)

    }*/

    //})
    //};

    return (
        <form onSubmit={handleProfile} id="profil-form">
            <label htmlFor="mail">mail</label>
            <br />
            <input type="text" name="mail" id='mail' onChange={(e) => setmail
                (e.target.value)} value={mail}></input>
            <div className='mail-error'></div>
            <br />

            <label htmlFor='first-name'>Prenom</label>
            <br />
            <input type="text" name='first-name' id='first-name' onChange={(e) => setfname
                (e.target.value)} value={fname}></input>
            <div className='password error'></div>
            <br />

            <label htmlFor="text">Nom de famille</label>
            <br />
            <input type="text" name="last-name" id='last-name' onChange={(e) => setname
                (e.target.value)} value={name}></input>
            <div className='mail-error'></div>
            <br />

            <input type="file" name="profile-picture" id='profile-picture' onChange={(e) => setImageProfileUpload(e.target.files)} filename={imageProfileUpload}></input>
            <br/>
            <input type="submit" classename="active-btn" id="change-profil" value="modifier mon profil"></input>
        </form>
    )

}

export default ChangeProfil;