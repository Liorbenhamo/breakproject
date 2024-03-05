const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const usersRoutes = require("./routes/usersroute");
const postsRoutes = require("./routes/postsroutes");

mongoose
  .connect(process.env.MONGO_CONNECTOR, {})
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.log("Unable to connect to MongoDB Atlas");
    console.error(err.message);
  });
app.use(cookieParser());
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/users", usersRoutes);

app.use("/posts", postsRoutes);

app.listen(3000, () => console.log("server is running on port 3000"));
