# TS

## 环境搭建

- 安装typescript

```cmd
npm i -g typescript
```

- 配置tsconfig.json文件

```json
{
    // ...
    "compilerOptions": {
        // ...
    },
    "ts-node": {
        // ...
    },
}
```

- 安装ts-node与@types/node

```cmd
npm i ts-node -g
npm i @types/node --save-dev
```

- tsconfig.json配置ts-node

```json
{
    // ...
    "ts-node": {
        "compilerOptions": {
            "module": "CommonJS"
        }
    }
}
```

---



## 基础语法

### 变量声明

```ts
// 变量名:类型
let a:number = 1

// function 函数名(形参:形参类型):返回值类型{}
fuction Fn(a:number):void{}

// 变量名:类型<泛型>
let arr:Array<number> = [1,2,3]
```

---



## 基础类型

| 等级 | 类型                        |
| ---- | --------------------------- |
| 1    | any、unknow                 |
| 2    | Object                      |
| 3    | Number、String、Bolean等    |
| 4    | number、string、boolean等   |
| 5    | 常量（1、’1‘、false等）     |
| 6    | never                       |
| 其它 | object、IArgument（伪数组） |



### object、Object与{ }三个类型的区别

- Object表示可为任意类型
- object表示非原始类型（即非基本数据类型）
- { }也表示任意类型，但该类型变量初始化后无法进行属性修改



### never类型

- 若无法断定类型则可以用never兜底

```ts
// A==>never
type A = 1&0 
```

---



## 接口类型

- 声明

```ts
// interface 接口名{...}
interface People{
    name:string,
    age:number,
    sex?:string, // 表示该属性是可选的
    readonly money:number // 表示该属性只读，初始化后不可修改
    [propName:string]:any // 表示可有任意值为any的属性
}

// extends接口继承
interface Man extends People{
    // ...
}


const m:Man = {
    name:'jack',
    age:18
}
```

---



## 函数语法

- 声明

```ts
// function 函数名(形参:形参类型):返回值类型{}
// ?修饰符表示形参是可选的
fuction Fn(a:number=10,b:?num):number{
    return a + b||0
}
```

- 指定this的类型

```ts
function fn (this:number){}
```

- 函数重载

```ts
function fn(n:number){}
function fn(s:string){}
function fn(b:boolean){}
```

---



## 联合类型

- |

```ts
let a:number|string = 1
a = '1'
```



- &

```ts
let a:object&Array<number> = [1,2,3]
```

---



## 类型断言

> 手动断定未知类型的类型

```ts
function fn(a:number|string){
    return (a as string).toUpperCase()
}

// 断言为常量类型
let a  = 10 as const
```



## 非空断言

```ts
// 类型不为null与undefined
```



---



## 类相关语法

### 实现接口

```ts
interface A{}

class X implements A{}
```



### 抽象类

```ts
// 需要被其它类继承并实现内部属性与方法
abstract class X{		//抽象类无法实例化
    abstract num:number //抽象属性无法初始化
    abstract fn():void  //抽象方法无法实现
}
```

---



## 元组

```ts
let arr:[number,string] = [1,'123']
let arr:readonly[number,string] = [1,'123'] //只可读
let arr:[a:number,b:string] = [1,'123']
```

---



## 枚举

```ts
enum X{
    a,
    b,
    c
}

// 若设置值为数字，则后续枚举值会自动递增
enum X{
    a=1,
    b,
    c
}

// 若设置值为非数字，则后续枚举值需要手动设置
enum X{
    a,
    b='s',
    c='b'
}

// 可使用 枚举类型[枚举值]来读取枚举属性名
console.log(X[0]) // ==> 'a'
```

---



## 类型别名

```ts
// type 类型别名 = 类型
type A = number | string
let a:A = 1
a = 's'

type fn = ()=>number
```

#### type语句中extends的用法

```ts
// 根据类型判断三元表达式选择类型
let a = 10
type A = a extends number ? boolear:string
```

---



## 类型工具

```ts
type p1 = Readonly<p>

// Readonlu、Partial、Pick、Omit、record
```



## 泛型

### 使用

```ts
// T,B的类型会根据传入数据的类型自动推断，也可设置默认值
fuction fn<T=number,B>(a:T,b:B):Array<T|B>{...}
```



### 泛型约束

```ts
// <T extends 约束类型>
```



## keyof与typeof用法

```ts
// 类型
let n = number
let o = {a:number,b:string}

type A = typeof n // A=>number
type B = keyof typeof o // B=>number|string

// 函数
function fn<T>(obj:T,key:keyof T){}

// 高级用法
interface A{}
type Opt<T extends object> = {
    [Key in keyof T]?:T[key];
}
```

---



## 装饰器语法

> 本质为函数

- 常用类型：类装饰器、方法装饰器、属性装饰器

### 声明

```ts
// target:指向修饰的类对象
const C:ClassDecoration = target=>{...}

// target:指向方法所处对象的原型 
// key:方法名
// description:函数描述对象
const M:MethodDecoration = (target,key,description)=>{...}

// target:属性所处对象原型
// key:属性名
const P:PropertyDecoration = (target,key)=>{...}
```



### 调用

```ts
// 可传入参数，如C('123')
@C
class Man{
    @P name:string;
    @M eatFood(){...}
}
```

---



## tsconfig.json配置项

### include

- [“编译路径下文件”]

### exclude

- [”不编译路径下文件“]

### extends

- ”继承配置文件“

### paths

- 设置路径别名

### files

- ["编译文件路径"]

### compilerOptions

| 属性                   | 取值       | 作用                       |
| ---------------------- | ---------- | -------------------------- |
| target                 | ES版本     | 指定编译成的ES版本         |
| module                 | 模块化方案 | 指定模块化方案             |
| lib                    | 库名       | 指定项目所用库，一般为默认 |
| outDir                 | js输出目录 | 指定js输出目录             |
| outFile                | 文件路径   | 编译结构合并为何文件       |
| allowJs                | bool       | 是否对js编译               |
| checkJs                | bool       | 是否检测js语法             |
| removeComments         | bool       | 是否移除注释               |
| noEmit                 | bool       | 是否不输出编译文件         |
| noEmitOnError          | bool       | 是否有错误时不输出编译文件 |
| strict                 | bool       | 所有类型严格检查           |
| alwayStrict            | bool       | 总是开启严格模式           |
| strictNullCheck        | bool       | 严格检查null               |
| noImplicitAny          | bool       | 不允许隐式any类型          |
| noImplicitThis         | bool       | 不允许隐式this的类型       |
| incremental            | bool       | 开启编译缓存               |
| tsBuildInfoFile        | 文件路径   | 编译缓存文件路径           |
| experimentalDecorators | bool       | 开启装饰器功能             |
| diagnostics            | bool       | 打印诊断信息               |



### ts-node

| 属性           | 取值                  | 作用                |
| -------------- | --------------------- | ------------------- |
| comilerOptions | "module":"CommonJS"等 | 配置ts-node编译配置 |

---



## 其它

- IOC控制反转？
- 依赖注入？
- AOP面向切面？