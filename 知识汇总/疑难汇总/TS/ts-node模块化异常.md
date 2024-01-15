## 解决ts-node无法编译es模块化导入文件

```json
// tsconfig.json
"ts-node": {
    "compilerOptions": {
        "module": "CommonJS"
    }
}
```

