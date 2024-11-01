import React, { useEffect, useState } from "react";
import axios from "axios";
import ChartComponent from "./ChartComponent";
import SimpleTemplate from "../../templates/SimpleTemplate";

const Analytics = () => {
  const [topReviews, setTopReviews] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios;
        axios
          .get("http://localhost:3001/getTopReviews")
          .then((res) => {
            console.log("Response from server in the View:", res.data);
            setTopReviews(res.data);
          })
          .catch((err) => console.log("Error from ViewReview", err))
          .finally(() => console.log("done"));
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  const cities = topReviews.map((review) => review.retailerpin);
  const ratings = topReviews.map((review) => parseInt(review.reviewCount));
  console.log("cities", cities);
  console.log("ratings", ratings);

  return (
    <SimpleTemplate>
      <div>
        <ChartComponent cities={cities} ratings={ratings} />;
      </div>
    </SimpleTemplate>
  );
};

export default Analytics;
