import jwt from 'jsonwebtoken'
import UserModel from '../models/User.js'


const secret = "test";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const isCustomAuth = token.length < 500;
        let decodedData
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, secret)
            req.userId = decodedData?.id
        } else {
            decodedData = jwt.decode(token)
            const googleId = decodedData?.sub.toString()
            const user = await UserModel.findOne({ googleId })
            req.userId = user?._id
        }
        next()
    } catch (error) {
        res.status(404).json({ message: "Something Went Wrong!" })
        console.log(error);
    }
}

export default authMiddleware