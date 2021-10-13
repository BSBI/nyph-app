import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

import { string } from "rollup-plugin-string";
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import scss from 'rollup-plugin-scss';
//import copy from 'rollup-plugin-copy';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

// for multiple targets see https://github.com/rollup/rollup/issues/703#issuecomment-306246339

const version = `1.0.1.${Math.floor((Date.now() / 1000))}`;

export default [
	{
		input: 'src/main.js',
		output: {
			file: 'public/nyph.js',
			format: 'iife', // immediately-invoked function expression — suitable for <script> tags
			globals: { BsbiDb: 'BsbiDb', jquery: '$' },
			sourcemap: true,
			name: 'nyphapp'
		},
		external: ['BsbiDb', 'jquery'],

		plugins: [
			resolve(), // tells Rollup how to find files in node_modules
			replace({
				preventAssignment: true,
				values: {
					VERSION: version,
					// ENVIRONMENT: JSON.stringify('development')
				},
			}),
			// copy({
			// 	targets: [
			// 		'src/index.html'
			// 	],
			// 	outputFolder: 'public',
			// 	hook: 'buildStart'
			// }),
			// replaceHtmlVars({
			// 	files: 'public/index.html',
			// 	from: /VERSION/g,
			// 	to: version
			// }),
			string({
				// Required to be specified
				include: "**/*.html",

				// Undefined by default
				exclude: ["**/index.html"]
			}),
			scss({
				output: 'public/appcss/theme.css',
			}),
			babel({
				exclude: 'node_modules/**' // only transpile our source code
			}),
			commonjs(), // converts npm packages to ES modules
			production && terser() // minify, but only in production
		]
	},
	{
		input: 'src/serviceworker/worker.js',
		output: {
			file: 'public/serviceworker.js',
			format: 'iife', // immediately-invoked function expression — suitable for <script> tags
			globals: { BsbiDb: 'BsbiDb' },
			sourcemap: true,
			name: 'nyphappserviceworker'
		},
		external: ['BsbiDb'],

		plugins: [
			resolve(), // tells Rollup how to find files in node_modules
			replace({
				preventAssignment: true,
				values: {
					VERSION: version,
					// ENVIRONMENT: JSON.stringify('development')
				},
			}),
			string({
				// Required to be specified
				include: "**/*.html",

				// Undefined by default
				exclude: ["**/index.html"]
			}),
			scss({
				//output: 'public/appcss/theme.css',
			}),
			babel({
				exclude: 'node_modules/**' // only transpile our source code
			}),
			commonjs(), // converts npm packages to ES modules
			production && terser() // minify, but only in production
		]
	},

	];
