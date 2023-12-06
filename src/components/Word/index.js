import './Word.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { useState, useCallback, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import ReactPlayer from 'react-player';


function Word() {
    //webcam

    const navigate = useNavigate();

    const { state } = useLocation();
    const { heading } = state; // Read values passed on state

    const videoConstraints = {
        width: 420,
        height: 630,
        aspectRatio: 0.6666666667,
        facingMode: 'user',
    };

    // const realFileBtn = document.getElementById("real-file");
    const customBtn = document.getElementById("custom-btn");
  
    const realFile = () => {
        const realFileBtn = document.getElementById("real-file");
        if (realFileBtn){
            realFileBtn.click();
        }else{
            console.log("realFileBtn null")
        }
    };

    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);

    const handleDataAvailable = useCallback(
        ({ data }) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks],
    );
    

    const handleStartCaptureClick = useCallback(() => {
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: 'video/webm',
        });
        mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
        mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

    const handleStopCaptureClick = useCallback(() => {
        mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [mediaRecorderRef, setCapturing]);

    useEffect(() => {
        if (recordedChunks.length) {
            console.log('detected end record ', recordedChunks.length)
            const blob = new Blob(recordedChunks, {
                type: 'video/webm',
            });
            const formData = new FormData();
            blob.lastModifiedDate = new Date();
            blob.name = 'data.webm';
            formData.append('file', blob);
            axios.post(`https://ptit.io.vn/api/v1/checkVideo?label=${heading}`, formData).then((response) => {
                console.log(response.data.body);
                setPosts(response.data.body.score);
            });
            setRecordedChunks([]);
        }
    }, [recordedChunks])

    const handleDownload = useCallback(() => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: 'video/webm',
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.style = 'display: none';
            a.href = url;
            a.download = 'react-webcam-stream-capture.webm';
            a.click();
            window.URL.revokeObjectURL(url);
            setRecordedChunks([]);
        }
    }, [recordedChunks]);

    const [stat, setStat] = useState('');
    const [posts, setPosts] = useState([]);
    const [lessons, setLessons] = useState([]);

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

    useEffect(() => {
        axios
            .get(`https://ptit.io.vn/api/v1/video?label=${heading}`)
            .then((response) => {
                console.log(response.data.body.video_url);
                setLessons(response.data.body.video_url);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleApi = (e) => {
        e.preventDefault();
        setStat(e.target.files[0]);
        const formData = new FormData();
        formData.append('file', stat);
        axios.post(`https://ptit.io.vn/api/v1/checkVideo?label=${heading}`, formData).then((response) => {
            console.log(response.data.body.score);
            setPosts(response.data.body.score);
        });
    };

    return (
        <div className="text-wrap">
           <a onClick={() => navigate(-1)} className="arrow-return">
                        <i>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </i>
                    </a>
            <div className="word-title">{heading}</div>
           
            <div className="video-contain">
            
            <ReactPlayer
                url= {lessons}
                width="300px"
                height="170px"
                playing={true}
                controls={true}
            />

          
            </div>
                
                <div className="DownContain">
                   <div className="webcam_controller">
                    <Webcam mirrored={true} audio={false} videoConstraints={videoConstraints} ref={webcamRef} />
                    <div className='button-handler'>

                    {capturing ? (
                        <button onClick={handleStopCaptureClick}>
                              <FontAwesomeIcon className="button_camera" icon={faCircle} />
                            Stop Capture
                            </button>
                    ) : (
                        <button onClick={handleStartCaptureClick}>
                            <FontAwesomeIcon className="button_camera" icon={faCamera} />
                            Start Capture
                        </button>
                    )}
                       
                       <input className="upload" id="real-file" type="file" hidden="hidden" onChange={handleApi} />
                        
                        <button id= "custom-btn" onClick= {realFile} className="camera_button">
                            <i>
                                <FontAwesomeIcon icon={faFolder} />
                            </i>
                            Upload

                        </button>
                    {recordedChunks.length > 0 && (
                        <button onClick={handleDownload}>
                            <i>
                            
                                <FontAwesomeIcon  className="button_camera" icon={faDownload} />
                            </i>
                            Download
                        </button>
                    )}
                    </div>
                </div>
                <div className='video_score'>
                    <div className='video_score-text'> 

                    Score: {posts}
                    </div>
                </div>
                
               
                </div>

           
        </div>
    );
}

export default Word;
