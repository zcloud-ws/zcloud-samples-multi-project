import path from "node:path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'production',
  entry: {
    server: "./src/index.js",
  },
  output: {
    filename: "main.cjs",
    path: path.resolve(__dirname, "dist"),
  },
  target: "node",
  node: false,
  optimization: { minimize: true },
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        //exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
