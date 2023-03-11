import express from 'express';
import { generateToken } from '../1-dal/jwt';
import { googleRegister } from '../3-logic/googleUsers';

export const GoogleUsersRoute = express.Router();

GoogleUsersRoute.post('/google/auth', async (req, res) => {
    const user = req.body;
    const notComputer = req.query.notComputer
    try {
        const results = await googleRegister(user)
        if (results[0] === false) {
            if (notComputer === 'true') {
                user.id = results[1]
                user.language = 'en'
                user.voiceGender = results[3]
                const token = await generateToken(user)
                res.status(200).json(token);
                return;
            } else {
                user.id = results[1]
                user.language = results[2]
                user.voiceGender = results[3]
                const token = await generateToken(user)
                res.status(200).json(token);
            }
            return;
        }
        user.id = results
        user.voiceGender = "MALE";
        const token = await generateToken(user)
        res.status(200).json(token)

    } catch (e) {
        res.status(400).json(e)
    }
})