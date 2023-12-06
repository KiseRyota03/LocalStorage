import './Lesson.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faHand } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import pic7 from '~/components/pic/pic7.jpg';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

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
            .get('https://ptit.io.vn/api/v1/subject')
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
            
            <div className="profile-title">Learn</div>

            <div className="lesson-contain">
                <div className="lesson-wrap">
                    {posts.map((post) => {
                        return (
                            <a
                                className="lesson-item"
                                onClick={() => {
                                    navigate(`/lesson/${post.id}`, {
                                        state: { id: `${post.id}`, name: `${post.name}` },
                                    });
                                }}
                                key={post.id}
                            >
                                <img src={pic7} className="lesson-image" alt=""></img>

                                <div className="lesson-des">
                                    <div className='lesson-title'>
                                    {post.name}

                                    </div>
                                    <i>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                    </i>
                                    </div>
                            </a>
                        );
                    })}
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
        </div>
    );
}

export default Lesson;
