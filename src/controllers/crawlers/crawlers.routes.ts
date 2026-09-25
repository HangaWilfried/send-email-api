import { Router, Request, Response, NextFunction } from "express";

import { Business } from "../../utils/api/business";
import { Article, Promotion } from "../../utils/api/product";
import { sendOgHtmlResponse, getImageUrl } from "./crawlers.utils";

const router = Router();

const onlyForBots = (
  handler: (req: Request, res: Response, next: NextFunction) => Promise<void>,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.isSocialBot) return next();
    try {
      await handler(req, res, next);
    } catch (err) {
      console.error("OG error:", err);
      next();
    }
  };
};

router.get(
  "/marketplace/products/:productId",
  onlyForBots(async (req: Request, res: Response) => {
    const { data } = await Article.getArticleById({
      throwOnError: true,
      path: {
        articleId: req.params.productId as string,
        businessId: req.query.fsr as string,
      },
    });

    sendOgHtmlResponse({
      res,
      data: {
        title: data.name,
        url: req.originalUrl,
        description: data.description,
        image: getImageUrl(data.images ?? {}, 0),
      },
    });
  }),
);

router.get(
  "/marketplace/promotions/:promotionId",
  onlyForBots(async (req: Request, res: Response) => {
    const { data } = await Promotion.getPublicPromotionById({
      throwOnError: true,
      path: { promotionId: req.params.promotionId as string },
    });

    sendOgHtmlResponse({
      res,
      data: {
        title: data.article?.name,
        url: req.originalUrl,
        description: data.article?.description,
        image: getImageUrl(data.article?.images ?? {}, 0),
      },
    });
  }),
);

router.get(
  "/marketplace/businesses/:businessId",
  onlyForBots(async (req: Request, res: Response) => {
    const { data } = await Business.getBusinessById({
      throwOnError: true,
      path: { id: req.params.businessId as string },
    });

    sendOgHtmlResponse({
      res,
      data: {
        title: data.name,
        url: req.originalUrl,
        description: data.description,
        image: getImageUrl(data.images ?? {}, "logo"),
      },
    });
  }),
);

router.get(
  "/marketplace/businesses/:businessId/overview",
  onlyForBots(async (req: Request, res: Response) => {
    const { data } = await Business.getBusinessById({
      throwOnError: true,
      path: { id: req.params.businessId as string },
    });

    sendOgHtmlResponse({
      res,
      data: {
        title: data.name,
        url: req.originalUrl,
        description: data.description,
        image: getImageUrl(data.images ?? {}, "logo"),
      },
    });
  }),
);

router.get(
  "/marketplace/businesses/:businessId/reviews",
  onlyForBots(async (req: Request, res: Response) => {
    const { data } = await Business.getBusinessById({
      throwOnError: true,
      path: { id: req.params.businessId as string },
    });

    sendOgHtmlResponse({
      res,
      data: {
        title: data.name,
        url: req.originalUrl,
        description: data.description,
        image: getImageUrl(data.images ?? {}, "logo"),
      },
    });
  }),
);

export default router;
