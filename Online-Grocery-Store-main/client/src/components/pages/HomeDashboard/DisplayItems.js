import React, { useEffect } from "react";
import DisplayItem from "./DisplayItem";

import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../../redux/actions/cartActions";

const DisplayItems = ({ category, handleCart }) => {
const dispatch = useDispatch();



  const { products } = useSelector((state) => state.cartReducer);
  const requiredProducts = products.filter(
    (item) => item.category === category.id
  );
  console.log(products);

  useEffect(() => {
  
    const fetchProducts = async () => {
      try {
        fetch(`http://localhost:3001/products`)
        .then(response => response.json())
        .then(data => {
          // console.log("dispatch");
          dispatch(setProducts(data));
          // console.log('dispatched done');
        })
        .catch(error => {
          // Handle errors, e.g., display an error message
          console.error('Error making POST request:', error.message);
        });
  
      } catch (error) {
        // Handle the error if needed
      }
    };
     fetchProducts(); 
  }, []);

  console.log("after api",products);
  

  return (
    <div>
      <h2 style={styles.title}>{category.title}</h2>
      <div style={styles.divider} />
      <div style={styles.gridContainer}>
        {requiredProducts?.map((item) => (
          <div key={item.id} style={styles.gridItem}>
            <DisplayItem item={item} onClick={handleCart} />
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  title: {
    color: "black",
    paddingLeft: 40,
  },
  divider: {
    backgroundColor: "black",
    height: 2,
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: 16,
    margin: 16,
  },
  gridItem: {
    border: "1px solid white",
    borderRadius: 12,
    padding: 16,
    textAlign: "center",
  },
};
export default DisplayItems;
