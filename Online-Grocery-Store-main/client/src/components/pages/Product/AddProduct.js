import React from "react";
import { isEmpty } from "../../../lib/helpers";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/actions/cartActions";
import SimpleTemplate from "../../templates/SimpleTemplate";
import { useLocation } from "react-router-dom";

const AddProduct = () => {
  const location = useLocation();
  // const { fromHeader = false } = location.state || {};

  const dispatch = useDispatch();
  // const { selectedCategory: category, products } = useSelector(
  //   (state) => state.cartReducer
  // );
  const { loggedInUserId } = useSelector((state) => state.authReducer);

  const handleCart = (item) => {
    console.log("item", item);
    if (isEmpty(loggedInUserId)) {
      //alert("Please Login, to add items to cart");
      return;
    }
    dispatch(addToCart(item));
  };

  return <SimpleTemplate>{<p>Add Product</p>}</SimpleTemplate>;
};

export default AddProduct;
