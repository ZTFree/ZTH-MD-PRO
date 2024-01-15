# for in 和 for of

## 写法

```js
// for in
for(let a in b){}

// for of
for(let A of B){}
```

## 遍历

- 数组
  - 前者输出索引
  - 后者输出值
- 对象
  - 前者输出键
  - 后者无遍历，因为遍历对象无iterable接口