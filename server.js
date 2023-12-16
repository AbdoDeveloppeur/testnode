import express from "express"; // ** import expressjs
const app = express(); // ** define app from expressjs
import doten from "dotenv"; // ** import dotenv environment variable
doten.config({ path: "Config/Config.env" }); // **  configuration of Dotenv
import { ApiError } from "./utils/ApiError.js";
import { globaleError } from "./middleware/errorGlobalMiddleware.js";
import morgan from "morgan"; // ** logger http request
import connectDB from "./Config/Db.js"; // ** import DbConnect
import UsersRoute from "./Routes/UsersRoute.js"; // ** Route Users
import CategoryRoute from "./Routes/CategoryRoute.js"; // ** Route Users

// ** -----Connect----api-----with-----DB
connectDB();
app.use(express.json()); // String TO JSON
// **---Midlware------of------Morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// **======> Mount_Route <=========
app.use("/users", UsersRoute);
app.use("/category", CategoryRoute);

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
