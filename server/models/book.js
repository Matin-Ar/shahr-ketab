const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    writer: [{
        type: String,
        required: true,
        trim: true
    }],
    topic: [{
        type: String,
        required: true,
        trim: true
    }],
    purchase_pirce: {
        type: String,
        required: true,
        trim: true
    },
    publisher: {
        type: String,
        required: true,
        trim: true
    },
    available: {
        count: {
            type: Number,
            required: true,
            trim: true
        },
        description : {
            type: String,
            required: true,
            trim: true
        }
    },
    store: {
        address: {
            type: String,
            required: true,
            trim: true
        },
        telephone: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            cityname: {
                type: String,
                required: true,
                trim: true
            },
            province: {
                type: String,
                required: true,
                trim: true
            }
        }
    }

}, {
    timestamps: true
})


bookSchema.plugin(uniqueValidator)

const Book = mongoose.model('Book', bookSchema)

module.exports = Book