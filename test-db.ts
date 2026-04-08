import { prisma } from "./src/lib/prisma";

async function test() {
    try {
        console.log("Checking DB connection...");
        const count = await prisma.user.count();
        console.log("DB Connection Success! User count:", count);
    } catch (error: any) {
        console.error("DB Connection Failed!");
        console.error("Error Message:", error.message);
        console.error("DATABASE_URL present?", !!process.env.DATABASE_URL);
    }
}

test();
