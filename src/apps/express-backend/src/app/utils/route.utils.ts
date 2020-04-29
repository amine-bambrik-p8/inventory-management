import { Pipe } from './pipe.type';
import { Router,Request } from 'express';
import { Route } from './route.interface';

export function mount(controller,routes:Route[],router: Router,pipes:Pipe[]=[]){
    routes.forEach((route:Route)=>{
        router[route.method.toLowerCase()](
            route.path,
            ...pipes,
            controller[route.controllerFunctionName].bind(controller)
            )
    });
}