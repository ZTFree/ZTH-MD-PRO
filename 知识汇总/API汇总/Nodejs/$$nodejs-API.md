## fs

- readFile
- readFileSync
- writeFile
- writeFileSync
- stat
  - 读取路径信息
  - isFile
  - isDirectory
  - size
- statSync
- readdir
- readdirSync
- mkdir
- mkdirSync
- rmdir
- rmdirSync
- rm
- rmSync
- append
  - 追加文件内容
- appendSync
- unlink
  - 删除存在文件
- unlinkSync
- stream？
- exist
- existSync
- watch
  - 监视文件!

## os

- cpus
- totalmen
- freemen
- platform
- EOL

## path

- parse
  - 解析路径信息
- join
- resolve
  - 和当前目录路径拼接成绝对路径
- basename
- extname
- dirname

## url

- parse
  - 第二参数为true则会解析query
- resolve

## querystring

- stringify
  - 数据转查询字符串
- parse

## http

- createServer

#### cb（req，res）

- req
  - url、method
- res
  - setHeader
  - statusCode
  - statusMessage
  - writeHead

### server

- on

- listen

  