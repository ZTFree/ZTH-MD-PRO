#  Array.prototype.toString

> 数组隐式转换为字符串

```
This method performs the following steps when called:

1. Let array be ? ToObject(this value).
2. Let func be ? Get(array, "join").
3. If IsCallable(func) is false, set func to the intrinsic function %Object.prototype.toString%.
4. Return ? Call(func, array).
```

## 人话

此方法在调用时执行以下步骤:

1. 将数组对象的引用赋给`array`(ToObject(argument)用于获取形参的引用)
2. 将访问`array`的join属性赋给`func`
3. 如果`func`是不可调用的，则将`Object.prototype.toString`方法赋予给`func`
4. 返回 `array`调用`func`**方法的值**





- 同步执行阶段

1. 声明函数fn
2. 开启定时器，回调函数为fn() ,即fn函数的执行结果undefined，时间间隔为1000ms
3. 1000ms后，执行定时器回调函数undefined
4. 定时器执行完后，执行定时器2回调函数









