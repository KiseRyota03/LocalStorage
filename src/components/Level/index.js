import './Level.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faHand } from '@fortawesome/free-solid-svg-icons'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'

function Level() {
    return (
        <div className='text-wrap'>
            <div className='barTop'>
                <div className='barTop-title'>
                    LGP
                </div>
            </div>
            <div className='level-heading'>
                <div className='level-title'>
                    Chủ đề 1
                </div>
                <div className='level-sub'>
                    Cấp độ 1
                </div>
            </div>

            <div className='level-contain'>
                <div className='level-item'>
                    <a href='/subject'>
                        <div className='item-content'>
                            Bài học 1
                        </div>
                        <div className='item-text'>
                            35 điểm
                        </div>
                    </a>
                </div>

                <div className='level-item'>
                    <a href='/subject'>
                        <div className='item-content'>
                            Bài học 2
                        </div>
                        <div className='item-text'>
                            35 điểm
                        </div>
                    </a>
                </div>

                <div className='level-item'>
                    <a href='/subject'>
                        <div className='item-content'>
                            Bài học 3
                        </div>
                        <div className='item-text'>
                            35 điểm
                        </div>
                    </a>
                </div>

                <div className='level-item'>
                    <a href='/subject'>
                        <div className='item-content'>
                            Bài học 4
                        </div>
                        <div className='item-text'>
                            35 điểm
                        </div>
                    </a>
                </div>

                <div className='level-item'>
                    <a href='/subject'>
                        <div className='item-content'>
                            Bài học 5
                        </div>
                        <div className='item-text'>
                            35 điểm
                        </div>
                    </a>
                </div>

                <div className='level-item'>
                    <a href='/subject'>
                        <div className='item-content'>
                            Bài học 6
                        </div>
                        <div className='item-text'>
                            35 điểm
                        </div>
                    </a>
                </div>

            </div>

            <div className='level-heading'>
                <div className='level-title'>
                    Chủ đề 2
                </div>
                <div className='level-sub'>
                    Cấp độ 1
                </div>
            </div>

            <div className='level-contain'>

                <div className='level-item2'>
                    <a href='/subject'>
                        <div className='item-content2'>
                            Bài học 1
                        </div>
                        <div className='item-text'>
                            35 điểm
                        </div>
                    </a>
                </div>

                <div className='level-item2'>
                    <a href='/subject'>
                        <div className='item-content2'>
                            Bài học 2
                        </div>
                        <div className='item-text'>
                            35 điểm
                        </div>
                    </a>
                </div>

                <div className='level-item2'>
                    <a href='/subject'>
                        <div className='item-content2'>
                            Bài học 3
                        </div>
                        <div className='item-text'>
                            35 điểm
                        </div>
                    </a>
                </div>


            </div>
            <div className='barDown'>
                <div className='barDown-items'>
                    <a href='/Video' className='nonActive-icon'>
                        <FontAwesomeIcon icon={faHand} />
                    </a>
                    <a href='/Message' className='nonActive-icon'>
                        <FontAwesomeIcon icon={faMessage} />
                    </a>
                    <a href='/Lesson' className='nonActive-icon'>
                        <FontAwesomeIcon icon={faBook} />
                    </a>
                    <a href='/Profile' className='active-icon'>
                        <FontAwesomeIcon icon={faGear} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Level