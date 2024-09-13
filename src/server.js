import { connectToMongoDB, dotenv, genericUtils, express } from "./exports.js";
import { fileURLToPath } from "url";
import path from "path";
import createExpressApp from "./expressApp.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.env.__dirname = __dirname;
dotenv.config();

const staticDir = path.join(__dirname, "..", "dist");
const htmlEntryFile = path.join(__dirname, "..", "dist", "index.html");

const startServer = async () => {
    console.clear();
    genericUtils.envValidator(process.env);
    const app = createExpressApp();

    app.use(express.static(staticDir));
    app.get("*", (req, res) => {
        res.sendFile(htmlEntryFile);
    });

    await connectToMongoDB();
    app.listen(process.env.PORT, () => {
        console.log(`✅ Last Updated: ${new Date().toLocaleString()}`);
        console.log(`Server is running on port ${process.env.PORT}`);
    });
};

startServer();
