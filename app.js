require("dotenv").config();
const express = require('express');

const app = express();

const userRouter = require("./api/users/user.router");
const productRouter = require("./api/product/product.router");

app.use(express.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use("/user", userRouter);
app.use("/product", productRouter);


app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running on PORT : ",  process.env.APP_PORT);
});

