import dotenv from 'dotenv'

dotenv.config();

const DB_USERNAME = process.env.USERNAME || '';
const DB_PASSWORD = process.env.PASSWORD || '';

const MONGO_URL=`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@wallet.gfuxkg3.mongodb.net`;

const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 1337;


export const config = {
    mongo: {
        url: MONGO_URL,
    },
    server: {
        port: SERVER_PORT,
    }
}
