import React, { useEffect } from "react";
import HomeDashboard from "./components/pages/HomeDashboard/HomeDashboard";
import Cart from "./components/pages/Cart/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from "./components/pages/Account/Account";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "./lib/helpers";
import Login from "./components/pages/Login/Login";
import Order from "./components/pages/Cart/Order";
import AddProduct from "./components/pages/Product/AddProduct";
import { setProducts } from "./redux/actions/cartActions";
import ViewReview from "./components/pages/HomeDashboard/ViewReview";
import WriteReview from "./components/pages/HomeDashboard/WriteReview";
import Analytics from "./components/pages/HomeDashboard/Analytics";
import DisplaySearchItem from "./components/pages/HomeDashboard/DisplaySearchItem";
import Recommend from "./components/pages/HomeDashboard/Recommend";
import Trending from "./components/pages/HomeDashboard/Trending";

//Reading data from API
const App = () => {
  const { loggedInUserId } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    try {
      fetch(`http://localhost:3001/products`)
      .then(response => response.json())
      .then(data => {
        console.log("dispatch");
        dispatch(setProducts(data));
        console.log('dispatched done');
      })
      .catch(error => {
        // Handle errors, e.g., display an error message
        console.error('Error making POST request:', error.message);
      });

    } catch (error) {
      // Handle the error if needed
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderAuthorizedRouters = () => (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/account" element={<Account />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/viewReviews" element={<ViewReview />} />
        <Route path="/writeReview" element={<WriteReview/>} />
        <Route path="/analytics" element={<Analytics/>} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="*" element={<HomeDashboard />} />
        
        {/* <Route path="/WriteReview" element={<WriteReview />} /> */}
      </Routes>
    </BrowserRouter>
  );

  const renderPublicRouter = () => (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<DisplaySearchItem />} />
        <Route path="*" element={<HomeDashboard />} />
        
      </Routes>
    </BrowserRouter>
  );

  if (!isEmpty(loggedInUserId)) {
    return renderAuthorizedRouters();
  }

  return renderPublicRouter();
};


export default App;

