import './Lesson.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faHand } from '@fortawesome/free-solid-svg-icons'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'

function Lesson() {
  return (
    <div className='text-wrap'>
      <div className='barTop'>
        <div className='barTop-title'>
          LGP
        </div>
      </div>
      <div className='lesson-wrap'>
        <div className='lesson-item'>
          <a href='/level'>
            <button className='lesson-button'>
              CẤP ĐỘ 1
            </button>
          </a>
        </div>
        <div className='lesson-item'>
          <button className='lesson-button'>
            CẤP ĐỘ 2
          </button>
        </div>
        <div className='lesson-item'>
          <button className='lesson-button'>
            CẤP ĐỘ 3
          </button>
        </div>
        <div className='lesson-item'>
          <button className='lesson-button'>
            CẤP ĐỘ 4
          </button>
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
          <a href='/Lesson' className='active-icon'>
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

export default Lesson