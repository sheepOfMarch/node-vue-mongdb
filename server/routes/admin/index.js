const fs = require('fs')
const path = require('path')

module.exports = app => {
    const express = require('express')
    const router = express.Router({
        mergeParams: true
    })

    //创建朝代接口
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    //更新朝代接口
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    //删除朝代接口
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    //朝代列表接口
    router.get('/', async (req, res) => {
        const items = await req.Model.find().limit(10)
        res.send(items)
    })

    //根据ID显示编辑朝代接口
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    app.use('/admin/api/rest/:resource', async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../models/${modelName}`)
        next()
    }, router)

    const multer = require('multer')
    const upload = multer({
        dest: __dirname + '/../../uploads'
    })

    app.post('/admin/api/uploads', upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    app.post('/admin/api/uploads/delete', async (req, res) => {
        const url = req.body.url
        const char = url.lastIndexOf('/')
        const name = url.slice(char + 1)
        const nameUrl = path.join(__dirname, `../../uploads/${name}`)
        // console.log(req.body)
        await fs.unlink(nameUrl, (err) => {
            if (err) {
                console.log(err)
                return
            }
            console.log('删除成功')
        })
    })
}