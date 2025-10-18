import app from "./app";
import { ENV } from "./config/env";
import { logger } from "./utils/logger";

app.listen(ENV.PORT, "0.0.0.0", () => {
    logger.info(`Server running on port ${ENV.PORT} in ${ENV.NODE_ENV} mode`);
});
