import './Level.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faHand } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';
import { useNavigate, useParams } from 'react-router-dom';

function Level() {
    const location = useLocation();
    const navigate = useNavigate();
    const param = useParams();
    const level = param.lessonID;

    const { state } = useLocation();
    const { id, name } = state; // Read values passed on state

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

    const [levels, setLevels] = useState([]);
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        const api_url = `https://ptit.io.vn/api/v1/list-labels-by-subjectId?&subjectId=${location.state.id}`;
        axios
            .get(api_url)
            .then((response) => {
                console.log(response.data.body.listLevel);
                setLessons(response.data.body.listLevel);
                // setLevels(response.data.body);
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
            <h2 className="level-top"> 
        
            {name}</h2>
            
            {lessons.map((lesson) => {
                return (
                    <div>
                        <div className="level-heading">
                            <a
                                onClick={() => {
                                    navigate(`/lesson/${param.lessonID}/${lesson.levelId}`, {
                                        state: { title: `${name}`, level_title: `${level}` },
                                    });
                                }}
                                className="lesson-add"
                            >
                                <div className="level-title">Cấp độ {lesson.levelId}</div>
                            </a>
                        </div>
                        <div className="level-contain">
                            {lesson.listLabel.map((les) => {
                                return (
                                    <div className="level-item">
                                        <a
                                            onClick={() => {
                                                navigate(`/Word`, {
                                                    state: { heading: `${les.labelVn}` },
                                                });
                                            }}
                                            className="lesson-add"
                                        >
                                            <div className="item-content">{les.labelVn}</div>
                                            <div className="item-text">35 điểm</div>
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
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

export default Level;
