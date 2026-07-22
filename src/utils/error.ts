import type { Request, Response, NextFunction } from "express";

export class BadRequestException extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
    Object.setPrototypeOf(this, BadRequestException.prototype);
  }
}

export function ErrorHandler(
  err: Error & { statusCode?: number },
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).send(err.message);
}
