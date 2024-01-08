import React, { useState } from 'react';

const ReaderLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/reader/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin({ type: 'reader', username: data.username });
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='flex flex-col'>
      <h2>Reader Login</h2>
      <label>Username:</label>
      <input className="text-black" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <label>Password:</label>
      <input className="text-black"type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default ReaderLogin;
