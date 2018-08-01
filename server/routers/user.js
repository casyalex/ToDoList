const Router = require('koa-router')

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/login', async ctx => {
  const user = ctx.request.body
  if (user.username === 'casyalex' && user.password === 'yaoxing88') {
    ctx.session.user = {
      username: 'casyalex'
    }
    ctx.body = {
      success: true,
      data: {
        username: 'casyalex'
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      success: false,
      message: '用户名或密码错误'
    }
  }
})

module.exports = userRouter
