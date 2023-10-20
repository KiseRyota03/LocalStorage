import './Video.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { faHand } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import Register from '../Register';
import axios from 'axios';
import accessToken from '../Register';
import { useState, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';

function Video() {
    //webcam
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

    // sign out
    const handleClick = () => {
        localStorage.clear();
        window.location.reload();
    };

    axios.interceptors.request.use(
        (config) => {
            config.headers.authorization = `Bearer ${token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    const [state, setState] = useState('');
    const [posts, setPosts] = useState([]);

    const token = localStorage.getItem('accessToken');

    const handleApi = (e) => {
        e.preventDefault();
        setState(e.target.files[0]);
        const formData = new FormData();
        formData.append('file', state);
        axios.post('http://117.6.133.148:8089/api/v1/predict', formData).then((response) => {
            console.log(response.data.body);
            setPosts(response.data.body.prediction);
        });
    };

    return (
        <div className="vid-wrap">
            <div className="barTop">
                <div className="barTop-title">LGP</div>
                <div className="barTop-exit">
                    <button className="exit-button" onClick={handleClick}>
                        <a href="/register">
                            <i>
                                <FontAwesomeIcon icon={faSignOutAlt} />
                            </i>
                            Log Out
                        </a>
                    </button>
                </div>
            </div>
            <div className="container">
                <div className="button-wrap">
                    <div className="container-button">
                        <div className="buttonTitle">Nhãn dự đoán</div>

                        {posts.map((post) => {
                            return <div className="buttonTitle-VN">labelVn: {post.action_name}</div>;
                        })}
                    </div>
                </div>

                <div className="webcam_controller">
                    <Webcam mirrored={true} audio={false} videoConstraints={videoConstraints} ref={webcamRef} />
                    {capturing ? (
                        <button onClick={handleStopCaptureClick}>Stop Capture</button>
                    ) : (
                        <button onClick={handleStartCaptureClick}>
                            <FontAwesomeIcon className="button_camera" icon={faCamera} />
                            Start Capture
                        </button>
                    )}
                    <br></br>
                    <div className="container-camera">
                        <input className="upload" type="file" onChange={handleApi} />

                        <button className="camera_button">
                            <i>
                                <FontAwesomeIcon icon={faFolder} />
                            </i>
                            Upload
                        </button>
                    </div>
                    {recordedChunks.length > 0 && (
                        <button onClick={handleDownload}>
                            <i>
                            
                                <FontAwesomeIcon icon={faDownload} />
                            </i>
                            Download
                        </button>
                    )}
                </div>
            </div>
            <div className="barDown">
                <div className="barDown-items">
                    <a href="/Video" className="active-icon">
                        <FontAwesomeIcon icon={faHand} />
                    </a>
                    <a href="/Text" className="nonActive-icon">
                        <FontAwesomeIcon icon={faMessage} />
                    </a>
                    <a href="/Lesson" className="nonActive-icon">
                        <FontAwesomeIcon icon={faBook} />
                    </a>
                    <a href="/Profile" className="nonActive-icon">
                        <FontAwesomeIcon icon={faGear} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Video;
