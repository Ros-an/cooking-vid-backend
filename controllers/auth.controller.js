const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const User = require("../models/user.model");

exports.signUp = async (req, res) => {
  try{
    const userExist = await User.findOne({email: req.body.email});
    if(userExist){
      // 403: forbidden(mean you don't have authority)
      return res.status(403).json({
        success: false,
        message: "Email is taken!"
      });
    }
    const user = req.body;
    const newUser = await new User(user);
    const savedUser = await newUser.save();
    res.status(201).json({
      success: true,
      message: "Registration Successful !"
    });
  }catch(err){
    res.status(500).json({
      success: false,
      message: "could not save you data, for more detail see error message",
      errorMessage: err.message,
    });
  }
}

exports.signIn =async (req, res) => {
  // find user using email
  try {
    const {email, password} = req.body;
    const user = await  User.findOne({email});

    // if error/no user - do something else
    if(!user) {
      return res.status(403).json({
        success: false,
        message: `User with ${email} does not exist. Please SignUp first!`,
      })
    }

    // if user found  - authenticate(incase password don't match)
    if(!user.authenticate(password)){
      // 401 - unauthorised error(don't have required credentials)
      return res.status(401).json({
        success: false,
        message: "password do not match."
      })
    }

    //correct email and password - generate token using secret and userId 
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, { expiresIn: '24h' });

    // return response with user and token to FE
    return res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email
      }
    });
  }catch(err){
    res.status(401).json({
      success: false,
      message: `something went wrong, see error message for more details`,
      errorMessage: err.message,
    });
  }
}
exports.signOut = async(req, res) => {
  res.json({
    success: true,
    message: "You have successfully signed out!"
  })
}
exports.requireSignIn = expressJwt({
  // if incoming token in request is valid, this express-jwt appends verified userId in an "auth" key to the req object
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  // creating a prop userproperty, with this we can access auth id to check currently signedIn userId
  userProperty: "auth",
});
