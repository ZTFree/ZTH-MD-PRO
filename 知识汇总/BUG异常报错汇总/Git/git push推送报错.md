# git push：不知道为何报错的报错

## 一、问题描述

- `git push`报错无法正常执行

```cmd
! [rejected]	master -> master (non fast forward)
hint:Updates were rejected because the tip of vour current branch is behino
hint:its remote counterpart. If you want to integrate the remote changes,
hint:use'git pull' before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

 ## 二、产生原因

- 未知

## 三、解决办法

- 方案1：重新初始化仓库

```cmd
git init
```

- 方案2：--allow unrelated-histories

```cmd
git push --allow unrelated-histories
```

- 方案3：强制推送

```cmd
git push --force
```

