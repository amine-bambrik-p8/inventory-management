import { AppError } from '../errors/app-error';
import { environment } from '../../../environments/environment';
import * as fs from "fs";
import * as multer from "multer";
import * as path from "path";
export function setup(){
    const disk = multer.diskStorage({
        filename(req,file,cb){
            cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname));
        },
        destination(req, file, cb) {
            cb(null, environment.filestorage.dest)
        },
        
    })
    const upload = multer({
        storage: disk,
        fileFilter(req,file,cb){
            const ext = path.extname(file.originalname);
            if(!environment.filestorage.ext.includes(ext)){
                return cb(new AppError(400,"Unsupported file extention"));
            }
            cb(null,true);
        },
        limits:{
            fileSize:1048576,// 1024 * 1024
        }
    }).single("picture");
    
    const removeFile = (path)=>{
        return new Promise((resolve,reject)=>{
            fs.unlink(path,(err)=>{
                if(err){
                    reject(err)
                }
                resolve(path);
            });
        });
    }
    return {upload,removeFile}
}
