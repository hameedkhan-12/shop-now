import type{ Request, Response, NextFunction } from "express";
export function requireAdmin(req: Request,res:Response,next: NextFunction){
    const apiKey = req.headers["x-admin-key"];
    if(apiKey !== process.env.ADMIN_KEY){
        return res.status(401).json({
            success: false,
            error: "Unauthorized",
        })
    }
    next()
}