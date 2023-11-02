const mongoose = require('mongoose');

const Views = new mongoose.Schema({
    PostId:{type:String,require:true}
},{
    timestamps: true  // This option will add createdAt and updatedAt fields
});

module.exports = mongoose.model('Views', Views);
