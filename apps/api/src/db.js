const {Pool}=require('pg');
const pool=new Pool({connectionString:process.env.DATABASE_URL||'postgres://peoplecore:change_me_local@localhost:5432/peoplecore'});
module.exports={pool,query:(text,params)=>pool.query(text,params),transaction:async fn=>{const c=await pool.connect();try{await c.query('BEGIN');const out=await fn(c);await c.query('COMMIT');return out;}catch(e){await c.query('ROLLBACK');throw e;}finally{c.release();}}};
