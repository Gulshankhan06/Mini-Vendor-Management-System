import React from "react";

const PrivacyPolicy = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>Privacy Policy</h1>

      <p>
        This Vendor Management System collects basic user information such as
        name, email, and login details only for authentication purposes.
      </p>

      <h3>How we use data</h3>
      <p>
        We use your data only to provide login and vendor management features.
        We do not sell or share your personal data with any third party.
      </p>

      <h3>Data Protection</h3>
      <p>
        Your data is securely stored in our system and protected from unauthorized access.
      </p>

      <h3>Data Deletion</h3>
      <p>
        If you want to delete your account or data, contact support:
        <br />
        <b>your-email@gmail.com</b>
      </p>
    </div>
  );
};

export default PrivacyPolicy;