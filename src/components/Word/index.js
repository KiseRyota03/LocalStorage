import './Word.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
// import { faHand } from '@fortawesome/free-solid-svg-icons'
// import { faBook } from '@fortawesome/free-solid-svg-icons'
// import { faGear } from '@fortawesome/free-solid-svg-icons'
// import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { useState, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import { useNavigate, useLocation } from 'react-router-dom';


function Word() {
    //webcam

    const navigate = useNavigate();

    const { state } = useLocation();
    const { heading } = state; // Read values passed on state
    console.log(heading);

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
            <div className="word-contain">
                <div className="UpContain">
                    <div className="UpContain-icon">
                        <FontAwesomeIcon icon={faPlay} />
                    </div>
                </div>

                <div className="DownContain">
                    {/* <div className="DownContain-icon">
                        <FontAwesomeIcon icon={faCamera} />
                    </div> */}
                    {/* camera */}
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
                    <div className="DownContain-camera">

{/* upload */}
                        <input className="upload" type="file" />
                        <button className="camera_button-word">
                            <i>
                                <FontAwesomeIcon icon={faFolder} />
                            </i>
                            Upload
                        </button>
                    </div>

                </div>
            </div>

            <div className="button-wrap">
                <a href="/Check">
                    <button className="profile-button">Kiểm tra video</button>
                </a>
            </div>
        </div>
    );
}

export default Word;
