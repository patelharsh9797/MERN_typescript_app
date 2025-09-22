/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z, type ZodType } from "zod";

type Infer<T> = T extends ZodType ? z.infer<T> : unknown;

type Schemas = {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
};

export type HandlerFor<S extends Schemas> = (
  req: Request<Infer<S["params"]>, any, Infer<S["body"]>, Infer<S["query"]>>,
  res: Response,
  next: NextFunction
) => any | Promise<any>;

export function withValidated<S extends Schemas>(
  schemas: S,
  handler: HandlerFor<S>
): RequestHandler {
  return (req, res, next) => {
    const body = schemas.body
      ? schemas.body.safeParse(req.body)
      : { success: true, data: req.body };
    const params = schemas.params
      ? schemas.params.safeParse(req.params)
      : { success: true, data: req.params };
    const query = schemas.query
      ? schemas.query.safeParse(req.query)
      : { success: true, data: req.query };

    const firstFail = !body.success
      ? body
      : !params.success
      ? params
      : !query.success
      ? query
      : null;

    if (firstFail && "error" in firstFail) {
      const details = firstFail.error.issues.map((issue) => ({
        message: `${issue.path.join(".")} is ${issue.message}`,
      }));

      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: details,
      });
    }

    // overwrite with parsed (typed) data so handler gets the narrowed types
    if (schemas.body) (req as any).body = body.data;
    if (schemas.params) (req as any).params = params.data;
    if (schemas.query) (req as any).query = query.data;

    return handler(req as any, res, next);
  };
}
