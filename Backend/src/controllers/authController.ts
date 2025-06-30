import { Request,Response } from "express";



export const Register=async (req:Request,res:Response)=>{
    try {
        const {name,email,mobile,password}=req.body
        console.log(name,email,mobile,password)
    } catch (error) {
        
    }
}