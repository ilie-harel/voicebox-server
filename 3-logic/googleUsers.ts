import { OkPacket } from "mysql2";
import { execute } from "../1-dal/dalSql";
import { GoogleUserModel } from "../4-model/usersModel";

export async function googleRegister(user: GoogleUserModel) {
    const { firstName, lastName, email, language } = user;
    const checkIfEmailExistsQuery = `SELECT * FROM users WHERE email = ?`
    const [checkIfEmailExistsResults] = await execute<OkPacket>(checkIfEmailExistsQuery, [email]);
    console.log(checkIfEmailExistsResults.length);

    if (checkIfEmailExistsResults.length > 0) {
        console.log(checkIfEmailExistsResults);
        const getUserResultsQuery = `SELECT id,language,voiceGender FROM users WHERE email = ?`
        const [userResults] = await execute<OkPacket>(getUserResultsQuery, [email]);

        return [false, userResults[0].id, userResults[0].language, userResults[0].voiceGender];
    }
    const query = 'INSERT INTO users(firstName,lastName,email,language) VALUES(?,?,?,?)'
    const results = await execute<OkPacket>(query, [firstName, lastName, email, language]);
    const id = results[0].insertId;
    return id;
}