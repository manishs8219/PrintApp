import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";


import { ToastContainer } from 'react-toastify';
import AdminLayout from "./Components/auth/adminLayout/AdminLayout";

import Login from "./Components/Login";
import { Dashboard } from "./Components/Dashboard";

import TermsAndCondition from "./Components/TermsAndCondition";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import EditAdminDetail from "./Components/auth/EditAdminDetail";
import Account from "./Components/Account";
import Addcount from "./Components/Addcount";
import AccountView from "./Components/AccountView";

import AccountUpdate from "./Components/AccountUpdate"

function App() {
    const adminInfo = JSON.parse(localStorage.getItem("adminProfile"));
    const navigate = useNavigate();

    useEffect(() => {
        if (!adminInfo) {
            // If the token does not exist, redirect the user to the login page
            navigate('/');
        }
    }, [adminInfo, navigate]);

    return (
        <>
            <Routes>
           
                <Route index element={<Login />} />
            
                <Route path="/" element={<AdminLayout />}>
               
                <Route path="/dashboard" element={<Dashboard />} />
               
                <Route path="/editAdmindetail" element={<EditAdminDetail />} />

                <Route path="/account" element={<Account/>} />

                <Route path="/addcount" element={<Addcount/>} />

                <Route path="/accountview/:_id" element={<AccountView/>} />

                <Route path="/termsandcondition" element={<TermsAndCondition />} />

                    <Route path="/privacypolicy" element={<PrivacyPolicy />} />

                    <Route path="/accountupdate/:_id" element={<AccountUpdate/>} />

                </Route>
            </Routes>
            <ToastContainer />
        </>
    );
}

export default App;
