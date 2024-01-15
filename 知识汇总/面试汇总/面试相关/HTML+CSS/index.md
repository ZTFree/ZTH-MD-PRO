##### 1. 父元素和子元素宽高不固定，如何实现水平垂直居中

- [x] 解：
  1. 父元素子给相对定位；子元素绝对定位left，top给50%，translate给x、y各给 -50%
  2. 父元素给display为flex，justy-content和align-items给center



##### 2. 分别实现骰子中的'一点' 和 '三点' 的布局

- [x] 解：
  - 一点：弹性盒子水平与垂直居中
  - 三点：
    1. justy-content：space-between
    2. 给第二个点设置align-self：center
    3. 给第三个点这种align-self：end



##### 3. 简述选择器~和+的区别

- [x] 解：

  - A+B ：选择A同级后面的紧贴且符合B的，只能匹配一个

  - A~B ：选择A同级后面的(不需要紧贴)符合B的，能匹配全部



##### 4. 简述box-sizing的有效值以及所对应的盒模型规则。

- [x] 解：
  1. content-box：盒子的w/h尺寸不会包含padding与border，仅为content尺寸
  2. border-box：盒子的w/h尺寸会包含content、padding与border
  3. inherit：继承父盒子的box-sizing的属性值



#####   <u>5. html中元素的margin是否会叠加（合并）？如何解决？</u>

- [x] 解：

  - 会

    1. 同级block块级纵向margin合并
       1. 转行内块（flex项目本质也是转行内块）

    2. 父子margin-top合并
       1. 父级或子级转行内块
       2. 父级给宽度不为0的border
       3. 父级给overflow：hidden | auto



#####  <u>6. 简述align-items和align-content的区别</u>

- [x] 解：

  - 侧轴上只有单项目组时两者效果一致

  - 侧轴上有多项目组时

    - align-items：为项目组平分空间后在其空间中的侧轴排布方式

    - align-content：为项目组忽略剩余空间看作整体后再侧轴排布方式



##### 7. 简述data-*属性的用法（如何设置，如何获取），有何优势？

- [x] 解：
  - 即标签元素的自定义属性
    - 设置：
      1. 标签行内设置：data-xxx=’xxx‘
      2. js设置
         1. el.setAttribute('data-xxx','xxx')
         2. el.dataset.xxx = 'xxx'
    - 获取
      1. el.getAttribute('data-xxx')
      2. el.dataset.xxx
    - 优势
      1. 防止与标签元素原生属性重名
      2. 可以使用自定义属性进行标记、数据存储
    - 细节
      1. 属性名不应包含大写字母
      2. 属性值不能直存为对象，要进行序列化后再存储



#####  8.  简述title与h1的区别，b与strong的区别，i与em的区别

- [x] 解：
  - title与h1
    - title为网页的标题，内容显示在浏览器顶部栏中
    - h1为网页内容标题，显示在浏览器文档结构中
  - b与strong
    - 功能一致
    - strong具有语义加强作用
  - i与em
    - 为功能一致的标签
    - em具有语义加强作用



#####  <u>9.  什么是标准文档流</u>

- [x] 解：
  - 标准文档流指的是元素排版布局过程中，元素会默认自动从左往右，从上往下的流式排列方式。当前面内容发生了变化，后面的内容位置也会随着发生变化。
  - HTML就是一种标准文档流文件



##### <u>10. z-index是什么？在position的值什么时候可以触发?</u>

- [x] 解：

  - z-index：即元素的定位层级，值为数字，它代表着定位元素的显示层级，默认值为0，值越大，越在页面上层，z-index较小的定位元素内容会被遮盖

  - 当元素的position样式值为<u>`relative`</u>、`absolute`、`fixed`时才可以触发z-index



#####  11. ★★ CSS3 如何实现圆角？

- [x] 解：

  - 设置元素的border-radius样式属性的值

    - 4个值：左上->右上->右下->左下
    - 3个值：左上->右上+左下->右下
    - 2个值：左上+右下->右上+左下
    - 1个值：四个角

    

#####  <u>12.  HTML5有哪些缓存方式？</u>

- [ ] 解：
  1. Storage
     1. localStorage
        - 全页面通用
        - 需要手动删除
     2. sessionStorage
        - 单页面使用
        - 页面会话结束则删除
  2. Cookie
  3. 离线缓存机制
  4. web SQL
  5. IndexDB



##### 13. CSS3新增伪类有那些？

- [x] 解：
  1. 属性伪类
  2. 结构伪类
  3. 伪元素伪类
  4. 其它伪类
     - :not、:root



##### <u>14. 简述一下src与href的区别，title和alt的区别</u>

- [ ] 解：
  - src通常指的是引入资源的的url路径，而href指的是网页的地址
  - title的值是鼠标悬于img上方时显示的信息，alt的值是在图片资源获取失败时显示的内容

- 答案

  - `href`：href表示超文本引用，用来建立当前元素和文档之间的链接，常用在link和a等元素上。
  - `src`：src表示引用资源，替换当前元素，是页面内容不可缺少的一部分，常用在img，script，iframe上。src指向外部资源的位置，指向的内部会迁入到文档中当前标签所在的位置；请求src资源时会将其指向的资源下载并应用到当前文档中,例如js脚本、img图片等。src链接内的地址不会有跨域问题
         注：当浏览器解析到这一句时会暂停其他资源的下载和处理，直至将该资源加载、编译、执行完毕。这也是js脚本放在底部而不是头部的问题
  - `title`
           1. title属性是为元素提供额外的注释信息，当鼠标放在元素上时会有title文字显示，以达到补充说明或提示。
           2. title属性更倾向于用户体验的考虑。
           3. <u>title既可以是元素的属性也可以是标签，作为属性可以用在除base,basefont,head,html,meta,param,script和title之外的任何标签上（title常与form以及a标签一同使用，以提供关于输入格式和链接目标的信息），title与style、id、class等一起作为HTML中许多标签共用的标准属性。</u>

  - `alt`
           1. alt属性是在你的图片无法显示时的替代文本，它会直接输出在原本加载图片的地方。
           2. alt属性有利于SEO，是搜索引擎搜录时判断图片与文字是否相关的重要依据。
           3. alt只能是元素的属性，只能用在img、area和input标签中（img,area中alt<u>必须指定</u>）。















