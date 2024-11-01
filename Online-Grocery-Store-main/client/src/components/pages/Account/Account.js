import React, { useEffect, useState } from "react";
import SimpleTemplate from "../../templates/SimpleTemplate";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../organisms";
import { cancelOrder } from "../../../redux/actions/cartActions";
import { setOrders } from "../../../redux/actions/cartActions";
import apiService from "../../../constants/apiService";

const Account = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);
  const { loggedInUserId } = useSelector((state) => state.authReducer);
  const { orders } = useSelector((state) => state.cartReducer);
  const userOrders = orders?.filter(
    (order) => order.userName === user.username
  );

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
    if (isOrderCanceled) {
      fetchData();
      setIsOrderCanceled(false);
    }
  }, [isOrderCanceled]);

  console.log(orders);
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

  return (
    <SimpleTemplate>
      <h2 style={styles.title}>Account History</h2>
      <div style={styles.divider} />
      <h3 style={styles.title}>Your Orders</h3>
      {userOrders?.length ? (
        userOrders?.map((order) => (
          <div key={order.OrderId} style={styles.itemContainer}>
            <p style={{ width: 20 }}>{order.OrderId}</p>
            <p style={{ width: 100 }}>{order.orderName}</p>
            <p style={{ width: 20 }}>
              {order.deliveryAction || "In Store Pickup"}
            </p>
            <p style={{ width: 200 }}>
              Ordered on {order.orderedDate?.toString()}
            </p>
            <p>Total: {order.orderPrice}</p>
            <Button
              buttonName="Cancel"
              buttonStyles={styles.buttonStyle}
              onClick={() => handleCancelOrder(order.OrderId)}
            />
          </div>
        ))
      ) : (
        <p style={{ paddingLeft: 40 }}>No Orders placed yet!</p>
      )}
    </SimpleTemplate>
  );
};

const styles = {
  title: {
    color: "#000",
    paddingLeft: 40,
  },
  divider: {
    backgroundColor: "black",
    height: 2,
  },
  buttonStyle: {
    backgroundColor: "#F9F6EE",
    marginBottom: 20,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
    padding: 20,
    border: "1px solid black",
    borderRadius: 12,
  },
};

export default Account;
