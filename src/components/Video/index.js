import './Video.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCamera, faCircle} from '@fortawesome/free-solid-svg-icons';
import {faHand} from '@fortawesome/free-solid-svg-icons';
import {faBook} from '@fortawesome/free-solid-svg-icons';
import {faGear} from '@fortawesome/free-solid-svg-icons';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {faFolder} from '@fortawesome/free-solid-svg-icons';
import {faDownload} from '@fortawesome/free-solid-svg-icons';
import Register from '../Register';
import axios from 'axios';
import accessToken from '../Register';
import {useState, useCallback, useRef, useEffect} from 'react';
import Webcam from 'react-webcam';


function Video() {
    //webcam
    const videoConstraints = {
        width: {min: 420},
        height: {min: 630},
        aspectRatio: 0.6666666667,
        facingMode: 'user',
    };

    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);

    const realFileBtn = document.getElementById("real-file");
    const customBtn = document.getElementById("custom-btn");

    const realFile = () => {
        realFileBtn.click();
    };

    const handleDataAvailable = useCallback(
        ({data}) => {
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
            axios.post('https://ptit.io.vn/api/v1/predict', formData).then((response) => {
                console.log(response.data.body);
                setPosts(response.data.body.prediction[0]);
            });
            setRecordedChunks([]);
        }
    }, [recordedChunks])

    const handleDownload = useCallback(() => {
        if (recordedChunks.length) {
            console.log('download detected ', recordedChunks.length)
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
        axios.post('https://ptit.io.vn/api/v1/predict', formData).then((response) => {
            console.log(response.data.body);
            setPosts(response.data.body.prediction[0]);
        });
    };

    return (
        <div className="vid-wrap">

            <div className="container">
                <div className="button-wrap">
                    <div className="container-button">
                        <div className="buttonTitle">Nhãn dự đoán: {posts.action_name}</div>
                        {/* <div className="buttonTitle-VN">Nhãn dự đoán: {posts.action_name}</div> */}
                    </div>
                </div>

                <div className="webcam_controller">
                    <Webcam mirrored={true} audio={false} videoConstraints={videoConstraints} ref={webcamRef}/>
                    <div className='button-handler'>

                        {capturing ? (
                            <button onClick={handleStopCaptureClick}>
                                <FontAwesomeIcon className="button_camera" icon={faCircle}/>
                                Stop Capture
                            </button>
                        ) : (
                            <button onClick={handleStartCaptureClick}>
                                <FontAwesomeIcon className="button_camera" icon={faCamera}/>
                                Start Capture
                            </button>
                        )}

                        <input className="upload" id="real-file" type="file" hidden="hidden" onChange={handleApi}/>

                        <button id="custom-btn" onClick={realFile} className="camera_button">
                            <i>
                                <FontAwesomeIcon icon={faFolder}/>
                            </i>
                            Upload

                        </button>
                        {recordedChunks.length > 0 && (
                            <button onClick={handleDownload}>
                                <i>

                                    <FontAwesomeIcon className="button_camera" icon={faDownload}/>
                                </i>
                                Download
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="barDown">
                <div className="barDown-items">
                    <a href={process.env.PUBLIC_URL + "/Video"} className="active-icon">
                        <i>
                            <FontAwesomeIcon icon={faHand}/>
                        </i>
                        <div className='icon_text'>
                            Translate
                        </div>
                    </a>
                    <a href={process.env.PUBLIC_URL + "/Text"} className="nonActive-icon">
                        <i>
                            <FontAwesomeIcon icon={faSearch}/>
                        </i>
                        <div className='icon_text'>
                            Search
                        </div>
                    </a>
                    <a href={process.env.PUBLIC_URL + "/Lesson"} className="nonActive-icon">
                        <i>
                            <FontAwesomeIcon icon={faBook}/>
                        </i>
                        <div className='icon_text'>
                            Learn
                        </div>

                    </a>

                    <a href={process.env.PUBLIC_URL + "/Profile"} className="nonActive-icon">
                        <i>
                            <FontAwesomeIcon icon={faGear}/>
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

export default Video;
