import express from 'express';
import { hashedPassword } from '../1-dal/hashedPssword';
import { generateToken, getDetailsFromToken } from '../1-dal/jwt';
import { changeUserLanguage, getAllUsers, register } from '../3-logic/userLogic';
import { UserModel } from '../4-model/usersModel';


export const UserRoute = express.Router();

UserRoute.post('/users/register', async (req, res) => {
    const user: UserModel = req.body;

    user.password = hashedPassword(user.password)
    try {
        const results = await register(user)
        if (results === 'Email already exists') {
            res.status(404).json(results);
            return;
        }
        user.voiceGender = "MALE";
        const token = await generateToken(user)
        res.status(200).json(token)

    } catch (e) {
        res.status(400).json(e)
    }
})

UserRoute.post('/users/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const users = await getAllUsers();
    try {
        const user: any = users.find((u: any) => u.email === email && u.password === hashedPassword(password));
        if (user) {
            const token = await generateToken(user)
            res.status(200).json(token);
        } else {
            res.status(401).json('Wrong email or password');
        }
    } catch (e) {
        res.status(400).json('Something went wrong...')
    }
})

UserRoute.put('/users/language', async (req, res) => {
    const lan = req.query.lan;
    const gender = req.query.gender
    try {
        const token = req.headers.authorization;
        const { sub, firstName, lastName, email } = await getDetailsFromToken(token);
        await changeUserLanguage(sub, String(lan), String(gender));
        const updatedUser: any = {
            id: sub,
            firstName: firstName,
            lastName: lastName,
            email: email,
            language: lan,
            voiceGender: gender
        }
        const newToken = await generateToken(updatedUser)        
        res.status(200).json(newToken);
    } catch (e) {
        res.status(401).json(e)
    }
})