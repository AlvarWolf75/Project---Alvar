import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../organisms";
import { addProduct, updateProduct } from "../../../redux/actions/cartActions";
import fetchProducts from "../../../../src/App";

const AddProduct = ({ isOpen, setModalOpen }) => {
  const dispatch = useDispatch();
  const [productDetails, setProductDetails] = useState({});
  const { products } = useSelector((state) => state.cartReducer);

  const handleAddNavigation = () => {
    setModalOpen(!isOpen);

    isOpen && onModalClose();
  };

  const handleAddProduct = () => {
    fetch("http://localhost:3001/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers as needed
      },
      body: JSON.stringify(productDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response, e.g., update state or perform other actions
        console.log("Response from server:", data);
        dispatch(addProduct(productDetails));
        setProductDetails({});
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message
        console.error("Error making POST request:", error.message);
      });
    alert("Product Added Successfully");
    // handleRegisterNavigation();
  };

  fetchProducts();

  const onModalClose = () => {
    console.log("in modal close");
    setProductDetails({});
    setModalOpen(false);
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <span className="close-button" onClick={handleAddNavigation}>
          &times;
        </span>
        <h2>Add Product</h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="id">Product Id:</label>
          <input
            type="text"
            value={productDetails?.id}
            onChange={(e) =>
              setProductDetails({ ...productDetails, id: e.target.value })
            }
            required
          />

          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            value={productDetails?.name}
            onChange={(e) =>
              setProductDetails({ ...productDetails, name: e.target.value })
            }
            required
          />

          <label htmlFor="price">Product price:</label>
          <input
            type="text"
            value={productDetails?.price}
            onChange={(e) =>
              setProductDetails({ ...productDetails, price: e.target.value })
            }
            required
          />

          <label htmlFor="image">Product Image:</label>
          <input
            type="text"
            value={productDetails?.image}
            onChange={(e) =>
              setProductDetails({ ...productDetails, image: e.target.value })
            }
            required
          />

          <label htmlFor="manufacturer">Product manufacturer:</label>
          <input
            type="text"
            value={productDetails?.manufacturer}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                manufacturer: e.target.value,
              })
            }
            required
          />

          <label htmlFor="discount">Product discount:</label>
          <input
            type="text"
            value={productDetails?.discount}
            onChange={(e) =>
              setProductDetails({ ...productDetails, discount: e.target.value })
            }
            required
          />

          <label htmlFor="available">Product Availabile:</label>
          <input
            type="text"
            value={productDetails?.available}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                available: e.target.value,
              })
            }
            required
          />

          <label htmlFor="onSale">Product onSale:</label>
          <input
            type="text"
            value={productDetails?.onSale}
            onChange={(e) =>
              setProductDetails({ ...productDetails, onSale: e.target.value })
            }
            required
          />

          <label htmlFor="manfucturerRebate">Product manfucturerRebate:</label>
          <input
            type="text"
            value={productDetails?.manufacturerRebate}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                manufacturerRebate: e.target.value,
              })
            }
            required
          />

          <label htmlFor="category">Product category:</label>
          <input
            type="text"
            value={productDetails?.category}
            onChange={(e) =>
              setProductDetails({ ...productDetails, category: e.target.value })
            }
            required
          />

          <Button
            buttonName="Add Product"
            onClick={handleAddProduct}
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

export default AddProduct;
