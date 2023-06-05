const express = require("express");
const app = express();

const user = require("./routes/user");
const auth = require("./routes/auth");
const store = require("./routes/store");
const connectDB = require("./config/db");

//Connect DB
connectDB();

app.use(express.json());
//Init Middleware
app.use(
  express.urlencoded({ extended: true })
); /* bodyParser.urlencoded() is deprecated */

//Define Route
app.use("/user", user);
app.use("/auth", auth);
app.use("/store", store);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
