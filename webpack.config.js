const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  // Cấu hình khác của webpack
  optimization: {
    minimize: true,
    
    minimizer: [
      new TerserPlugin({
        // Các tùy chọn tại đây
        // Ví dụ:
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {},
          mangle: true, // Bật mangle để làm nhỏ kích thước
          module: false,
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false,
        },
      }),
    ],
  },
};
