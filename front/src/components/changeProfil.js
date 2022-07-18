import React, { useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { emailValidation, nameValidation, firstNameValidation } from '../utils';


function ChangeProfil() {

    const [mail, setmail] = useState("");
    const [fname, setfname] = useState("");
    const [name, setname] = useState("");
    const [mailError, setMailError] = useState("")
    const [nameError, setNameError] = useState("")
    const [firstNameError, setFirstNameError] = useState("")
    const [imageProfileUpload, setImageProfileUpload] = useState([]);
    let { id } = useParams();
    const token = JSON.parse(localStorage.token)

    const handleProfile = (e) => {
        e.preventDefault()
        const form = new FormData()
        if (mail && emailValidation(mail) === false)
            setMailError("veuillez renseigner un mail valide")
        if (name && nameValidation(name) === false)
            setNameError("veuillez renseigner un nom valide")
        if (fname && firstNameValidation(fname) === false)
            setFirstNameError("veuillez renseigner un prenom valide")
        form.append('mail', mail)
        form.append('fname', fname)
        form.append('name', name)
        form.append('image', imageProfileUpload[0])
        axios
            .put(`${process.env.REACT_APP_API_URL}api/auth/${id} `, form, {
                headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                window.location.reload(false)
            })
    }

    return (
        <form onSubmit={handleProfile} id="profil-form">
            <label htmlFor="mail">mail</label>
            <br />
            <input type="text" name="mail" id='mail' onChange={(e) => setmail
                (e.target.value)} value={mail}></input>
            <div className='mail-error'>{mailError}</div>
            <br />

            <label htmlFor='first-name'>Prenom</label>
            <br />
            <input type="text" name='first-name' id='first-name' onChange={(e) => setfname
                (e.target.value)} value={fname}></input>
            <div className='password error'>{firstNameError}</div>
            <br />

            <label htmlFor="text">Nom de famille</label>
            <br />
            <input type="text" name="last-name" id='last-name' onChange={(e) => setname
                (e.target.value)} value={name}></input>
            <div className='mail-error'>{nameError}</div>
            <br />

            <input type="file" name="profile-picture" id='profile-picture' onChange={(e) => setImageProfileUpload(e.target.files)} filename={imageProfileUpload}></input>
            <br />
            <input type="submit" classename="active-btn" id="change-profil" value="modifier mon profil"></input>
        </form>
    )

}

export default ChangeProfil;