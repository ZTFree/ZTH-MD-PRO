

- [`<'flex-grow'>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex#flex-grow)

  定义 flex 项目的 [`flex-grow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-grow) 。负值无效。省略时默认值为 1。 (初始值为 `0`)

  [`<'flex-shrink'>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex#flex-shrink)

  定义 flex 元素的 [`flex-shrink`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-shrink) 。负值无效。省略时默认值为`1`。 (初始值为 `1`)

  [`<'flex-basis'>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex#flex-basis)

  定义 flex 元素的 [`flex-basis`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis) 属性。若值为`0`，则必须加上单位，以免被视作伸缩性。省略时默认值为 0。(初始值为 auto)

- 

  ```
  /* 单值，无单位数字：flex-grow
  flex-basis 此时等于 0。 */
  flex: 2;
  ```

- 定义 flex 项目的 [`flex-grow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-grow) 。负值无效。省略时默认值为 1。 (初始值为 `0`)

- flex为单值
  - 非0正值==>grow
- 设置了felx的元素与未设置flex的元素
- 

# 知识总结

1. 当felx设置单一数字值时，本质为设置felx-grow的值，其默认值为0，且不可为负值（无效）

2. flex-grow作用

   - 当主轴项目未设置flex值时，即均为默认值0，项目不会参与平分剩余空间

   - 当主轴有项目设置flex值时，设置了非0的flex的项目会根据felx值占有的比例划分容器主轴中的剩余空间

     - 如

       ```css
       元素1{
           flex:1
       }
       
       元素2{
           flex:2
       }
       ```

       - 则主轴上的总felx值为3，元素1占用剩余空间的1/3，元素2占用剩余空间的2/3

     

3. 注意：

   1. 剩余空间=主轴空间-flex值为0的项目占用的空间
   2. 当flex占用比例过小时会被计为0

   

   

   

