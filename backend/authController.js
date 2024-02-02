const { User } = require('./db');
const jwt = require('jsonwebtoken');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    // return jwt.sign({ id }, process.env.JWT_SECRET);
}
exports.signup = async (req, res, next) => {
    try{
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        });
    
        const token = signToken(newUser._id);
        
        
        //cookie logic
        // res.cookie('jwt', token, { 
        //     expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        //     // secure: true,
        //     httpOnly: true
        // });     
        
        
        // Remove password from output
        newUser.password = undefined;
        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: newUser
            }
        });
    }catch(err){
        console.log(err.message);
        res.status(400).json({
            msg: err.message.split(":")[2]
        })
    }
    next();
};

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    try{
        if(!username || !password){
            res.status(400).json({
                msg: "Please provide username and password"
            })
            return;
        }
    
        const user = await User.findOne({ username }).select('+password');
    
        if(!user || !(await user.correctPassword(password, user.password))){
            res.status(401).json({
                msg: "Incorrect email or password"
            })
            return;
        }
        token = signToken(user._id);
        
        
        //cookie logic
        // const cookieOptions = {
            
        //     expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        //     // secure: true,
        //     httpOnly: true
            
        // }
        
        // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
        // res.cookie('jwt', token, cookieOptions); 
        
        // Remove password from output
        user.password = undefined;
        return res.status(200).json({
            status: 'success',
            token
        });
    }catch(err){
        res.status(500).json({
            msg: "Something went wrong with server"
        })
    }
    next();
};

exports.protect = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        res.status(401).json({
            msg: "You are not logged in"
        })
        return;
    }
    let decoded;
    try{
        decoded = await jwt.verify(token, process.env.JWT_SECRET);
    }catch(err){
        res.status(401).json({
            msg: "Invalid token"
        })
        return; 
    }

    const freshUser = await User.findById(decoded.id);
    if(!freshUser){
        res.status(401).json({
            msg: "The user belonging to this token does not exist"
        })
        return;
    }

    // if(!freshUser.changedPasswordAfter(decoded.iat)){
    //     res.status(401).json({
    //         msg: "User recently changed password. Please login again"
    //     })
    //     return;
    // }

    req.user = freshUser;
    next();
};