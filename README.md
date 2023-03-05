# vite-xwk-template

> 这是一个 **`Vite` 项目模板**，使用目前前沿技术栈。  
> 包含了核心依赖库、代码检查等。

## 使用方式

> 请提前安装好 pnpm 环境

```
npm install -g pnpm
```

```
npx degit saatana97/vite-xwk-template#monorepo my-project
cd my-project
pnpm install
pnpm dev
```

## 框架依赖

-   [Pnpm](https://pnpm.io/installation) 快速的，节省磁盘空间的包管理工具
-   [Vite](https://cn.vitejs.dev/) 脚手架
-   [Vue3](https://cn.vuejs.org/) 渐进式 JavaScript 框架
-   [Typescript](https://www.tslang.cn) JavaScript 的超集
-   [Eslint](https://eslint.bootcss.com/) 可组装的 JavaScript 和 JSX 检查工具
-   [Prettier](https://prettier.io/) 代码格式化程序
-   [LintStaged](https://github.com/okonet/lint-staged#readme) 针对暂存的 git 文件运行检查
-   [Husky](https://typicode.github.io/husky) 改善你的提交
-   [CommitLint](https://github.com/conventional-changelog/commitlint#readme) 检查代码提交消息

## 使用说明

> -   在`./pnpm-workspace.yaml`文件中定义了`pnpm`工作空间，子项目应该完整放在工作空间中
> -   组件库或者其他工具库可以放在`./packages`目录下，本模板中有一个示例库`lib`，名为`@pkgs/lib`
> -   项目入口或者启动页面可以放在`./apps`目录下，本模板中有一个示例入口`web`，名为`@apps/web`
> -   使用`pnpm -F @pkgs/lib add lodash`为`lib`项目添加名为`lodash`的依赖，`pnpm -F @pkgs/lib add @types/lodash -D`添加`TS`声明
> -   使用`pnpm -F @apps/web add @pkgs/lib`为`web`项目添加`lib`依赖，在`./apps/web/package.json`中表示为`"@pkgs/lib": "workspace:^1.0.0"`，也可改为`"@pkgs/lib": "workspace:*"`
> -   `packages`下库项目有更改时，应运行`pnpm build`打包编译，`apps`下入口项目引用的是库项目`package.json`的`main`、`module`、`exports`中定义的库入口文件
> -   如果想要断点调试`packages`下的库项目，通过`apps`入口项目启动是不行的（原因见上一点），库项目中的示例项目（来自于本模板`lib`分支）内置了`index.html`继承了`vue`环境，运行`pnpm -F @pkgs/lib dev`即可启动库项目中的`web`服务进行断点调试
