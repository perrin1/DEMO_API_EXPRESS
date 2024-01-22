const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please give user name"],
       
       
    },
    email:{
        type:String,
        required:[true," pleas give email"],
        unique:[true,"this mail is been taken"],
    },
 
    password:{
        type:String,
        required:[true,"passwor is required"],
    },
}, {
    timestamps:true
});

//Export the model
module.exports = mongoose.model('Users', userSchema);