import { z, ZodTypeAny } from "zod";
import { Request, Response, NextFunction } from "express";
import { BadRequestException } from "./error";

export const validateSchema = <T extends ZodTypeAny>(schema: T) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => {
        return `Field: ${issue.path.join(".")} | Error: ${issue.message}`;
      });

      return next(new BadRequestException(JSON.stringify(errors)));
    }

    req.body = result.data;
    next();
  };
};

export const notificationSchema = z.object({
  html: z.string(),
  subject: z.string(),
  receiver: z.email(),
  from: z.string().optional(),
});

export type NotificationDto = z.infer<typeof notificationSchema>;
