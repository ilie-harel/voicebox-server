import express from 'express';
import { getDetailsFromToken } from '../1-dal/jwt';
import { translateToEn, translateToUserLanguage } from '../1-dal/translate';
import { addRoom, deleteRoomByRoomId, getRoomsByUserId, updateRoomNameByRoomId } from '../3-logic/roomsLogic';

export const RoomsRoute = express.Router();

RoomsRoute.get('/rooms', async (req, res) => {
    try {
        const token = req.headers.authorization;
        const { sub, language } = await getDetailsFromToken(token);
        const results: any = await getRoomsByUserId(sub);
        if (language === "en") {
            res.status(200).json(results);
            return;
        } else {
            const translatedRoomNames = await Promise.all(results.map(async (room: any) => {
                const translatedName = await translateToUserLanguage(room.name, language);
                return {
                    ...room,
                    name: translatedName
                };
            }));
            res.status(200).json(translatedRoomNames);
        }
    } catch (e) {
        res.status(401).json(e)
    }
})

RoomsRoute.post('/rooms/add', async (req, res) => {
    try {
        const token = req.headers.authorization;
        const { sub } = await getDetailsFromToken(token);
        const results = await addRoom(sub);
        res.status(200).json(results);
    } catch (e) {
        res.status(401).json(e)
    }
})

RoomsRoute.delete('/rooms/delete/:id', async (req, res) => {
    try {
        const roomId = req.params.id;
        const results = await deleteRoomByRoomId(+roomId);
        res.status(200).json(results);
    } catch (e) {
        res.status(401).json(e)
    }
})

RoomsRoute.post('/rooms/edit/:id', async (req, res) => {
    const roomId = req.params.id;
    const name = req.query.name;
    try {
        const translatedTextEnglish = await translateToEn(String(name));
        const results = await updateRoomNameByRoomId(String(translatedTextEnglish), +roomId);
        res.status(200).json(results);
    } catch (e) {
        res.status(401).json(e)
    }
})

