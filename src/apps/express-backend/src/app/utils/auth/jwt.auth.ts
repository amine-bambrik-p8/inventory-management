import { User } from '../../resources/user/model/user.model';
import { Request, Response, NextFunction } from 'express';
 export class JwtAuth{
     async signIn(req:Partial<Request>,res: Partial<Response>,next?: NextFunction){
         try {
            const {username,password} = req.body.data;
            const error = {
                message:"Invalid username or password",
            };
            if(!username || !password){
                res.status(400);
                res.json({
                    error
                });
                return;
            }
            const user = await User.findOne({username}).select("_id role password").exec();
            if(!user){
                res.status(401);
                res.json({
                    error
                });
                return;
            }
            const doesMatch =await (user as any).isValidPassword(password);
            if(!doesMatch){
                res.status(401);
                res.json({
                    error
                });
                return;
            }
            const token = (user as any).jwtToken;
            res.status(201);
            res.json({
                data:{
                    token
                }
            });
        } catch (error) {
            next(error);
        }
     }
     async authenticate(req:Partial<Request> | any,res: Partial<Response>,next?: NextFunction){
         const bearer: string = (req.headers.authorization as string);
         if(!bearer || !bearer.startsWith("Bearer ")){
             res.status(401);
             res.json({
                 error:{
                     message: "401 - Unauthenticated"
                 },
             });
             return; 
         }
         const token = bearer.split("Bearer ").pop().trim();
         let payload;
         try {
             payload = await (User as any).isValidToken(token);
         } catch (error) {
             return next(error);
         }
         const user = await User.findById(payload._id).select("-password").lean().exec();
         req.user = user;
         next();
     }
 }