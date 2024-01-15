# Map集合

## Map类型

### 声明

```js
// 提供初始值
new Map([
    ["key1","value1"],
    ["key2","value2"],
    ["key3","value3"]
])

// 不提供初始值
new Map()
```

- 若初始化添加空的键值对，则其键和值均为undefined



### 实例方法/属性

1. has(key)
   - 查询键值对是否存在
2. get(key)
   - 获取该键的值
3. set(key,value)
   - 新增键值对，并返回该实例映射
4. delete(key)
   - 删除单一键值对
5. clear()
   - 清空map内的所有键值对
6. size
   - 返回键值对数量
7. entries()
   - 返回一个可供遍历的按照插入时间排序的迭代器

### 重点

1. map与object的键值对区别
   - object的键名只能由数值、字符串、符号组成
   - map的键名可以为任何JavaScript数据类型

### 其他

1. 可使用foreach进行迭代

