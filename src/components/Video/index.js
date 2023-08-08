import './Video.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { faHand } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'


function Video() {
    // function
    const handleClick =() => {
        localStorage.clear()
        window.location.reload();
    }
    
    
    
    return (
        <div className='vid-wrap'>
            <div className='barTop'>
             
                <div className='barTop-title'>
                    LGP      
                </div>
                <div className='barTop-exit'>
                    <button className='exit-button' onClick={handleClick}> 
                    <i>       <FontAwesomeIcon icon={faSignOutAlt} /></i>
              
                    Log Out</button>
                    </div>
               
            </div>
            <div className='container'>
                <div className='button-wrap'>
                    <button className='container-button'>
                        Nhãn dự đoán
                    </button>
                </div>
                <div className='container-camera'>
                    <a href='./'>
                        <FontAwesomeIcon icon={faCamera} />
                    </a>
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