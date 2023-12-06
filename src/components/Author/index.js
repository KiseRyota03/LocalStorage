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
import { faKey } from '@fortawesome/free-solid-svg-icons'


import { useRef, useState, useEffect } from 'react';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
// import axios from '~/components/api/axios'
import axios from 'axios'


const Author = () => {
  // Ref
  const nameRef = useRef();
  const errRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();

// State
  const [name, setName] = useState('')
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [matchPassword, setMatchPassword] = useState('');
  const [validPassword, setvalidPassword] = useState('');
  const [validMatch, setValidMatch] = useState('');

  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    nameRef.current.focus();
    const match = matchPassword === password;
    const validPwd = password.length > 0;
    setvalidPassword(validPwd);
    setValidMatch(match);
  }, [password,matchPassword])

  // for user
  // useEffect(() => {
  //   const result = user_REGEX.test(user);
  //   console.log(result);
  //   console.log(user);
  //   setValidName(result);
  // }, [user])

  // for password
//   useEffect(() => {
//     const result = PWD_REGEX.test(pwd);
//     console.log(result);
//     console.log(pwd);
//     setValidPwd(result);
//     const match = pwd === matchPwd;
//     setValidMatch(pwd === matchPwd);
// } , [pwd, matchPwd])







  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(true);
    console.log({email, password})
    axios.post('https://ptit.io.vn/api/v1/register', {
    headers:{'Access-Control-Allow-Origin': true,
},      
    name: name,
    email: email,
    password: password,
    })
    .then(result => {
        console.log(result.data)
    })
    .catch(error => {
        console.log(error)
        alert('error')
    })
}
  


  return (
    <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href={process.env.PUBLIC_URL + "/register"}>Sign In</a>
                    </p>
                </section>
            ) : (

    <section className='res-wrap'>
      <a href={process.env.PUBLIC_URL + "/register"} className='res-back'>
        <FontAwesomeIcon icon={faArrowLeft} />
      </a>

      <div className="res-heading">
              Register
      </div>

  
      <form onSubmit ={handleSubmit}>
        {/* Name */}
        <section className="res-box" >
          <i className='res-icon' >
            <FontAwesomeIcon icon={faUser} />
          </i>
          <input 
          ref={nameRef}
          type='text'
          onChange={(e) => setName(e.target.value)}

          placeholder='Create an account' 
          className='res-add'  />

        </section>

   
      {/* note */}

       {/* email */}
       <section className="res-box res-box2">
          <i className='res-icon' >
            <FontAwesomeIcon icon={faEnvelope} />
          </i>
          <input 
           type="email"
           onChange={(e) => setEmail(e.target.value)}
           value={email}
           required
           aria-describedby="emailnote"
           placeholder='Email address' className='res-pass' name='' />
        </section>


        {/* Password */}
        <section className="res-box res-box2">
          <i className='res-icon' >
            <FontAwesomeIcon icon={faLock} />
          </i>
         <input 
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          placeholder='Password' className='res-pass'/>

  
        </section>

        {/* Re-enter password */}
        <section className="res-box res-box2">
          <i className='res-icon' >
            <FontAwesomeIcon icon={faKey} />
          </i>
         <input 
          type="password"
          id="matchPassword"
          onChange={(e) => setMatchPassword(e.target.value)}
          value={matchPassword}
          required
          placeholder='Re-enter Password' className='res-pass'/>

  
        </section>




    <div className='res-sign'>
    By registering an account, you agree to all of {" "}
       <a href={process.env.PUBLIC_URL}>
       our policy.</a>
      </div>
      
      <div className='signButton-wrap'> 
      
      <button disabled = {!validPassword || !validMatch ? true : false} className='button_sign'>Register</button>
      </div>
      </form>

      

   



   
     
    </section>
            )}
          </>
  );
}

export default Author