import './Score.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faCamera} from '@fortawesome/free-solid-svg-icons'
import { faHand } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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
    const {state} = useLocation();
    const {title } = state; // Read values passed on state
    console.log(title);

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


    return (
        <div className="text-wrap">
              <div className="barTop">
                <div className="barTop-title">
                    <a onClick={() => navigate(-1)} className="arrow-return">
                        <i>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </i>
                    </a>
                    LGP
                </div>
            </div>
            <div className="score-heading">
                <h2>
                {title}
                </h2>
                <h4>
                    Cấp độ {param.lessonID}
                </h4>
            </div>
            {
                

                posts.map((post) => {
                    return (
                        <a
                            className="content-add"
                          
                        >
                            {post.listLabel.map((pos) => {
                                if (post.levelId == param.lessonID) {
                                    return (
                                        <div onClick={() => {
                                            navigate(`/Text`, {
                                                state: { title: `${pos.labelVn}` },
                                            });
                                        }}
                                        className="content-box"
                                        >
                                            <img src={pic6} className="box-image" alt=""></img>
                                            <div className="box-title" key={pos.id}>
                                                {pos.labelVn}
                                            </div>
                                            <button className="box-button">CHỌN</button>
                                        </div>
                                    );
                                }
                            })}
                        </a>
                    );

                
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
