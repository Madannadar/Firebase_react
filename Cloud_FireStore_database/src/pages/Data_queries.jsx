import React, { useState } from 'react';
import { getFirestore, collection, addDoc, doc, getDoc, query, where, getDocs, updateDoc} from 'firebase/firestore';
import { app } from '../firebase';
import './PutData.css';
const firestore = getFirestore(app);
const PutData = () => {
  const [name, setName] = useState('');
  const [pincode, setPincode] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');

  const writeData = async () => {
    try {
      // const firestore = getFirestore(app); // Ensure Firestore is correctly initialized
      const result = await addDoc(collection(firestore, 'city'), { // Use `db`, not `firestore`
        name,
        pincode,
        lat,
        long
      });
      console.log('Document written with ID:', result.id);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const makeSubCollection = async () => {
    // const firestore = getFirestore(app); 
    const subdata = await addDoc(collection(firestore, 'city/pSFYOnMc4qq8xeIUoIxn/places'),{
      name: 'Place 1',
      lat: 12.34,
      long: 56,
      Date: new Date()
    })
    console.log(subdata);
  }

  const getDocument = async () => {
    // const firestore = getFirestore(app);
    const ref = doc(firestore, 'city', 'pSFYOnMc4qq8xeIUoIxn');
    const snap = await getDoc(ref); // Use `getDoc` instead of `get` and do not use doc it is a key word 
    if(snap.exists){
      console.log('Document data:', snap.data());
    } else {
      console.log('No such document!');
    }
  }

  const getdocbyquery = async () => { 
    const data = collection(firestore, 'city');
    const q = query(data, where('name', '==', 'Mumbai'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });
  }
  const updateDocument = async () => {
    const cityRef = doc(firestore, 'city', 'pSFYOnMc4qq8xeIUoIxn');
    await updateDoc(cityRef, {
      name: 'Dharavi',
      pincode: 400017
    });
  }
  return (
    <div className="container">
      <div className="form-box">
        <h1>Add City Data</h1>

        <label>Enter City Name</label>
        <input
          onChange={e => setName(e.target.value)}
          value={name}
          type="text"
          required
          placeholder="Enter City Name"
          className="input-field"
        />

        <label>Enter City Pincode</label>
        <input
          onChange={e => setPincode(e.target.value)}
          value={pincode}
          type="number"
          required
          placeholder="Enter City Pincode"
          className="input-field"
        />

        <label>Enter City Latitude</label>
        <input
          onChange={e => setLat(e.target.value)}
          value={lat}
          type="number"
          required
          placeholder="Enter City Latitude"
          className="input-field"
        />

        <label>Enter City Longitude</label>
        <input
          onChange={e => setLong(e.target.value)}
          value={long}
          type="number"
          required
          placeholder="Enter City Longitude"
          className="input-field"
        />

        <button onClick={writeData} className="submit-btn">
          Put Data
        </button>
        <button onClick={makeSubCollection}>Put sub data</button>
        <button onClick={getDocument}>get data </button>
        <button onClick={getdocbyquery}>get doc by query</button>
        <button onClick={updateDocument}>updateDoc by query</button>
      </div>
    </div>
  );
};

export default PutData;
