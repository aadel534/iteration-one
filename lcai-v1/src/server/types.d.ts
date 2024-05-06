import 'express';
// Enable Request and UserDocument to be recognised by specifiying their types
declare module 'express' {
export interface Request {
    user?: { [key: string]: any};
}

export interface UserDocument extends Document {
    generateAccessJWT(): string;
}
}