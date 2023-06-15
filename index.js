const express = require("express");
const path = require("path");
const app = express();
const methodOverRide = require("method-override");

const productRoute = require("./routes/productsRoute");

app.use(methodOverRide("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use("/products", productRoute);

app.get("/", (req, res) => {
  res.redirect("/products");
});

app.listen(4000, () => {
  console.log("listening at 4000");
});
