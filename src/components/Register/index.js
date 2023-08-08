import './Register.scss';
import React, { useRef } from "react";
// import Layout from '../Layout';
import Video from '../Video';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import Author from '../Author';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function Register() {
    const email=useRef()
    const password=useRef()
    const getEmail=localStorage.getItem("emailData")
    const getPassword=localStorage.getItem("passwordData")
    const handleSubmit=()=>{
        if(email.current.value=="ndm@gmail.com"&&password.current.value=="12345"){
            localStorage.setItem("emailData","ndm@gmail.com")
            localStorage.setItem("passwordData","12345")
        }
    }
   

    return (
        
            

<div> 
          {
            getEmail&&getPassword?
                <Video/>:
            
            <div className='res-wrap'>
            
            <a href="/" className='res-back'>
                <FontAwesomeIcon icon={faArrowLeft} />
            </a>

            <div className="res-heading">
                Sign in
            </div>

            <div className="res-text">
                Welcome back
            </div>

            <form onSubmit={handleSubmit} >
                <div className="res-box" >
                    <i className='res-icon' >
                        <FontAwesomeIcon icon={faEnvelope} />

                    </i>
                    <input ref = {email} placeholder='Email address' className='res-add' type='text' name='' />
                </div>

                <div className="res-box res-box2">
                    <i className='res-icon' >

                        <FontAwesomeIcon icon={faLock} />
                    </i>
                    <input ref = {password} placeholder='Password' className='res-pass' type='password' name='' />

                </div>

                <div className='res-arrow'>
                <button className='register-button'>
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
                </div>
                </form>
                <div className='res-forget'>
                <a href="./"> Forgot Password?</a>
                </div>

                <div className='res-nav'>
                <div className='res-nav_text'>
                    New member ?
                </div>
                <div className='res-nav_click'>
                    <a href="/author">Sign up </a>
                </div>

            </div>
            
            
            </div>
            } </div>
 
        

          

      
 
    );



}

export default Register;