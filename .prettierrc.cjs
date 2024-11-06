module.exports = {
  semi: false, //句末使用分号
  tabWidth: 2, //缩进长度
  useTabs: false, //使用空格代替tab缩进
  printWidth: 120, //单行长度
  endOfLine: 'crlf', //结束行形式
  singleQuote: true, //使用单引号
  insertPragma: false, //在已被preitter格式化的文件顶部加上标注
  proseWrap: 'preserve', // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
  jsxSingleQuote: true, // jsx中使用单引号
  trailingComma: 'all', //多行时尽可能打印尾随逗号
  bracketSpacing: true, //在对象前后添加空格-eg: { foo: bar }
  arrowParens: 'avoid', //单参数箭头函数参数周围使用圆括号-eg: (x) => x
  requirePragma: false, //无需顶部注释即可格式化
  // parser: "babylon", // 格式化的解析器，默认是babylon
  quoteProps: 'as-needed', //仅在必需时为对象的key添加引号
  jsxBracketSameLine: true, //多属性html标签的‘>’折行放置
  singleAttributePerLine: true, // 单行属性
  vueIndentScriptAndStyle: false, //不对vue中的script及style标签缩进
  embeddedLanguageFormatting: 'auto', //对引用代码进行格式化
  htmlWhitespaceSensitivity: 'ignore', //对HTML全局空白不敏感

  //   disableLanguages: "['vue']", //不格式化vue文件，vue文件的格式化单独设置",
  //   ignorePath: '.prettierignore', //不使用prettier格式化的文件填写在项目的.prettierignore文件中',
  //   parser: 'babylon', //格式化的解析器，默认是babylon',
  //   tslintIntegration: 'false', //不让prettier使用tslint的代码格式进行校验',
  //   stylelintIntegration: 'false', //不让prettier使用stylelint的代码格式进行校验',
  //   requireConfig: "false'", //Require a 'prettierconfig' to format prettier",
  // plugins: [
  //     require.resolve("prettier-plugin-organize-imports"), // import 排序 组合 去除无用
  //     require.resolve("prettier-plugin-packagejson"), // package.json 里面的 key 排序
  // ],
}
