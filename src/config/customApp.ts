import express from "express";
import routes from "../routes/index.js";
import cors from "cors";
import { pinoHttp } from "pino-http";
import { logger } from "../utils/logger.js";
import { serve, setup } from "swagger-ui-express";
import { swaggerDocument } from "./swagger/index.js";

export default () => {
   const app = express();

   app.use(
      express.json(),
      pinoHttp({ logger }),
      ...routes,
      cors(),
   );
   app.use("/docs", serve, setup(swaggerDocument));

   return app;
};