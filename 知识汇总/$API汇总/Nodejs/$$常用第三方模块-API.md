---
typora-copy-images-to: media
---
## 其他模块

### cookie

cookie的原理是在浏览器中开辟了一个用来存储http请求中的数据，第一次保存之后，下次请求只要还是使用的当前浏览器，就能访问到浏览器这个空间中的数据。

cookie会作为键值对，在响应头和请求头之间携带。

cookie的特点：

1. 域名限制，当前域名下设置的cookie，只能在当前域名下使用
2. 时效性，cookie不会永久存储在浏览器，具有一定的有效期
3. 数量限制，正常情况下，每个域名最多不能超过50个cookie
4. 空间限制，cookie只能存储4kb
5. 数据类型限制，cookie中只能存储字符串

```shell
npm i cookie-parser -S
```

使用：

```js
// 导入
const cookieParser = require('cookie-parser')
// 中间件
app.use(cookieParser());
// 请求头获取
req.headers.cookie // 获取所有cookie
// 响应头设置
res.cookie(键,值,{maxAge: 有效期-毫秒}) // 设置cookie
```

### 加密

```shell
npm i bcryptjs -S
```

使用：

```js
var bcrypt = require('bcryptjs');
// 加密
密文 = bcryptjs.hashSync(明文[,数字]); // 数字，将使用指定的轮数生成盐并将其使用。推荐 10
// 验证
bcryptjs.compareSync(明文,密文); // 通过返回true，失败返回false
```

### jwt

```shell
npm install jsonwebtoken
```

使用：

```js
// 加密生成token
var jwt = require('jsonwebtoken');
var token = jwt.sign(被加密的对象, 盐);

// 验证
jwt.verify(token, 盐, function(err, decoded) {
  // decoded是解密后的对象
});
```

### 文件上传

```shell
npm i multer -S
```

使用：

```js
var multer  = require('multer')
var upload = multer({ dest: path.join(__dirname,'public','image') }) // 指定上传的文件路径
app.post('/profile', upload.single('上传表单name值'), function (req, res, next) {
  // req.file 是上传的文件信息 - 可以从中获取到文件名称、路径、后缀 - 拼接路径存入mongodb
})
```

### 验证码

```shell
npm i svg-captcha -S
```

使用：

```js
const svgCaptcha = require('svg-captcha')
// 创建验证码
let captcha = svgCaptcha.create();
// captcha是是一个对象，其中包含data键和text键，text是验证码上的字符，data是一个svg标签直接可以显示为一张图片
```

### 邮件发送

借助某个邮箱账号，开启能给对应的邮箱服务器发送请求的功能。


```shell
npm install nodemailer --save
```

使用：

```js
const nodemailer = require('nodemailer')

// 1. 创建发送器
const transport = nodemailer.createTransport({
  // 需要你发送放邮箱的 stmp 域名和密码和一些其他信息
  // 需要你去复制一下, 找到下载的 nodemailer 第三方包
  //   nodemailer -> lib -> well-known -> services.json
  "host": "smtp.qq.com",
  "port": 465,
  "secure": true,
  // 证明你的身份
  auth: {
    // 发送方邮箱的用户名
    user: '邮箱号',
    // stmp 允许密码
    pass: '授权码'
  }
})


// 2. 发送邮件
transport.sendMail({
  // 从那个邮箱发送
  from: '发送方邮箱',
  // 发送到哪里, 可以写一个字符串, 书写邮箱, 也可以写一个数组, 写好多邮箱
  to: ['接收方邮箱', '接收方邮箱'],
  // 邮件标题
  subject: '标题',
  // 本次邮件的 超文本 内容
  html: `
    您好: 本次的验证码是
    <h1 style="color: red;"> 2345 </h1>
    请在 3 分钟内使用


    <br>
    ------------------------<br>
    前途无限股份有限公司
  `,
  // 本次邮件的 文本 内容
  // text: ''
}, function (err, data) {
  if (err) return console.log(err)

  console.log('邮件发送成功')
  console.log(data)
})
```
