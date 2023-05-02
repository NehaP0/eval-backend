const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    "title": {type:String, required: true},
    "body": {type:String, required: true},
    "device" : {type:String, required: true},
    "user" : {type:String, required: true}
})


const PostModel = mongoose.model("post", postSchema)


module.exports = PostModel


// {"title":"my picture",
// "body": "my picture",
// "device" : "iphone"}