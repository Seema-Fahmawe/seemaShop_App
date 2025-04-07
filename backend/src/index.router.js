import connectDB from "../DB/connection.js";
import authRouter from "./module/auth/auth.router.js";
import userRouter from "./module/user/user.router.js";
import categoryRouter from "./module/category/category.router.js";
const initApp = (app, express) => {
  app.use(express.json());
  app.use("/", authRouter);
  app.use("/user", userRouter);
  app.use("/category", categoryRouter);
  app.use((err, req, res, next) => {
    return res.status(err.statusCode).json({ message: err.message });
  });
  connectDB();
};

export default initApp;
