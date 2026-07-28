import { defineConfig } from "eslint/config";
import * as exampleConfig from "./../../eslint.config.js";

export default defineConfig([
	{
		extends: [exampleConfig],
		rules: {
			"no-unused-vars": "warn",
		},
	},
]);
