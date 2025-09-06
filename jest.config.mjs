import { pathsToModuleNameMapper } from "ts-jest";
import { readFileSync } from "fs";

const tsconfig = JSON.parse(readFileSync("./tsconfig.json", "utf8"));
const { compilerOptions } = tsconfig;

/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testRegex: "(/tests/.*|(\\.|/)(tests))\\.tsx?$",
  modulePathIgnorePatterns: ["./internal/", "./node_modules/"],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  transform: {
    ".+\\.(css)$": "jest-css-modules-transform",
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        astTransformers: {
          before: [
            {
              path: "@formatjs/ts-transformer/ts-jest-integration",
              options: {
                overrideIdFn: "[sha512:contenthash:base64:6]",
                ast: true,
              },
            },
          ],
        },
      },
    ],
  },
  setupFiles: ["<rootDir>/jest.setup.ts"],
};
