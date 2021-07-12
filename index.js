const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express, today I will code backend for cookingvid!')
});

app.listen(3000, () => {
  console.log('server started');
});