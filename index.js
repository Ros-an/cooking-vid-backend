const express = require('express');
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// database connnection 
const {initiateDbConnection} = require("./db/database_connection");

// bring in Routes
const videoRoutes = require("./routes/video.route");
const authRoutes = require("./routes/auth.route");
// const {fillDB} = require("./models/video.model");

// inititate connection
initiateDbConnection();


// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", videoRoutes);
app.use("/api", authRoutes);

app.get('/', (req, res) => {
  res.send('Hello Express, today I will code backend for cookingvid!')
});

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Server started');
});