import './Register.scss';
import React, {useRef, useState, useEffect, useContext} from "react";
// import Layout from '../Layout';
import Video from '../Video';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
import {faLock} from '@fortawesome/free-solid-svg-icons'
import Author from '../Author';
// import axios from '~/components/api/axios'
// import { loginApi } from '../services/userService';
import axios from 'axios'
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// const LOGIN_URL = '/api/v1/login';

function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [successs, setSuccess] = useState(false);


    const handlePrint = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://ptit.io.vn/api/v1/login',
                JSON.stringify({email, password}),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                });
            setSuccess(true);
            const Token = response.data.body.token.accessToken;
            const ID = response.data.body.id;
            localStorage.setItem('accessToken', (Token));
            localStorage.setItem('id', (ID));
            console.log(JSON.stringify(response?.data));

        } catch (error) {
            console.log(error);
            alert('error')
        }
    }

    return (
        <> {successs ? (
            <Video></Video>
        ) : (


            <div className='res-wrap'>


                <div className="res-heading">
                    Sign in
                </div>


                <form onSubmit={handlePrint}>
                    <div className='email-form'>
                        <div className="res-box">
                            <i className='res-icon'>
                                <FontAwesomeIcon icon={faEnvelope}/>
                            </i>
                            <input
                                placeholder='Email'
                                className='res-add'
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>


                    </div>

                    <div className="res-box res-box2">

                        <i className='res-icon'>
                            <FontAwesomeIcon icon={faLock}/>
                        </i>
                        <input
                            placeholder='Password'
                            className='res-pass'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />

                    </div>
                    <div className='res-forget'>
                        <a href={process.env.PUBLIC_URL}> Forgot Password?</a>
                    </div>
                    <div className='signButton'>

                        <button className='signButton-click'>
                            Sign in
                        </button>
                    </div>


                </form>


                <div className='res-nav'>
                    <div className='res-nav_text'>
                        Don't have an account yet ?
                    </div>
                    <div className='res-nav_click'>
                        <a href={process.env.PUBLIC_URL + "/author"}>Register now! </a>
                    </div>

                </div>


            </div>
        )}
        </>


    );


}

export default Register;