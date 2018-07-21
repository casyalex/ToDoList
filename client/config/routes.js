import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app/:id',
    // props: true, // 会把参数直接作为prop 传进组件
    // props: {
    //   id: '123'  // 直接传固定值
    // },
    // props: (route) => ({ // 用函数传
    //   id: route.query.b
    // }),
    component: Todo,
    name: 'app',
    meta: {
      title: '昆西昆西昆',
      description: '昆~'
    }
    // children: [
    //   {
    //     path: 'text',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    component: Login
  }
  // {
  //   path: '/login/exact',
  //   component: Login
  // }
]
