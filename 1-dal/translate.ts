import * as dotenv from 'dotenv';

dotenv.config({ path: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.prod' })

const googleTranslate = require('google-translate')(process.env.GOOGLE_TRANSLATE_KEY);

export function translateToEn(message: string): Promise<string> {
    return new Promise((resolve, reject) => {
        googleTranslate.translate(message, 'en', (err: any, translation: any) => {
            if (err) {
                reject(err);
                console.log(err);
            } else {
                resolve(translation.translatedText);
            }
        });
    });
}


export function translateToUserLanguage(message: string, language: string): Promise<string> {
    return new Promise((resolve, reject) => {
        googleTranslate.translate(message, language, (err: any, translation: any) => {
            if (err) {
                reject(err);
                console.log(err);

            } else {
                resolve(translation.translatedText);
            }
        });
    });
}
