const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    Name:{ type: String,default:'' },
    Profile: { type: String,default:'' },
    Description: { type: String,default:'' },
    Public: { type: Boolean, default: true },
},{
    timestamps: true  // This option will add createdAt and updatedAt fields
});

module.exports = mongoose.model('Users', UsersSchema);
