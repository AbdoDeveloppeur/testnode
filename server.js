import express from "express";
const app = express();
import doten from "dotenv";
doten.config({ path: "Config.env" });

app.get("/", (req, res) => {
  res.send("hello dev");
});

app.listen(
  process.env.PORT,
  console.log(`server is connected at port ${process.env.PORT}`)
);
