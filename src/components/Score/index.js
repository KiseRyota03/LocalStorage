import './Score.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faCamera} from '@fortawesome/free-solid-svg-icons'
import { faHand } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
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

    const [search, setSearch] = useState('');

    const navigate = useNavigate();
    const { state } = useLocation();
    const { title, level_title } = state; // Read values passed on state
    console.log(title, level_title);

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
        const api_url = `https://ptit.io.vn/api/v1/list-labels-by-subjectId?&subjectId=${level_title}`;
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
            <a onClick={() => navigate(-1)} className="arrow-return">
                        <i>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </i>
                    </a>
            <div className="score-heading">
                <h2 className='point-title'>{title}</h2>
                <h4>Cấp độ {param.lessonID}</h4>
            </div>
            {posts.map((post) => {
                return (
                    <a className="content-add">
                        {post.listLabel.map((pos) => {
                            if (post.levelId == param.lessonID) {
                                return (
                                    <a className='content-add'
                                    onClick={() => {
                                        navigate(`/LearnByWord`, {
                                            state: {
                                                title: `${pos.labelVn}`,
                                                levelId: `${pos.levelId}`,
                                                subjectId: `${pos.subjectId}`,
                                            },
                                        });
                                    }}>
                                      <div className="content-box">
                                    <div className='content-wrap'>

                                    <img src={pic6} className="box-image" alt=""></img>
                                    <div className="box-title" key={pos.id}>
                                        {pos.labelVn}
                                    </div>
                                    </div>
                                {/* <i className='content-icon'>
                                <FontAwesomeIcon icon={faBookmark} />
                                </i> */}

                                </div>
                                    </a>
                                );
                            }
                        })}
                    </a>
                );
            })}

            <div
                onClick={() => {
                    navigate(`/Point`, {
                        state: { levelId: `${param.lessonID}`, subjectId: `${level_title}`, pointTitle: `${title}` },
                    });
                }}
                className="button-wrap"
            >
                <button className="profile-button">Score</button>
            </div>

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
                    <a href={process.env.PUBLIC_URL + "/Lesson"} className="active-icon">
                        <i>
                            <FontAwesomeIcon icon={faBook} />
                        </i>
                        <div className="icon_text">Learn</div>
                    </a>

                    <a href={process.env.PUBLIC_URL + "/Profile"} className="nonActive-icon">
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

export default Text;
