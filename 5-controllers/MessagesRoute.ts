import express from 'express'
import { getDetailsFromToken } from '../1-dal/jwt';
import { translateToUserLanguage } from '../1-dal/translate';
import { getMessagesByRoomAndUserId } from '../3-logic/messagesLogic';

export const MessagesRoute = express.Router();



MessagesRoute.get('/message/room/:id', async (req, res) => {
    const roomId = req.params.id
    try {
        const token = req.headers.authorization;
        const { sub, language } = await getDetailsFromToken(token)
        const results = await getMessagesByRoomAndUserId(+roomId, sub);
        if (results.length === 0) {
            res.status(401).json([])
            return;
        } else {
            const messages = results.map((message: any) => message.message);
            const translatedMessages = await Promise.all(messages.map((message: string) => translateToUserLanguage(message, language)));
            for (let i = 0; i < results.length; i++) {
                results[i].message = translatedMessages[i];
            }
            res.status(200).json(results)
        }
    } catch (e) {
        res.status(404).json(e);
    }
})



// MessagesRoute.get('/message', async (req, res) => {
//     try {
//         const token = req.headers.authorization;
//         const { sub, language } = await getDetailsFromToken(token)
//         const results = await getMessagesByUser(sub);
//         const translatedText = await translateToUserLanguage(results[0].message, language);
//         results[0].message = translatedText
//         res.status(200).json(results)
//     } catch (e) {
//         res.status(404).json(e);
//     }
// })

