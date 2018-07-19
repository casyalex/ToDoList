import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <div v-text="'Text:' + text">Text: {{text}}</div>
      <div v-html="html">Text: {{text}}</div>
      <div v-pre>Text: {{text}}</div>
      <div v-cloak>Text: {{text}}</div>
      <div v-once>Text: {{text}}</div>
      <div v-show="active">display显示</div>
      <div v-if="active"> 显示 </div>
      <div v-else-if="text === 0"> else text</div>
      <div v-else>else content</div>
      <input type="text" v-model.number.trim.lazy="text">
      <input type="checkbox" v-model="active">
      <div>
        <input type="checkbox" v-model="arr" :value="1">
        <input type="checkbox" v-model="arr" :value="2">
        <input type="checkbox" v-model="arr" :value="3">
      </div>
        <input type="radio" v-model="picked" value="one">
        <input type="radio" v-model="picked" value="two">
      <div>
      </div>
      <ul>
        <li v-for="(item,index) in arr" :key="item">{{item}}:{{index}}</li>
      </ul>
      <ul>
        <li v-for="(val,key,index) in obj">{{val}}:{{key}}:{{index}}</li>
      </ul>
    </div>
  `,
  data: {
    arr: [1, 2, 3],
    obj: {
      a: '123',
      b: '456',
      c: '789'
    },
    picked: '',
    text: 0,
    active: false,
    html: '<span>this is html</span>'
  }
})
