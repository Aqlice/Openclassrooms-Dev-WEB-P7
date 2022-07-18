import React, { useEffect, useState } from "react";
import axios from "axios";
import UserResult from '../components/UserResult'


const UserSearch = () => {
    const [result, setResult] = useState([])
    const [noResult, setNoResult] = useState(0)
    useEffect(() => {
		userSearcher()
	}, [])
    const userSearcher = async () => {
        const token = JSON.parse(localStorage.token)
        let id = document.URL.replace('http://localhost:3000/UserSearch/', '')
        axios.get(`${process.env.REACT_APP_API_URL}api/auth/`, {
            params: {
                user: id
            },
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.data.error) {
                console.log(res.data.errors)

            }
            else 
                setResult(res.data)
        })
            .catch((err) => {
                setNoResult(1)
                console.log(err);
            });
    }
    return (
        <>
        {noResult == 0? (
        <div className="result-list">
            <div className="result-container">
                <div>
                {result.map(result =>
                    (
                        <UserResult
                            key={result.UID}
                            fname={result.fname}
                            name={result.name}
                            mail={result.mail}
                            pic={result.pic}
                            UID={result.UID}
                            />
                    )
                    )}
                </div>
            </div>
        </div>) 
        : (<p>utilisateur non trouvé</p>)}
        </>
    )
}

export default UserSearch;