import * as dotenv from "dotenv";
dotenv.config();

const {URI, PORT, SECRECT_ACCESS_TOKEN} = process.env;
export {URI, PORT, SECRECT_ACCESS_TOKEN};