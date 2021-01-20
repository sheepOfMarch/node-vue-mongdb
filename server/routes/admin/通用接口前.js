module.exports = app => {
    const express = require('express')
    const router = express.Router()

    const Dynasty = require('../../models/Dynasty')

    //创建朝代接口
    router.post('/dynasties', async (req, res) => {
       const model = await Dynasty.create(req.body)
       res.send(model)
    })

    //更新朝代接口
    router.put('/dynasties/:id', async (req, res) => {
        const model = await Dynasty.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
     })
     
     //删除朝代接口
     router.delete('/dynasties/:id', async (req, res) => {
         await Dynasty.findByIdAndDelete(req.params.id, req.body)
         res.send({
             success: true
         })
      })

    //朝代列表接口
    router.get('/dynasties', async (req, res) => {
        const items = await Dynasty.find().limit(10)
        res.send(items)
     })

     //根据ID显示编辑朝代接口
     router.get('/dynasties/:id', async (req, res) => {
        const model = await Dynasty.findById(req.params.id)
        res.send(model)
     })



    app.use('/admin/api', router)
}