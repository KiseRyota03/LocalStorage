import './Word.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
// import { faHand } from '@fortawesome/free-solid-svg-icons'
// import { faBook } from '@fortawesome/free-solid-svg-icons'
// import { faGear } from '@fortawesome/free-solid-svg-icons'
// import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function Word() {
    return (
        <div className='text-wrap'>
            <div className="barTop">
                <div className="barTop-title">
                    <a href="/lesson" className="arrow-return">
                        <i>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </i>
                    </a>
                    LGP
                </div>
            </div>
            <div className='word-title'>
                Từ 2
            </div>
            <div className='word-contain'>

                <div className='UpContain'>
                    <div className='UpContain-icon'>
                        <FontAwesomeIcon icon={faPlay} />
                    </div>
                </div>

                <div className='DownContain'>
                    <div className='DownContain-icon'>
                        <FontAwesomeIcon icon={faCamera} />
                    </div>
                </div>

            </div>

            <div className='button-wrap'>
                <a href='/Check'>
                    <button className='profile-button'>
                        Kiểm tra video
                    </button>
                </a>
            </div>
        </div>
    );
}

export default Word