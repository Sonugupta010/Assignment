
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CustomerDetailsComponent.css'; 
const CustomerDetailsComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [street, setStreet] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async () => {
    try {
      
      const response = await axios.post(
        'http://localhost:5454',
        {
          cmd: 'update',
          uuid: '$(customer_uuid)', 
          first_name: firstName,
          last_name: lastName,
          street: street,
          address: address,
          city: city,
          state: state,
          email: email,
          phone: phone,
          // Add other fields here
          // Example:
          // customField1: 'value1',
          // customField2: 'value2',
        },
        {
          headers: {
            Authorization: 'cb0be332-3018-48a6-99f2-bf3197902876', // Replace with the actual bearer token
          },
        }
      );

      console.log('Customer updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  return (
    <div className="customer-details-container">
      <h2>Customer Details</h2>
      <div className="form-row">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default CustomerDetailsComponent;
