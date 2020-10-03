import Sequelize from "sequelize";
import sequelize from "../lib/sequelize";

// 1.创建 model
const List = sequelize.define(
  "list",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING(255),
      field: "content",
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    // true 表名称和 model 相同: list
    // false 创建表名称会是复数: lists
    freezeTableName: true,
  }
);

// 2.创建表
const list = List.sync({ force: false });

class ListModel {
  /**
   * 获取todoList
   * @param kewword  关键字搜索
   * @returns {Promise.<*>}
   */
  static async getTodoList(kewword, status) {
    const op=Sequelize.Op
    const todoList = await List.findAll({
      where: {
        status,
        content: {
          [op.like]: '%'+kewword+'%'
      }
      },
      attributes: ["id", "content", "status"],
      limit: 10,
      offset: 0,
      order: [
        ['id', 'desc']
      ]
    });
    const totalCount=await List.findAll({
      where: {
        status,
        content: {
          [op.like]: '%'+kewword+'%'
      }
      },
      attributes: ["id", "content", "status"],
      order: [
        ['id', 'desc']
      ]
    });
    return {items:todoList,totalCount:totalCount.length};
  }

  /**
   * 创建一条todoList的数据
   * @param data
   * @returns {Promise.<boolean>}
   */
  static async createTodoList(data) {
    await List.create({
      user_id: data.user_id,
      content: data.content,
      status: data.status,
    });
    return true;
  }

  /**
   * 删除todoList
   * @param id listID
   * @returns {Promise.<boolean>}
   */
  static async destroyTodoList(id) {
    await List.destroy({
      where: {
        id,
      },
    });
    return true;
  }

  /**
   * 更新数据的状态
   * @param id  用户ID
   * @param status  事项的状态
   * @returns {Promise.<boolean>}
   */
  static async updateTodoList(id, status) {
    await List.update(
      {
        status,
      },
      {
        where: {
          id,
        },
        fields: ["status"],
      }
    );
    return true;
  }
}

module.exports = ListModel;
