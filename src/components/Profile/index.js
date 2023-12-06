import './Profile.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faHand } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';

function Profile() {
    const token = localStorage.getItem('accessToken');
    const id = localStorage.getItem('id');
    axios.interceptors.request.use(
        (config) => {
            config.headers.authorization = `Bearer ${token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    const [language, setLanguage] = useState(1);
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [location, setLocation] = useState('');
    const [phone, setPhone] = useState('');

    // sign out
    const handleClick = () => {
        localStorage.clear();
        window.location.reload();
    };


    // const [post, setPost] = useState({
    //     name: '',
    //     email: '',
    //     dateOfBirth: '' ,
    //     address: '',
    //     phoneNumber: '',
    //     language: '',
    //     supportedBy: '',
    //     registerType: ''
    // });

    // const handleInput = (e) => {
    //     setPost({...post, [e.target.name]: e.target.value})
    // }

    const handleLanguage = (e) => {
        if(language === 1) setLanguage(2)
        else setLanguage(1);
    };

    const handleLanguageEn = (e) => {
        setLanguage(2);
    };

    localStorage.setItem('lan', language);

    useEffect(() => {
        axios
            .get(`https://ptit.io.vn/api/v1/user/${id}`)
            .then((response) => {
                console.log(response.data.body);
                setEmail(response.data.body.email);
                setDob(response.data.body.dateOfBirth);
                setLocation(response.data.body.address);
                setPhone(response.data.body.phoneNumber);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // console.log(email, dob, location, phone);
    // const handleUpdate = (e) => {
    //     e.preventDefault();
    //     axios.put('https://ptit.io.vn/api/v1/user', {post})
    //         .then((response) => {
    //             console.log(response.data.body);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };
    console.log(language);
    return (
        <div className="text-wrap">
            <div className="barTop">
                <div className="barTop-title">LGP</div>
            </div>

            <div className="profile-wrap">
                <div className="profile-title">Settings</div>

                <div className="profile-box">
                    <div className="profile-text">
                        <i>
                            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                        </i>
                        Username
                    </div>
                    <a href={process.env.PUBLIC_URL + "/register"} onClick={handleClick}>
                        <i className="signOut-icon">
                            <FontAwesomeIcon icon={faSignOutAlt} />
                        </i>
                    </a>
                </div>

                <div className="profile-body">
                    <i className="body-edit">
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </i>
                    <div className="body-content">
                        <i className="body-icon">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </i>
                        <div className="body-text">
                            <div className="body-header">Email</div>
                            <div className="body-data">{email}</div>
                        </div>
                    </div>

                    <div className="body-content">
                        <i className="body-icon">
                            <FontAwesomeIcon icon={faCalendar} />
                        </i>
                        <div className="body-text">
                            <div className="body-header">Date of Birth</div>
                            <div className="body-data">{dob}</div>
                        </div>
                    </div>

                    <div className="body-content">
                        <i className="body-icon">
                            <FontAwesomeIcon icon={faLocationDot} />
                        </i>
                        <div className="body-text">
                            <div className="body-header">Location</div>
                            <div className="body-data">{location}</div>
                        </div>
                    </div>

                    <div className="body-content">
                        <i className="body-icon">
                            <FontAwesomeIcon icon={faPhone} />
                        </i>
                        <div className="body-text">
                            <div className="body-header">Phone no.</div>
                            <div className="body-data">{phone}</div>
                        </div>
                    </div>
                </div>

                {/* <div className="profile-box">
                    <div className="box-text box-TextLan">Ngôn ngữ</div>
                    <input className = "radVi" name = "lan" value = "vi" onChange = {handleLanguage} type ="radio" id="vi"></input>
                    <label className = "labVi" for="vi">Việt Nam</label>
                    <input className = "radEn" name = "lan" value = "en" onChange = {handleLanguageEn} type ="radio" id="en"></input>
                    <label for="vi">English</label>
                </div> */}

                <div className="profile-box">
                    <div class="form-check form-switch">
                        <div className="profile-text">Language
                        </div>
                        <input onChange={handleLanguage} defaultChecked={language === '1'}  type="checkbox" class="form-check-input" id="checkbox"></input>
                    </div>
                </div>

                <div className="profile-box">
                    <div class="form-check form-switch">
                        <div className="profile-text">Dark Mode
                        </div>
                        <input type="checkbox" class="form-check-input" id="checkbox"></input>
                    </div>
                </div>
            </div>

            <div className="split"></div>

            <div className="barDown">
                <div className="barDown-items">
                    <a href={process.env.PUBLIC_URL + "/Video"} className="nonActive-icon">
                        <i>
                            <FontAwesomeIcon icon={faHand} />
                        </i>
                        <div className="icon_text">Translate</div>
                    </a>
                    <a href={process.env.PUBLIC_URL + "/Text"} className="nonActive-icon">
                        <i>
                            <FontAwesomeIcon icon={faSearch} />
                        </i>
                        <div className="icon_text">Search</div>
                    </a>
                    <a href={process.env.PUBLIC_URL + "/Lesson"} className="nonActive-icon">
                        <i>
                            <FontAwesomeIcon icon={faBook} />
                        </i>
                        <div className="icon_text">Learn</div>
                    </a>

                    <a href={process.env.PUBLIC_URL + "/Profile"} className="active-icon">
                        <i>
                            <FontAwesomeIcon icon={faGear} />
                        </i>
                        <div className="icon_text">Settings</div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Profile;
