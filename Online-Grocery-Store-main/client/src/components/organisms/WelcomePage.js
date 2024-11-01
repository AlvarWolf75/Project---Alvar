import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categories, userTypes } from "../../constants";

import SmartHomes from "../../assets/grocery.jpg";
import Button from "./Button";
import { cancelOrder, removeProduct } from "../../redux/actions/cartActions";
import Register from "../pages/Login/Register";
import UpdateProduct from "../pages/Login/UpdateProductModal";
import { setOrders } from "../../redux/actions/cartActions";
import apiService from "../../constants/apiService";
import AddProduct from "../pages/Login/AddProductModal";

const WelcomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInUserId, user } = useSelector((state) => state.authReducer);
  // const { users } = useSelector((state) => state.userReducer);
  const { orders, products } = useSelector((state) => state.cartReducer);
  // const user = users?.find((u) => u.id === loggedInUserId);
  const [showUserRegisterForm, setShowUserRegisterForm] = useState(false);
  const [showProductUpdateForm, setShowProductUpdateForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [categoryId, setCategoryId] = useState("1");
  const requiredProducts = products?.filter(
    (item) => item.category.toString() === categoryId
  );

  //add modal
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  //add modal

  const [isOrderCanceled, setIsOrderCanceled] = useState(true);

  useEffect(() => {
    console.log("useEffect");
    const fetchData = async () => {
      try {
        const orders = await apiService.fetchOrders();
        dispatch(setOrders(orders));
      } catch (error) {
        // Handle the error if needed
      }
    };

    // Call the fetch function when the component mounts
    if (isOrderCanceled && user?.usertype === userTypes.SALES_MANAGER) {
      fetchData();
      console.log("fetching orders");
      setIsOrderCanceled(false);
    }
  }, [isOrderCanceled, user?.usertype]);

  const handleCancelOrder = (orderId) => {
    setIsOrderCanceled(true);
    // dispatch(cancelOrder(orderId));
    //Add post request to cancel order/delete order
    fetch("http://localhost:3001/delete-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers as needed
      },
      body: JSON.stringify({ OrderId: orderId }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response, e.g., update state or perform other actions
        console.log("Response from server:", data);
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message
        console.error("Error making POST request:", error.message);
      });

    alert(`Canceled Order ${orderId}`);
  };

  const handleDeleteProduct = (productId) => {
    fetch("http://localhost:3001/delete-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers as needed
      },
      body: JSON.stringify({ id: productId }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response, e.g., update state or perform other actions
        dispatch(removeProduct(productId));
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message
        console.error("Error making POST request:", error.message);
      });

    alert(`Product deleted ${productId}`);
  };

  const handleRegisterModal = () => {
    setShowUserRegisterForm(!showUserRegisterForm);
  };

  const handleAddModal = () => {
    setShowAddProductForm(!showAddProductForm);
  };

  const handleUpdateModal = (product) => {
    setShowProductUpdateForm(!showProductUpdateForm);
    setSelectedProduct(product);
  };

  const renderCustomerHome = () => (
    <div style={styles.container}>
      <h1>Online Grocery Store</h1>
      <img src={SmartHomes} alt="smart homes" style={styles.imageStyles} />
      <p>High quality products, with quality delivery</p>
      <h3>Please check the left navigation to go through amazing products</h3>
    </div>
  );

  const renderStoreManagerHome = () => (
    <div>
      <h2 style={styles.title}>Welcome Product Supervisor, {user?.username}</h2>
      <div style={styles.divider} />
      <Button
        buttonName="Add Product"
        buttonStyles={{ ...styles.buttonStyle, marginLeft: 40, marginTop: 40 }}
        onClick={handleAddModal}
      />
      <div style={styles.formItem}>
        <label htmlFor="delivery-action" style={styles.label}>
          Select Category:{" "}
        </label>
        <select
          id="type"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          {categories?.map((c) => (
            <option value={c.id}>{c.label}</option>
          ))}
        </select>
      </div>
      {requiredProducts?.length ? (
        <div style={styles.usersContainer}>
          {requiredProducts?.map((product) => (
            <div key={product.id} style={styles.itemContainer}>
              <p style={{ width: 200 }}>{product.name}</p>
              <p style={{ width: 200 }}>Price: {product.price}</p>
              <Button
                buttonName="Update"
                buttonStyles={styles.buttonStyle}
                onClick={() => handleUpdateModal(product)}
              />
              <Button
                buttonName="Delete"
                buttonStyles={styles.buttonStyle}
                onClick={() => handleDeleteProduct(product.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <p style={{ paddingLeft: 40 }}>
          No Products are available in the selected category
        </p>
      )}
      <UpdateProduct
        isOpen={showProductUpdateForm}
        setModalOpen={setShowProductUpdateForm}
        product={selectedProduct}
      />

      <AddProduct
        isOpen={showAddProductForm}
        setModalOpen={setShowAddProductForm}
      />
    </div>
  );

  const renderSalesManagerHome = () => (
    <div>
      <h2 style={styles.title}>Welcome Sales Supervisor, {user?.username}</h2>
      <div style={styles.divider} />
      <Button
        buttonName="Register Customer"
        buttonStyles={{ ...styles.buttonStyle, marginLeft: 40, marginTop: 40 }}
        onClick={handleRegisterModal}
      />
      <Button
        buttonName="Add Order"
        buttonStyles={{ ...styles.buttonStyle, marginLeft: 40, marginTop: 10 }}
        // onClick={() =>
        //   //alert("Please add items to cart and checkout to place an order")
        // }
      />
      <h3 style={styles.title}>Orders Placed</h3>
      {orders?.length ? (
        <div style={styles.usersContainer}>
          {orders?.map((orders) => (
            <div key={orders.id} style={styles.itemContainer}>
              <p style={{ width: 20 }}>{orders.OrderId}</p>
              <p style={{ width: 20 }}>{orders.userName}</p>
              <p style={{ width: 100 }}>{orders.orderName}</p>
              <p style={{ width: 20 }}>
                {orders.deliveryAction || "In Store Pickup"}
              </p>
              <p style={{ width: 200 }}>
                Ordered on {orders.orderedDate?.toString()}
              </p>
              <p>Total: {orders.orderPrice}</p>
              <Button
                buttonName="Cancel"
                buttonStyles={styles.buttonStyle}
                onClick={() => handleCancelOrder(orders.OrderId)}
              />
            </div>
          ))}
        </div>
      ) : (
        <p style={{ paddingLeft: 40 }}>No Registered customers yet!</p>
      )}
      <Register
        isOpen={showUserRegisterForm}
        setModalOpen={setShowUserRegisterForm}
      />
    </div>
  );

  switch (user?.usertype) {
    case userTypes.STORE_MANAGER:
      return renderStoreManagerHome();
    case userTypes.SALES_MANAGER:
      return renderSalesManagerHome();
    case userTypes.CUSTOMER:
    default:
      return renderCustomerHome();
  }
};

const styles = {
  container: {
    textAlign: "center",
  },
  usersContainer: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  title: {
    color: "#000",
    paddingLeft: 40,
  },
  divider: {
    backgroundColor: "black",
    height: 2,
  },
  imageStyles: {
    width: 600,
    height: 400,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid black",
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    borderRadius: 12,
  },
  buttonStyle: {
    backgroundColor: "#F9F6EE",
  },
  formItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    width: "20%",
    paddingLeft: 40,
  },
  input: (isFixed) => ({
    ...(isFixed
      ? {
          borderWidth: 0,
          paddingTop: 20,
          fontSize: 16,
          marginLeft: 10,
        }
      : {
          paddingTop: 20,
        }),
  }),
};

export default WelcomePage;
