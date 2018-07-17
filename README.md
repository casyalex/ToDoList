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

新建.elintrc，配置规范，"extends":"standard" 一般就可以

再添个Plugin: ["html"] 就没问题
最后package.json 加上命令：

1. "lint": "eslint --ext .js --ext .jsx --ext .vue client/",    //--ext 跟检测文件类型 最后一项是检测的目录
2. "lint-fix": "eslint --fix --ext .js --ext .jsx --ext .vue client/",  //--fix 由eslint自动修复