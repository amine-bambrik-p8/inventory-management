export class AppError extends Error{
    public status: string;
    public isOperational: boolean = false;
    constructor(public statusCode:number,message?:string){
        super(message);
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this,AppError);
    }
}