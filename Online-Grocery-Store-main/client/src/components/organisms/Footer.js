import React from "react";

const footerStyle = {
  textAlign: "center",
  backgroundColor: "#F9F6EE",
  color: "#000",
  position: "absolute",
  bottom: "0",
  width: "100%",
  minHeight: 40,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Footer = () => {
  return <div style={footerStyle}>All rights reserved ©2023</div>;
};

export default Footer;
