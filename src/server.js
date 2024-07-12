import {connectToMongoDB,dotenv,genericUtils} from './exports.js'
import { fileURLToPath } from "url";
import path from "path";
import createExpressApp from './expressApp.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.env.__dirname = __dirname;
dotenv.config();

const startServer = async () => {
    console.clear();
    genericUtils.envValidator(process.env);
    const app = createExpressApp();
    await connectToMongoDB();
    app.listen(process.env.PORT, () => {
        console.log(`✅ Last Updated: ${new Date().toLocaleString()}`);
        console.log(`Server is running on port ${process.env.PORT}`);
    });
};

startServer();

