//const express = require("express");
import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import productRouter from "./routers/productRouter.js";
//const cors = require('cors');
//const mongoose = require("mongoose");
//const bodyParser = require('body-parser');
//import bodyParser from 'body-pacrser';
//const {productRouter} = require('./routers/productRouter');

dotenv.config();

const mongodbUrl = process.env.MONGODB_URL;

const client = mongoose.connect(mongodbUrl,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to database ');
   //loadData();
   // var products = Product.find({});
  //  console.log(products);
})
.catch( (err) => {
    console.error(`Error connecting to the database. \n${err}`);
 });
//middleware

const app = express();
app.use(cors());
app.use(express.json());
 
app.use(function (req, res, next) {
  //  console.log(req.originalUrl);
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Origin', 'http://localhost:3030');
  res.header("Access-Control-Allow-Origin", "https://krishna-alpha.vercel.app");
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE", "OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-client-key, x-client-token, x-client-secret");
  next();
});
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Welcome to a basic express App");
});

  app.use('/api/product', productRouter);
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
