const express = require('express')
const Book = require('../models/book')
const router = new express.Router()

router.post('/book', async (req, res) => {
    try {
        req.body.writer = req.body.writer.split(', ')
        const book = new Book(req.body)
        await book.save()
        res.status(201).send(book)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/book', async (req, res) => {
    try {
        const book = await Book.find()
        res.send(book)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/book/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        res.send(book)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/book/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id)
        res.send({message: "Deleted !"})
    } catch(e) {
        res.status(400).send(e)
    }
})

router.patch('/book/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body)
        res.send({message: "Updated !"})
    } catch(e) {
        res.status(400).send(e)
    }
})


module.exports = router