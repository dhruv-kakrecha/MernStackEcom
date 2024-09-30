import mongoose from "mongoose";
export async function ConnectDatase() {
    try {
        const success = await mongoose.connect("mongodb://localhost:27017", {
            dbName: "skillup_backend",
        });
        if (success) {
            console.log(`DB connection to ${success.connection.host || "ATLAS"}`);
        }
    }
    catch (error) {
        console.log("Database Conntected Error", error);
    }
}
;
