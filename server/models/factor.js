const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const factorSchema = new mongoose.Schema({
    date_factor: {
        type: String,
        required: true,
        trim: true
    },
    customer: {
        c_name: {
            type: String,
            required: true,
            trim: true
        },
        c_phone: [{
            type: String,
            required: true,
            trim: true
        }],
        c_address: {
            type: String,
            required: true,
            trim: true
        }
    },
    employee: {
        e_name: {
            type: String,
            required: true,
            trim: true
        },
        e_phone: {
            type: String,
            required: true,
            trim: true
        },
        gender: {
            type: String,
            required: true,
            trim: true
        }
    },
    sell: [{
        count: {
            type: Number,
            required: true,
            trim: true
        },
        sale_price: {
            type: String,
            required: true,
            trim: true
        }
    }]
}, {
    timestamps: true
})


factorSchema.plugin(uniqueValidator)

const Factor = mongoose.model('Factor', factorSchema)

module.exports = Factor