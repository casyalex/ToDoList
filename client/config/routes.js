// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    // path: '/app/:id',
    path: '/app',
    props: true, // 会把参数直接作为prop 传进组件
    // props: {
    //   id: '123'  // 直接传固定值
    // },
    // props: (route) => ({ // 用函数传
    //   id: route.query.b
    // }),
    component: () => import('../views/todo/todo.vue'),
    // components: {
    //   default: Todo,
    //   a: Login
    // },
    name: 'app',
    meta: {
      title: '昆西昆西昆',
      description: '昆~'
    },
    beforeEnter: (to, from, next) => {
      console.log('app route before enter')
      next()
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
    // components: {
    //   default: Login,
    //   a: Todo
    // }
    component: () => import('../views/login/login.vue')
  }
  // {
  //   path: '/login/exact',
  //   component: Login
  // }
]
