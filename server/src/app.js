const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const xssClean = require('xss-clean')
const rateLimit = require('express-rate-limit')
const router = require('./routers/users');
const { errorResponse } = require("./controllers/responseController");

const app = express();
const rateLimiter = rateLimit({
  windowMs: 1*60*1000,
  max: 5,
  message:'too many approaches. please try again later'
})
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(xssClean())
app.use(rateLimiter)
app.use("/api/users", router)
app.use((req, res, next) => {
  next(createError(404, "route not found"));
});
app.use((err, req, res, next) => {
  return errorResponse(res,{
    statusCode:err.status,
    message:err.message,
  })
});

module.exports = app;
