import React from "react";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-container">
      <h2 className="signTitle">Admin Login</h2>
      <form>
        <div className="form-group">
          <label className="FormLabels">Email:</label>
          <input
            placeholder="Email"
            className="LoginInput"
            type="text"
            name="username"
            // value={formData.username}
          />
          {/* <span className="error-message">{formErrors.username}</span> */}
        </div>
        <div className="form-group">
          <label className="FormLabels">Password:</label>
          <input
            className="LoginInput"
            type="password"
            name="password"
            // value={formData.password}
            // onChange={handleInputChange}
          />
          {/* <span className="error-message">{formErrors.password}</span> */}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="Keep me logged in"
          />
        </div>

        <div className="form-group">
          <Link to="sideBar">
            <Button
              style={{
                marginTop: 20,
                width: "100%",
                height: 50,
                borderRadius: 10,
              }}
              variant="contained"
            >
              SIGN IN
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
