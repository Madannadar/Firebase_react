import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
// import { getDatabase, ref, set } from 'firebase/database'
import { app } from './firebase.js'
import Register from './pages/Register/Register.jsx'
import './App.css'
import React from 'react'
import Login from './pages/Login/Login.jsx'

// const db = getDatabase(app)
const auth = getAuth(app);
const App = () => {
  // const putData = async () => {
  //   try {
  //     await set(ref(db, 'users/1'), {
  //       id: 1,
  //       username: 'test run ',
  //       age: 20
  //     });
  //     console.log('Succesfully written new message to Firebase Database');
  //   } catch (error) {
  //     console.error('Error writing new message to Firebase Database', error);
  //   }
  // };

  // const signupUser = () => {
  //   createUserWithEmailAndPassword(auth, 'arun@gmail.com', 'madan123')
  //   .then(value => console.log(value))
  // }

  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
        console.log('User is signed in',user)
      } else {
        console.log('User is signed out')
        setUser(null)
      }
    })
  }, []);

  if(user === null){
    return (
      <div className='App'>
        {/* Firebase App */}
        {/* <button onClick={putData}>Put data to firebase</button> */}
        <Login />
        {/* <button onClick={signupUser}>Signup user</button> */}
        <Register />
      </div>
    )
  }
  return (
    <div className='App'>
      <h1>Welcome {user.email}</h1>
      <button onClick={() => auth.signOut()}>Signout</button>
    </div>
  )
}

export default App;
