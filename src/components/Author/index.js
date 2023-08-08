import './Author.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faMobile } from '@fortawesome/free-solid-svg-icons'



function Author() {
  return (
    <div className='res-wrap'>
      <a href="/register" className='res-back'>
        <FontAwesomeIcon icon={faArrowLeft} />
      </a>

      <div className="res-heading">
        Sign up
      </div>

      <div className="res-text">
        Create an account here
      </div>

      <form  >

        {/* 1 */}
        <div className="res-box" >
          <i className='res-icon' >
            <FontAwesomeIcon icon={faUser} />

          </i>
          <input placeholder='Create an account' className='res-add' type='' name='' />
        </div>

        {/* 2 */}
        <div className="res-box res-box2">
          <i className='res-icon' >

            <FontAwesomeIcon icon={faMobile} />
          </i>
          <input placeholder='Mobile Number' className='res-pass' type='' name='' />

        </div>

        {/* 3 */}
        <div className="res-box res-box2">
          <i className='res-icon' >

            <FontAwesomeIcon icon={faEnvelope} />
          </i>
          <input placeholder='Email adđress' className='res-pass' type='' name='' />

        </div>

        {/* 4 */}
        <div className="res-box res-box2">
          <i className='res-icon' >

            <FontAwesomeIcon icon={faLock} />
          </i>
          <input placeholder='Password' className='res-pass' type='' name='' />

        </div>
      </form>

      <div className='res-sign'>
        <a href="./"> By signing up you agree with our Term of Use</a>
      </div>

      <div className='res-arrow'>
        <a href='/video'>
          <FontAwesomeIcon icon={faArrowRight} />
        </a>
      </div>

      <div className='res-nav'>
        <div className='res-nav_text'>
          Already a member ?
        </div>
        <div className='res-nav_click'>
          <a href="/register">Sign in </a>
        </div>

      </div>
      {/* <Routes>
        <Route path ='/register' element={<Register/>}/>
        <Route path ='/' element={<Layout/>}/>
      </Routes> */}
    </div>
  );
}

export default Author