const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const app = express();

// database connnection 
const {initiateDbConnection} = require("./db/database_connection");
initiateDbConnection();



app.get('/', (req, res) => {
  res.send('Hello Express, today I will code backend for cookingvid!')
});

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Server started');
});