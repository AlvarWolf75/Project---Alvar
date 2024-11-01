import React from "react";
import SimpleTemplate from "../../templates/SimpleTemplate";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const textStyle = {
  width: "100px",
  borderRight: "1px solid rgb(221, 221, 221)",
  paddingRight: "10px",
  borderBottom: "1px solid rgb(221, 221, 221)",
};

const ViewReview = () => {
  const [views, setViews] = useState([]);
  const location = useLocation();

  useEffect(() => {
    console.log("state received from homeDashBoard", location.state.item);
    const fetchData = async () => {
      try {
        await axios;
        axios
          .post("http://localhost:3001/viewReviews", location.state.item)
          .then((res) => {
            console.log("Response from server in the View:", res.data);
            setViews(res.data);
          })
          .catch((err) => console.log("Error from ViewReview", err))
          .finally(() => console.log("done"));
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <SimpleTemplate>
      <div>
        <h2
          style={{
            borderBottom: "3px solid black",
            fontSize: "24px",
            color: "purple",
            textAlign: "center",
          }}
        >
          Reviews
        </h2>
        {views.length > 0 ? (
          <div style={{ marginLeft: "10px" }}>
            <p
              style={{ textAlign: "center", color: "brown", fontSize: "20px" }}
            >
              All Reviews for {location.state.item.name}
            </p>
            <table
              style={{
                border: "1px solid rgb(221, 221, 221)",
                borderCollapse: "collapse",
                padding: "10px",
              }}
            >
              <thead>
                <tr>
                  <th style={textStyle}>Product Price</th>

                  <th style={textStyle}>Manufacturer Name</th>

                  <th style={textStyle}>Rating</th>
                  <th style={textStyle}>Review date</th>
                  <th style={textStyle}>Review Text</th>
                  <th style={textStyle}>UserName</th>

                  <th style={textStyle}>StoreId</th>
                  <th style={textStyle}>StoreCity</th>
                  <th style={textStyle}>StoreState</th>
                  <th style={textStyle}>StorePin</th>
                </tr>
              </thead>

              <tbody>
                {views.map((item, index) => (
                  <tr key={index}>
                    <td style={textStyle}>${item.productprice}</td>

                    <td style={textStyle}>{item.productmaker}</td>

                    <td style={textStyle}>{item.reviewRating}</td>
                    <td style={textStyle}>{item.reviewDate}</td>
                    <td style={textStyle}>{item.reviewText}</td>
                    <td style={textStyle}>{item.username}</td>

                    <td style={textStyle}>{item.storeID}</td>
                    <td style={textStyle}>{item.retailercity}</td>
                    <td style={textStyle}>{item.retailerstate}</td>
                    <td style={textStyle}>{item.retailerpin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "brown", fontSize: "20px" }}>
            There are No Reviews for this Product.
          </p>
        )}
      </div>
    </SimpleTemplate>
  );
};

export default ViewReview;
