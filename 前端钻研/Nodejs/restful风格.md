# restful风格

> 路由中不能出现动词，即：get/post/put/delete
>
> 路由结尾不能有/
>
> 使用-来替换_
>
> 建议使用小写字母
>
> 使用复数形式
>
> 推荐标准状态码：
>
> 1. 200 ok 服务器返回用户请求的数据
> 2. 201 created 新建或修改操作成功
> 3. 204 not content 删除数据成功
> 4. 400 bad request 用户发出的请求有问题
> 5. 401 unauthoried 表示用户没有认证，无法进行操作
> 6. 403 forbidden 用户访问是被禁止的
> 7. 422 unprocesable entity 当创建一个对象时，发生一个验证错误
> 8. 500 internal server error 服务器内部错误，用户将无法判断发出的请求是否成功
> 9. 503 service unavailable 服务不可用装填，多半是因为服务器问题，例：cpu占用率大...