// import pkg from 'pg';
// const { Pool } = pkg;
// import dotenv from "dotenv";
// dotenv.config();

// const pool = new Pool({
//   // user: process.env.DB_USER,
//   // host: process.env.DB_HOST,
//   // database: process.env.DB_NAME,
//   // password: process.env.DB_PASSWORD,
//   // port: process.env.DB_PORT,
//   user: 'FARMSEASY',
//   host: 'farmseasy.cp0q8uuqk8by.ap-south-1.rds.amazonaws.com',
//   database: 'postgres',
//   password: '9096465405', 
//   port: 5432,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// if(Pool){
//   console.log("DataBase Connected Successfully");
// }else{
//   console.log("DataBase Connection Failed");
// }
// export default pool;
import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER || 'FARMSEASY',
  host: process.env.DB_HOST || 'farmseasy.cp0q8uuqk8by.ap-south-1.rds.amazonaws.com',
  database: process.env.DB_NAME || 'postgres',
  password: process.env.DB_PASSWORD || '9096465405',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on('connect', () => {
  console.log('Postgres connected');
});

pool.on('error', (err) => {
  console.error('Unexpected PG error', err);
});

export default pool;
