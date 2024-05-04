import 'express';

declare module 'express' {
export interface Request {
    user?: { [key: string]: any};
}

export interface UserDocument extends Document {
    generateAccessJWT(): string;
}
}