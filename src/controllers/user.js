import UserModel from "../models/user";
import jwt from "jsonwebtoken";
import { System } from "../config";
import bcrypt from "bcryptjs";
import {
  request,
  summary,
  body,
  tags,
  middlewares,
  path,
  description,
  orderAll,
  query
} from "koa-swagger-decorator";
const tag = tags(['User']);
const userSchema = {
  name: { type: "string", required: true },
  password: { type: "string", required: true },
};

export default class UserController {
  @request("POST", "/user/register")
  @summary("register user")
  @description("example of api")
  @tag
  @body(userSchema)
  static async Register(ctx) {
    const user = ctx.request.body;
    if (user.password && user.name) {
      const existUser = await UserModel.findUserByName(user.name);
      if (!existUser) {
        // 密码加密
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
        await UserModel.createUser(user);
        const newUser = await UserModel.findUserByName(user.name);

        // 签发token
        const userToken = {
          name: newUser.name,
          id: newUser.id,
        };
        const token = jwt.sign(userToken, System.JWT_Sign, { expiresIn: "1h" });

        ctx.body = {
          code: 1,
          message: "创建成功",
          bean: {
            token,
          },
        };
      } else {
        ctx.body = {
          code: -1,
          result: {
            errInfo: "该用户名已存在",
          },
        };
      }
    } else {
      ctx.body = {
        code: -1,
        result: {
          errInfo: "参数错误",
        },
      };
    }
  }

  @request("post", "/user/login")
  @summary("user login, password is 123456")
  @tag
  @body(userSchema)
  static async Login(ctx) {
    const user = ctx.request.body;
    if (user.password && user.name) {
      const existUser = await UserModel.findUserByName(user.name);
      if (existUser) {
        // 判断前端传递的用户密码是否与数据库密码一致
        if (bcrypt.compareSync(user.password, existUser.password)) {
          // 用户token
          const userToken = {
            name: existUser.name,
            id: existUser.id,
          };
          const token = jwt.sign(userToken, System.JWT_Sign, {
            expiresIn: "1h",
          }); // 签发token
          ctx.body = {
            message: "成功",
            bean: {
              token,
            },
            code: 1,
          };
        } else {
          ctx.body = {
            code: -1,
            message: "用户名不存在或密码错误",
          };
        }
      } else {
        ctx.body = {
          code: -1,
          result: {
            errInfo: "用户名不存在或密码错误",
          },
        };
      }
    } else {
      ctx.body = {
        code: -1,
        result: {
          errInfo: "参数错误",
        },
      };
    }
  }
}
