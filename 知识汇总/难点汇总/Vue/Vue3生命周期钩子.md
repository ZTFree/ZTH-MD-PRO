## Options API 常见生命周期选项

### beforeCreate

>在组件实例初始化完成之后立即调用。

会在实例初始化完成、props 解析之后、`data()` 和 `computed` 等选项处理之前立即调用。

::: warning 注意

组合式 API 中的 `setup()` 钩子会在所有选项式 API 钩子之前调用，`beforeCreate()` 也不例外。

:::



### created

> 在组件实例处理完所有与状态相关的选项后调用。

当这个钩子被调用时，以下内容已经设置完成：响应式数据、计算属性、方法和侦听器。然而，此时挂载阶段还未开始，因此 `$el` 属性仍不可用。



### beforeMount

> 在组件被挂载之前调用。

- 当这个钩子被调用时，组件已经完成了其响应式状态的设置，但还没有创建 DOM 节点。它即将首次执行 DOM 渲染过程。



### mounted

> 在组件被挂载之后调用。

- 组件在以下情况下被视为已挂载：

  - 所有同步子组件都已经被挂载。(不包含异步组件或 `<Suspense>` 树内的组件)

  - 其自身的 DOM 树已经创建完成并插入了父容器中。注意仅当根容器在文档中时，才可以保证组件 DOM 树也在文档中。

- 这个钩子通常用于执行需要访问组件所渲染的 DOM 树相关的副作用，或是在[服务端渲染应用](https://cn.vuejs.org/guide/scaling-up/ssr.html)中用于确保 DOM 相关代码仅在客户端被调用。



### beforeUpdate

> 在组件即将因为一个响应式状态变更而更新其 DOM 树之前调用。

- 这个钩子可以用来在 Vue 更新 DOM 之前访问 DOM 状态。

::: warning 注意

在这个钩子中更改状态也是安全的。

:::



### updated

> 在组件因为一个响应式状态变更而更新其 DOM 树之后调用。

父组件的更新钩子将在其子组件的更新钩子之后调用。

这个钩子会在组件的任意 DOM 更新后被调用，这些更新可能是由不同的状态变更导致的。如果你需要在某个特定的状态更改后访问更新后的 DOM，请使用 [nextTick()](https://cn.vuejs.org/api/general.html#nexttick) 作为替代。



### beforeUnmount

> 在一个组件实例被卸载之前调用。

当这个钩子被调用时，组件实例依然还保有全部的功能。



### unmounted

> 在一个组件实例被卸载之后调用。

可以在这个钩子中手动清理一些副作用，例如计时器、DOM 事件监听器或者与服务器的连接。

- 一个组件在以下情况下被视为已卸载：

  - 其所有子组件都已经被卸载。

  - 所有相关的响应式作用 (渲染作用以及 `setup()` 时创建的计算属性和侦听器) 都已经停止。

  

<br/>

## Composition API 常见生命周期钩子

> 与选项式大同小异

### onBeforeMount

注册一个钩子，在组件被挂载之前被调用。

### onMounted

注册一个回调函数，在组件挂载完成后执行。

### onBeforeUpdate

注册一个钩子，在组件即将因为响应式状态变更而更新其 DOM 树之前调用。

### onUpdated

注册一个回调函数，在组件因为响应式状态变更而更新其 DOM 树之后调用。

### onbeforeUnmount

注册一个钩子，在组件实例被卸载之前调用。

### onUnmounted

注册一个回调函数，在组件实例被卸载之后调用。

<br/>



## Options API 与 Composition API的钩子差异

> 简称oa和ca

1. oa的`beforeCreated`与`created`被ca的`setup`钩子替代,但在setup中无法通过this访问到data中的数据，但data中可以访问this.$options.setup()获取setup返回对象