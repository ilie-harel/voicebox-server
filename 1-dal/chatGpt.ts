import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv'

dotenv.config({ path: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.prod' })

const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_API_KEY,
});


export const openai = new OpenAIApi(configuration);