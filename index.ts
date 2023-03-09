import express from 'express';
import { ChatGptRoute } from './5-controllers/chatGptRoute';
import cors from 'cors'
import { MessagesRoute } from './5-controllers/MessagesRoute';
import * as dotenv from 'dotenv'
import { UserRoute } from './5-controllers/usersRoute';
import { RoomsRoute } from './5-controllers/roomsRoute';
import { GoogleUsersRoute } from './5-controllers/googleUsers';

dotenv.config({ path: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.prod' });

console.log(process.env.NODE_ENV);

const app = express();

app.use(express.json());
app.use(cors());

app.use(ChatGptRoute);
app.use(MessagesRoute);
app.use(UserRoute);
app.use(RoomsRoute);
app.use(GoogleUsersRoute);

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
})