import './Text.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faCamera} from '@fortawesome/free-solid-svg-icons'
import { faHand } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import pic6 from '~/components/pic/pic6.jpg';
import axios from 'axios';
import { useState, useEffect } from 'react';
import lan from '~/components/Profile';
import { useNavigate, useParams } from 'react-router-dom';

function Text() {
    const token = localStorage.getItem('accessToken');
    const lan = localStorage.getItem('lan');

    const navigate = useNavigate();
    const { textID } = useParams();

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

    const [search, setSearch] = useState('');
    console.log(search)


    
    

    useEffect(() => {
        axios
            .get('https://ptit.io.vn/api/v1/label')
            .then((response) => {
                console.log(response.data.body);
                setPosts(response.data.body);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    console.log(lan);
    return (
        <div className="text-wrap">
                <div className="profile-title">Search</div>
            <form className="search-bar">
                <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Tìm kiếm..." className="search-input"></input>
                <i>
                    <FontAwesomeIcon icon={faSearch} />
                </i>
            </form>
            <div id='content-list'> 
            {
                posts.filter((post) => {
                    return search.toLowerCase() === '' ? post : post.labelVn.includes(search)
                }).map((post) => {
                    if (lan == 1) {
                        return (
                            
                            <a
                                className="content-add"
                                onClick={() => {
                                    navigate(`/Text/${post.id}`, {
                                        state: { id: `${post.id}`, headers: `${post.labelVn}` },
                                    });
                                }}
                                key={post.id}
                            >
                                <div className="content-box">
                                    <div className='content-wrap'>

                                    <img src={pic6} className="box-image" alt=""></img>
                                    <div className="box-title" key={post.id}>
                                        {post.labelVn}
                                    </div>
                                    </div>
                                <i className='content-icon'>
                                <FontAwesomeIcon icon={faBookmark} />
                                </i>

                                </div>
                            </a>
                        );
                    } else {
                        return (
                            <a
                                className="content-add"
                                onClick={() => {
                                    navigate(`/Text/${post.id}`, {
                                        state: { id: `${post.id}`, headers: `${post.labelVn}` },
                                    });
                                }}
                                key={post.id}
                            >
                                <div className="content-box">
                                    <div className='content-wrap'>

                                    <img src={pic6} className="box-image" alt=""></img>
                                    <div className="box-title" key={post.id}>
                                        {post.labelEn}
                                    </div>
                                    </div>
                                <i className='content-icon'>
                                <FontAwesomeIcon icon={faBookmark} />
                                </i>

                                </div>
                            </a>
                        );
                    }
                })
            }
           </div>
            <div className="barDown">
                <div className="barDown-items">
                    <a href={process.env.PUBLIC_URL + "/Video"} className="nonActive-icon">
                        <i>
                        <FontAwesomeIcon icon={faHand} />
                        </i>
                        <div className='icon_text'> 
                        Translate
                        </div>
                    </a>
                    <a href={process.env.PUBLIC_URL + "/Text"} className="active-icon">
                    <i>
                        <FontAwesomeIcon icon={faSearch} />
                        </i>
                        <div className='icon_text'> 
                        Search
                        </div>
                    </a>
                    <a href={process.env.PUBLIC_URL + "/Lesson"} className="nonActive-icon">
                    <i>
                        <FontAwesomeIcon icon={faBook} />
                        </i>
                        <div className='icon_text'> 
                        Learn
                        </div>

                    </a>
                    
                    <a href={process.env.PUBLIC_URL + "/Profile"} className="nonActive-icon">
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
    );
}

export default Text;
