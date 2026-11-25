const {query}=require('../db');
async function audit(user,action,entity,id,metadata={}){try{await query('INSERT INTO audit_logs(actor_id,action,entity,entity_id,metadata) VALUES($1,$2,$3,$4,$5)',[user?.employeeId||null,action,entity,id,metadata]);}catch(e){console.error('audit write failed',e.message)}}
module.exports=audit;
