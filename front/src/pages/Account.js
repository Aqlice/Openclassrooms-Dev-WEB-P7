import axios from 'axios';
import React, { useEffect, useState, } from 'react';
import { NavLink, useLocation, useParams } from "react-router-dom";
import ChangeProfil from '../components/changeProfil';
import avatar from "../image/avatar.png"
import Posts from '../components/Posts'
import { useNavigate } from 'react-router-dom';


const Account = () => {
	useEffect(() => {
		getUser()
	})
	const [name, setname] = useState('')
	const [fname, setfname] = useState('')
	const [mail, setmail] = useState('')
	const [imageProfile, setImageProfile] = useState('')
	const [admin, setAdmin] = useState(0)
	const [posts, setPosts] = useState([])
	const navigate = useNavigate()


	const [profilModal, setProfilModal] = useState(false);
	let { id } = useParams();
	const userId = JSON.parse(localStorage.userId)
	const token = JSON.parse(localStorage.token)
	console.log(userId, id)
	const handleProfil = (e) => {
		setProfilModal(true)
	}

	const getUser = () => {
		axios({
			method: "GET",
			url: `${process.env.REACT_APP_API_URL}api/auth/${id} `,

			headers: {
				authorization: `Bearer ${token}`
			}
		}).then((res) => {
			//console.log(res);
			if (res.data.name)
				setname(res.data.name);
			if (res.data.fname)
				setfname(res.data.fname);
			if (res.data.mail)
				setmail(res.data.mail);
			setAdmin(res.data.admin)
			setImageProfile(res.data.pic)
			getAdmin()

			if (res.data.error) {
				console.log("ici", res.data.errors)

			}
		})
			.catch((err) => {
				console.log(err);
			});

	};

	const getAdmin = () => {
		axios({
			method: "GET",
			url: `${process.env.REACT_APP_API_URL}api/auth/${userId} `,

			headers: {
				authorization: `Bearer ${token}`
			}
		}).then((res) => {
			setAdmin(res.data.admin)
			if (res.data.error) {
				console.log("ici", res.data.errors)

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
				else if (admin === 1)
					navigate("/home")
				else
					navigate("/")

			})
			.catch((err) => {
				console.log(err)
			}
			)
	}

	const getPostsFromUser = () => {
		axios.get(`${process.env.REACT_APP_API_URL}api/posts/getposts/${id}`, {
			headers: {
				authorization: `Bearer ${token}`
			}
		}).then((res) => {
			if (res.data.error)
				console.log(res.data.errors)
			else
				setPosts(res.data)
		})
	}

	return (
		<div id="account">
			<div className='account-container'>
				<div className='image-container'>
					<img src={imageProfile} id="image" alt="image" />
				</div>

				{userId === id || admin == 1 ? (
					<div className='user-presentation'>
						<p >nom: {name}</p>
						<p> Prenom {fname}:</p>
						<p>Contact : {mail}</p>
						<li onClick={handleProfil} id="showProfil" className="active-btn">Modifier</li>
						{profilModal && <ChangeProfil />}
						{(userId == id && admin != 1) || (admin == 1 && userId != id)? (
							<li onClick={deleteProfil} id="deleteProfil" className="active-btn">Supprimer</li>)
							: ("")}
					</div>



				) : (
					<div className='user-presentation' id="showProfil2">
						<p> nom: {name}</p>
						<p> Prenom: {fname}</p>
						<p>Contact: {mail}</p>
					</div>
				)}
				<li onClick={getPostsFromUser} id="getPostsFromUser" className="active-btn">afficher les posts</li>

				<div className='post-container'>
					{posts.map(posts =>
					(
						<Posts
							key={posts.post_id}
							fname={posts.post_user_name}
							message={posts.message}
							postUserId={posts.post_user_id}
							postId={posts.post_id}
							date={posts.creation_time}
							like={posts.total_like}
							pic={posts.post_pic}
							userPic={posts.pic}
							admin={admin}
							getAllPosts={getPostsFromUser} />
					)
					)}
				</div>

			</div>
		</div>

	)
}

export default Account;