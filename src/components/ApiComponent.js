
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ApiComponent.css';

const ApiComponent = () => {
  const [token, setToken] = useState('');
  const [customerList, setCustomerList] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({});
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [newCustomer, setNewCustomer] = useState({
    first_name: '',
    last_name: '',
    street: '',
    address: '',
    city: '',
    state: '',
    email: '',
    phone: '',
  });

  const BASE_URL = 'http://localhost:5454'; 

  const authenticateUser = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/assignment_auth.jsp`, {
        login_id: loginId,
        password: password,
      });

      setToken(response.data.token);
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  const createCustomer = async () => {
    try {
      await axios.post(
        `${BASE_URL}/assignment.jsp?cmd=create`,
        newCustomer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh customer list after creation
      getCustomerList();
    } catch (error) {
      console.error('Failed to create customer:', error);
    }
  };

  const getCustomerList = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/assignment.jsp?cmd=get_customer_list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCustomerList(response.data);
    } catch (error) {
      console.error('Failed to get customer list:', error);
    }
  };

  const deleteCustomer = async (uuid) => {
    try {
      await axios.post(
        `${BASE_URL}/assignment.jsp?cmd=delete&uuid=${uuid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh customer list after deletion
      getCustomerList();
    } catch (error) {
      console.error('Failed to delete customer:', error);
    }
  };

  const updateCustomer = async (uuid) => {
    try {
      await axios.post(
        `${BASE_URL}/assignment.jsp?cmd=update&uuid=${uuid}`,
        newCustomer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh customer list after update
      getCustomerList();
    } catch (error) {
      console.error('Failed to update customer:', error);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  const handleCustomerIdSubmit = (e) => {
    e.preventDefault();
    getCustomerList();
  };

  const handleCustomerDetailsSubmit = (e, uuid) => {
    e.preventDefault();
    if (uuid) {
      // If uuid is provided, update the customer
      updateCustomer(uuid);
    } else {
      // If no uuid, create a new customer
      createCustomer();
    }
  };

  return (
    <div>
      <h2>Login Screen</h2>
      <form onSubmit={handleLoginSubmit}>
        <label>Login ID:</label>
        <input type="text" value={loginId} onChange={(e) => setLoginId(e.target.value)} required />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <button type="submit">Login</button>
      </form>

      <h2>Customer List Screen</h2>
      <button onClick={handleCustomerIdSubmit}>Get Customer List</button>
      <ul>
        {customerList.map((customer) => (
          <li key={customer.uuid}>
            {customer.first_name} {customer.last_name}
            <button onClick={() => deleteCustomer(customer.uuid)}>Delete</button>
            <button onClick={() => setCustomerDetails(customer)}>Edit</button>
          </li>
        ))}
      </ul>

      <h2>Customer Details Screen</h2>
      <form onSubmit={(e) => handleCustomerDetailsSubmit(e, customerDetails.uuid)}>
        <label>First Name:</label>
        <input
          type="text"
          value={newCustomer.first_name}
          onChange={(e) => setNewCustomer({ ...newCustomer, first_name: e.target.value })}
          required
        />
        <br />
        <label>Last Name:</label>
        <input
          type="text"
          value={newCustomer.last_name}
          onChange={(e) => setNewCustomer({ ...newCustomer, last_name: e.target.value })}
          required
        />
        <br />
        <label>Street:</label>
        <input
          type="text"
          value={newCustomer.street}
          onChange={(e) => setNewCustomer({ ...newCustomer, street: e.target.value })}
        />
        <br />
        <label>Address:</label>
        <input
          type="text"
          value={newCustomer.address}
          onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
        />
        <br />
        <label>City:</label>
        <input
          type="text"
          value={newCustomer.city}
          onChange={(e) => setNewCustomer({ ...newCustomer, city: e.target.value })}
        />
        <br />
        <label>State:</label>
        <input
          type="text"
          value={newCustomer.state}
          onChange={(e) => setNewCustomer({ ...newCustomer, state: e.target.value })}
        />
        <br />
        <label>Email:</label>
        <input
          type="text"
          value={newCustomer.email}
          onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
        />
        <br />
        <label>Phone:</label>
        <input
          type="text"
          value={newCustomer.phone}
          onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ApiComponent;
