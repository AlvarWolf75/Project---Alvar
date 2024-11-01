import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../redux/actions/userActions";
import { Button } from "../../organisms";

const Register = ({ isOpen, setModalOpen }) => {
  const dispatch = useDispatch();
  const { users, currentUserId } = useSelector((state) => state.userReducer);
  const [registerUserName, setRegisterUserName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerSelectedOption, setRegisterSelectedOption] =
    useState("customer");

  const handleRegisterNavigation = () => {
    setModalOpen(!isOpen);
    setModalOpen && onModalClose();
  };

  const handleRegister = () => {
    const user = users?.find(
      (u) => u.name === registerUserName && u.type === registerSelectedOption
    );
    if (user) {
      //alert("Already existing user, Please Login or use different username");
      return;
    }
    dispatch(
      addUser({
        id: currentUserId + 1,
        name: registerUserName,
        type: registerSelectedOption,
        password: registerPassword,
      })
    );
    //alert("Registered Successfully");
    handleRegisterNavigation();
  };
  const onModalClose = () => {
    setRegisterUserName("");
    setRegisterPassword("");
    setRegisterSelectedOption("customer");
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
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
};

export default Register;
