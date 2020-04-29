import { NextFunction,Request, Response } from 'express';
export type Pipe = (req: Partial<Request>,res: Partial<Response>,next: NextFunction)=>void|Promise<void>;