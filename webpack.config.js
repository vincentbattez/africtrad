const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// on peut passer à notre commande de build l'option --production
// on récupère sa valeur ici en tant que booléen
// const production = process.argv.indexOf("--production") > -1;

module.exports = {
    entry: [
        'babel-polyfill',
        path.resolve(__dirname, "src/js/app.js"),
        path.resolve(__dirname, "src/scss/main.scss")
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    devtool: 'source-map', // Active les source-map
    externals: {
        jquery: 'jQuery'
    },
    module: {
        // BABEL
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                loader: 'css-loader!autoprefixer-loader?browsers=last 2 versions'
            }
        ],
        // SASS
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            // minimize: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ],
            })
        }]
    },
    plugins: [
        // new UglifyJsPlugin({
        //     sourceMap: true
        // }),
        new ExtractTextPlugin('bundle.css', { // Extrait le CSS du JS dans un fichier CSS externe
            allChunks: true
        }),
        new CleanWebpackPlugin(['dist']),
        new BrowserSyncPlugin({
          // browse to http://localhost:3000/ during development, 
          // ./public directory is being served 
          host: 'localhost',
          port: 3000,
          server: { baseDir: ['./'] }
        }),
    ],
}