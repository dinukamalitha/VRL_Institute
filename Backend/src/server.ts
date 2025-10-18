import app from "./app";
import { ENV } from "./config/env";
import { logger } from "./utils/logger";

const port = Number(ENV.PORT) || 5000;

app.listen(port, "0.0.0.0", () => {
    logger.info(`✅ Server running on http://0.0.0.0:${port} in ${ENV.NODE_ENV} mode`);
});
