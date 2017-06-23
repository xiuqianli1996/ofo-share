/**
 * Created by moli on 2017/6/21.
 */
const express = require('express')
const router = express.Router()
const OfoService = require('../service/OfoService')

router.get('/', (req,res) => {
  let key = req.query.key
  let model = {
    pageTitle:'OFO密码共享',
  }
  if(key){
    OfoService.findByNumber(key).then(items => {
      console.log(items)
      model.listTitle = `车牌号包含 ${key} 的的数据共有${items.length}条`
      model.data = items
    }).catch(err => {
      model.msg = '未知错误，获取数据失败'
    }).finally(() => {
      res.render('index',model)
    })
  } else {
    OfoService.findByCount(30).then(items => {
      model.listTitle = '最近收录'
      model.data = items
      console.log(items)
    }).catch(err => {
      model.msg = '未知错误，获取数据失败'
    }).finally(() => {
      res.render('index',model)
    })
  }
})

router.post('/add', (req,res) => {
    let item = req.body
    OfoService.add(item).then(item => {
      res.json({code:1, msg: '添加成功，感谢您的分享'})
    }).catch(err => {
      console.log(err)
      if (err.code === 1) {
        res.json({code:0, msg: err.msg})
      } else {
        res.json({code:0, msg: '添加失败,未知错误'})
      }
    })
  })

module.exports = router