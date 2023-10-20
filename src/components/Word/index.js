import './Word.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
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
        width: { min: 420 },
        height: { min: 630 },
        aspectRatio: 0.6666666667,
        facingMode: 'user',
    };

    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [scoring,setScoring] = useState(false);

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
            .get(`http://117.6.133.148:8089/api/v1/video?label=${heading}`)
            .then((response) => {
                console.log(response.data.body.video_url);
                setLessons(response.data.body.video_url);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleApi = (e) => {
        console.log('1');
        e.preventDefault();
        setStat(e.target.files[0]);
        const formData = new FormData();
        formData.append('file', stat);
        setScoring(true);
        axios.post(`http://117.6.133.148:8089/api/v1/checkVideo?label=${heading}`, formData).then((response) => {
            console.log(response.data.body.score);
            setPosts(response.data.body.score);
        });
    };

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
                    <Webcam mirrored={true} audio={true} videoConstraints={videoConstraints} ref={webcamRef} />
                    {capturing ? (
                        <button onClick={handleStopCaptureClick}>Stop Capture</button>
                    ) : (
                        <button onClick={handleStartCaptureClick}> 
                        <FontAwesomeIcon className='button_camera' icon={faCamera} />
                        Start Capture</button>
                    )}
                    <br></br>
                    {recordedChunks.length > 0 && <button onClick={handleDownload}>Download</button>}
                </div>


                <div className="container-camera">
                    <input className="upload" type="file" onChange ={handleApi} />

                    <button className="camera_button">
                        <i>
                            <FontAwesomeIcon icon={faFolder} />
                        </i>
                        Upload
                    </button>
                </div>
                { scoring ? (  <div className='video_score'>
                    Score: {posts}
                </div>
                ): (
                    <div className='video_score'>
                </div>
                )}
               
                </div>

           
        </div>
    );
}

export default Word;
