const PORT = 5000;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const util = require("util");
const cookieParser = require("cookie-parser");

const homeRouter = require("./routes/homeRouter");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productsRouter");
const categoriesRouter = require("./routes/categoriesRouter");
const brandsRouter = require("./routes/brandsRouter");
const orderRouter = require("./routes/ordersRouter");
const cartRouter = require("./routes/cartRouter");
const { authenticateUser } = require("./middleware/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose
  .connect("mongodb://localhost/eCommerce-database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Additional code or server startup logic
  })
  .catch((error) => {
    console.error(
      "Error connecting to MongoDB:",
      util.inspect(error, false, null)
    );
  });

app.use("/", homeRouter.router);
app.use("/user", userRouter.router);
app.use("/products", authenticateUser, productRouter.router);
app.use("/catergories", authenticateUser, categoriesRouter.router);
app.use("/brands", authenticateUser, brandsRouter.router);
app.use("/orders", authenticateUser, orderRouter.router);
app.use("/cart", authenticateUser, cartRouter.router);

app.listen(PORT, () => {
  console.log(`server is running on port :${PORT}`);
});
