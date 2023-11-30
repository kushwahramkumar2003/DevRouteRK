import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/routes.js";
import { invalidPathHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", routes);
app.use(invalidPathHandler);

// app.use("*", (req, res) => {
//   res.status(404).json({ error: "not found" });
// });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
