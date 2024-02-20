# watch的flush配置项

> watch侦听属性的配置项的flush取值：pre(默认)、post、sync

用例代码（进行一次点击操作）

```vue
<template>
  <div class="test">
    <button @click="changeMsg">Click Mse</button>
    <h1 ref="title">{{ msg }}</h1>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const title = ref()

const msg = ref('Hello')

function changeMsg() {
  msg.value += '6'
  msg.value += '6'
  msg.value += '6'
}

watch(
  msg,
  (newVal) => {
    console.log(title.value.innerText, newVal)
  },
  {
    // flush: 'pre'
    // flush: 'post'
    // flush: 'sync'
  }
)
</script>
```



## pre

侦听器将在组件渲染之前执行

### 用例输出

```js
Hello Hello666
```



## post

侦听器延迟到组件渲染之后再执行

```js
Hello666 Hello666
```



## sync

侦听器在响应式依赖发送改变时立即触发

```
Hello Hello6
Hello Hello66
Hello Hello666
```

