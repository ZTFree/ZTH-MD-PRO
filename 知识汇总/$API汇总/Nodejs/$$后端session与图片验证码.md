## 后端session

> 在后端存储用户session，用户请求时在req.session中访问对应session对象，且响应会返回cookie



### express-session库

> 由于nestjs支持express，故也能使用express的session插件

- 安装

```powershell
// express的session插件
pnpm i express-session --save
// 提示插件
pnpm i @types/express-session -D
```



- 使用

```ts
import * as session from 'express-session';

// ...
  // 响应会自动返回cookie
  app.use(
    session({
      // 加密字符串
      secret: 'zth666',
      // cookie名
      name: 'zth.session',
      // 每次请求重置cookie
      rolling: true,
      // 返回到前端的属性,默认值为{path:'/',httpOnly:true,secure:false,maxAge:null}
      cookie: { maxAge: null },
    }),
  );
```



## 图片验证码

### svg-captcha库

> 验证码格式为svg标签

- 安装

```powershell
pnpm i svg-captcha -S
```



### SVG生成

```typescript
// user.service.ts
import * as svgCaptcha from 'svg-captcha';

createCaptcha(req: any, res: any) {
    console.log({ req, res });
    const captcha = svgCaptcha.create({
      size: 6,//字符个数
      fontSize: 50,//字体大小
      width: 100,//图片宽度
      height: 34,//图片高度
      background: "#fff",//图片背景色
    });
    // 配合session存储用户的验证码
    req.session.code = captcha.text;
    res.type('image/svg+xml');

    return captcha.data;
}
```

将图片以标签形式返回

- rect标签：svg矩形元素
- path标签？



### 验证码校验

```ts
checkCaptcha(req: any, body: any) {
let text: string;

// 读取session中存储的用户验证码
if (req.session.code.toLowerCase() === body?.code?.toLowerCase()) {
  text = '校验成功';
} else {
  text = '校验失败';
}

return {
  data: {
    text,
  },
};
}
```

