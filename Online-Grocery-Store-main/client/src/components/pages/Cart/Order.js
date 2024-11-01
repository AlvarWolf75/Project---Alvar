import React, { useEffect, useState } from "react";
import SimpleTemplate from "../../templates/SimpleTemplate";
import { useDispatch, useSelector } from "react-redux";
import DisplayCartItem from "./DisplayCartItem";
import { Button } from "../../organisms";
import {
  placeOrder,
  removeAllCartItems,
} from "../../../redux/actions/cartActions";

const Order = () => {
  const dispatch = useDispatch();
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedPlaceMarker, setSelectedPlaceMarker] = useState(null);
  const { loggedInUserId, user } = useSelector((state) => state.authReducer);
  const { cart, currentOrderId } = useSelector((state) => state.cartReducer);
  const totalCount = cart.reduce((sum, product) => sum + product.price, 0);
  const itemsToOrder = cart.reduce(
    (itemNames, product) => itemNames + "\n" + product.name,
    ""
  );
  const [deliveryAction, setDeliveryAction] = useState();
  const [orderDetails, setOrderDetails] = useState({
    deliveryAction: "Home Delivery",
  });
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleDeliveryActionChange = (e) => {
    const selectedDeliveryAction = e.target.value;
    setOrderDetails({
      ...orderDetails,
      deliveryAction: selectedDeliveryAction,
    });
    setDeliveryAction(selectedDeliveryAction);
  };

  const handleOrder = () => {
    setIsOrderPlaced(true);
    setOrderDetails({ ...orderDetails, id: currentOrderId + 1 });
    dispatch(removeAllCartItems());

    console.log("when order is placed", orderDetails);

    const customerOrder = {
      // orderId: currentOrderId + 1,
      userName: user.username,
      orderName: itemsToOrder,
      orderprice: totalCount,
      deliveryAction: orderDetails.deliveryAction,
      orderedDate: new Date(),
      creditCardNo: orderDetails.creditNo,
      address: JSON.stringify(orderDetails.address || selectedPlace),
    };

    // dispatch(
    //   placeOrder({
    //     ...orderDetails,
    //     id: currentOrderId + 1,
    //     userId: user.id,
    //     total: totalCount,
    //     userName: user.username,
    //     orderedDate: new Date(),
    //     items: itemsToOrder,
    //   })
    // );
    handleCustomerOrder(customerOrder);
  };

  const handleCustomerOrder = (customerOrder) => {
    fetch("http://localhost:3001/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerOrder),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from server:", data);
      })
      .catch((error) => {
        console.error("Error making POST request:", error.message);
      });
  };

  useEffect(() => {
    if (deliveryAction === "in-store-pickup") {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          const mapInstance = new window.google.maps.Map(
            document.getElementById("map"),
            {
              center: { lat: latitude, lng: longitude },
              zoom: 10,
            }
          );
          setMap(mapInstance);

          // Add a marker for your current location
          const myLocationMarker = new window.google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: mapInstance,
            title: "Your Location",
            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Custom icon for your location
          });
          setMarkers((prevMarkers) => [...prevMarkers, myLocationMarker]);

          const placesService = new window.google.maps.places.PlacesService(
            document.createElement("div")
          );

          const request = {
            location: new window.google.maps.LatLng(latitude, longitude),
            radius: 5000,
            type: "supermarket",
          };

          placesService.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              setPlaces(results);
              
              const placeMarkers = results.map((place) => {
                return new window.google.maps.Marker({
                  position: place.geometry.location,
                  map: mapInstance,
                  title: place.name,
                });
              });

              // Update markers state with placeMarkers
              setMarkers((prevMarkers) => [...prevMarkers, ...placeMarkers]);
            } else {
              setError("Error fetching nearby places");
            }

            return () => {
              // Clean up if needed when the component is unmounted
              if (mapInstance) {
                mapInstance.setMap(null);
              }
            };
          });
        },
        (error) => {
          setError("Error getting location");
        }
      );
    }
  }, [deliveryAction]);

  return (
    <SimpleTemplate>
      <h2 style={styles.title}>Place Order</h2>
      <div style={styles.divider} />

      {isOrderPlaced ? (
        <>
          <h2 style={styles.title}>Your Order is placed</h2>
          <p style={{ paddingLeft: 40 }}>
            Your Order is on its way, you will receive it
            in 3 days of time
          </p>
        </>
      ) : (
        <>
          <div style={styles.form}>
            <div style={styles.formItem}>
              <label htmlFor="username" style={styles.label}>
                Username:
              </label>
              <input
                style={styles.input(true)}
                type="text"
                value={user.username}
                readOnly
              />
            </div>
            <p style={{ margin: 0, marginBottom: 10 }}>Products Purchased: </p>
            {cart.map((item) => (
              <DisplayCartItem
                // key={index}
                item={item}
                containerStyles={styles.itemContainer}
              />
            ))}
            <div style={styles.formItem}>
              <label htmlFor="total" style={styles.label}>
                Total Order Count:
              </label>
              <input
                style={styles.input(true)}
                type="text"
                value={totalCount}
                readOnly
              />
            </div>
            <div style={styles.formItem}>
              <label htmlFor="creditNo" style={styles.label}>
                Credit Card / Account Number:{" "}
              </label>
              <input
                type="text"
                value={orderDetails?.creditNo}
                onChange={(e) =>
                  setOrderDetails({ ...orderDetails, creditNo: e.target.value })
                }
                required
              />
            </div>
            <div style={styles.formItem}>
              <label htmlFor="delivery-action" style={styles.label}>
                Delivery Action:{" "}
              </label>
              <select
                id="type"
                value={orderDetails?.deliveryAction}
                onChange={handleDeliveryActionChange}
                defaultValue="---"
                required
              >
                <option value="---">---</option>
                <option value="in-store-pickup">In Store Pickup</option>
                <option value="home-delivery">Home Delivery</option>
              </select>
            </div>

            {deliveryAction === "in-store-pickup" && (
              <>
                <label htmlFor="nearBy" style={styles.label}>
                  Nearby Places:{" "}
                </label>
                {error ? (
                  <p style={{ color: "red" }}>{error}</p>
                ) : (
                  <>
                    <select
                      id="type"
                      value={selectedPlace}
                      onChange={(e) =>{
                        console.log("selected place", e.target.value)
                        setSelectedPlace(e.target.value)}
                      } 
                      defaultValue="---"
                      required
                  
                    >
                      <option value="---">---</option>
                      {places
                        .filter((place) => place !== "" && place !== "")
                        .map((place, index) => (
                          <option key={index} value={place.vicinity}>
                            {place.name}
                          </option>
                        ))}
                    </select>
                    <div
                      id="map"
                      style={{ height: "400px", width: "100%" }}
                    ></div>
                  </>
                )}
              </>
            )}
            {deliveryAction === "home-delivery" && (
              <div>
                <p style={{ margin: 0, marginBottom: 10 }}>Customer Address:</p>
                <div style={styles.formItem}>
                  <label htmlFor="delivery-action" style={styles.label}>
                    ZipCode:{" "}
                  </label>
                  <select
                    id="type"
                    value={orderDetails?.address?.zipcode}
                    onChange={(e) =>
                      setOrderDetails({
                        ...orderDetails,
                        address: {
                          ...orderDetails?.address,
                          zipcode: e.target.value,
                        },
                      })
                    }
                    required
                  >
                    <option value="24356">24356</option>
                    <option value="45678">45678</option>
                    <option value="78908">78908</option>
                    <option value="56789">56789</option>
                  </select>
                </div>
                <div style={styles.formItem}>
                  <label htmlFor="street" style={styles.label}>
                    Street:{" "}
                  </label>
                  <input
                    type="text"
                    value={orderDetails?.address?.street}
                    onChange={(e) =>
                      setOrderDetails({
                        ...orderDetails,
                        address: {
                          ...orderDetails?.address,
                          street: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div style={styles.formItem}>
                  <label htmlFor="city" style={styles.label}>
                    City:{" "}
                  </label>
                  <input
                    type="text"
                    value={orderDetails?.address?.city}
                    onChange={(e) =>
                      setOrderDetails({
                        ...orderDetails,
                        address: {
                          ...orderDetails?.address,
                          city: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div style={styles.formItem}>
                  <label htmlFor="state" style={styles.label}>
                    State:{" "}
                  </label>
                  <input
                    type="text"
                    value={orderDetails?.address?.state}
                    onChange={(e) =>
                      setOrderDetails({
                        ...orderDetails,
                        address: {
                          ...orderDetails?.address,
                          state: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
            )}
          </div>
          <div style={{ textAlign: "-webkit-center" }}>
            <Button
              buttonName="Place Order"
              buttonStyles={styles.buttonStyle}
              onClick={handleOrder}
            />
          </div>
        </>
      )}
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
  buttonStyle: {
    backgroundColor: "#F9F6EE",
    marginBottom: 20,
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    width: "20%",
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
  itemContainer: {
    margin: 2,
    padding: 0,
    paddingLeft: 10,
    paddingRight: 10,
  },
};

export default Order;
