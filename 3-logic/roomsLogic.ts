import { OkPacket } from "mysql2"
import { execute } from "../1-dal/dalSql"

export async function addRoom(userId:number){
    const query = 'INSERT INTO rooms(userId) VALUES(?)'
    const results = await execute<OkPacket>(query,[userId]);
    return results;
}

export async function getRoomsByUserId(userId:number){
    const query = 'SELECT * FROM rooms WHERE userId = ? ORDER BY id DESC'
    const [results] = await execute<OkPacket>(query,[userId]);
    return results;
}

export async function updateRoomNameByRoomId(name:string,roomId:number){
    const query = 'UPDATE rooms SET name = ? WHERE id = ?'
    const results = await execute<OkPacket>(query,[name,roomId]);
    return results;
}

export async function deleteRoomByRoomId(roomId:number){
    const query = 'DELETE FROM rooms WHERE id = ?'
    const results = await execute<OkPacket>(query,[roomId]);    
    return results;
}
