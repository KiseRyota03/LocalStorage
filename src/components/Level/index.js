import './Level.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faHand } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';
import { useNavigate, useParams } from 'react-router-dom';

function Level() {
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
    const location = useLocation();

    useEffect(() => {
        axios
            .get('http://117.6.133.148:8089/api/v1/level')
            .then((response) => {
                console.log(response.data.body);
                setLevels(response.data.body);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        const api_url = `http://117.6.133.148:8089/api/v1/list-labels-by-subjectId?&subjectId=${location.state.id}`;
        axios
            .get(api_url)
            .then((response) => {
                console.log(response.data.body.listLevel);
                setLessons(response.data.body.listLevel);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="text-wrap">
            <div className="barTop">
                <div className="barTop-title">
                    <a href="/lesson" className="arrow-return">
                        <i>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </i>
                    </a>
                    LGP
                </div>
            </div>

            {lessons.map((lesson) => {
                return (
                    <div>
                        <div className="level-heading">
                            <div className="level-title">
                                Cấp độ {lesson.levelId}
                            </div>
                        </div>

                        <div className="level-contain">

                            {lesson.listLabel.map((les) => {
                                return (
                                <div className="level-item">
                                <a href="/Word">
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
                    <a href="/Video" className="nonActive-icon">
                        <FontAwesomeIcon icon={faHand} />
                    </a>
                    <a href="/Text" className="nonActive-icon">
                        <FontAwesomeIcon icon={faMessage} />
                    </a>
                    <a href="/Lesson" className="active-icon">
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

export default Level;
