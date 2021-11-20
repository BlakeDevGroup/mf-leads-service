import winston from "winston";

const LogService = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "app.log" }),
    ],
});

if (process.env.NODE_ENV !== "production") {
    LogService.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    );
}

export default LogService;
