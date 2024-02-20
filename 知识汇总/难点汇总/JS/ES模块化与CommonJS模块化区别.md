# ES模块化与CommonJS模块化的区别

## ES

### 语法

- 导入
  - 静态导入：import { a } from 'xxx'
    - 会使所有被导入模块在加载时就被编译，且结果会被缓存
    - 首屏加载慢
  - 动态导入：const a = await import('xxx')
    - 返回promise值
    - 优化首屏加载速度
- 导出
  - export default { }
  - export const a = { }

## CommonJS

### 语法

- 导入
  - const a = require('xxx')
    - 导入模块会被缓存，导入模块代码只会执行一次
- 导出
  - module.exports = { }

## 区别

- 两者的模块导入机制不同
- JS引擎的静态分析会对ES静态导入做处理，并对导入内容解析
- ES可以静态与动态导入，CommonJS只可动态导入
- ES可用在客户端和服务端，CommonJS只可用于服务端