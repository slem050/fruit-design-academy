import nextVitals from "eslint-config-next/core-web-vitals";
import eslintConfigPrettier from "eslint-config-prettier";

const config = [...nextVitals, eslintConfigPrettier];

export default config;
