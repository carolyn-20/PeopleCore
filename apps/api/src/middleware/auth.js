const jwt=require('jsonwebtoken');
const secret=process.env.JWT_SECRET||'local_only_change_this_secret';
function auth(req,res,next){const h=req.headers.authorization||'';if(!h.startsWith('Bearer '))return res.status(401).json({error:'Authentication required'});try{req.user=jwt.verify(h.slice(7),secret);next();}catch{return res.status(401).json({error:'Invalid or expired token'});}}
function roles(...allowed){return (req,res,next)=>allowed.includes(req.user?.role)?next():res.status(403).json({error:'Insufficient permissions'});}
module.exports={auth,roles,secret};
