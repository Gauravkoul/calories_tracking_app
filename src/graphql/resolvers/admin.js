const user_model = require('../../model/user.model');
const food_entry_model = require('../../model/food_entry.model');


module.exports = {
    create_food_entry: async ({ userid, food_name, calories }, req) => {
        try {
            if (!req.isAuth) throw new Error('Unauthenticated!');
            const is_admin = await user_model.findOne({ _id: req.userId, role: "ADMIN" })
            if (!is_admin) throw new Error('Access Denied!');
            await food_entry_model.create({ user: userid, food_name, calories })
            const message = "Food added Successfully"
            return { message }
        } catch (err) {
            throw err
        }
    },
    get_food_entries: async ({ }, req) => {
        try {
            if (!req.isAuth) throw new Error('Unauthenticated!');
            const is_admin = await user_model.findOne({ _id: req.userId, role: "ADMIN" })
            if (!is_admin) throw new Error('Access Denied!');
            let result = await food_entry_model.find()
            result = result.map((res) => {
                return {
                    id: res.id,
                    userid: res.user,
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
    get_report: async ({ }, req) => {
        try {
            if (!req.isAuth) throw new Error('Unauthenticated!');
            const is_admin = await user_model.findOne({ _id: req.userId, role: "ADMIN" })
            if (!is_admin) throw new Error('Access Denied!');
            let current_date = new Date()
            let previous_week = new Date()
            current_date.setDate(current_date.getDate() - 6);
            current_date = current_date.toISOString().split("T")

            previous_week.setDate(previous_week.getDate() - 13);
            previous_week = previous_week.toISOString().split("T")

            let food_entries_7 = await food_entry_model.find({ taken_at: { $gte: new Date(current_date[0] + "T00:00:00.000+0000") } }).count()
            let food_entries_week = await food_entry_model.find({
                taken_at: {
                    $gte: new Date(previous_week[0] + "T00:00:00.000+0000"),
                    $lt: new Date(current_date[0] + "T00:00:00.000+0000")
                }
            }).count()



            const avg_calories_seven_days = await food_entry_model.aggregate(
                [{
                    $match: {
                        taken_at: { $gte: new Date(current_date[0] + "T00:00:00.000+0000") }
                    }
                },
                {
                    $group:
                    {
                        _id: "$user",
                        avg_calories: { $avg: "$calories" }
                    }
                }])

            result = {
                last_seven_days_entries: food_entries_7,
                before_seven_days_week_entries: food_entries_week,
                avg_calories_seven_days

            }
            return result
        } catch (err) {
            throw err
        }


    },
    update_food_entry: async ({ food_entry_id, food_name, calories }, req) => {
        try {
            if (!req.isAuth) throw new Error('Unauthenticated!');
            const is_admin = await user_model.findOne({ _id: req.userId, role: "ADMIN" })
            if (!is_admin) throw new Error('Access Denied!');
            let query = {}

            if (food_name) query.food_name = food_name
            if (calories) query.calories = calories

            await food_entry_model.findOneAndUpdate({ _id: food_entry_id }, query)
            const message = "Food_entry Updated Successfully"
            return { message }

        } catch (err) {
            throw err
        }


    },
    delete_food_entry: async ({ food_entry_id }, req) => {
        try {
            if (!req.isAuth) throw new Error('Unauthenticated!');
            const is_admin = await user_model.findOne({ _id: req.userId, role: "ADMIN" })
            if (!is_admin) throw new Error('Access Denied!');
            await food_entry_model.findByIdAndDelete(food_entry_id)
            const message = "Food_entry Deleted Successfully"
            return { message }

        } catch (err) {
            throw err
        }


    }













}