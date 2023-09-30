import './Video.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { faHand } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import Register from '../Register';
import axios from 'axios'
import accessToken from '../Register'
import { useState, useEffect } from "react";

function Video() {
    // function
    const handleClick =() => {
        localStorage.clear();
        window.location.reload()
    }

    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${token}`;
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    )
 
    const [state, setState] = useState('');
    const [posts, setPosts] = useState([]);

    // function handleUpload(e) {
    //     console.log(e.target.files)
      
    // }

    const token = localStorage.getItem('accessToken');

    const handleApi = (e) => {
        e.preventDefault();
        setState(e.target.files[0])
        const formData = new FormData()
        formData.append('file', state);
        axios.post("http://117.6.133.148:8089/api/v1/predict", formData)
        .then((response) => {
          console.log(response.data.body);
          setPosts(response.data.body);
        }) 
      };

    // useEffect(() => {
    //     const formData = new FormData()
    //     formData.append('file', state);
    //     axios.post("http://117.6.133.148:8089/api/v1/predict", formData)
    //         .then(response => {
    //             console.log(response.data.body);
    //             setPosts(response.data.body);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });   
    // }, [] );

    
    
    return (
        <div className='vid-wrap'>
            <div className='barTop'>
             
                <div className='barTop-title'>
                    LGP      
                </div>
                <div className='barTop-exit'>
                    <button className='exit-button' onClick= {handleClick} > 
                    <a href='/register'>
                    <i><FontAwesomeIcon icon={faSignOutAlt} /></i>
                  
                    Log Out
                    </a>
                    </button>
                    
                    </div>
               
            </div>
            <div className='container'>
                <div className='button-wrap'>
                    
                    <div className='container-button'>
                        <div className='buttonTitle'> 
                        Nhãn dự đoán
                        </div>
                        <div className='buttonTitle-VN'> 
                        labelVn: {posts.action_vi}
                        </div>
                        <div className='buttonTitle-EN'> 
                        labelEn: {posts.action_en}
                        </div>
                    </div>

                </div>
                <div className='container-camera'>
               

                      {/* <i>  <FontAwesomeIcon icon={faCamera} /> </i> Upload */}
                      {/* <label className="button-input" for="upload">Upload File</label> */}
                       <input className="upload" type="file" onChange = {handleApi} />
                       
                       <button className='camera_button'> 
                        <i>
                        <FontAwesomeIcon icon={faFolder} />
                        </i>
                        Upload
                        </button>

                </div>
            </div>
            <div className='barDown'>
                <div className='barDown-items'>
                    <a href='/Video' className='active-icon'>
                        <FontAwesomeIcon icon={faHand} />
                    </a>
                    <a href='/Text' className='nonActive-icon'>
                        <FontAwesomeIcon icon={faMessage} />
                    </a>
                    <a href='/Lesson' className='nonActive-icon'>
                        <FontAwesomeIcon icon={faBook} />
                    </a>
                    <a href='/Profile' className='nonActive-icon'>
                        <FontAwesomeIcon icon={faGear} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Video