# ToDoList
杜绝上班摸鱼 自用ToDoList

## 踩坑全纪录

### 史诗巨坑1:

vue-loader v15 更新后，cssMoudule，不再在vue-loader下设置。

改为在vue-style-loader下设置，先在options 加 modules:true，再设置 localIdentName 和 camelCase。

同时要为可选化组件加载，即只为 style 带有module项的加载cssModule。

则要在rules，使用 oneOf 的配置,用resourceQuery 来匹配 /module/ 字段。

官方文档：https://vue-loader.vuejs.org/zh/guide/css-modules.html#可选用法