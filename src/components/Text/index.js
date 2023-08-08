import './Text.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {faCamera} from '@fortawesome/free-solid-svg-icons'
import { faHand } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import pic6 from '~/components/pic/pic6.jpg'


function Text() {
    return (
        <div className='text-wrap'>
            <div className='barTop'>
                <div className='barTop-title'>
                    LGP
                </div>
            </div>
            <div className='search-wrap'>
                <input placeholder='Tìm kiếm' className='search-input'>

                </input>
                <button className='search-button'>
                    <i> <FontAwesomeIcon icon={faSearch} />
                    </i>
                </button>
            </div>

            {/* 1 */}
            <div className='content-box'>
                <img src={pic6} className='box-image' alt=''>

                </img>
                <div className='box-title'>
                    Nhãn
                </div>
                <button className='box-button'>
                    CHỌN
                </button>
            </div>
            {/* 2 */}
            <div className='content-box'>
                <img src={pic6} className='box-image' alt=''>

                </img>
                <div className='box-title'>
                    Nhãn
                </div>
                <button className='box-button'>
                    CHỌN
                </button>
            </div>
            {/* 3 */}
            <div className='content-box'>
                <img src={pic6} className='box-image' alt=''>

                </img>
                <div className='box-title'>
                    Nhãn
                </div>
                <button className='box-button'>
                    CHỌN
                </button>
            </div>

            <div className='barDown'>
                <div className='barDown-items'>
                    <a href='/Video' className='nonActive-icon'>
                        <FontAwesomeIcon icon={faHand} />
                    </a>
                    <a href='/Message' className='active-icon'>
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

export default Text