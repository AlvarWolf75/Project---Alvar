import React from "react";
import { Button } from "../../organisms";

const DisplayCartItem = ({
  item = {},
  showRemoveButton = false,
  handleRemoveItem = () => {},
  containerStyles = {},
}) => {
  return (
    <div key={item.id} style={styles.itemContainer(containerStyles)}>
      <p style={{ width: 200 }}>{item.name}</p>
      <p>{item.price}</p>
      {showRemoveButton ? (
        <Button
          buttonName="Remove"
          buttonStyles={styles.buttonStyle}
          onClick={() => handleRemoveItem(item.id)}
        />
      ) : null}
    </div>
  );
};

const styles = {
  itemContainer: (customStyles) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
    padding: 20,
    border: "1px solid black",
    borderRadius: 12,
    ...customStyles,
  }),
  buttonStyle: {
    backgroundColor: "#F9F6EE",
  },
};
export default DisplayCartItem;
