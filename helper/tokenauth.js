const jwt = require("jsonwebtoken");

const generateToken = async (user) => {
    const token = jwt.sign({ user }, process.env.SECRET_KEY)
    return token;
}
const VerifyToken = async (req,res,next) => {
    const token = req.cookies.token;
    if (!token) {
        return null;
    }
    try {
        const data = jwt.verify(token, process.env.SECRET_KEY)
        req.user = data;
        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(403);
    }
}
module.exports = { generateToken,VerifyToken }