import { createPool } from "mysql2/promise";

export const mysql=createPool(
    {
        host: "localhost",
        user: "root",
        password: "adso2024",
        port:3306,
        database: "tienda_mascotas_fjbs",
    }
)