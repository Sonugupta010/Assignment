import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Validate login credentials, authenticate with ApiService, and call onLogin
    // For simplicity, let's assume successful login for any credentials entered
    onLogin();
  };

  return (
    <div>
      <h2>Login Screen</h2>
      <label>Login ID: </label>
      <input type="text" value={loginId} onChange={(e) => setLoginId(e.target.value)} />
      <br />
      <label>Password: </label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;