module.exports = {
    root: true,
    env: {
      browser: true,
      es2020: true,
      node: true,
      jest: true,
    },
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",
      "plugin:react-hooks/recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
      "prettier",
      "plugin:prettier/recommended",
    ],
    plugins: ["react-refresh", "import", "prettier", "react", "react-hooks"],
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          moduleDirectory: ["node_modules", "src/"],
        },
      },
      react: {
        version: "detect",
        pragma: "React",
        fragment: "Fragment",
      },
    },
    rules: {
      "react/jsx-no-target-blank": "off",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "prettier/prettier": "error",
      "import/no-unresolved": "error",
      "import/order": [
        "error",
        {
          alphabetize: { order: "asc" },
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
        },
      ],
      "import/newline-after-import": ["error", { count: 1 }],
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: [
            "**/*.test.js",
            "**/*.spec.js",
            "**/__tests__/**",
            "**/*.test.jsx",
            "**/*.spec.jsx",
            "jest.setup.js",
            "src/setupTests.js",
          ],
        },
      ],
      "import/prefer-default-export": "off",
    },
  };
  