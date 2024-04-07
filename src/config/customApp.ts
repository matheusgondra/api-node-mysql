import express from "express";
import routes from "../routes";
import cors from "cors";

export default () => {
   const app = express();

   app.use(
      express.json(),
      ...routes,
		cors()
   );

   return app;
};