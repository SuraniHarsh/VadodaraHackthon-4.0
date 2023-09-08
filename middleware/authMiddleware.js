const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateTocken = asyncHandler(async(req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            }else{
                req.user = decoded.user;
                next();
            }
        });
    }    
});

module.exports = validateTocken;