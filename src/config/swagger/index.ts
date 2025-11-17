import { paths } from "./paths/index.js";
import { servers } from "./servers.js";
import { info } from "./info.js";
import { components } from "./components/index.js";
import { OpenAPIV3 } from "openapi-types"
import { tags } from "./tags.js";

export const swaggerDocument: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info,
  servers,
  paths,
  components,
  tags
};