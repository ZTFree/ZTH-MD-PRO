## require

   + 步骤1: 当前目录中查找node_modules文件夹,在node_modules目录中查找对应模块文件或文件夹
        - 在对应模块名文件夹中查找package.json文件,根据package.json文件main字段导入对应模块
          + 如果没有package.json文件或没有main字段 则默认导入该文件夹中的index.js
   + 步骤2: 如果步骤1找不到对应的模块,或者在当前目录没有node_modules文件夹
        - 则会去上一级目录中查找node_modules文件夹,找到了node_modules文件夹则按照步骤1在其中查找模块
        - 如果上级目录也没有node_modules文件夹,则继续往上一级目录找
          + 如果找到盘符根目录还没有,则会去node全局目录中查找
            - node全局目录