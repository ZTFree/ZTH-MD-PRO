# Git 常用命令

## 初始化

- init

## 暂存、提交、删除、撤销

- add [ . ]
- cmmit -m "xxx"
- rm <filename>
- checkout --<filename>

## 仓库信息

- status [-s]

## 版本相关

- diff [version --]<filename> 

- log [--prety=oneline]
- reflog
- reset --hard HEAD^

## 远程分支相关

- remote add <orgname> <gitpath>
- remote rm <orgname>
- remote [-v]

## 推送

- push [-u] <orgname> <fork>

## 克隆

- clone <gitpath>