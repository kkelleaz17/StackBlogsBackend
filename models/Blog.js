const mongoose = require('mongoose');

const Blog = new mongoose.Schema({
    Public: { type: Boolean, default: false},
    Tags: { type: Array, default: [] },
    Name: { type: String, default: "Template" },
    Description: { type: String, default: ""},
    Content: { type: Array, default: [] },
    CreatedDate:{ type:Date,default:new Date()},
    PublishedDate:{ type:Date,default:new Date()},
    ThumbNail:{ type:String,default:''},
    Author:{type:String, default:''}
},{
    timestamps: true  // This option will add createdAt and updatedAt fields
});

module.exports = mongoose.model('Blog', Blog);
