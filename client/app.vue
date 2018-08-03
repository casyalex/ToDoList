<template>
    <div id="app">
        <div id="cover"></div>
        <Header></Header>
        <!-- <p>{{fullName}} {{counter.num}}</p>
        <p>{{textPlus}}</p> -->
        <!-- <todo></todo> -->
        <!-- <router-link to="/app">app123</router-link>
        <router-link to="/login">login</router-link> -->
        <!-- <router-link to="/login/exact">login-exact</router-link> -->

        <transition name="fade">
          <router-view />
        </transition>
        <!-- <notification content="test notify"/> -->
        <Footer></Footer>
        <!-- <button @click="notify">clickme1</button> -->
        <!-- <router-view name="a"/> -->
    </div>
</template>

<script>
// import {
//   mapState, mapGetters, mapActions, mapMutations
//   // mapGetters
// } from 'vuex'
import Header from './views/layout/header.vue'
import Footer from './views/layout/footer.jsx'
// import Todo from './views/todo/todo.vue'

export default {
  metaInfo: {
    title: 'Ruanbao\'s Todo App'
  },
  components: {
    Header,
    Footer
    // Todo
  },
  mounted () {
    // this.$notify({
    //   content: 'test $notify',
    //   btn: 'close'
    // })
    // console.log(this.$store)
    // let i = 1
    // this.$store.dispatch('updateCountAsync', {
    //   num: 5,
    //   time: 2000
    // })
    // this.$store.state.count = 3

    // setInterval(() => {
    //   this.$store.commit('updateCount', i++)
    // }, 1000)
    // this.updateCountAsync({
    //   num: 5,
    //   time: 2000
    // })
    // this['a/updateText']('123')
    // this['a/add']()
    // this.textAction()
    // setInterval(() => {
    //   this.updateCount(
    //     i++
    //   )
    // }, 1000)
  },
  methods: {
    // ...mapActions(['updateCountAsync', 'a/add', 'textAction']),
    // ...mapMutations(['updateCount', 'a/updateText']),
    notify () {
      this.$notify({
        content: 'test notify',
        btn: 'close'
      })
    }
  },
  computed: {
    // textA () {
    //   return this.$store.state.a.text
    // },
    // textB () {
    //   return this.$store.state.b.text
    // },
    // ...mapState({
    //   counter: (state) => state.count,
    //   textA: state => state.a.textc
    //   // textC: state => state.c.text
    // }),
    // // count () {
    // //   return this.$store.state.count
    // // },
    // ...mapGetters({
    //   fullName: 'fullName',
    //   textPlus: 'a/textPlus'
    // })
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
