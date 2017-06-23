/**
 * Created by moli on 2017/6/21.
 */
const OfoModel = require('../models').Ofo
const Promise = require('bluebird')

module.exports = {
  add(ofo){
    return new Promise((resolve, reject) => {
      if(ofo.number && ofo.pwd && ofo.pwd.length > 3){
        OfoModel.findOne({number:ofo.number}).exec().then(doc => {
          if(doc){
            let err = {
              code:1,
              msg:'该车牌号已存在无需再次添加，如有错误请联系管理员修改'
            }
            reject(err)
            return true
          }
          return false
        }).then(exist => {
          if(!exist){
            OfoModel.create(ofo,(err, item) => {
              if(err){
                reject(err)
              } else {
                resolve(item)
              }
            })
          }
        }).catch(err => {
          reject(err)
        })

      } else {
        let err = {
          code:1,
          msg:'车牌号或密码格式不符合'
        }
        reject(err)
      }

    })
  },
  findByCount(count){
    return OfoModel.find({}).sort({_id:'asc'}).limit(count).exec()
  },
  findByNumber(num){
    return OfoModel.find({number:{$regex:num}}).exec()
  }
}