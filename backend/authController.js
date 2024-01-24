const { User } = require('./db');
const catchAsync = require('./catchAsync');
const jwt = require('jsonwebtoken');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    });
    next();
});


exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password){
        res.status(400).json({
            msg: "Please provide email and password"
        })
        return next();
    }

    const user = await User.findOne({ email }).select('+password');

    if(!user || !(await user.correctPassword(password, user.password))){
        res.status(401).json({
            msg: "Incorrect email or password"
        })
        return next();
    }



    token =signToken(user._id);
    return res.status(200).json({
        status: 'success',
        token
    });
});

