import './LearnByWord.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
// import { faHand } from '@fortawesome/free-solid-svg-icons'
// import { faBook } from '@fortawesome/free-solid-svg-icons'
// import { faGear } from '@fortawesome/free-solid-svg-icons'
// import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import lan from '~/components/Profile';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';

function Word() {
    const token = localStorage.getItem('accessToken');
    const lan = localStorage.getItem('lan');
    const navigate = useNavigate();

    const { state } = useLocation();
    const { title, levelId, subjectId } = state; // Read values passed on state
    console.log(title, levelId, subjectId);

    axios.interceptors.request.use(
        (config) => {
            config.headers.authorization = `Bearer ${token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    const [lessons, setLessons] = useState([]);
    const location = useLocation();

    useEffect(() => {
        axios
            .get(`http://117.6.133.148:8089/api/v1/video?label=${title}`)
            .then((response) => {
                console.log(response.data.body.video_url);
                setLessons(response.data.body.video_url);
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
                <h2>{title}</h2>
            </div>
            <div className="video-contain">
                <ReactPlayer url={lessons} width="300px" height="170px" playing={true} controls={true} />
            </div>
            <div className="button-wrap">
                <a onClick={() => navigate(-1)}>
                    <button className="profile-button">Quay lại</button>
                </a>
            </div>
        </div>
    );
}

export default Word;
