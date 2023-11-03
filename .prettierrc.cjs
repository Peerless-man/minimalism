module.exports = {
  singleQuote: true,
  // 以下为 @trivago/prettier-plugin-sort-imports 配置，若未使用可删去
  // importOrder 中的文件顺序规范，可依据项目实际情况自行更改
  plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")],
  importOrder: ["^vite", "^react", "^antd", "<THIRD_PARTY_MODULES>", "components/", "pages/", "hooks/", "utils/", "^[./]"],
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
  importOrderCaseInsensitive: true,
};
