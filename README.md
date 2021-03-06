# ToDoList
杜绝上班摸鱼 自用ToDoList
感谢jocky老师 感谢imooc

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

#### 自己补充的知识 husky还应该配合lint-staged使用

单单使用husky，eslint修改的文件并不会commit，而会作为新的更改保存下来，直到下一次git add/git commit才会提交上去

这时候就需要lint-staged。staged 是 Git 里面的概念，指待提交区，使用 git commit -a，或者先 git add 然后 git commit 的时候，你的修改代码都会经过待提交区。在这个节点运行eslint，这样commit上去就会是完好的代码。

安装
```javascipt
npm install -D lint-staged
```

然后，修改 package.json 配置：
```javascipt
{
  "scripts": {
    "precommit": "lint-staged"
  },
  "lint-staged": {
    "{build,client}/**/*.{js,jsx}": ["npm run lint-fix", "git add"]
  }
}
```

收工~这样只要你 add 的js或者jsx（具体看你的规则），提交都会自动lint修正好

### 史诗巨坑3：
引入vue的时候 如果碰到如下错误：

```javascript
[Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.

(found in <Root>)
```

那就是引入的是vue runtime only的版本，这个版本不支持template的解析，所以会报warning。
解决版本：在resolve下设置alias别名vue，指向vue.esm.js即可

```javascript
resolve: {
    alias: {
      'vue': path.join(__dirname,'../node_modules/vue/dist/vue.esm.js')
    }
  },
```

### 史诗巨坑4：
关于在Vue的服务器渲染SSR需要单独抽取提取CSS，由于extract-text-webpack-plugin在webpack4已经停更，beta版在服务端渲染有问题，报call is not defined。
而这个作者推荐的mini-css-extract-plugin在SSR上也是不能用的，原因在于这个插件会用document方法，往模板插入<link>标签。服务器渲染跑的是node.js环境里没有document这个方法，就会报错：document is not defined。

github issue上建议：

1. ~~放弃这个插件，改用css-loader/locals 或者 extract-loader等其它插件。~~（未尝试，应该是推荐根治的方法。找对了方向，但不全对）

2. ~~屏蔽这个报错，用扩展mini-css-extract-plugin的方式。~~（尝试过，至少我未凑效。治标不治本）

屏蔽方法代码示例：

```javascript
class ServerMiniCssExtractPlugin extends MiniCssExtractPlugin {
  getCssChunkObject(mainChunk) {
    return {};
  }
}
```

webpack rule的配置：
```javascript
{
  test: /\.css$/,
  use: [
    {
      loader: ServerMiniCssExtractPlugin.loader
    },
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        modules: true,
        localIdentName: '[name]__[local]--[hash:base64:5]',
        sourceMap: true
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('autoprefixer')({
            flexbox: 'no-2009',
            grid: true
          })
        ]
      }
    }
  ]
}
```

3. ~~别抽取CSS了，又不是不能用。~~（曾经想混过去,但是经过测试这是不行的）

4. 调了两天终于成功，正确方法是：client端正常使用mini-css-extract-plugin，server端使用css-loader/locals。就那么简单。

```js
rules: [{
  test: /\.styl/,
  oneOf: [{
    resourceQuery: /module/,
    use: [
      {
        loader: 'css-loader/locals',
        options: {
          modules: true,
          localIdentName: '[name]--[local]--[hash:base64:5]',
          camelCase: true
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      'stylus-loader'
    ]
  },
  {
    use: [
      'css-loader/locals',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      'stylus-loader'
    ]
  }
  ]
}]
```

[关于这个天坑的github issue地址](https://github.com/webpack-contrib/mini-css-extract-plugin/issues/90)

### 史诗巨坑5：

6-6 tabs组件之在父组件中渲染子组件的slot

课程中的往 插槽组件 以props方式 传绑定数据的方法失效，原因未明。先放一边。

### 史诗巨坑6：

调试api用的chrome插件 restlet client

免费的app应用平台 apicloud
