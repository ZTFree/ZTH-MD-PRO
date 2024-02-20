# 'vite' 不是内部或外部命令，也不是可运行的程序

## 一、问题描述

- 运行npm run dev与npm run build均报该错

 ## 二、产生原因

- 发现node_modules的依赖包莫名其妙被移除了，导致无法正常执行项目运行与打包命令

## 三、解决办法

- 删除node_modules目录，重新用`npm i`安装依赖

