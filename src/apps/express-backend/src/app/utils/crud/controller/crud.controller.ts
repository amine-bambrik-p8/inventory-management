import { environment } from '../../../../environments/environment';
import { Model,Document } from 'mongoose';
import { Request, Response, NextFunction} from "express";
import { IFilter } from '@workspace/interfaces';

export class CRUDController{
    constructor(private model: Model<Document>){}

    async createOne(req: Partial<Request>,res: Partial<Response>,next?: NextFunction){
        try {
            const {body:{data: document}} = req;
            const mongooseDocument:Document = await this.model.create(document);
            res.status(201);
            res.json({
                data:mongooseDocument,
            });
        } catch (error) {
            next(error);
        }
        
    }

    async readOne(req: Partial<Request>,res: Partial<Response>,next?: NextFunction){
        try {
            const id:string = req.params.id;
            const mongooseDocument:Document = await this.model.findById(id);
            if(!mongooseDocument){
                res.status(404);
                return res.json({
                    error:{
                        message:"404 - Not Found",
                    }
                });
            }
            res.status(200);
            res.json({
                data:mongooseDocument,
            });
        } catch (error) {
            next(error);
        }
        
    }
    
    async readMany(req: Partial<Request>,res: Partial<Response>,next?: NextFunction){
        try {
            let mongooseDocuments:Document[];
            const filter:IFilter = req.query;
            if(filter){
                const {sortDirection=1,page=0,sortBy,size=environment.pagination.size,search,...matchValues} = filter;
                const pagination:any={...environment.pagination,size};
                const query = (search) ? {
                  _keys:new RegExp(`^${search.toUpperCase()}`),  
                } : {};
                let queryObject = this.model.find({...matchValues,...query});
                if(pagination)
                    queryObject = queryObject.skip(pagination.size*pagination.page).limit(pagination.size);
                if(filter.sortBy)
                    queryObject = queryObject.sort({
                        [filter.sortBy]:filter.sortDirection
                    })
                mongooseDocuments = await queryObject.exec()
            }
            else{
                mongooseDocuments = await this.model.find({});
            }
            res.status(200);
            res.json({
                data:mongooseDocuments
            });
        } catch (error) {
            next(error);
        }
        
    }

    async updateOne(req: Partial<Request>,res: Partial<Response>,next?: NextFunction){
        try {
            const id:string = req.params.id;
            const data = req.body.data;
            const mongooseDocument:Document = await this.model.findByIdAndUpdate(id,data,{
                new:true,
            });
            if(!mongooseDocument){
                res.status(404);
                return res.json(
                    {
                        error:{
                            message: "404 - Not Found",
                        }
                    }
                );
            }
            res.status(200);
            res.json({
                data:mongooseDocument,
            });
        } catch (error) {
            next(error);
        }
        
    }

    async deleteOne(req: Partial<Request>,res: Partial<Response>,next?: NextFunction){
        try {
            const id = req.params.id;
            const mongooseDocument:Document = await this.model.findByIdAndDelete(id);
            if(!mongooseDocument){
                res.status(404);
                return res.json({
                    error:{
                        message: "404 - Not Found",
                    }
                })
            }
            res.status(200);
            res.json({
                data:mongooseDocument,
            });
        } catch (error) {
            next(error);
        }
    
    }
    
}