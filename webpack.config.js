const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index.bundle.js",
  },
  
  devServer: {
    port: 3000,
    liveReload: true,
    proxy: {
      "/api": {
        target: 'http://localhost:8080', // 클라이언트에서 api로 보내는 요청은 주소를 3095로 바꿔서 보내겠다 라는 뜻
        changeOrigin: true, // cross origin 허용 설정
      }
    }
  },
  
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  
  plugins: [new HtmlWebpackPlugin({ template: "./public/index.html" })],
};
