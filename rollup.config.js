import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { string } from "rollup-plugin-string";
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import scss from 'rollup-plugin-scss';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import sourcemaps from 'rollup-plugin-sourcemaps';

// import json from '@rollup/plugin-json';
// import nodePolyfills from 'rollup-plugin-polyfill-node';

//import copy from 'rollup-plugin-copy';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

// for multiple targets see https://github.com/rollup/rollup/issues/703#issuecomment-306246339

const version = `1.0.3.${Math.floor((Date.now() / 1000))}`;

const domain = 'nyph.bsbi.app'; // 'nyphtest.bsbi.app' 'nyph.bsbi.app'
const domainRegex = 'nyph\\.bsbi\\.app'; // 'nyphtest\\.bsbi\\.app' nyph\\.bsbi\\.app
const path = 'app'; // 'app' or 'test'

export default [
	{
		input: 'src/main.js',
		output: {
			file: 'public/app.js',
			format: 'iife', // immediately-invoked function expression — suitable for <script> tags
			globals: { BsbiDb: 'BsbiDb', MapboxGeocoder: 'MapboxGeocoder' },
			sourcemap: true,
			name: 'nyphapp'
		},
		external: ['BsbiDb'],

		plugins: [
			resolve(), // tells Rollup how to find files in node_modules
			replace({
				preventAssignment: true,
				values: {
					__BSBI_APP_VERSION__: version,
					__DOMAIN__: domain, // 'nyphtest.bsbi.org',
					__DOMAIN_REGEX__: domainRegex, // 'nyphtest\\.bsbi\\.org',
					// ENVIRONMENT: JSON.stringify('development')
				},
			}),
			del(
				{targets: 'public/appcss/*'}
			),
			copy({
				targets: [
					{
						src: 'src/index.html',
						dest: 'public',
						transform: (contents) =>
							contents.toString().replaceAll('__BSBI_APP_VERSION__', version).replaceAll('__PATH__', path)
					},
					{
						src: 'src/app.css',
						dest: 'public/appcss',
						rename: `app.${version}.css`
					}
				],
			}),
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
			// json(),
			// nodePolyfills(
			// 	{
			// 		//include: 'node_modules/@mapbox/**/*.js'
			// 		exclude: ['node_modules/localforage/**']
			// 	}
			// ),
			sourcemaps(),
			babel({
				exclude: 'node_modules/**', // only transpile our source code
				babelHelpers: 'bundled',
				inputSourceMap: false, // see https://github.com/rollup/rollup/issues/3457
			}),
			commonjs(
			{
				// include: [
				// 	'node_modules/**',
				// 	]
			}
			), // converts npm packages to ES modules
			production && terser() // minify, but only in production
		]
	},
	{
		input: 'src/main.js',
		output: {
			file: 'public/app.mjs',
			format: 'esm',
			globals: { BsbiDb: 'BsbiDb', MapboxGeocoder: 'MapboxGeocoder' },
			sourcemap: true,
			name: 'nyphapp'
		},
		external: ['BsbiDb'],

		plugins: [
			resolve(), // tells Rollup how to find files in node_modules
			replace({
				preventAssignment: true,
				values: {
					__BSBI_APP_VERSION__: version,
					__DOMAIN__: domain, // 'nyphtest.bsbi.org',
					__DOMAIN_REGEX__: domainRegex, // 'nyphtest\\.bsbi\\.org',
					// ENVIRONMENT: JSON.stringify('development')
				},
			}),
			// copy({
			// 	targets: [
			// 		{
			// 			src: 'src/index.html',
			// 			dest: 'public',
			// 			transform: (contents) =>
			// 				contents.toString().replaceAll('__BSBI_APP_VERSION__', version).replaceAll('__PATH__', path)
			// 		}
			// 	],
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
			sourcemaps(),
			// babel({
			// 	exclude: 'node_modules/**', // only transpile our source code
			// 	babelHelpers: 'bundled'
			// }),
			commonjs(
				{}
			), // converts npm packages to ES modules
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
					__BSBI_APP_VERSION__: version,
					__DOMAIN__: domain, // 'nyphtest.bsbi.org',
					__DOMAIN_REGEX__: domainRegex, // 'nyphtest\\.bsbi\\.org',
					// ENVIRONMENT: JSON.stringify('development')
				},
			}),
			string({
				// Required to be specified
				include: "**/*.html",

				// Undefined by default
				exclude: ["**/index.html"]
			}),
			// scss({
			// 	//output: 'public/appcss/theme.css',
			// }),
			sourcemaps(),
			babel({
				exclude: 'node_modules/**', // only transpile our source code
				babelHelpers: 'bundled',
				inputSourceMap: false, // see https://github.com/rollup/rollup/issues/3457
			}),
			commonjs(), // converts npm packages to ES modules
			production && terser() // minify, but only in production
		]
	},
	{
		input: 'src/serviceworker/worker.js',
		output: {
			file: 'public/serviceworker.mjs',
			format: 'esm',
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
					__BSBI_APP_VERSION__: version,
					__DOMAIN__: domain, // 'nyphtest.bsbi.org',
					__DOMAIN_REGEX__: domainRegex, // 'nyphtest\\.bsbi\\.org',
					// ENVIRONMENT: JSON.stringify('development')
				},
			}),
			string({
				// Required to be specified
				include: "**/*.html",

				// Undefined by default
				exclude: ["**/index.html"]
			}),
			// scss({
			// 	//output: 'public/appcss/theme.css',
			// }),
			// babel({
			// 	exclude: 'node_modules/**', // only transpile our source code
			// 	babelHelpers: 'bundled'
			// }),
			commonjs(), // converts npm packages to ES modules
			production && terser() // minify, but only in production
		]
	},
	];
