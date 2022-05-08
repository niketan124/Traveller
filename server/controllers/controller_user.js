import bycrypt from 'bcryptjs'
import Jwt from 'jsonwebtoken'

import User from '../models/User.js'

const secret = 'test';


export const signIn = async (req, res) => {
    const { email, password } = req.body
    try {
        const oldUser = await User.findOne({ email })
        if (!oldUser) {
            return res.status(404).json({ message: "User doesn't exist!" })
        }

        const isPasswordCorrect = await bycrypt.compare(password, oldUser.password)

        if (!isPasswordCorrect) {
            return res.status(404).json({ message: "Invalid Credentials!" });
        }

        const token = Jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: '1h' })
        res.status(200).json({ result: oldUser, token })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
        console.log(error);
    }
}

export const signUp = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    try {
        const oldUser = await User.findOne({ email })
        if (oldUser) {
            return res.status(400).json({ message: "User already exist" })
        }

        const hashPassword = await bycrypt.hash(password, 12);

        const result = await User.create({
            email,
            password: hashPassword,
            name: `${firstName} ${lastName}`
        })

        const token = Jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: '1h' })
        res.status(201).json({ result, token });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' })
        console.log(err);
    }
}

export const googleSignIn = async (req, res) => {
    const { email, name, token, googleId } = req.body;

    try {
        const oldUser = await User.findOne({ email })
        if (oldUser) {
            const result = { _id: oldUser._id.toString(), email, name }
            return res.status(200).json({ result, token })
        }
        const result = await User.create({
            email,
            name,
            googleId
        })
        res.status(200).json({ result, token })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
        console.log(error);
    }
}