import { faker } from "@faker-js/faker";
import { pool } from "./db";

async function seed() {
    try {
        console.log("Cleaning database...");
        await pool.query("DELETE FROM appointments");
        await pool.query("DELETE FROM clients");

        const clients = [];
        console.log("Seeding clients...");

        for (let i = 0; i < 25; i++) {
            const totalSessions = faker.number.int({ min: 5, max: 20 });
            const usedSessions = faker.number.int({ min: 0, max: totalSessions });

            clients.push([
                faker.person.fullName(),
                faker.internet.email(),
                "+569" + faker.number.int({ min: 10000000, max: 99999999 }),
                `Plan ${totalSessions} sesiones`,
                totalSessions,
                usedSessions,
            ]);
        }

        const [result] = await pool.query(
            `INSERT INTO clients 
            (name, email, phone, planName, totalSessions, usedSessions) 
            VALUES ?`,
            [clients]
        );

        console.log(`Inserted ${ (result as any).affectedRows } clients.`);
        console.log("Seeding completed.");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally { 
        pool.end();
    }
}

seed();
