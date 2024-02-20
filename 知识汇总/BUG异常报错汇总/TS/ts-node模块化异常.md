# ts-node无法编译es模块化导入文件

## 一、问题描述

- 。。。

 ## 二、产生原因

- 。。。

## 三、解决办法

- 更改tsconfig.json配置项

```json
"ts-node": {
    "compilerOptions": {
        "module": "CommonJS"
    }
}
```

