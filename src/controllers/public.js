import UserModel from '../models/user'
import ListModel from '../models/list'
import bcrypt from 'bcryptjs'
import {
  request,
  summary,
  body,
  tags,
  middlewares,
  path,
  description,
  orderAll,
  query,
} from 'koa-swagger-decorator'
const tag = tags(['Public'])

export default class PublicController {
  @request('post', '/public/initData')
  @summary('允许的匿名请求 初始化数据')
  @description('包括登录的user和list列表')
  @tag
  static async InitData(ctx) {
    const userData = {
      name: 'login',
      password: '123456',
    }
    let user = await UserModel.findUserByName(userData.name)
    if(!user){
      const salt = bcrypt.genSaltSync()
      const hash = bcrypt.hashSync(userData.password, salt)
      userData.password = hash
      await UserModel.createUser(userData)
      user = await UserModel.findUserByName(userData.name)
    }
    for (let i = 0; i < 20; i++) {
      const newList = {
        user_id: user.id,
        content: '内容:' + i,
        status: 1
      }

      await ListModel.createTodoList(newList)
    }

    ctx.body = {
      message: '成功',
      code: 1,
    }
  }
}
