const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: [true, "category can not be empty"]
        },
        foodDesc: {
            type: String,
            required: [true, "foodDesc can not be empty"]
        },
        calories: {
            type: Number,
            min: [0, 'you can not add a negative number'],
            required: [true, "calories can not be empty"]
        },
        protein: {
            type: Number,
            min: [0, 'you can not add a negative number'],
            required: [true, "protein can not be empty"]
        },
        carbohydrates: {
            type: Number,
            min: [0, 'you can not add a negative number'],
            required: [true, "carbohydrates can not be empty"]
        },
        fats: {
            type: Number,
            min: [0, 'you can not add a negative number'],
            required: [true, "fats can not be empty"]
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Post", postSchema);

