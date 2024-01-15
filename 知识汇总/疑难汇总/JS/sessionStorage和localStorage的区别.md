# Storage的session和local的区别

> 不同源的页面之间的Storage不相同且不共通

## Storage

> 作为 Web Storage API 的接口，**`Storage`** 提供了访问特定域名下的会话存储或本地存储的功能
>
> sessionStorage和localStorage是浏览器Storage的俩个具体实现

## sessionStorage：会话存储

- 生命周期为会话生命周期，页面开启会创建sessionStorage，页面关闭则sessionStorage消除
- 非关联(即非跳转或开启关系)的新页面会创建各自的sessionStorage
- 从页面跳转或开启的新页面会复制原页面的上下文（包含sessionStorage、localStorage、Cookie）作为新页面的上下文，即新旧页面修改的Storage是同一个

## localStorage：本地存储

- 不会过期，可以长期存储，即使浏览器关闭也不会消除
- 同一源页面的localStorage会被保留

# 区别

- 主要体现在生命周期上的不同