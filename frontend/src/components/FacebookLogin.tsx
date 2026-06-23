import React from "react";

const FacebookLogin = () => {
  const handleLogin = () => {
    window.location.href =
      "https://mini-vendor-management-system.onrender.com/auth/facebook";
  };

  return (
    <button onClick={handleLogin}>
      Login with Facebook
    </button>
  );
};

export default FacebookLogin;