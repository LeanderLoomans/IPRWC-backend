require("dotenv").config();

const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');

const privateKey  = fs.readFileSync('ssl/privkey.pem', 'utf8');
const certificate = fs.readFileSync('ssl/cert.pem', 'utf8');

const credentials = {key: privateKey, cert: certificate};

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

app.get("/", (req, res) => {
  res.status(200).json({
    success: 1,
    message: "API is up and running :)"
  })
})

const httpServer = http.createServer(app);
//const httpsServer = https.createServer(credentials, app)

httpServer.listen(process.env.APP_PORT_HTTP, () => {
  console.log("Server up and running on PORT : ",  process.env.APP_PORT_HTTP);
});

// httpsServer.listen(process.env.APP_PORT_HTTPS, () => {
//   console.log("Server up and running on PORT : ",  process.env.APP_PORT_HTTPS);
// });

