import nodemailer from 'nodemailer'
import { SendEmail } from '../../config'

/**
   * 发送Email
   * @param receivers 目标邮箱，可以用英文逗号分隔多个。
   * @param subject 邮件标题
   * @param text 文本版本的邮件内容
   * @param html HTML版本的邮件内容
   * @returns
   */
export const sendemail = async (receivers, subject, text, html) => {
  return new Promise(function (resolve) {
    const transporter = nodemailer.createTransport('smtp://' + SendEmail.username + ':' + SendEmail.password + '@' + SendEmail.service)

    // setup e-mail data with unicode symbols
    const mailOptions = {
      from: SendEmail.sender_address, // sender address
      to: receivers,
      subject: subject,
      text: text || 'Hello world 🐴', // plaintext body
      html: html || '<b>Hello world 🐴</b>' // html body
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        resolve({
          result: 500,
          info: error
        })
      } else {
        resolve({
          result: 200,
          info: info.response
        })
      }
    })
  })
}
