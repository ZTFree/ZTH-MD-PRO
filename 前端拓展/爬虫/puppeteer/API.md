# puppeteer

> nodejs网络爬虫库
>
> 适合需要运行js代码、用户操作的页面
>
> 上手门槛较高

## 安装与导入

```powershell
npm i puppeteer
```

```js
const puppeteer = require('puppeteer')
```



## 基础API

### puppeteer实例

> ???



#### 方法

##### launch

- 开启浏览器
- 参数（opts：配置对象）
  - opts
    - headless：'new'



### browser实例

> ???



#### 方法

##### newPage

- 创建页面对象

##### close

- 关闭浏览器



### page实例

> ???



#### 方法

##### goto

- 网页路径跳转
- 参数（path：跳转路径）

##### screenshot

- 获取网页快照图片
- 参数（opts：配置对象）
  - path：图片保存路径+文件名

##### pdf

- 获取网页转pdf文件

