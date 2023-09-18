const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");

//routes
const productRouter = require("./routes/ProductRoutes");
const userRouter = require("./routes/UserRoutes");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb+srv://mostafa:sprints123@cluster0.ylb4w8f.mongodb.net/",
   { useNewUrlParser: true, useUnifiedTopology: true, } ,
   (err) => { if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);
const cors = require("cors");
express()
  .use(cors({ origin: "*" }))
  .use(express.json())
  .use(express.static(path.join(__dirname, "public")))
  .use("/api/products", productRouter)
  .use("/api/users", userRouter)
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.render("pages/index"))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
