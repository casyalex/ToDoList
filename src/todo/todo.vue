<template>
    <session class="real-app">
        <input 
            type="text" 
            class="add-input"
            autofocus="autofocus"
            placeholder="接下来要做什么"
            @keyup.enter="addTodo"
        >
    </session>
</template>

<script>
    export default {
        methods: {
            addTodo() {
                
            }
        }
    }
</script>