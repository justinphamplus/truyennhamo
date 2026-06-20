import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  {
    rules: {
      "@next/next/no-page-custom-font": "off",
    },
  },
  {
    files: ["app.js"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  globalIgnores([".next/**", "node_modules/**", ".tmp/**", "visual/**", "public/**"]),
]);
