import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const URI=process.env.MONGO_URI;//'mongodb://127.0.0.1/usuarios_db';

//const URI='mongodb://3.144.242.47';
//const URI='mongodb+srv://grupo1:Noseradehacerpronto951@patrones-api.ftf3k20.mongodb.net/?appName=patrones-api';
//const URI='mongodb+srv://andrespilca3_db_user:Ds16jw7bH8KbcPhA@patrones-api.ftf3k20.mongodb.net/?appName=patrones-api';
//const URI='mongodb+srv://andrespilca3_db_user:Ds16jw7bH8KbcPhA@patrones-api.ftf3k20.mongodb.net/servientrega?retryWrites=true&w=majority';
export const connectDB = async () => {
  try {
    if (!URI) {
      throw new Error('MONGO_URI no está definido en el entorno');
    }
    await mongoose.connect(URI);
    console.log("✅ MongoDB conectado");
  } catch (err) {
    console.error("❌ Error conectando a MongoDB:", err.message);
    process.exit(1);
  }
};
