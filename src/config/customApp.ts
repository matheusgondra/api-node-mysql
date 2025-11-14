import express from "express";
import routes from "../routes/index.js";
import cors from "cors";
import pino from "pino-http"

export default () => {
   const app = express();

   app.use(
      express.json(),
      pino({
         transport: process.env.NODE_ENV !== "production" ? { target: "pino-pretty" } : undefined,
         name: "api",
         level: process.env.NODE_ENV !== "production" ? "debug" : "info"
      }),
      ...routes,
		cors(),
   );

   return app;
};