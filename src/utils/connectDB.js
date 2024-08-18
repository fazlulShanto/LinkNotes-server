import { mongoose } from "../exports.js";


export const getDbConnectionInfo = ()=>{
    const dbUserName = process.env.DB_USERNAME;
    const dbPassword = process.env.DB_PASSWORD;
    const dbHost = process.env.DB_HOST;
    const dbName = process.env.DB_NAME;
    const localUrl = `mongodb://localhost:27017/${dbName}`;
    const connectionUrl = `mongodb+srv://${dbUserName}:${dbPassword}@${dbHost}/?retryWrites=true&w=majority&appName=${dbName}`;
    const finalUrl = process.env.NODE_ENV === "production" ? connectionUrl : localUrl;

    return {dbName, connectionUrl : finalUrl};
}

export default async function connectToMongoDB() {

    const {dbName,connectionUrl} = getDbConnectionInfo();
    
    try {
        const res = await mongoose.connect(connectionUrl,{
            dbName:dbName
        });
        console.log(`✅ Connected to MongoDB Database ➡️  "${res.connection.name}"`); 
    } catch (error) {
        console.log(err)
    }
}