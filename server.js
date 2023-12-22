import express from "express"; // ** import expressjs
const app = express(); // ** define app from expressjs
import dotenv from "dotenv"; // ** import dotenv environment variable
dotenv.config({ path: "Config/Config.env" }); // **  configuration of Dotenv
import { ApiError } from "./utils/ApiError.js";
import { globaleError } from "./middleware/errorGlobalMiddleware.js";
import morgan from "morgan"; // ** logger http request
import connectDB from "./Config/Db.js"; // ** import DbConnect
// ** ======> Route
import CategoryRoute from "./Routes/CategoryRoute.js"; // ** Route Users
import SubCategoryRoute from "./Routes/SubCategoryRoute.js"; // ** Route Users
import BrandRoute from "./Routes/BrandRoute.js"
import ProductRoute from "./Routes/ProductRoute.js"


// ** -----Connect----api-----with-----DB
connectDB();
app.use(express.json()); 

// **---Midlware------of------Morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// **===============> Mount_Route <====================
app.use("/api/category/", CategoryRoute);
app.use("/api/subcategory", SubCategoryRoute);
app.use("/api/brands", BrandRoute);
app.use("/api/products",ProductRoute );



// **  =========> Catch_Route_undefined <==========

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't Find this Route ${req.originalUrl}`, 400));
});

//**  ===========> Global_Error_Handling_MiddleWare_For_Express <=============

app.use(globaleError);

// **-----Server-------Listen
const server = app.listen(
  process.env.PORT,
  console.log(`server is connected at port ${process.env.PORT}`)
);
// ** ===========> UnHandle_rejection_outside_Express <================

process.on("unhandledRejection", (err) => {
  console.log(`unhandledRejection ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("shuting down ..........");
    process.exit(1);
  });
});
