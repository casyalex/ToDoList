import Vue from 'vue'

const component = {
  props: {
    active: Boolean,
    propOne: String
  },
  template: `
  <div>
    <input type="text" v-model="text">
    <span @click="handleChange">{{propOne}}</span>
    <span v-show="active">see me if active</span>
  </div>
  `,
  data () {
    return {
      text: 0
    }
  },
  methods: {
    handleChange () {
      this.$emit('change')
    }
  },
  mounted () {
    console.log('comp mounted')
  }
}

// const parent = new Vue({
//   name: 'parent'
// })

const component2 = {
  extends: component,
  data () {
    return {
      text: 1
    }
  },
  mounted () {
    console.log('comp2 mounted')
    console.log(this.$parent.$options.name)
    this.$parent.text = '132456'
  }
}

// const CompVue = Vue.extend(component)

new Vue({
  el: '#root',
  name: 'Root',
  // parent: parent, // parent是可以被修改,在渲染的时候才能被修改。parent尽量不要修改
  // mounted () {
  //   console.log(this.$parent.$options.name)
  // },
  components: {
    Comp: component2
  },
  data: {
    text: '2233'
  },
  template: `
    <div>
      <span>{{text}}</span>
      <comp></comp>
    </div>
  `
})

// new CompVue({
//   el: '#root',
//   propsData: { // 用extend扩展组件，想往props传值覆盖，要用propsData
//     propOne: 'xxxx'
//   },
//   data: { // data可以直接覆盖
//     text: '123'
//   },
//   mounted () { // extend的生命周期，不会覆盖而会添加。
//     console.log('instance mounted')
//   }
// })
