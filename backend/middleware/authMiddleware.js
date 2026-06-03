const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async(req,res, next) => {
    let token;

/* checking if token exist */

if(
    req.headers.authorization && req.headers.authorization.startsWith("Bearer")
){
    try{
         /* GET token from header */
         token = req.headers.authorization.split(" ")[1];

        /*  next is to verify token */

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("Decoded", decoded)

        //Get user from database without their password

        req.user = await User.findById(decoded.id).select("-password");

        console.log("USer:", req.user);
        next();
    } catch (error) {
        res.status(401).json({
            message: "Not authorized, token failed",
        });
    }
}

if (!token) {
    return res.status(401).json({
        message: "Not authorized, no token",
    });
}
};

module.exports = {protect}