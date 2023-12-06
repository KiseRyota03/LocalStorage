import './TextToVideo.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useLocation } from 'react-router';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import lan from '~/components/Profile';
import ReactPlayer from 'react-player';

function Word() {
    const token = localStorage.getItem('accessToken');
    const lan = localStorage.getItem('lan');
    const location = useLocation();

    const navigate = useNavigate();
    const param = useParams();
    const level = param.lessonID;

    const { state } = useLocation();
    const { id, headers } = state;
    console.log(id, headers);

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


    useEffect(() => {
        axios
            .get(`https://ptit.io.vn/api/v1/video?label=${headers}`)
            .then((response) => {
                console.log(response.data.body);
                setLessons(response.data.body.video_url);
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
            <div className="word-title">{headers}</div>

            <div className="video-contain">
            <ReactPlayer
                url= {lessons}
                width="300px"
                height="170px"
                playing={true}
                controls={true}
                
            />

          
            </div>

       

        </div>
    );
}

export default Word;
