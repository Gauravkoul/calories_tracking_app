const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type AuthData {
  userId: ID
  username: String
  token: String!
}
type Message {
  message:String!
}
type Limit_reached {
  limit_reached:Boolean
  total_calories:String
  max_calories:String
}

type Food_entry{
  id:String
  food_name:String
  calories:Int
  taken_at:String
}
type Food_entries{
  id:String
  userid:String
  food_name:String
  calories:Int
  taken_at:String
}
type Report{
  last_seven_days_entries:Int
  before_seven_days_week_entries:Int
  avg_calories_seven_days:[Avg_calories]
}
type Avg_calories{
  _id:String
  avg_calories:Int
}

type RootQuery {
  admin_login(username: String!, password: String!): AuthData!
  get_food_entries:[Food_entries]
  get_report:Report
  delete_food_entry(food_entry_id:String!):Message

  user_login(username: String!, password: String!): AuthData!
  get_food_entry:[Food_entry]
  get_calories_limit:Limit_reached
  
}                             
type RootMutation {
  create_food_entry(userid:String!,food_name:String!,calories:Int!):Message
  update_food_entry(food_entry_id:String!, food_name:String, calories:Int ):Message

  add_food_entry(food_name:String!,calories:Int!):Message
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
