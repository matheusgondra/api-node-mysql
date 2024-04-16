import { env } from "./config";
import app from "./config/app";

app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`));
