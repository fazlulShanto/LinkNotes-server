import { mongoose } from "../exports.js";


export default async function connectToMongoDB() {
    const dbUserName = process.env.DB_USERNAME;
    const dbPassword = process.env.DB_PASSWORD;
    const dbHost = process.env.DB_HOST;
    const dbName = process.env.DB_NAME;
    const localUrl = `mongodb://localhost:27017/${dbName}`;
    const connectionUrl = `mongodb+srv://${dbUserName}:${dbPassword}@${dbHost}/?retryWrites=true&w=majority&appName=${dbName}`;
    const finalUrl = process.env.NODE_ENV === "production" ? connectionUrl : localUrl;
    try {
        const res = await mongoose.connect(finalUrl,{
            dbName:dbName
        });

        console.log(`✅ Connected to MongoDB at =>"${res.connection.name}"`); 
    } catch (error) {
        console.log(err)
    }
}