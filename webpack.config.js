var HtmlWebpackPlugin = require("html-webpack-plugin");

var path = require("path");

module.exports = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve("./dist"),
        filename: "index.js",
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    plugins: [new HtmlWebpackPlugin()],
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: "pre",
                use: ["source-map-loader"],
            },
            {
                test: /\.ts?$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            rootMode: "upward",
                        },
                    },
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: "tsconfig.app.json",
                        },
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },
    devtool: "source-map",
};
