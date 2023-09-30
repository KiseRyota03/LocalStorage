import './Score.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faCamera} from '@fortawesome/free-solid-svg-icons'
import { faHand } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import pic6 from '~/components/pic/pic6.jpg';
import axios from 'axios';
import { useState, useEffect } from 'react';
import lan from '~/components/Profile';
import { useLocation } from 'react-router';
import { useNavigate, useParams } from 'react-router-dom';

function Text() {
    const token = localStorage.getItem('accessToken');
    const lan = localStorage.getItem('lan');

    const navigate = useNavigate();

    axios.interceptors.request.use(
        (config) => {
            config.headers.authorization = `Bearer ${token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );
    const location = useLocation();
    const param = useParams();
    console.log(param.lessonID);

    const [posts, setPosts] = useState([]);

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

    // useEffect(() => {
    //     axios
    //         .get('http://117.6.133.148:8089/api/v1/label')
    //         .then((response) => {
    //             console.log(response.data.body);
    //             setPosts(response.data.body);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

    useEffect(() => {
        const api_url = `http://117.6.133.148:8089/api/v1/list-labels-by-subjectId?&subjectId=${param.lessonID}`;
        axios
            .get(api_url)
            .then((response) => {
                console.log(response.data.body.listLevel);
                setPosts(response.data.body.listLevel);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // console.log(lan);

    return (
        <div className="text-wrap">
            <div className="barTop">
                <div className="barTop-title">LGP</div>
            </div>
            <div className="search-wrap">

            </div>

            {
                //     <a>
                //     <button onClick= {() => {
                //         navigate(`/lesson/${post.id}`, {state:{id:`${post.id}`}})
                //     }} key = {post.id} className="lesson-button">{post.name}

                //     </button>
                // </a>
                posts.map((post) => {
                    return (
                        <a
                            className="content-add"
                            onClick={() => {
                                navigate(`/Text/${post.id}`, { state: { id: `${post.id}` } });
                            }}
                            key={post.id}
                        >
                            {post.listLabel.map((pos) => {
                                if (post.levelId == param.lessonID) {
                                    return (
                                        <div className="content-box">
                                            <img src={pic6} className="box-image" alt=""></img>
                                            <div className="box-title" key={pos.id}>
                                                {' '}
                                                {pos.labelVn}{' '}
                                            </div>
                                            <button className="box-button">CHỌN</button>
                                        </div>
                                    );
                                }
                            })}
                        </a>
                    );

                    // else {
                    //     return (
                    //         <a className ="content-add" onClick ={() => {
                    //             navigate(`/Text/${post.id}`, {state: {id: `${post.id}`}})
                    //         }} key = {post.id}>
                    //             <div className="content-box">
                    //                 <img src={pic6} className="box-image" alt=""></img>
                    //                 <div className="box-title" key={post.id}>
                    //                     {' '}
                    //                     {post.labelEn}{' '}
                    //                 </div>
                    //                 <button className="box-button">CHỌN</button>
                    //             </div>
                    //         </a>
                    //     );
                    // }
                })
            }

            <div className="button-wrap">
                <a href="/Point">
                    <button className="profile-button">Score</button>
                </a>
            </div>

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
