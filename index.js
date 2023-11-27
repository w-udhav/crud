const express = require("express");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/todo", todoRoutes); //? http://localhost:{PORT}/todos

// Start the server
app.listen(PORT, () => {
  console.log(`
  ===============================
    Listening on port :: ${PORT}
  ===============================
  `);
});
