export class AppError extends Error{

    constructor(public statusCode:number,message?:string){
        super(message);
        Error.captureStackTrace(this,AppError);
    }
}