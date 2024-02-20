## 选项式API自动脱ref

- 选项式API的`Ref变量`在data之外会自动脱ref，直接对`this.变量`做读写操作即可，变量为复杂数据类型时，对其赋值相当于对 `Ref变量.value`进行赋值替换
- 而在Vue3的setup语法糖写法，变量所处同一作用域时，读写不存在脱ref情况。watch监视的是Ref不是其原始值