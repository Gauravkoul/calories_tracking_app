const mongoose = require('mongoose');

const food_entry_schema = mongoose.Schema(
    {

        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        food_name: {
            type: String,
            required: true
        },
        calories: {
            type: Number,
            required: true
        },
        taken_at: {
            type: Date,
            default: new Date()
        }

    }
);


module.exports = mongoose.model('Food_entry', food_entry_schema);
