const dotenv = require("dotenv");
const connectDB = require("../config/db");
const Table = require("../models/Table");

dotenv.config();

connectDB();

const seedTables = async () => {
  try {
    await Table.deleteMany();

    await Table.insertMany([
      { tableNumber: 1, capacity: 2 },
      { tableNumber: 2, capacity: 2 },
      { tableNumber: 3, capacity: 4 },
      { tableNumber: 4, capacity: 4 },
      { tableNumber: 5, capacity: 6 }
    ]);

    console.log("✅ Tables seeded successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedTables();