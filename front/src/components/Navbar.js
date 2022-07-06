
import React from 'react';
import { NavLink } from "react-router-dom";
import Logout from "./login/logout"
import userIcon from "../image/icons/user.svg"

function Navbar() {
    return (
        <nav>
            <div className='nav-container'>
                <div className='logo'>
                    <NavLink  to="/home">
                        <div className='logo' id="nav-logo">
                            <img src="./logo/icon-left-font-monochrome-black.png" alt='logo groupomania' />
                        </div>
                    </NavLink>
                </div>

                {localStorage.token ? (
                    <ul className = 'icon-link'>
                        <li></li>
                        <li className='welcome'>
                            <NavLink to={`/account/${ JSON.parse(localStorage.userId) }`}>
                            <img src={userIcon}/>
                            </NavLink>
                        </li>
                        <li onClick={Logout}>
                            <NavLink to="/login">
                                <img src="./arrow-right-to-bracket-solid.svg" alt='img log out' />
                            </NavLink>
                        </li>

                    </ul>
                ) : (
                    <ul>
                        <li></li>
                        <li>
                            <NavLink  to="/login">
                                <h5>Bienvenue qui es tu</h5>
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>

        </nav >
    )
}

export default Navbar;