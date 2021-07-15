// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const PORT = Number(process.env.PORT);

export const MONGOOSE_CONNECTION_STRING = String(process.env.MONGOOSE_CONNECTION_STRING);


export const CORS_WHITE_LIST = [
    'localhost'
]

export enum ROLES {
    ADMIN = 'ADMIN',
    USER = 'USER',
    SUPPORT = 'SUPPORT',
}