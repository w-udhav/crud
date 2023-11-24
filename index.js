const express = require("express");
const app = express();

app.use(urlencoded({ extended: false })).use(json());

app.listen(4000, () => console.log("Server running on port 5000"));
