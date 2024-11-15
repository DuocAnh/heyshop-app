import express from "express";
const app = express();
import dotenv from "dotenv";

dotenv.config({ path: "backend/config/config.env" });

app.listen(process.env.PORT, () => {
  console.log(
    `Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
