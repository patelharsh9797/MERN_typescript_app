/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let error: any = { ...err };
    error.message = err.message;

    // if (env.NODE_ENV === "development") console.error(err);

    // Mongoose bad ObjectId
    if (err.name === "CastError") {
      const message = "Resource not found";
      error = new Error(message);
      (error as any).statusCode = 404;
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
      const message = "Duplicate field value entered";
      error = new Error(message);
      (error as any).statusCode = 400;
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map(
        (val) => (val as { message: string }).message
      );
      error = new Error(message.join(", "));
      (error as any).statusCode = 400;
    }

    res
      .status((error as any).statusCode || 500)
      .json({ success: false, error: error.message || "Server Error" });
  } catch (error) {
    console.error(err);
    next(error);
  }
};

export default errorMiddleware;
