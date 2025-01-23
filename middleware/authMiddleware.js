const express=require("express")
const jwt = require('jsonwebtoken');

  const authenticate=(req,res,next)=>{
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if(!token){
        res.status(404).json({message:"unauthorized access"})
    }


    try{

        const decoded=jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        req.userId = decoded.id
        next();
      } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
      }
      

  }
  const adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    next();
  };

  module.exports={authenticate, adminOnly}