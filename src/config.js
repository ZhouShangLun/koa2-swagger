import path from 'path'

// 系统配置
export const System = {
  API_server_type: 'http://', // API服务器协议类型,包含"http://"或"https://"
  API_server_host: 'localhost', // API服务器暴露的域名地址,请勿添加"http://"
  API_server_port: '3000', // API服务器监听的端口号
  HTTP_server_type: 'http://', // HTTP服务器协议类型,包含"http://"或"https://"
  HTTP_server_host: 'www.XXX.com', // HTTP服务器地址,请勿添加"http://" （即前端调用使用的服务器地址，如果是APP请设置为 * ）
  HTTP_server_port: '65534', // HTTP服务器端口号
  System_country: 'zh-cn', // 所在国家的国家代码
  System_plugin_path: path.join(__dirname, './plugins'), // 插件路径
  JWT_Sign: 'JWT_Sign', // 生产环境务必随机设置一个值
  db_type: 'postgres' // 数据库类型
}

export const DB = {
  host: 'localhost', // 服务器地址
  port: 5432, // 数据库端口号
  username: 'postgres', // 数据库用户名
  password: '!Password', // 数据库密码
  database: 'postgres', // 数据库名称
  prefix: 'api_' // 默认"api_"
}

export const SendEmail = {
  service: 'smtp.abcd.com', // SMTP服务提供商域名
  username: 'postmaster%40abcd.com', // 用户名/用户邮箱
  password: 'password', // 邮箱密码
  sender_address: '"XX平台 " <postmaster@abcd.com>'
}
