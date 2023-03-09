import { OkPacket } from "mysql2"
import { execute } from "../1-dal/dalSql"
import { UserModel } from "../4-model/usersModel"

export async function saveUserMessages(message: string, id: string, roomId: number) {
    const timeStamp = new Date().getTime()
    const query = 'INSERT INTO messages(message,role,timestamp,userId,roomId) VALUES(?,?,?,?,?)'
    await execute<OkPacket>(query, [message, 1, timeStamp, id, roomId]);
}

export async function getMessagesByRoomAndUserId(roomId: number, userId: number): Promise<any> {    
    const query = `SELECT * FROM ai.messages WHERE roomId = ? AND userId = ? ORDER BY timestamp ASC`;
    const [results]: any = await execute<OkPacket>(query, [roomId, userId]);
    return results;
}