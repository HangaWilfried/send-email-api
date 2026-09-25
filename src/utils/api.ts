import { client as ProductClient } from "./api/product/client.gen";
import { client as BusinessClient } from "./api/business/client.gen";

const baseURL = process.env.REST_API_BASE_URL;

ProductClient.setConfig({
  baseUrl: baseURL + "/product",
});

BusinessClient.setConfig({
  baseUrl: baseURL + "/business",
});
