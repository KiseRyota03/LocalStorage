import './TextToVideo.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
// import { faHand } from '@fortawesome/free-solid-svg-icons'
// import { faBook } from '@fortawesome/free-solid-svg-icons'
// import { faGear } from '@fortawesome/free-solid-svg-icons'
// import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import lan from '~/components/Profile';


function Word() {
    const token = localStorage.getItem('accessToken');
    const lan = localStorage.getItem('lan');

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

    console.log(location.state.id);
    useEffect(() => {
        axios
            .get('http://117.6.133.148:8089/api/v1/label')
            .then((response) => {
                console.log(response.data.body);
                setLessons(response.data.body);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    
    return (
        <div className='text-wrap'>
            <div className="barTop">
                <div className="barTop-title">
                    <a href="/Text" className="arrow-return">
                        <i>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </i>
                    </a>
                    LGP
                </div>
            </div>
            {
                lessons.map((lesson) => {
                    if(location.state.id == lesson.id)
                        if(lan==1) {
                            return(
                                <div className='word-title' >
                                  {lesson.labelVn}
                                 </div>
                                  )
                        }
                        else {
                            return(
                                <div className='word-title' >
                                  {lesson.labelEn}
                                 </div>
                                  )
                        }
                 

                })
            }
         
                
            <div className='word-contain'>

                <div className='UpContain'>
                    <div className='UpContain-icon'>
                        <FontAwesomeIcon icon={faPlay} />
                    </div>
                </div>

                {/* <div className='DownContain'>
                    <div className='DownContain-icon'>
                        <FontAwesomeIcon icon={faCamera} />
                    </div>
                </div> */}

            </div>

            <div className='button-wrap'>
                <a href='/Text'>
                    <button className='profile-button'>
                        Quay lại
                    </button>
                </a>
            </div>
        </div>
    );
}

export default Word