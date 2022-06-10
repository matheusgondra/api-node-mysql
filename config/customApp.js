import express from "express";
import routes from "../routes/index.js";

export default () => {
   const app = express();

   app.use(
      express.json(),
      ...routes
   );

   return app;
};