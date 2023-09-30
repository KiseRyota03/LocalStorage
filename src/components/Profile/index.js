import './Profile.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faHand } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Profile() {
    const token = localStorage.getItem('accessToken');
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
    const [post, setPost] = useState({
        name: '',
        email: '',
        dateOfBirth: '' ,
        address: '',
        phoneNumber: '',
        language: '',
        supportedBy: '',
        registerType: ''
    });


    const handleInput = (e) => {
        setPost({...post, [e.target.name]: e.target.value})
    }

    const handleLanguage = (e) => {
        setLanguage(1);
    }

    const handleLanguageEn = (e) => {
        setLanguage(2);
    }

    localStorage.setItem('lan', (language));

    useEffect(() => {
        axios.get('http://117.6.133.148:8089/api/v1/user')
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [])

    console.log(language);

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put('http://117.6.133.148:8089/api/v1/user', {post})
            .then((response) => {
                console.log(response.data.body);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="text-wrap">
            <div className="barTop">
                <div className="barTop-title">LGP</div>
            </div>

            <div className="profile-wrap">
                <div className="profile-title">Hồ sơ</div>

                <div className="profile-box">
                    <div className="box-text">Họ tên</div>
                    <input onChange = {handleInput} className="box-fill"></input>
                </div>

                <div className="profile-box">
                    <div className="box-text">Ngày sinh</div>
                    <input onChange = {handleInput} className="box-fill"></input>
                </div>

                <div className="profile-box">
                    <div className="box-text">Địa chỉ</div>
                    <input onChange = {handleInput} className="box-fill"></input>
                </div>

                <div className="profile-box">
                    <div className="box-text box-TextLan">Ngôn ngữ</div>
                    <input className = "radVi" name = "lan" value = "vi" onChange = {handleLanguage} type ="radio" id="vi"></input>
                    <label className = "labVi" for="vi">Việt Nam</label>
                    <input className = "radEn" name = "lan" value = "en" onChange = {handleLanguageEn} type ="radio" id="en"></input>
                    <label for="vi">English</label>
                </div>

                <div className="profile-box">
                    <div className="box-text">E-mail</div>
                    <input onChange = {handleInput} className="box-fill"></input>
                </div>

                <div className="profile-box">
                    <div className="box-text">Số điện thoại</div>
                    <input onChange = {handleInput} className="box-fill"></input>
                </div>
            </div>

            <div className="split"></div>

            <div className="profile-wrap">
                <div className="profile-title">Thông tin tài khoản</div>

                <div className="profile-box">
                    <div className="box-text">Số hồ sơ</div>
                    <input onChange = {handleInput} className="box-fill"></input>
                </div>

                <div className="profile-box">
                    <div className="box-text">Hỗ trợ bởi</div>
                    <input onChange = {handleInput} className="box-fill"></input>
                </div>

                <div className="profile-box">
                    <div className="box-text">Kiểu đăng ký</div>
                    <input onChange = {handleInput} className="box-fill"></input>
                </div>
            </div>
            <div className="button-wrap">
                <button onClick = {handleUpdate} className="profile-button">Lưu thay đổi</button>
            </div>
            <div className="barDown">
                <div className="barDown-items">
                    <a href="/Video" className="nonActive-icon">
                        <FontAwesomeIcon icon={faHand} />
                    </a>
                    <a href="/Text" className="nonActive-icon">
                        <FontAwesomeIcon icon={faMessage} />
                    </a>
                    <a href="/Lesson" className="nonActive-icon">
                        <FontAwesomeIcon icon={faBook} />
                    </a>
                    <a href="/Profile" className="active-icon">
                        <FontAwesomeIcon icon={faGear} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Profile;
