# ToDoList
杜绝上班摸鱼 自用ToDoList

## 踩坑全纪录

### 史诗巨坑1:

vue-loader v15 更新后，cssMoudule，不再在vue-loader下设置。

改为在vue-style-loader下设置，首先在options 加 modules:true，再设置 localIdentName 和 camelCase。

同时如果要为可选化组件加载，即只为 style 带有 module 项的加载 cssModule。

则要在rules，使用 oneOf 的配置,用resourceQuery 来匹配 /module/ 字段。

官方文档：https://vue-loader.vuejs.org/zh/guide/css-modules.html#可选用法

### 史诗巨坑2：

eslint全家桶，神特么才记得住哦！

要在npm装这一堆

1. eslint
2. eslint-config-standard
3. eslint-plugin-standard
4. eslint-plugin-promise
5. eslint-plugin-import
6. eslint-plugin-node
7. eslint-plugin-html

新建.elintrc，配置规范，"extends":"standard" 使用standard标准

同时需要添加Plugin: ["html"]
```javascript
{
    "extends": "standard",
    "plugins": [
        "html"
    ],
    "parser": "babel-eslint"  //这一项为eslint 实时编译需要的语法模块
}
```
最后package.json 加上命令：

1. "lint": "eslint --ext .js --ext .jsx --ext .vue client/",
// --ext 跟检测文件类型 最后一项是检测的目录
2. "lint-fix": "eslint --fix --ext .js --ext .jsx --ext .vue client/",
// --fix 由eslint自动修复

如果要实时编译都加载eslint检查，需要这么做

1. 安装npm i eslint-loader babel-eslint
2. .eslintrc里配置 "parser": "babel-eslint"
3. webpack.config.base.js 配置rules，test里匹配所有需要检测的类型，loader加载eslint-loader，enforce设置为'pre'

```javascript
  rules:[
    {
      test: /\.(vue|js|jsx)$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
      enforce: 'pre'
    }
  ]
```

再装上editorconfig插件(这个是VScode编辑器插件,webstorm会自带),自动保存

根目录新建.editorconfg 文件，业界通用基本配置如下：

```javascript
  root = true

  [*]
  charset = utf-8
  end_of_line = lf
  indent_size = 2
  indent_style = space
  insert_final_newline = true
  trim_trailing_whitespace = true
```

安装 husky ，添加precommit钩子，确保提交代码都符合eslint标准,经过eslint自动修复
1. npm i husky -D
2. package.json 增加 "precommit": "npm run lint-fix"
