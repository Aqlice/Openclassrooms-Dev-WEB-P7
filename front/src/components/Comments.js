import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import avatar from "../image/avatar.png"

function Comments({ comment, userId, postId, date, fname }) {

    return (
        <div className="comment-box">
            
            <p>posté par {fname}</p>
            <p>{comment}</p>
        </div>
    )
}

export default Comments

