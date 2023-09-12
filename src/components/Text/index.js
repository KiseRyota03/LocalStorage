import './Text.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faCamera} from '@fortawesome/free-solid-svg-icons'
import { faHand } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import pic6 from '~/components/pic/pic6.jpg';
import axios from 'axios';
import { useState, useEffect } from "react";

function Text() {
    
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
    
    const [posts, setPosts] = useState([])
    // const getUser = () => {
    //     axios
    //         .get('http://117.6.133.148:8089/api/v1/label')
    //         .then(function (response) {
    //             console.log(response.data.body);
    //             var htmls = response.data.body.map(function (res) {
    //                 return `
    //                 <div className="content-box">
    //                 <img src={pic6} className="box-image" alt=""></img>
    //                 <div className="box-title">${res.labelVn}</div>
    //                 <button className="box-button">CHỌN</button>
    //                 </div>
    //                 `;
    //             });
    //         })

    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };

      useEffect(() => {
        axios.get('http://117.6.133.148:8089/api/v1/label')
            .then(response => {
                console.log(response.data.body);
                setPosts(response.data.body);
            })
            .catch((err) => {
                console.log(err);
            });

          
    }, []);


    return (
        <div className="text-wrap">
            <div className="barTop">
                <div className="barTop-title">LGP</div>
            </div>
            <div className="search-wrap">
                <input placeholder="Tìm kiếm" className="search-input"></input>
                <button className="search-button">
                    <i>
                        {' '}
                        <FontAwesomeIcon icon={faSearch} />
                    </i>
                </button>
            </div>


            {/* 4 - test */}
      
              {/* <div className="content-box"> */}
                {
                    posts.map(post => { 
                    return (
                        <div className="content-box">
                        <img src={pic6} className="box-image" alt=""></img>
                    <div className="box-title" key = {post.id}> {post.labelVn} </div>    
                    <button className="box-button">CHỌN</button>
                    </div>
                    );
                    })
                }
            
            {/* </div> */}

            <div className="barDown">
                <div className="barDown-items">
                    <a href="/Video" className="nonActive-icon">
                        <FontAwesomeIcon icon={faHand} />
                    </a>
                    <a href="/Message" className="active-icon">
                        <FontAwesomeIcon icon={faMessage} />
                    </a>
                    <a href="/Lesson" className="nonActive-icon">
                        <FontAwesomeIcon icon={faBook} />
                    </a>
                    <a href="/Profile" className="nonActive-icon">
                        <FontAwesomeIcon icon={faGear} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Text;
