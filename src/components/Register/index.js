import './Register.scss';
import React, { useRef, useState, useEffect, useContext } from "react";
// import Layout from '../Layout';
import Video from '../Video';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import Author from '../Author';
// import axios from '~/components/api/axios'
// import { loginApi } from '../services/userService';
import axios from 'axios'
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// const LOGIN_URL = '/api/v1/login';

function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
   
    // const handleSubmit = async (e) => {
    //     if(!email || !password) {
    //         alert("Email/Password is required!")
    //         return;
    //     } 
    //         const res = await loginApi(email,password);
    //         if(res && res.token) {
    //             localStorage.setItem('token', res.token);
    //         }
    //         console.log("res", res)
        
    //     }

    
    // app.use(cors());

        const handlePrint = (e) => {
            e.preventDefault();
            console.log({email, password})
            axios.post('http://117.6.133.148:8089/api/v1/login', {
            headers:{'Access-Control-Allow-Origin': true,
        },      
            email: email,
            password: password,
            })
            .then(result => {
                console.log(result.data)
                alert('ok bro')
            })
            .catch(error => {
                console.log(error)
                alert('error')
            })
        }

    return (
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

            {/* <form onSubmit={handleSubmit} > */}
            <form onSubmit = {handlePrint} >

                <div className="res-box" >
                    <i className='res-icon' >
                        <FontAwesomeIcon icon={faEnvelope} />
                    </i>
                    <input 
                     placeholder='Email address'
                     className='res-add' 
                     value = {email}
                     onChange={(event) => setEmail(event.target.value)}
                      />
                </div>

                <div className="res-box res-box2">
                    <i className='res-icon' >

                        <FontAwesomeIcon icon={faLock} />
                    </i>

                    <input  
                    placeholder='Password' 
                    className='res-pass' 
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    />

                </div>

                <div className='res-arrow'>
                    
                <button  className='register-button'>
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
                </div>

                {/* <button>Sign In</button> */}

                </form  >
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
        
        
        

          

      
 
    );



}

export default Register;