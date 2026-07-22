import type { Request, Response, NextFunction } from "express";

export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const now = new Date().toUTCString();

  console.log(`[${now}] ${req.method} ${req.url}`);
  console.log(`Headers: ${JSON.stringify(req.headers)}`);
  console.log("Body:", req.body);

  next();
}
