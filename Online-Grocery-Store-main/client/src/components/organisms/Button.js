import React from "react";

const buttonContainer = (customStyles) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  paddingLeft: 16,
  paddingRight: 16,
  borderRadius: 12,
  backgroundColor: "transparent",
  borderWidth: 0,
  cursor: "pointer",
  ...customStyles,
});
const buttonText = (customStyles) => ({
  fontSize: 15,
  color: "#000",
  ...customStyles,
});

const Button = ({
  buttonName = "",
  onClick = () => {},
  buttonStyles = {},
  textStyles = {},
  renderIcon = () => {},
}) => {
  return (
    <button style={buttonContainer(buttonStyles)} onClick={onClick}>
      {renderIcon && renderIcon()}
      <p style={buttonText(textStyles)}>{buttonName}</p>
    </button>
  );
};

export default Button;
