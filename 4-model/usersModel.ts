
export interface UserModel {
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    language: string,
    voiceGender:string
}

export interface GoogleUserModel {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    language: string
}