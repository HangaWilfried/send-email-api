import type { NextFunction, Request, Response } from "express";
import { resendEmailService } from "../../utils/helpers";

const emailService = resendEmailService();

export async function sendEmailNotification(req: Request, res: Response, next: NextFunction) {
  try {
    const id = await emailService.sendEmail(req.body)
    res.status(200).send(id)
  } catch (error) {
    next(error)
  }
}
