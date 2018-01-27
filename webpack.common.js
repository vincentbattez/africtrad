const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const config = require("./compile.config");

// var path = require('path'),
//     fs   = require('fs');

// function fromDir(startPath, filter) {
//   if (!fs.existsSync(startPath)) {
//     console.log("no dir ", startPath);
//     return;
//   }
//   var files = fs.readdirSync(startPath);
//   var listFile = [];
//   for (var i = 0; i < files.length; i++) {
//     var filepath = path.join(startPath, files[i]);
//     var stat = fs.lstatSync(filepath);
//     var filename = filepath.replace(config.srcPath+'/', "");
//     if (stat.isDirectory()) {
//       fromDir(filepath, filter); //recurse
//     } else if (filepath.indexOf(filter) >= 0) {
//       listFile.push(filename)
//     };
//   };
//   return listFile;
// };
// var HtmlWebpackPluginList = [];
// for (const filename of fromDir(config.srcPath,'.html')) {
//     HtmlWebpackPluginList.push(
//       new HtmlWebpackPlugin({
//       filename: filename, template: config.srcPath+'/'+filename,
//     })
//   )
// }
// console.log(HtmlWebpackPluginList);


module.exports = {
  entry: [
    'babel-polyfill',         // ES6
    config.srcPathMain_JS,    // main JS
    config.srcPathMain_SCSS   // main CSS
  ],
  output: {
    path: config.distPath,                              // destination : voir compile.config
    filename: config.bundle_JS   // name of bundle js
    // filename: config.distFolder_JS + config.bundle_JS   // name of bundle js
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]',
              outputPath: config.distFolder_IMG,
            }
          },
        ]
      },
    ]
  },
  plugins: [
		new webpack.ProvidePlugin({
			$:'jquery',
			jQuery:'jquery'
		}),
    new ExtractTextPlugin({
      filename: config.bundle_CSS, // name of bundle css + css dist folder
      // filename: config.distFolder_CSS + config.bundle_CSS, // name of bundle css + css dist folder
      allChunks: true
    }),
    // IMPORTS ALL HTML FILES
    new HtmlWebpackPlugin({ filename: 'index.html', template: config.rootPath+'/index.html' }),
    new HtmlWebpackPlugin({ filename: 'services.html', template: config.rootPath+'/services.html' }),
    new HtmlWebpackPlugin({ filename: 'devis.html', template: config.rootPath+'/devis.html' }),
    new HtmlWebpackPlugin({ filename: 'about.html', template: config.rootPath+'/about.html' }),
  ],
}