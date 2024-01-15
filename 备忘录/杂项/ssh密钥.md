### 1.本地生成ssh密钥

> id_rsa文件为私钥，不可外传
>
> id_rsa.pub文件为公钥，可外传

```powershell
ssh-keygen -t rsa -C "your email"
```

### 2.配置github密钥

- 将公钥内容粘贴即可