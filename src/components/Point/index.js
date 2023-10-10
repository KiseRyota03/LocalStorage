import './Point.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBook } from '@fortawesome/free-solid-svg-icons'
// import { faHand } from '@fortawesome/free-solid-svg-icons'
// import { faMessage } from '@fortawesome/free-solid-svg-icons'
// import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faBolt } from '@fortawesome/free-solid-svg-icons'
// import pic8 from '~/components/pic/pic8.jpg'
import pic6 from '~/components/pic/pic6.jpg'
import { useNavigate } from 'react-router-dom';


function Point() {
    const navigate = useNavigate();

    return (
        <div className='vid-wrap'>
            <div className='barTop'>
                <div className='barTop-title'>
                    <a onClick={() => navigate(-1)} className='arrow-return'>
                        <i>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </i>
                    </a>
                    LGP
                </div>
            </div>

            <div className='point-content'>
                <div className='point-bear'>
                    .
                </div>

                <div className='point-box'>
                    <div className='box-correct'>
                        <div className='correct-num'>
                            6
                        </div>
                        <div className='correct-text'>
                            Trung bình
                        </div>
                    </div>
                 

                </div>
            </div>

            <div className='point-contain'>
                <div className='point-item'>
                    <a href='./'>
                        <img className='point-img' src={pic6} alt="">
                        </img>
                        <div className='point-text'>
                            apple
                        </div>
                        <div className='point-sub'>
                            Point
                        </div>
                    </a>
                </div>

                <div className='point-item'>
                    <a href='./'>
                        <img className='point-img' src={pic6} alt="">
                        </img>
                        <div className='point-text'>
                            apple
                        </div>
                        <div className='point-sub'>
                        Point
                        </div>
                    </a>
                </div>

                <div className='point-item'>
                    <a href='./'>
                        <img className='point-img' src={pic6} alt="">
                        </img>
                        <div className='point-text'>
                            apple
                        </div>
                        <div className='point-sub'>
                        Point
                        </div>
                    </a>
                </div>

                <div className='point-item'>
                    <a href='./'>
                        <img className='point-img' src={pic6} alt=''>
                        </img>
                        <div className='point-text'>
                            apple
                        </div>
                        <div className='point-sub'>
                        Point
                        </div>
                    </a>
                </div>

                <div className='point-item'>
                    <a href='./'>
                        <img className='point-img' src={pic6} alt=''>
                        </img>
                        <div className='point-text'>
                            apple
                        </div>
                        <div className='point-sub'>
                        Point
                        </div>
                    </a>
                </div>

                <div className='point-item'>
                    <a href='./'>
                        <img className='point-img' src={pic6} alt=''>
                        </img>
                        <div className='point-text'>
                            apple
                        </div>
                        <div className='point-sub'>
                        Best
                        </div>
                    </a>
                </div>

            </div>
            <div className='button-wrap'>
                <a onClick={() => navigate(-1)}>
                    <button className='profile-button'>
                        Trở lại
                    </button>
                </a>
            </div>

        </div>
    );
}

export default Point