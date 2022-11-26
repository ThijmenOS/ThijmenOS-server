import express from "express";
import cors from "cors";
import { BaseRoutes } from "./routes/baseRoutes";
import bodyParser from "body-parser";

const app = express();
const port = 8080;
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use("/static", express.static("userfiles/"));
new BaseRoutes(app).defineRoutes();

app.listen(port, () => {
  console.log(`api listening on port ${port}`);
});
