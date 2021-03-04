const path = require("path");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  devtool: "source-map",
  module: {
    rules: [
      // js 파일을 찾았을 때 실행할 것
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },

      // scss 파일을 찾았을 때 실행할 것
      {
        test: /\.(scss)$/, //scss 파일 찾기
        use: [
          {
            // 4. 작업이 끝난 css 텍스트 부분 추출
            loader: MiniCssExtractPlugin.loader,
          },
          {
            //3. webpack이 css 이해
            loader: "css-loader",
          },
          {
            //2. 특정 플러그인들을 css에 대해 실행 (브라우저 호환 등)
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    autoprefixer,
                    {
                      //options
                      browsers: "cover 99.5%",
                    },
                  ],
                ],
              },
            },
          },
          {
            //1. scss 파일 > css로 변환
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
  },
  // plugin 설치 : ExtractCSS 설치하고 plugin을 사용해서 저장하는 파일 이름 지정
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
};

module.exports = config;
