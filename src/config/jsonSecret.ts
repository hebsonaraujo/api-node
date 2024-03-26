import "dotenv/config.js";
const jsonSecret = {
    secret: process.env.JWT_SECRET || '',
}
export default jsonSecret;