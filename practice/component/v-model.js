import Vue from 'vue'

const component = {
  model: { // 改变默认的监听事件【input】，与监听变量【value】
    prop: 'value1',
    event: 'change'
  },
  props: ['value', 'value1'],
  template: `
    <div>
      <input type="text" @input="handleInput" :value="value1">
    </div>
  `,
  methods: {
    handleInput (e) {
      this.$emit('change', e.target.value)
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  el: '#root',
  template: `
    <div>
      <comp-one v-model="value"></comp-one>
    </div>
  `,
  // v-model监听的是input事件
  data () {
    return {
      value: '123'
    }
  }
})
