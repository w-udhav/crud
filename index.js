const express = require("express");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
const PORT = 5000;

app.use(urlencoded({ extended: false })).use(json());

app.listen(PORT, () => {
  console.log(`
  ===============================
    Listening on port :: ${PORT}
  ===============================
  `);
});
