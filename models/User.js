const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "username can not be empty"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "password can not be empty"],
        },
        firstname: {
            type: String,
            required: [true, "first name can not be empty"],
        },
        lastname: {
            type: String,
            required: [true, "last name can not be empty"],
        },
        age: {
            type: Number,
            min: [0, 'you can not add a negative number'],
            required: [true, "age can not be empty"],
        },
        height: {
            type: String,
            required: [true, "height can not be empty"],
        },
        weight: {
            type: Number,
            min: [0, 'you can not add a negative number'],
            required: [true, "weight can not be empty"]
        },
        gender: {
            type: String,
            required: [true, "gender can not be empty"]
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            //ret is the returned Mongoose document
            transform: (_doc, ret) => {
              delete ret.password;
              return ret;
            },
          },
    }
);

module.exports = mongoose.model("User", userSchema);

