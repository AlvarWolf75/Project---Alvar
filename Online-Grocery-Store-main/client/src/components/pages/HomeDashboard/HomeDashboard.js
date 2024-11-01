import React from "react";
import { isEmpty } from "../../../lib/helpers";
import { WelcomePage } from "../../organisms";
import DisplayItems from "./DisplayItems";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/actions/cartActions";
import SimpleTemplate from "../../templates/SimpleTemplate";
import { useLocation, useNavigate } from "react-router-dom";



const HomeDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fromHeader = false } = location.state || {};

  const dispatch = useDispatch();
  const { selectedCategory: category, products } = useSelector(
    (state) => state.cartReducer
  );
  const { loggedInUserId } = useSelector((state) => state.authReducer);

  const handleCart = (item, type) => {
    if (isEmpty(loggedInUserId)) {
      alert("Please Login, to add items to cart");
      return;
    }
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
    <SimpleTemplate>
      {isEmpty(category) || fromHeader ? (
        <WelcomePage />
      ) : (
        <DisplayItems category={category} handleCart={handleCart} />
      )}
    </SimpleTemplate>
  );
};

export default HomeDashboard;
