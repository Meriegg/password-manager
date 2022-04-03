import mongoose from "mongoose";

const connection = { connectionState: 0 };

export default async () => {
  if (connection.connectionState === 1) return;

  const DB_URI = process.env.DB_URI;

  if (DB_URI === undefined) return "Db Uri not found!";

  const db = await mongoose.connect(DB_URI, {
    autoCreate: true,
    autoIndex: true,
  });

  connection.connectionState = db.connections[0].readyState;
};
