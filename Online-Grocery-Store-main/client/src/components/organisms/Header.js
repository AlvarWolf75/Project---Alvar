import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { Input } from 'antd';
import { AutoComplete } from "antd";


import { useNavigate } from "react-router-dom";
import {
  LoginOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import Button from "./Button";
import { isEmpty } from "../../lib/helpers";
import { logout } from "../../redux/actions/authActions";
import Login from "../pages/Login/Login";
import { removeAllCartItems } from "../../redux/actions/cartActions";
import DisplayItem from "../pages/HomeDashboard/DisplayItem";

const headerStyle = {
  backgroundColor: "#F9F6EE",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
};

const welcomeText = {
  color: "#000",
  fontSize: 18,
  fontWeight: "bold",
  marginTop: 22,
  marginRight: 10,
};
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInUserId, user } = useSelector((state) => state.authReducer);
  // const { users } = useSelector((state) => state.userReducer);
  const { cart, products } = useSelector((state) => state.cartReducer);
  // const user = users?.find((u) => u.id === loggedInUserId);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleLoginModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleLogout = () => {
    dispatch(removeAllCartItems());
    dispatch(logout());
    navigate("/");
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleNavigation = (page) => {
    if (!isEmpty(loggedInUserId)) {
      navigate(`/${page}`, {
        state: { fromHeader: true },
      });
      return;
    }
    handleLoginModal();
  };

  const handleSearch = (value, product) => {
    // Perform any search-related logic here
    // For now, navigate to the product details page with the selected product ID
    setSearchQuery(product.label);
    navigate(`/search`, {
      state: { product: product },
    });
  };

  return (
    <div style={headerStyle}>
      {!isEmpty(loggedInUserId) ? (
        <>
          <p style={welcomeText}>Hello, {user.username}</p>
          <Button
            buttonName="Home"
            onClick={() => handleNavigation("")}
            renderIcon={() => (
              <HomeOutlined style={{ color: "black", paddingRight: 6 }} />
            )}
          />
          <Button
            buttonName="Account"
            onClick={() => handleNavigation("account")}
            renderIcon={() => (
              <UserOutlined style={{ color: "black", paddingRight: 6 }} />
            )}
          />
          {user.usertype === "storemanager" ? (
            <Button
              buttonName="Analytics"
              onClick={() => handleNavigation("analytics")}
            />
          ) : null}
          {user.usertype === "customer" ? (
            <>
              <Button
              buttonName="Recommended for you"
              onClick={() => handleNavigation("recommend")}
              />
              <Button
              buttonName="Trending"
              onClick={() => handleNavigation("trending")}
              />
            </>
            
          ) : null}

          <Button
            buttonName="Logout"
            onClick={handleLogout}
            renderIcon={() => (
              <LogoutOutlined style={{ color: "black", paddingRight: 6 }} />
            )}
          />
        </>
      ) : (
        <Button
          buttonName="Login"
          onClick={handleLoginModal}
          renderIcon={() => (
            <LoginOutlined style={{ color: "black", paddingRight: 6 }} />
          )}
        />
      )}
      <AutoComplete
           style={{ width: 200, margin: 20, marginRight: 10 }}
           className="search-input"
           placeholder="Search..."
           options={products
             .filter((product) =>
               product.name.toLowerCase().includes(searchQuery.toLowerCase())
             )
             .map((product) => ({
               label: product.name,
               value: product.id,
             }))
           }
           value={searchQuery}
           onChange={(value) => setSearchQuery(value)}
           onSelect={(value, product) => handleSearch(value, product)}
          />
      <Button
        buttonName={`Cart (${cart?.length})`}
        onClick={() => handleNavigation("cart")}
        renderIcon={() => (
          <ShoppingCartOutlined style={{ color: "black", paddingRight: 6 }} />
        )}
      />
      <Login isOpen={isModalOpen} onClose={handleLoginModal} />
    </div>
  );
};

export default Header;
