import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import SimpleTemplate from '../../templates/SimpleTemplate';
import raw from '../../../assets/matrixFactorizationBasedRecommendations.json';
import DisplayItem from "./DisplayItem";
import { addToCart } from '../../../redux/actions/cartActions';
import { useNavigate } from 'react-router-dom';

const Recommend = () => {

    const { products = [] } = useSelector((state) => state.cartReducer);
    const { user } = useSelector((state) => state.authReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loggedInUserId = user?.username;

    const handleCart = (item, type) => {
        switch (type) {
          case "write":
            navigate("/writeReview", { state: { item: item } });
            break;
          case "read":
            navigate("/viewReviews", { state: { item: item } });
            break;
          default:
            // console.log("item", item);
            dispatch(addToCart(item));
            break;
        }
      };

    //console.log("products",products);
    console.log("user:",loggedInUserId);

    const userData = raw;
  
    // State to store the result for the logged-in user
    const [userProductData, setUserProductData] = useState([]);
  
    useEffect(() => {
      // Function to process the data for the logged-in user
      const processUserData = () => {
        const loggedInUserData = userData[loggedInUserId];
  
        if (loggedInUserData) {
          const loggedInUserProducts = loggedInUserData
            .map((productName) => products.find((product) => product.name === productName))
            .filter(Boolean); // Remove undefined products
  
          setUserProductData(loggedInUserProducts);
        }
        console.log("userProductData",userProductData);
      };
  
      // Call the processing function
      processUserData();
    }, [loggedInUserId]);
  
    return (
        <SimpleTemplate>
            <h2 style={styles.title}>Recommended Products</h2>
            <div style={styles.divider} />
            <div style={styles.gridContainer}>
                {userProductData?.map((item) => (
                    <DisplayItem item={item} onClick={handleCart}/>
                ))}
            </div>
            
        </SimpleTemplate>
        
      
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
  
  export default Recommend;