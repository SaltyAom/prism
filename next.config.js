const { join } = require("path")

const withCSS = require("@zeit/next-css"),
	withStylus = require("@zeit/next-stylus"),
	withOffline = require("next-offline"),
	withAnalyze = require("@next/bundle-analyzer")({
		enabled: process.env.ANALYZE === "true"
	}),
	withPlugins = require("next-compose-plugins")

const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
	TerserPlugin = require("terser-webpack-plugin")

module.exports = withPlugins(
	[
		[withAnalyze],
		[withCSS],
		[
			withStylus,
			{
				loaders: [
					{
						test: /\.styl$/,
						loader:
							"css-loader!stylus-loader?paths=node_modules/bootstrap-stylus/stylus/"
					}
				]
			}
		],
		[
			withOffline,
			{
				dontAutoRegisterSw: true,
				globPattern: "*public/**/*",
				workboxOpts: {
					swDest: "static/service-worker.js",
					runtimeCaching: [
						{
							urlPattern: /.js$|.css$|.svg$|.jpg$|.png$/,
							handler: "CacheFirst"
						},
						{
							urlPattern: /\/music\/*/,
							handler: "CacheFirst"
						}
					]
				}
			}
		]
	],
	{
		// target: "serverless",
		webpack(config, options) {			
			config.optimization.minimize = true
			config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}))
			config.optimization.minimizer.push(
				new TerserPlugin({
					terserOptions: {
						mangle: true // Note `mangle.properties` is `false` by default.
					}
				})
			)

			config.resolve.alias = {
				...config.resolve.alias,
				"react": "preact/compat",
				"react-dom": "preact/compat",
				"react-render-to-string": "preact-render-to-stirng",
				"pages": join(__dirname, "pages"),
				"~": join(__dirname, "public"),
				"styles": join(__dirname, "public/styles"),
				"fonts": join(__dirname, "public/fonts"),
				"components": join(__dirname, "components"),
				"libs": join(__dirname, "libs"),
				"pageTypes": join(__dirname, "pageTypes"),
				"stores": join(__dirname, "stores"),
				"layouts": join(__dirname, "layouts")
			}

			return config
		}
	}
)
