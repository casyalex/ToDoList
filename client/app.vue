<template>
    <div id="app">
        <Header></Header>
        <!-- <todo></todo> -->
        <router-link to="/app/123">app123</router-link>
        <router-link to="/app/456">app456</router-link>
        <router-link to="/login">login</router-link>
        <!-- <router-link to="/login/exact">login-exact</router-link> -->
        <transition name="fade">
          <router-view />
        </transition>
        <Footer></Footer>
        <div id="cover"></div>
        <!-- <router-view name="a"/> -->
    </div>
</template>

<script>
import Header from './views/layout/header.vue'
import Footer from './views/layout/footer.jsx'
// import Todo from './views/todo/todo.vue'

export default{
  components: {
    Header,
    Footer
    // Todo
  }
}
</script>

<style lang="stylus" scoped>
#app{
    position absolute
    left 0
    right 0
    top 0
    bottom 0
}
    #cover{
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        background-color #999
        opacity .4
        z-index -1
    }
</style>
