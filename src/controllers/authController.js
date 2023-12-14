import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { userValidationLogin, userValidationRegister } from "../validations/userValidation.js";

// REGISTER
export const createUser = async (req, res) => {
    try {
        const { 
            username, 
            email, 
            password, 
            full_name, 
            date_of_birth,
            profile_image,
            phone_number,
            education, 
        } = req.body;

        const { error, value } = userValidationRegister.validate(req.body);

        if (error) return res.status(400).json({error: error.details[0].message});

        // Hash Password
        const hashPassword = await bcrypt.hash(value.password, 10);

        const newUser = new User({...value, password: hashPassword});

        const data = await newUser.save();

        res.status(201).json({
            success: true,
            message: "Register user success",
        })
    } catch (error) {
        res.status(400).json({
            success: false, 
            message: "Register user fail"
        })
    }    
}

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const { error, value } = userValidationLogin.validate(req.body);

        if (error) return res.status(400).json({error: error.details[0].message})

        const user = await User.findOne({ username });

        if (!user) return res.status(401).json({message: "Wrong email and password"});

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) return res.status(401).json({message: "Wrong email and password"});

        res.status(200).json({
            message: "successful login", 
            data: user
        })
    } catch (error) {
       res.status(500).json({message: error.message});
    }
}