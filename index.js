const express = require("express");
const todoRoutes = require("./routes/todoRoutes");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/todo", todoRoutes); //? http://localhost:{PORT}/todo

// Start the server
app.listen(PORT, () => {
  console.log(`
  ===============================
    Listening on port :: ${PORT}
  ===============================
  `);
});
