const MongoRepo = require("../repository/MongoRepository");

class MongoController {
  constructor() {
    this.mongoRepo = new MongoRepo();
  }

  async getTop3InEveryCity(req, res) {
    try {
      const reviewList = await this.mongoRepo.selectReviewForChart();
      reviewList.sort((r1, r2) => parseInt(r2.reviewRating) - parseInt(r1.reviewRating));
  
      const reviewMap = new Map();
  
      // Get list of cities in all reviews
      const zipCodeList = Array.from(new Set(reviewList.map((review) => review.retailerPin)));
  
      // Get top 3 reviews for every city
      zipCodeList.forEach((zipCode) => {
        const top3ReviewsCity = reviewList
          .filter((review) => review.retailerPin === zipCode)
          .slice(0, 3);
  
        if (top3ReviewsCity.length > 0) {
          reviewMap.set(zipCode, top3ReviewsCity);
        }
      });
  
      // Flatten the map values into a single array
      const top3Reviews = Array.from(reviewMap.values()).flat();
  
      const reviewJson = JSON.stringify(top3Reviews);
      console.log("reviewJson", reviewJson);
      res.status(200).send(reviewJson);
    } catch (error) {
      console.error("Error executing query:", error.message);
      res.status(500).send("Error executing query");
    }
  }
  

  async getReviewsFromDatabase(res, item) {
    try {
      const rows = await this.mongoRepo.selectReview();
      console.log("rows", rows);
      console.log("item", item);
      res.status(200).send(rows[item.name] ? rows[item.name] : []);
    } catch (error) {
      console.error("Error executing query:", error.message);
      res.status(500).send("Error executing query");
    }
  }

  async setReviewsToDatabase(res, item) {
    try {
      const rows = await this.mongoRepo.insertReview(
        item.productName,
        item.productType,
        item.productPrice,
        item.productMaker,
        item.storeID,
        item.retailerPin,
        item.retailerCity,
        item.retailerState,
        item.reviewRating,
        item.reviewDate,
        item.reviewText,
        item.username
      );
      res
        .status(200)
        .send(rows[item.productName] ? rows[item.productName] : []);
    } catch (error) {
      console.error("Error executing query:", error.message);
      res.status(500).send("Error executing query");
    }
  }
}

module.exports = MongoController;
