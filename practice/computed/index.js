import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <p>Name: {{name}}</p>
      <p>Name: {{getName()}}</p>
      <p>Number: {{number}}</p>
      <p>FullName: {{fullName}}</p>
      <p><input type="text" v-model="number"></p>
      <p>FirstName: <input type="text" v-model="firstName"></p>
      <p>LastName: <input type="text" v-model="lastName"></p>
      <p>Name: <input type="text" v-model="name"></p>
      <p>obj.a: <input type="text" v-model="obj.a"></p>
    </div>
  `,
  data: {
    firstName: 'Alex',
    lastName: 'Tse',
    number: 0,
    fullName: '',
    obj: {
      a: '123'
    }
  },
  computed: { // 尽量不要修改依赖的值，可能会导致无限循环。应该用老值，输出新值
    name: {
      get () {
        console.log('new name')
        return `${this.firstName} ${this.lastName}`
      },
      set (name) {
        const names = name.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      }
    }
  },
  watch: {
    obj: {
      handler () {
        console.log('obj.a changed')
      },
      immediate: true, // 第一次渲染也触发
      deep: false // 深入观察 false只监听父级属性引用变化（默认）,即直接改obj=XXXX。 true 会遍历所有子级都加上handler，监听所有子级变化，性能开销大
    }
  },
  methods: {
    getName () {
      console.log('getName invoked')
      return `${this.firstName} ${this.lastName}`
    }
  },
  mounted () {
    this.obj = {
      a: '345'
    }
  }
})
