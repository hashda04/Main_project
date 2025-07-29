import React from 'react';

const Login = () => {
  const handleLogin = () => {
    // This button silently fails: does nothing
    console.log('Login clicked but no fetch or redirect happens.');
  };

  return (
    <div>
      <h2>Login</h2>
      <button id="login-btn" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;