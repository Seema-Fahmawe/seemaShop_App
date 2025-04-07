import express from "express";
import initApp from "./src/index.router.js";
import "dotenv/config";

const app = express();
initApp(app, express);
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
