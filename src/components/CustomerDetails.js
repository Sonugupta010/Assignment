import React, { useState } from 'react';

const CustomerDetails = ({ onSaveCustomer, onCancel, customer }) => {
  const [firstName, setFirstName] = useState(customer.firstName);
  const [lastName, setLastName] = useState(customer.lastName);
  const [street, setStreet] = useState(customer.street);
  const [address, setAddress] = useState(customer.address);
  const [city, setCity] = useState(customer.city);
  const [state, setState] = useState(customer.state);
  const [email, setEmail] = useState(customer.email);
  const [phone, setPhone] = useState(customer.phone);

  const handleSave = () => {
    
    const updatedCustomer = {
      id: customer.id,
      firstName,
      lastName,
      street,
      address,
      city,
      state,
      email,
      phone,
    };
    onSaveCustomer(updatedCustomer);
  };

  return (
    <div>
      <h2>Customer Details Screen</h2>
      <label>First Name: </label>
      <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <br />
      {/* Include similar input fields for other customer details */}
      <br />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default CustomerDetails;
