// eslint.config.js
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  ...expoConfig,
  {
    ignores: ["dist/**"],
    rules: {
      "react-hooks/exhaustive-deps": [
        "warn",
        {
          additionalHooks: "(useCallback|useEffect|useMemo)",
          exclude: ["dispatch"], // ✅ Ignore dispatch from dependency warnings
        },
      ],
    },
  },
]);
