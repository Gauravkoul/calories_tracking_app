const mongoose = require('mongoose');
const user_model = require('../../model/user.model');
const food_entry_model = require('../../model/food_entry.model');


module.exports = {

    add_food_entry: async ({ food_name, calories }, req) => {
        try {
            if (!req.isAuth) throw new Error('Unauthenticated!');
            await food_entry_model.create({ user: req.userId, food_name, calories })
            const message = "Food added Successfully"
            return { message }
        } catch (err) {
            throw err
        }
    },

    get_food_entry: async ({ }, req) => {
        try {
            if (!req.isAuth) throw new Error('Unauthenticated!');
            let result = await food_entry_model.find({ user: req.userId })
            result = result.map((res) => {
                return {
                    id: res.id,
                    food_name: res.food_name,
                    calories: res.calories,
                    taken_at: res.taken_at.toLocaleString(),

                }
            })
            return result
        } catch (err) {
            throw err
        }


    },

    get_calories_limit: async ({ }, req) => {
        try {
            if (!req.isAuth) throw new Error('Unauthenticated!');
            let limit_reached = false
            let current_date = new Date()
            current_date = current_date.toISOString().split("T")
            const res = await food_entry_model.aggregate([{
                $match: {
                    user: mongoose.Types.ObjectId(req.userId),
                    taken_at: { $gte: new Date(current_date[0] + "T00:00:00.000+0000") }
                }
            }, {
                $group:
                    { _id: null, sum: { $sum: "$calories" } }
            }])
            const { max_calories } = await user_model.findById(req.userId)
            if (res[0].sum > max_calories) limit_reached = true
            return {
                limit_reached,
                total_calories: res[0].sum, max_calories
            }
        } catch (err) {
            throw err
        }


    },

}