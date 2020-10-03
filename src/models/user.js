import Sequelize from 'sequelize'
import sequelize from '../lib/sequelize'

// 1.创建 model
const User = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(50), // 指定值的类型
      field: 'name' // 指定存储在表中的键名称
    },
    email: {
      // 没有指定 field，表中键名称则与对象键名相同，为 email
      type: Sequelize.STRING(128)
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false
    }
  },
  {
    // true 表名称和 model 相同: user
    // false 创建表名称会是复数: users
    freezeTableName: false
  }
)

// 2.创建表
// User.sync()创建表并返回Promise对象
// 如果 force = true 则把存在的表（如果users表已存在）先销毁再创建表 默认 forse=false
User.sync({ force: false })

class UserModel {
  /**
   * 查询用户信息
   * @param name  姓名
   * @returns {Promise.<*>}
   */
  static async findUserByName (name) {
    const userInfo = await User.findOne({
      where: {
        name: name
      }
    })
    return userInfo
  }

  /**
   * 查询用户信息
   * @param id  用户id
   * @returns {Promise.<*>}
   */
  static async findUserById (id) {
    const userInfo = await User.findOne({
      where: {
        id: id
      }
    })
    return userInfo
  }

  /**
   * 创建用户
   * @param user
   * @returns {Promise.<boolean>}
   */
  static async createUser (user) {
    await User.create({
      name: user.name,
      password: user.password
    })
    return true
  }
}

module.exports = UserModel
