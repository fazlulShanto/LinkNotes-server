import { mongoose } from "../exports.js";


export default async function connectToMongoDB() {
    const dbUserName = process.env.DB_USERNAME;
    const dbPassword = process.env.DB_PASSWORD;
    const dbHost = process.env.DB_HOST;
    const dbName = process.env.DB_NAME;
    const connectionUrl = `mongodb+srv://${dbUserName}:${dbPassword}@${dbHost}/?retryWrites=true&w=majority&appName=${dbName}`;
    try {
        const res = await mongoose.connect(connectionUrl,{
            dbName:dbName
        });

        console.log(`✅ Connected to MongoDB at =>"${res.connection.name}"`); 
    } catch (error) {
        console.log(err)
    }
}