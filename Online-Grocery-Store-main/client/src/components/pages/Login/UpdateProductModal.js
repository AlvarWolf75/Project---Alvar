import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../organisms";
import { updateProduct } from "../../../redux/actions/cartActions";

const UpdateProduct = ({ isOpen, setModalOpen, product }) => {
  const dispatch = useDispatch();
  const [productDetails, setProductDetails] = useState(product);
  // console.log(product, "in updateform", productDetails);

  const handleRegisterNavigation = () => {
    setModalOpen(!isOpen);
    setModalOpen && onModalClose();
  };

  const handleUpdate = () => {
    fetch("http://localhost:3001/edit-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers as needed
      },
      body: JSON.stringify({ ...product, ...productDetails }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response, e.g., update state or perform other actions
        console.log("Response from server:", data);
        dispatch(updateProduct({ ...product, ...productDetails }));
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message
        console.error("Error making POST request:", error.message);
      });
    alert("Product Updated Successfully");
    handleRegisterNavigation();
  };

  const onModalClose = () => {
    setProductDetails({});
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <span className="close-button" onClick={handleRegisterNavigation}>
          &times;
        </span>
        <h2>Update Product</h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="username">Product Name:</label>
          <input
            type="text"
            value={productDetails?.name || product?.name}
            onChange={(e) =>
              setProductDetails({ ...productDetails, name: e.target.value })
            }
            required
          />

          <label htmlFor="password">Price:</label>
          <input
            type="text"
            value={productDetails?.price || product?.price}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                price: Number(e.target.value),
              })
            }
            required
          />
          <Button
            buttonName="Update Product"
            onClick={handleUpdate}
            buttonStyles={styles.buttonStyles}
            textStyles={styles.textStyles}
          />
        </div>
      </div>
    </div>
  );
};
const styles = {
  buttonStyles: {
    backgroundColor: "#F9F6EE",
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 16,
    justifyContent: "center",
  },
  textStyles: {
    textAlign: "center",
  },
};

export default UpdateProduct;
