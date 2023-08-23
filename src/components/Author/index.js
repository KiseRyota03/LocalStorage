import './Author.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faMobile } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { useRef, useState, useEffect } from 'react';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import axios from '~/components/api/axios'

const USER_REGEX =  /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
const MOBILE_REGEX =  /(0[3|5|7|8|9])+([0-9]{8})\b/g;

// nhà mạng
const REGISTER_URL = '/api/v1/register';


const Author = () => {
  // Ref
  const userRef = useRef();
  const errRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();

// State
  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  
  
  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [mobile, setMobile] = useState('');
  const [validMobile, setValidMobile] = useState(false);
  const [mobileFocus, setMobileFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    userRef.current.focus();
  }, [])

  // for User
  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user])

  // for password
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(pwd === matchPwd);
} , [pwd, matchPwd])

  // for Error
  useEffect(() => {
    setErrMsg('');
}, [user, pwd, matchPwd])

  // for Email
useEffect(() => {
  const result = EMAIL_REGEX.test(email);
  console.log(result);
  console.log(email);
  setValidEmail(result);
}, [email])

  // for Mobile
  useEffect(() => {
    const result = MOBILE_REGEX.test(mobile);
    console.log(result);
    console.log(mobile);
    setValidMobile(result);
  }, [mobile])

 
 const handleSubmit = async (e) => {
  e.preventDefault();
  const v1 = USER_REGEX.test(user);
  const v2 = PWD_REGEX.test(pwd);
  if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
  }
  try {
    const response = await axios.post(REGISTER_URL,
      JSON.stringify({ user, pwd, email, mobile }),
      {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
      }
  );
  console.log(response?.data);
  console.log(response?.accessToken);
  console.log(JSON.stringify(response))
  setSuccess(true);
// clear input fields 
  } catch(err) {
    if (!err?.response) {
      setErrMsg('No Server Response');
  } else if (err.response?.status === 409) {
      setErrMsg('Username Taken');
  } else {
      setErrMsg('Registration Failed')
  }
  errRef.current.focus();
  } 
 }

  return (
    <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="/register">Sign In</a>
                    </p>
                </section>
            ) : (

    <section className='res-wrap'>
      <a href="/register" className='res-back'>
        <FontAwesomeIcon icon={faArrowLeft} />
      </a>

      <div className="res-heading">
        Sign up
      </div>

      <div className="res-text">
        Create an account here
      </div>
      {/* error message */}
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <form onSubmit ={handleSubmit}>
        {/* Name */}
        <section className="res-box" >
          <i className='res-icon' >
            <FontAwesomeIcon icon={faUser} />
          </i>
          <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
          <input 
          id="username"
          ref={userRef}
          autoComplete="off"
          type='text'
          onChange={(e) => setUser(e.target.value)}
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          placeholder='Create an account' 
          className='res-add'  />

        </section>
        
        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
        </p>
   
      {/* note */}


        {/* Password */}
        <section className="res-box res-box2">
          <i className='res-icon' >
            <FontAwesomeIcon icon={faLock} />
          </i>
          <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
         
         <input 
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
          placeholder='Password' className='res-pass'/>

  
        </section>

        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
        </p>




        {/* email */}
        <section className="res-box res-box2">
          <i className='res-icon' >
            <FontAwesomeIcon icon={faEnvelope} />
          </i>
          <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />

          <input 
           type="email"
           onChange={(e) => setEmail(e.target.value)}
           value={email}
           required
           aria-invalid={validEmail ? "false" : "true"}
           aria-describedby="emailnote"
           onFocus={() => setEmailFocus(true)}
           onBlur={() => setEmailFocus(false)}
           placeholder='Email address' className='res-pass' name='' />
        </section>




        {/* phone*/}
        {/* <section className="res-box res-box2">
          <i className='res-icon' >
            <FontAwesomeIcon icon={faMobile} />
          </i>
          <FontAwesomeIcon icon={faCheck} className={validMobile ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validMobile || !mobile ? "hide" : "invalid"} />
          <input 
           type="tel"
           onChange={(e) => setMobile(e.target.value)}
           value={mobile}
           required
           aria-invalid={validMobile ? "false" : "true"}
           aria-describedby="mobilenote"
           onFocus={() => setMobileFocus(true)}
           onBlur={() => setMobileFocus(false)}
            placeholder='Mobile Number' className='res-pass'  />

        </section> */}
           {/* register button */}
      <button disabled={!validName || !validPwd || !validEmail ? true : false}>Sign Up</button>
      </form>

      <div className='res-sign'>
        <a href=""> By signing up you agree with our Term of Use</a>
      </div>

   


      {/* arrow */}
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
     
    </section>
            )}
          </>
  );
}

export default Author