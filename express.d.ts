import "express";

declare global {
  namespace Express {
    interface Request {
      isSocialBot?: boolean;
    }
  }
}
