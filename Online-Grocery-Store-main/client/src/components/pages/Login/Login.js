import React, { useState } from "react";
import "./LoginModal.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/actions/authActions";
import Button from "../../organisms/Button";
import { addUser } from "../../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedOption, setSelectedOption] = useState("customer");

  const [registerUserName, setRegisterUserName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerSelectedOption, setRegisterSelectedOption] =
    useState("customer");

  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const { users, currentUserId } = useSelector((state) => state.userReducer);

  const handleLogin = () => {
    const uData = {
      // username: "q",
      // password: "q",
      // usertype: "storemanager",
      username: username,
      password: password,
      usertype: selectedOption,
    };

    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers as needed
      },
      body: JSON.stringify(uData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response, e.g., update state or perform other actions
        console.log("Response from server:", data);
        if (data.user != undefined) {
          alert("User logged in successfully");
          dispatch(login(data.user));
        } else {
          alert("Failed to login");
        }
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message
        console.error("Error making POST request:", error.message);
        alert("Failed to login");
      });

    onModalClose(); // Close the modal after login attempt (you may want to handle this differently in a real application)
    navigate("/");
  };

  const handleRegisterNavigation = () => {
    setRegisterModalOpen(!isRegisterModalOpen);
    isRegisterModalOpen && onModalClose();
  };

  const handleRegister = () => {
    const postData = {
      username: registerUserName,
      password: registerPassword,
      usertype: registerSelectedOption,
    };

    fetch("http://localhost:3001/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers as needed
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response, e.g., update state or perform other actions
        console.log("Response from server:", data);
        alert("User registered successfully");
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message
        console.error("Error making POST request:", error.message);
        alert("Failed to register");
      });

    handleRegisterNavigation();
  };

  const onModalClose = () => {
    setUsername("");
    setPassword("");
    setSelectedOption("customer");
    setRegisterUserName("");
    setRegisterPassword("");
    setRegisterSelectedOption("customer");
    onClose();
  };

  const renderLoginContent = () => (
    <div className="modal-content">
      <span className="close-button" onClick={onModalClose}>
        &times;
      </span>
      <h2>Login</h2>
      <div style={styles.form}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="type">Type:</label>
        <select
          id="type"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          required
        >
          <option value="customer">Customer</option>
          <option value="storemanager">Product Supervisor</option>
          <option value="salesmanager">Sales Supervisor</option>
        </select>
        <Button
          buttonName="Login"
          onClick={handleLogin}
          buttonStyles={styles.buttonStyles}
          textStyles={styles.textStyles}
        />
        <div onClick={handleRegisterNavigation} style={styles.registerText}>
          Not Registered? Register here
        </div>
      </div>
    </div>
  );

  const renderRegisterContent = () => (
    <div className="modal-content">
      <span className="close-button" onClick={handleRegisterNavigation}>
        &times;
      </span>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={registerUserName}
          onChange={(e) => setRegisterUserName(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
          required
        />

        <label htmlFor="type">Type:</label>
        <select
          id="type"
          value={registerSelectedOption}
          onChange={(e) => setRegisterSelectedOption(e.target.value)}
          required
        >
          <option value="customer">Customer</option>
          <option value="storemanager">Product Supervisor</option>
          <option value="salesmanager">Sales Supervisor</option>
        </select>

        <Button
          buttonName="Register"
          onClick={handleRegister}
          buttonStyles={styles.buttonStyles}
          textStyles={styles.textStyles}
        />
      </form>
    </div>
  );

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      {isRegisterModalOpen ? renderRegisterContent() : renderLoginContent()}
    </div>
  );
};

const styles = {
  buttonStyles: {
    backgroundColor: "#F9F6EE",
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 16,
    justifyContent: "center",
  },
  textStyles: {
    textAlign: "center",
  },
  registerText: {
    margin: 10,
    textDecoration: "underline",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
};

export default Login;
