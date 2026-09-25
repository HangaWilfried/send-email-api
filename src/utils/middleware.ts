import type { Request, Response, NextFunction } from "express";
import { SOCIAL_BOTS } from "./constants";

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

function isSocialBot(req: Request) {
  const ua = req.headers["user-agent"] || "";
  return SOCIAL_BOTS.some((regex) => regex.test(ua));
}

export function socialBotMiddleware(
  req: Request,
  _: Response,
  next: NextFunction,
) {
  if (isSocialBot(req)) {
    req.isSocialBot = true;
  }
  next();
}
