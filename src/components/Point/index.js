import './Point.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBook } from '@fortawesome/free-solid-svg-icons'
// import { faHand } from '@fortawesome/free-solid-svg-icons'
// import { faMessage } from '@fortawesome/free-solid-svg-icons'
// import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faBolt } from '@fortawesome/free-solid-svg-icons'
// import pic8 from '~/components/pic/pic8.jpg'
import pic6 from '~/components/pic/pic6.jpg'
import correct from '~/components/pic/correct.png'
import wrong from '~/components/pic/wrong.png'

import card from '~/components/pic/card.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';

function Point() {
    const navigate = useNavigate();

    const token = localStorage.getItem('accessToken');
    const { state } = useLocation();
    const { levelId, subjectId, pointTitle } = state;
    console.log(levelId, subjectId, pointTitle);
    axios.interceptors.request.use(
        (config) => {
            config.headers.authorization = `Bearer ${token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    const [posts, setPosts] = useState([]);
    const [lessons, setLessons] = useState([]);
    useEffect(() => {
        axios
            .post(`https://ptit.io.vn/api/v1/scoreWithSubject?levelIds=${levelId}?subjectIds=${subjectId}`)
            .then((response) => {
                setPosts(response.data.body.scoreList);
                console.log(response.data.body);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    
    useEffect(() => {
        axios.get(`https://ptit.io.vn/api/v1/list-labels-by-subjectId?&subjectId=${subjectId}`)    
            .then((response) => {
                setLessons(response.data.body.listLevel);
                console.log(response.data.body);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    

    return (
        <div className='vid-wrap'>
                               <a onClick={() => navigate(-1)} className='arrow-return'>
                        <i>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </i>
                    </a>
           <div className="point-title profile-title">{pointTitle}</div>
            
           {lessons.map((lesson) => {
                return (
                    <div>
                        <div className="level-heading">
                            <a
                              
                                className="lesson-add"
                            >
                            </a>
                        </div>
                        <div className="level-contain">
                            {lesson.listLabel.map((les) => {
                                if(lesson.levelId == levelId) {
                                    return (
                                        <div className="level-item">
                                            <a
                                                className="lesson-add"
                                            >
                                                <div className="item-content">{les.labelVn}</div>
                                                <div className="item-text">35 điểm</div>
                                            </a>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                );
            })}
        
       

                {/* <div className='point-bear'>
                    .
                </div>

                <div className='point-box'>
                    <div className='box-correct'>
                        <div className='correct-num'>
                            6
                        </div>
                        <div className='correct-text'>
                            Trung bình
                        </div>
                    </div>
                 

                </div> */}
           
            

{/*             
            <div className='button-wrap'>
                <a onClick={() => navigate(-1)}>
                    <button className='profile-button'>
                        Trở lại
                    </button>
                </a>
            </div> */}

        </div>
    );
}

export default Point