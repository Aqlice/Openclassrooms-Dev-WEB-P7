import React from 'react';

function Logout() {
    localStorage.clear();
    window.location = "/"
    return(
        <li></li>
  );
    
}

export default Logout;
