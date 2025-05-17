import { neon } from "@neondatabase/serverless";
const key=process.env.DATABASE_URL;
export async function getDbConnection() {
    const sql = await neon(`${key}`);
    // const data = await sql`...`;
    return sql;
}