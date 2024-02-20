# vue3项目vite构建后无法运行

## 一、问题描述

- 使用live-server运行打包后项目，页面无法渲染，控制台报错：

  ```cmd
  Refused to apply style from 'http://127.0.0.1:5500/assets/index-1fc5d2cc.css' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.
  ```

  

 ## 二、产生原因

- vite.config.js中将base配置项改为了`/bigevent`
- base用于指定项目的基础路径,通常用于将项目部署到子路径的情况

## 三、解决办法

- vite.config.js中将base配置项设置为`./`