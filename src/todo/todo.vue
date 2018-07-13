<template>
    <session class="real-app">
        <input 
            type="text" 
            class="add-input"
            autofocus="autofocus"
            placeholder="接下来要做什么"
            @keyup.enter="addTodo"
        >
        <item :todo="todo"></item>
        <tabs :filter="filter"></tabs>
    </session>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
export default {
    components: {
        Item,
        Tabs
    },
    methods: {
        addTodo() {
            
        }
    },
    data () {
        return {
            todo: {
                id:0,
                content: 'this is todo',
                completed: false
            },
            filter: 'all'
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
</style>
