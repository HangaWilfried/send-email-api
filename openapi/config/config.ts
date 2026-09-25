import { defineConfig } from "@hey-api/openapi-ts";

export const generateClient = ({ name }: { name: string }) =>
  defineConfig({
    input: `./openapi/${name}.yaml`,
    output: {
      path: `./src/utils/api/${name}`,
      postProcess: ["prettier"],
    },
    plugins: [
      {
        comments: true,
        enums: "javascript",
        name: "@hey-api/typescript",
      },
      {
        name: "@hey-api/sdk",
        operations: { strategy: "byTags" },
      },
    ],
  });
