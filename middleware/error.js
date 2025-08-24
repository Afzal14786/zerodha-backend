class customErr extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    if (err.code === 11000) {
        const msg = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new customErr(400, msg);
    }

    if (err.name === "JsonWebTokenError") {
        const msg = `Json Web Token Is Invalid. Try Again!`;
        err = new customErr(400, msg);
    }

    if (err.name == "TokenExpired") {
        const msg = `Json Web Token Is Expired. Try To Login!`;
        err = new customErr(400, msg);
    }

    if (err.name === "CastError") {
        const msg = `Invalid ${err.path}`;
        err = new customErr(400, msg);
    }

    const errMsg = err.errors ? Object.values(err.errors).map((error) => error.message).join(" ") : err.message;

    return res.status(400).json({
        success : false,
        message : errMsg,
    });
}
