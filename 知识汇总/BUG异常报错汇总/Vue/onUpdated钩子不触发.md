# onUpdated钩子不触发

## 一、问题描述

```vue
// component.vue
<template>
  <el-button @click="addNum">
    {{ num }}
  </el-button>
</template>

<script setup>
import useNum from '@/hooks/useNum'
import useTitle from '@/hooks/useTitle'

const { num, addNum } = useNum()
useTitle(num)
</script>
```

```js
// useNum.js
import { ref } from 'vue'

export default () => {
  const num = ref(0)
  function addNum() {
    num.value++
  }

  return {
    num,
    addNum
  }
}
```

```js
// useTitle.js
import { onMounted, onUpdated } from 'vue'

export default (argRef) => {
  onMounted(() => {
    document.title = argRef.value
  })
  onUpdated(() => {
    document.title = argRef.value
  })
}
```

- 上述代码，点击按钮无法触发onUpdated钩子，但若将组件template代码改为如下则能生效

```vue
<template>
  <div @click="addNum">
    {{ num }}
  </div>
</template>
```

或

```vue
<template>
  <div @click="addNum">
    {{ num }}
  </div>
  <el-button @click="addNum">
    {{ num }}
  </el-button>
</template>
```



 ## 二、产生原因

- update触发条件：`响应式数据发生改变且引起组件模板发生改变`
- 子组件模板更新不触发父组件onUpdated

- num以插槽形式传递，num渲染在子组件模板中，当num改变时，触发的是子组件的onUpdated,而不会导致父组件的onUpdated触发



## 三、解决办法

- 对num通过watch监视触发对应的行为



