export enum role {
    'AI', 'USER'
}

export interface MessageModel {
    id: number,
    message: string,
    role: role,
    timestamp:string
}