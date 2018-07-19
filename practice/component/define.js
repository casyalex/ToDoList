import Vue from 'vue'

const component = {
  props: {
    active: {
      type: Boolean,
      // required: true,
      // default: true,
      default () {
        return {
          eg1: 'eg1'
        }
      },
      validator (value) { // 更严谨的验证
        return typeof value === 'boolean'
      }
    },
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
  }
  // mounted () {
  //   this.propOne = 'inner content' // 不能这样做，要改的内容应该放在data，props是用来约束传入类型的
  // }
}

// Vue.component('Comp', component)

new Vue({
  el: '#root',
  template: `
    <div>
      <comp ref="comp1" :active="true" :prop-one="prop1" @change="handleChange"></comp>
      <comp></comp>
    </div>
  `,
  components: {
    Comp: component
  },
  data: {
    prop1: 'text1'
  },
  mounted () {
    console.log(this.$refs.comp1)
  },
  methods: {
    handleChange () {
      this.prop1 += 1
    }
  }
})
