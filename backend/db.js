const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//all schema are defined here
const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
    user: String
})  

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: [4, "Username must be atleast 4 characters long"],
        required: [true, "Please provide us your name"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide us your password"],
        minlength: [8, "Password must be atleast 8 characters long"],
        select: false

    },
    passwordConfirm: {  
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function(el){
                return el === this.password;
            },
            message: "Passwords are not same"
        }
    },
});

userSchema.pre('save', async function(next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();
  
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
  
    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

// userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
//     if (this.passwordChangedAt) {
//         const changedTimestamp = parseInt(
//             this.passwordChangedAt.getTime() / 1000,
//             10
//         );
  
//         return JWTTimestamp < changedTimestamp;
//     }
  
//     // False means NOT changed
//     return false;
// };



//all models are defined here
const Todo = mongoose.model('Todos', todoSchema);

const User = mongoose.model('User', userSchema);

module.exports = {
    Todo: Todo,
    User: User
}