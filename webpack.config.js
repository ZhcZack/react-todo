const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "bundle.css",
});

const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    devtool: "source-map",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /(\.scss)|(\.css)$/,
                use: extractSass.extract({
                    use: [
                        {
                            loader:
                                "css-loader?modules&localIdentName=[name]-[local]-[hash:base64:7]",
                        },
                        {
                            loader: "sass-loader",
                        },
                    ],
                    // use style-loader in development
                    fallback: "style-loader",
                }),
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [extractSass],
};
