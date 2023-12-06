import './Subject.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBook } from '@fortawesome/free-solid-svg-icons'
// import { faHand } from '@fortawesome/free-solid-svg-icons'
// import { faMessage } from '@fortawesome/free-solid-svg-icons'
// import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import pic6 from '~/components/pic/pic6.jpg'

function Subject() {
    return (
        <div className='vid-wrap'>
            <div className='barTop'>

                <div className='barTop-title'>
                    <a href={process.env.PUBLIC_URL + '/level'} className='arrow-return'>
                        <i>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </i>
                    </a>
                    LGP
                </div>
            </div>

            <div className='subject-title'>
                Chủ đề 2
            </div>
            {/* 1 */}
            <div className='content-box'>
                <img src={pic6} className='box-image' alt=''>

                </img>
                <div className='box-title'>
                    Từ 1
                </div>
                <a href={process.env.PUBLIC_URL + '/word'}>
                    <button className='box-button'>
                        CHỌN
                    </button>
                </a>
            </div>
            {/* 2 */}
            <div className='content-box'>
                <img src={pic6} className='box-image' alt=''>

                </img>
                <div className='box-title'>
                    Từ 2
                </div>
                <a href={process.env.PUBLIC_URL + '/word'}>
                    <button className='box-button'>
                        CHỌN
                    </button>
                </a>
            </div>

            {/* 3 */}
            <div className='content-box'>
                <img src={pic6} className='box-image' alt=''>

                </img>
                <div className='box-title'>
                    Từ 3
                </div>
                <a href={process.env.PUBLIC_URL + '/word'}>
                    <button className='box-button'>
                        CHỌN
                    </button>
                </a>
            </div>

            {/* 4 */}
            <div className='content-box'>
                <img src={pic6} className='box-image' alt=''>

                </img>
                <div className='box-title'>
                    Từ 4
                </div>
                <a href={process.env.PUBLIC_URL + '/word'}>
                    <button className='box-button'>
                        CHỌN
                    </button>
                </a>
            </div>
            <a href={process.env.PUBLIC_URL + '/point'} className='but-wrap'>
                <button className='profile-button'>
                    Xem điểm
                </button>
            </a>
        </div>
    );
}

export default Subject