const router=require('express').Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const {query,transaction}=require('../db');
const {secret}=require('../middleware/auth');
router.post('/register',async(req,res)=>{
 try{
  const {name,email,password}=req.body||{};
  if(!name||!email||!password)return res.status(400).json({error:'Name, email and password are required'});
  if(!/^\S+@\S+\.\S+$/.test(email))return res.status(400).json({error:'Enter a valid email address'});
  if(String(password).length<8)return res.status(400).json({error:'Password must be at least 8 characters'});
  const [first,...rest]=String(name).trim().split(/\s+/);const last=rest.join(' ')||'User';
  const password_hash=await bcrypt.hash(String(password),10);
  const created=await transaction(async c=>{
   const code='USR-'+Date.now().toString(36).toUpperCase();
   const employee=(await c.query('INSERT INTO employees(employee_code,first_name,last_name,email,title,role,status,hire_date,location) VALUES($1,$2,$3,$4,$5,$6,$7,CURRENT_DATE,$8) RETURNING id,first_name,last_name,email,role',[code,first,email,last,'Workspace Member','admin','active','Remote'])).rows[0];
   const count=(await c.query('SELECT count(*)::int n FROM users')).rows[0].n;const assignedRole=count===0?'admin':'employee';const user=(await c.query('INSERT INTO users(employee_id,email,password_hash,role) VALUES($1,$2,$3,$4) RETURNING id,email,role,employee_id',[employee.id,email,password_hash,assignedRole])).rows[0];employee.role=assignedRole;
   return {employee,user};
  });
  const payload={userId:created.user.id,employeeId:created.employee.id,role:created.user.role,email:created.user.email,name:[created.employee.first_name,created.employee.last_name].join(' ')};
  res.status(201).json({token:jwt.sign(payload,secret,{expiresIn:'8h'}),user:payload});
 }catch(e){if(e.code==='23505')return res.status(409).json({error:'An account with this email already exists. Please sign in.'});console.error('register error',e.message);res.status(500).json({error:'Account creation failed. Please retry.'});}
});
router.post('/login',async(req,res)=>{try{const {email,password}=req.body||{};if(!email||!password)return res.status(400).json({error:'Email and password are required'});const u=(await query('SELECT u.*,e.first_name,e.last_name,e.employee_code FROM users u LEFT JOIN employees e ON e.id=u.employee_id WHERE lower(u.email)=lower($1) AND u.active=true',[email])).rows[0];if(!u||!await bcrypt.compare(password,u.password_hash))return res.status(401).json({error:'Invalid credentials'});const payload={userId:u.id,employeeId:u.employee_id,role:u.role,email:u.email,name:[u.first_name,u.last_name].filter(Boolean).join(' ')};res.json({token:jwt.sign(payload,secret,{expiresIn:'8h'}),user:payload});}catch(e){res.status(500).json({error:'Login failed'});}});
router.get('/me',require('../middleware/auth').auth,(req,res)=>res.json({user:req.user}));module.exports=router;
