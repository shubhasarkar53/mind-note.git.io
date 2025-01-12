import { NextFunction, Request, Response } from "express";

type asyncFuncType = (req:Request,res:Response,next:NextFunction)=> Promise<void>

export function catchAsyncErrors (passedFunc: asyncFuncType ){
    return function(req:Request,res:Response,next:NextFunction){
        Promise.resolve(passedFunc(req,res,next)).catch(next);
    }
}