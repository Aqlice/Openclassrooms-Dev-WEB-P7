
import React from 'react';
import { NavLink } from "react-router-dom";
import Logout from "./login/logout"

function Navbar() {
    return (
        <nav>
            <div className='nav-container'>
                <div className='logo'>
                    <NavLink  to="/">
                        <div className='logo'>
                            <img src="./icon-left-font.png" alt='logo groupomania' />
                        </div>
                    </NavLink>
                </div>

                {localStorage.token ? (
                    <ul>
                        <li></li>
                        <li className='welcome'>
                            <NavLink to={`/account/${ JSON.parse(localStorage.userId) }`}>
                               
                                <h5>bienvenue a toi</h5>
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