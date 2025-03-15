import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { app } from '../firebase';

const auth = getAuth(app);
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signinUser = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(value => alert('User signed in successfully'))
        .catch(err => alert(err.message))
    }

  return (
    <div className='signin-page'>
        <h1>login</h1>
      <label>Enter your email</label>
      <input 
      onChange = {e => setEmail(e.target.value)}
      value={email}
      type="email"
      placeholder='email here' 
       />
      <label>Enter your password</label>
      <input 
      onChange = {e => setPassword(e.target.value)}
      value={password}
      type="password"
      placeholder='password here'   
       />
      <button onClick={signinUser}>signin</button>
    </div>
  )
}

export default Login
