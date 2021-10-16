import bcrypt from 'bcrypt';

import { User } from '../schemas/User.js';
import {generateAuthToken} from "../helpers/auth.js";

const saltRounds = 5;


export class UserController {

    static async signup(req, res) {
        const { email, password } = req.body;

        if(!email || !password){
            res.status(400).send("Email and password are required");
            return;
        }

        const existingUser = await User.findOne({ email });

        if(existingUser) {
            res.status(409).send("User already exists.");
            return;
        }

        const passHash = await bcrypt.hash(password, saltRounds);
        const new_user = new User({
            email: email,
            password: passHash
        });

        const created_user = await new_user.save();

        const token = generateAuthToken(created_user._id);

        res.status(200).json({
            authToken: token,
        });
    }


    static async signin(req, res) {
        const { email, password } = req.body;

        if(!email || !password){
            res.status(400).send("Email and password are required");
            return;
        }

        const user = await User.findOne({
            email,
        });

        if(!user){
            res.status(401).send("Wrong credentials.");
            return;
        }

        const passMatch = await bcrypt.compare(password, user.password);

        if(!passMatch){
            res.status(401).send("Wrong credentials.");
            return;
        }

        const token = generateAuthToken(user._id);

        res.status(200).json({
            authToken: token,
        });

    }
}