import React from 'react';
import SimpleTemplate from '../../templates/SimpleTemplate';
import { useLocation, useNavigate } from 'react-router-dom';
import DisplayItem from './DisplayItem';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../redux/actions/cartActions';


const DisplaySearchItem=() => {
  // Component logic goes here
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { product = [] } = location.state || {};
    const { products = [] } = useSelector((state) => state.cartReducer);
    const selectedProduct = products?.filter(
      (item) => item.id === product?.value
    )?.[0] || {};
    

    const handleCart = (item, type) => {
        //remove temporary
        // if (isEmpty(loggedInUserId)) {
        //   //alert("Please Login, to add items to cart");
        //   return;
        // }
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

  return (
    // JSX code goes here
    <SimpleTemplate>
         <h2 style={styles.title}>Searched Item</h2>
      <div style={styles.divider} />

      <DisplayItem item={selectedProduct} onClick={handleCart} />
    </SimpleTemplate>
  );
}

const styles = {
    title: {
      color: "black",
      paddingLeft: 40,
    },
    divider: {
      backgroundColor: "black",
      height: 2,
    },
  };

export default DisplaySearchItem;
