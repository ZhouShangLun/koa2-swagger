# Koa2-Swagger 服务器脚手架

这是一个基于 Koa2 添加Swagger的脚手架

包括对应的sequelize对数据库的直接操作


## 如何使用

### 关于sequelize和数据库

这里使用的是关系型数据库的ORM sequelize 
支持多种数据库，请先在 config.js中修改对应的db_type 例如：mysql mariadb sqlite  postgres  mssql
之后运行对应的  npm install mysql 或 npm install postgres 之类……

在配置好数据库之后 将会自动为数据库创建对应的model

### 开始运行
```bash
npm install
npm run dev


然后打开： http://localhost:3000/swagger-html
你就可以看到熟悉亲切的swagger页面了
```
![Image text](https://raw.githubusercontent.com/ZhouShangLun/koa2-swagger/main/images/swagger.jpg)

### 登录与授权

这里采用的是jwt的方式，必须使用token。
同时在app.js里面也声明了 path: [/^\/user\/login/, /^\/user\/register/, /^\/swagger/, /^\/public/]的路由是不受验证(允许匿名请求)

**第一步**先使用  /public/initData 的接口初始化数据，这时数据库就产生了登录的user和列表list的数据
**第二步**接下来 在注册接口 /user/register 或者 登录接口 /user/login 请求返回token
![Image text](https://raw.githubusercontent.com/ZhouShangLun/koa2-swagger/main/images/login.jpg)

**第三步**最后将token授权 打开Authorize按钮，记得前面携带 Bearer  然后点击Authorize。
![Image text](https://raw.githubusercontent.com/ZhouShangLun/koa2-swagger/main/images/authorization.jpg)

**最后** 在授权之后就可以对list列表增删查改了

### 关于swagger

这里采用的是[koa-swagger-decorator](https://github.com/Cody2333/koa-swagger-decorator/blob/master/CONTRIBUTING.md)
特点是开箱即用，但是同时入侵性很强，只适合用于小型项目中。(但是如果你是一个初学者，那么就更适合你了！)
里面使用的一个例子：

```javascript
// list.js

import ListModel from 'models/user'
import { request, summary, query, path, body, tags } from 'koa-swagger-decorator'

const tag = tags(['test'])


const getListSchema = {
  keyword: { type: 'string', required: true },
  status: { type: 'number', required: true }
}
export default class ListController {
  @request('get', '/list/list')
  @summary('返回一个列表')
  @description('example of api')
  @tag
  @query(getListSchema)
  static async getTodoList(ctx) {
    const data = ctx.request.query
    if (data) {
      const todoList = await ListModel.getTodoList(data.keyword, data.status)
      ctx.body = {
        code: 1,
        bean: {
          totalCount: todoList.totalCount,
          list: todoList.items,
        },
        message: '成功'
      }
    } else {
      ctx.body = {
        code: -1,
        message: '参数错误'
      }
    }
  }

}
```




