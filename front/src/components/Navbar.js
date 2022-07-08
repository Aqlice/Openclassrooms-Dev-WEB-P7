
import React from 'react';
import { NavLink } from "react-router-dom";
import Logout from "./login/logout"
import userIcon from "../image/icons/user.svg"
import logo from "../image/icons/icon-left-font-monochrome-black.png"
import arrow from "../image/icons/arrow-right-to-bracket-solid.svg"

function Navbar() {
    return (
        <nav>
            <div className='nav-container'>
                <div className='logo'>
                    <NavLink  to="/home">
                        <div className='logo' id="nav-logo">
                            <img src={logo} alt='logo groupomania' />
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
                                <img src={arrow} alt='img log out' />
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