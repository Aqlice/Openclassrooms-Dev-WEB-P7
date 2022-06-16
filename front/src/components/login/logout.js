import React from 'react';

function Logout() {
    localStorage.clear();
    window.location = "/login"
    return(
        <li></li>
  );
    
}

export default Logout;
