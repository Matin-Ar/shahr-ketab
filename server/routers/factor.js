const express = require('express')
const Factor = require('../models/factor')
const router = new express.Router()

router.post('/factor', async (req, res) => {
    try {
        const factor = new Factor(req.body)
        await factor.save()
        res.status(201).send(factor)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/factor', async (req, res) => {
    try {
        const factor = await Factor.find()
        res.send(factor)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/factor/:id', async (req, res) => {
    try {
        const factor = await Factor.findById(req.params.id)
        res.send(factor)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/factor/:id', async (req, res) => {
    try {
        const factor = await Factor.findByIdAndDelete(req.params.id)
        res.send({message: "Deleted !"})
    } catch(e) {
        res.status(400).send(e)
    }
})

router.patch('/factor/:id', async (req, res) => {
    try {
        const factor = await Factor.findByIdAndUpdate(req.params.id, req.body)
        res.send({message: "Updated !"})
    } catch(e) {
        res.status(400).send(e)
    }
})


module.exports = router