//import logo from './logo.svg';
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import Account from "./pages/Account.js";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Account from "./pages/Account.js";
import Navbar from "./components/Navbar.js";
import './styles/index.css';
import UserSearch from "./pages/UserSearch"


function App() {
  console.log("app")
  return (
      <div className="Router">
        <BrowserRouter>
          <Navbar />
          <Routes>
           
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/account/:id" element={<Account />} />
            <Route path="/UserSearch/:id" element={<UserSearch />}/>
           
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

  export default App;