module.exports = {
    // ...các cài đặt khác
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
            'postcss-loader', // Thêm PostCSS loader vào đây
          ],
        },
      ],
    },
  };
  