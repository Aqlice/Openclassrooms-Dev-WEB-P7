import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';



function ChangeProfil() {
    useEffect(() => {
        handleProfile()
    })

    const [mail, setmail] = useState("");
    const [fname, setfname] = useState("");
    const [name, setname] = useState("");
    const [imageProfileUpload, setImageProfileUpload] = useState();

    let { id } = useParams();
    const token = JSON.parse(localStorage.token)

    const handleProfile = (e) => {
        console.log(imageProfileUpload)
        axios({
            method: "PUT",
            url: `${process.env.REACT_APP_API_URL}api/auth/${id} `,
            data: {

                mail: mail,
                fname: fname,
                name: name,
                pic: imageProfileUpload,
            },
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res);

                if (res.data.error) {
                    console.log("ici", res.data.errors)

                }

            })
    };

    return (
        <form action="" onSubmit={handleProfile} id="profil-form">
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

            <input type="file" name="profile-picture" id='profile-picture' onChange={(e) => setImageProfileUpload(e.target.files[0])} value={imageProfileUpload}></input>
            <input type="submit" value="modifier mon profil"></input>
        </form>
    )

}

export default ChangeProfil;