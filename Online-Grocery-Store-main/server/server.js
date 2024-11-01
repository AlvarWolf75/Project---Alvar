const express = require("express");
const mysql = require("mysql2");

//

const bodyParser = require("body-parser");

const MongoController = require("./controller/MongoController");

const mongocontrollers = new MongoController();

//

const app = express();
const port = 3001;

app.use(express.json());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// MySQL connection setup (replace with your MySQL credentials)
const db = mysql.createConnection({

  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'react_db_grocery',

});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// Express route to fetch data from MySQL
app.get("/getOrders", (req, res) => {
  // Replace 'your_table' with your actual table name
  const query = "SELECT * FROM customerorders";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    console.log(results);
    res.json(results);
  });
});

app.post("/login", (req, res) => {
  const requestData = req.body;
  console.log("body", req.body);
  const { username, password, usertype } = req.body;
  const query =
    "SELECT * FROM Users WHERE username = ? AND password = ? AND usertype = ?";

  db.query(query, [username, password, usertype], (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    // console.log(results);
    if (results.length > 0) {
      res.json({ msg: "User logged in", user: results[0] });
    } else {
      res.json({ msg: "User not found" });
    }
  });
});

app.get("/user", (req, res) => {
  // Replace 'your_table' with your actual table name

  const queryoptions =
    req.query.usertype != null ? { usertype: req.query.usertype } : true;
  let query = "SELECT * FROM Users WHERE ?";

  db.query(query, queryoptions, (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    // console.log(results);
    res.json(results);
  });
});

app.post("/register", (req, res) => {
  const requestData = req.body;
  // console.log("body",req.body);
  const query = "INSERT INTO Users SET ?";

  db.query(query, requestData, (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    // console.log(results);
    res.json({ msg: "User registered" });
  });
});
// Register customer order API

app.post("/order", (req, res) => {
  const requestData = req.body;
  console.log("body", req.body);
  const query = "INSERT INTO customerorders SET ?";

  db.query(query, requestData, (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    console.log(results);
    res.json({ msg: "order registered" });
  });
});

//delete order API
app.post("/delete-order", (req, res) => {
  const requestData = req.body;
  console.log("delete order", req.body);
  const query = "Delete FROM customerorders WHERE ?";

  db.query(query, requestData, (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    console.log(results);
    res.json({ msg: "order cancelled" });
  });
});
//delete order API

//delete product API
app.post("/delete-product", (req, res) => {
  const requestData = req.body;
  console.log("delete product", req.body);
  const query = "Delete FROM productdetails WHERE ?";

  db.query(query, requestData, (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    console.log(results);
    res.json({ msg: "product deleted" });
  });
});
//delete product API

//edit product API
app.post("/edit-product", (req, res) => {
  const requestData = req.body;
  console.log("edit product", req.body);
  const query = "UPDATE productdetails SET ? WHERE ?";

  db.query(query, [requestData, { id: requestData.id }], (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    console.log(results);
    res.json({ msg: "product updated" });
  });
});
//edit product API

//add product API
app.post("/add-product", (req, res) => {
  const requestData = req.body;
  console.log("add product", req.body);
  const query = "INSERT INTO productdetails SET ?";

  db.query(query, requestData, (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    console.log(results);
    res.json({ msg: "product added" });
  });
});
//add product API

//product read API
app.get("/products", (req, res) => {
  // Replace 'your_table' with your actual table name
  const queryoptions =
    req.query.category != null ? { category: req.query.category } : true;
  let query = "SELECT * FROM productdetails WHERE ?";

  db.query(query, queryoptions, (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    // console.log(results);
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.post("/viewReviews", (req, res) => {
  mongocontrollers.getReviewsFromDatabase(res, req.body);
});

app.post("/writeReview", (req, res) => {
  console.log("write review has a body=", req.body);
  mongocontrollers.setReviewsToDatabase(res, req.body);
});


app.get('/getTopReviews',  (req, res) => {
   mongocontrollers.getTop3InEveryCity(req, res);
});

