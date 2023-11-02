import './Lesson.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faHand } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Lesson() {
    let users = [];

    const navigate = useNavigate();

    const { lessonID } = useParams();
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

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios
            .get('http://117.6.133.148:8089/api/v1/subject')
            .then((response) => {
                console.log(response.data.body);
                setPosts(response.data.body);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="text-lesson">
            <div className="barTop">
                <div className="barTop-title">LGP</div>
            </div>
            <div className="lesson-contain">
                <div className="lesson-wrap">
                    {posts.map((post) => {
                        return (
                            <div className="lesson-item">
                                <a className="lesson-click">
                                    <button
                                        onClick={() => {
                                            navigate(`/lesson/${post.id}`, {
                                                state: { id: `${post.id}`, name: `${post.name}` },
                                            });
                                        }}
                                        key={post.id}
                                        className="lesson-button"
                                    >
                                        {post.name}
                                    </button>
                                </a>
                            </div>
                        );
                    })}
                  
                </div>
                <div className="barDown">
                <div className="barDown-items">
                    <a href="/Video" className="nonActive-icon">
                        <i>
                        <FontAwesomeIcon icon={faHand} />
                        </i>
                        <div className='icon_text'> 
                        Translate
                        </div>
                    </a>
                    <a href="/Text" className="nonActive-icon">
                    <i>
                        <FontAwesomeIcon icon={faSearch} />
                        </i>
                        <div className='icon_text'> 
                        Search
                        </div>
                    </a>
                    <a href="/Lesson" className="active-icon">
                    <i>
                        <FontAwesomeIcon icon={faBook} />
                        </i>
                        <div className='icon_text'> 
                        Learn
                        </div>

                    </a>
                    
                    <a href="/Profile" className="nonActive-icon">
                        <i>
                        <FontAwesomeIcon icon={faGear} />
                        </i>
                        <div className='icon_text'> 
                        Settings
                        </div>
                    </a>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Lesson;
