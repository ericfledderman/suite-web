/** @type {import('stylelint').Config} */
const config = {
  extends: ["stylelint-config-standard", "stylelint-config-tailwindcss"],
  ignoreFiles: ["**/.next/**", "**/node_modules/**", "**/out/**"],
};

export default config;
