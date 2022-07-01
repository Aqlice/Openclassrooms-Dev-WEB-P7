import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import avatar from "../image/avatar.png"

function Comments({ key, comment, userId, postId, date }) {

    return (
        <div className="comment-box">
            <p>{comment}</p>
        </div>
    )
}

export default Comments

