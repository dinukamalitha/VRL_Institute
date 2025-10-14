import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {ENV} from "../config/env";

const JWT_SECRET = ENV.JWT_SECRET;

// Create a new user
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();
        res.status(201).json({
            user,
            message: "User registered successfully"
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        // Generate JWT
        const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: "1h"});

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
};

// Get all users
export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};