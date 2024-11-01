import React from "react";
import { Button } from "../../organisms";
import { useNavigate } from "react-router-dom";

const DisplayItem = ({ item, onClick }) => {
  const imageFilenames = require.context('../../../assets/images', false, /\.(png|jpe?g|svg)$/);
  return (
    <div style={styles.container}>
      <div >
        <p style={{ fontWeight: "bold" }}>{item.name}</p>
        <p
          style={{ color: "green", fontFamily: "cursive", fontWeight: "bold" }}
        >
          ${item.price}
        </p>
      </div>

      {/* <img src={item?.image} alt={item.name} style={styles.image} /> */}
      <img src={imageFilenames(`./${item.image}`)} alt={item.name} style={styles.image} />
      <Button
        buttonName="Add to Cart"
        buttonStyles={styles.buttonStyle}
        onClick={() => onClick(item,'cart')}
      />
       <Button
        buttonName="Write Review"
        buttonStyles={styles.buttonStyle}
        onClick={() => onClick(item,'write')}
      />
       <Button
        buttonName="Read Review"
        buttonStyles={styles.buttonStyle}
        onClick={() => onClick(item,'read')}
      />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  buttonStyle: {
    backgroundColor: "#F9F6EE",
    paddingTop: 0,
    paddingBottom: 0,
  },
};

export default DisplayItem;
