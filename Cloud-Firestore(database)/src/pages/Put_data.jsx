import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../firebase';
import './PutData.css';

const PutData = () => {
  const [name, setName] = useState('');
  const [pincode, setPincode] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');

  const writeData = async () => {
    try {
      const db = getFirestore(app); // Ensure Firestore is correctly initialized
      const result = await addDoc(collection(db, 'city'), { // Use `db`, not `firestore`
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
      </div>
    </div>
  );
};

export default PutData;
