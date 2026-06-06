const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        vendor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
             type: String,
             default: null,
        },
        category: {
            type: String,
            required: true,
        },

        brand: {
            type: String,
            required: true,
        },

        countInStock: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Product", productSchema)