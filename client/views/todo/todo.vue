<template>
    <section class="real-app">
        <div class="tab-container">
          <tabs :value="filter" @change="handleChangeTab">
            <tab :label="tab" :index="tab" v-for="tab in stats" :key="tab"></tab>
          </tabs>
        </div>
        <input
            type="text"
            class="add-input"
            autofocus="autofocus"
            placeholder="接下来要做什么"
            @keyup.enter="handleAdd"
        >
        <item
            :todo="todo"
            v-for="todo in filteredTodos"
            :key="todo.id"
            @del="deleteTodo"
            @toggle="toggleTodoState"
        />
        <Helper
         :filter="filter"
         :todos="todos"
         @clearAllCompleted="clearAllCompleted"
        />
        <!-- <router-view></router-view> -->
    </section>
</template>

<script>
import {
  mapState, mapActions
} from 'vuex'
import Item from './item.vue'
import Helper from './helper.vue'

export default {
  metaInfo: {
    title: 'The Todo App'
  },
  props: ['id'],
  data () {
    return {
      filter: 'all',
      stats: ['all', 'active', 'completed']
    }
  },
  components: {
    Item,
    Helper
  },
  mounted () {
    // console.log(this.$route) // 尽量不用$route，让组件解耦，不依赖vue-router也能复用
    // console.log(this.id)
    if (!this.todos || this.todos.length === 0) {
      this.fetchTodos()
    }
  },
  asyncData ({ store, router }) {
    if (store.state.user) {
      return store.dispatch('fetchTodos')
    }
    router.replace('/login')
    return Promise.resolve()
  },
  computed: {
    ...mapState(['todos']),
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods: {
    ...mapActions([
      'fetchTodos',
      'addTodo',
      'deleteTodo',
      'updateTodo',
      'deleteAllCompleted'
    ]),
    handleAdd (e) {
      const content = e.target.value.trim()
      if (!content) {
        this.$notify({
          content: '必须输入要做的内容'
        })
        return
      }
      const todo = {
        content,
        completed: false
      }
      this.addTodo(todo)
      e.target.value = ''
    },
    clearAllCompleted () {
      this.deleteAllCompleted()
    },
    toggleTodoState (todo) {
      this.updateTodo({
        id: todo.id,
        todo: Object.assign({}, todo, {
          completed: !todo.completed
        })
      })
    },
    handleChangeTab (value) {
      this.filter = value
    }
  }
}
</script>

<style lang="stylus" scoped>
.real-app{
    display block
    width 800px
    margin 0px  auto
    box-shadow 0px 0px 5px #666
}
.add-input{
    position relative
    margin 0px
    width 100%
    font-size 24px
    font-family inherit
    font-weight inherit
    line-height 1.4rem
    border 0
    outline none
    color inherit
    padding 6px
    border 1px solid #999
    box-shadow: inset 0 -1px 5px 0px rgba(0,0,0,0)
    box-sizing border-box
    font-smoothing:antialiased;
    padding 16px 16px 16px 60px
    border none
}
.tab-container
  background #ffffff
  padding 0 15px
</style>
