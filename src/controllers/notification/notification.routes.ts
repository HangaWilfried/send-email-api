import express from "express";
import { sendEmailNotification } from "./notification.services";
import { validateSchema, notificationSchema } from "../../utils/validations";

const router = express.Router();

router.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "notification",
    timestamp: new Date().toISOString(),
  });
});

router.post(
  "/",
  validateSchema(notificationSchema),
  sendEmailNotification
);

export default router;
