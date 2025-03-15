import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { get } from 'firebase/database';
import React, {useState} from 'react'
import { app } from '../firebase';

const  auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const createuser = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(value => alert('User created successfully'))
        .catch(err => alert(err.message))
    }
    const signupwithgoogle = () => {
        signInWithPopup(auth, googleProvider)
        .then(value => alert('User signed in successfully'))
        .catch(err => alert(err.message))
    }

  return (
    <div className='signup-page'>
        <h1>register</h1>
      <label>Email</label>
      <input 
        onChange={e => setEmail(e.target.value)} 
        value={email}
        type="email" 
        required placeholder='Enter your email here' 
      />
      <label>Password</label>
      <input 
        onChange={e => setPassword(e.target.value)}
        value={password}
        type="password" 
        required placeholder='Enter your password here' 
      />
      <br />
      <button onClick={signupwithgoogle}>sign in using google  </button>
      <button onClick={createuser}>signup</button>
    </div>
  )
}

export default Register;
