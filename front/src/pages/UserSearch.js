import React, { useEffect, useState } from "react";
import Log from "../components/login/index.log";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserResult from '../components/UserResult'


const UserSearch = () => {
    console.log("test")
    const [result, setResult] = useState([])
    useEffect(() => {
		userSearcher()
	}, [])
    const userSearcher = async () => {
        const token = JSON.parse(localStorage.token)
        let id = document.URL.replace('http://localhost:3000/UserSearch/', '')
        console.log("test", id)
        axios.get(`${process.env.REACT_APP_API_URL}api/auth/`, {
            params: {
                user: id
            },
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.data.error) {
                console.log("ici", res.data.errors)

            }
            else {
                setResult(res.data)
                console.log('res', res.data)
            }
        })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <div className="result-list">
            <div className="result-container">
                <div>
                {result.map(result =>
                    (
                        <UserResult
                            key={result.id}
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
        </div>
    )
}

export default UserSearch;