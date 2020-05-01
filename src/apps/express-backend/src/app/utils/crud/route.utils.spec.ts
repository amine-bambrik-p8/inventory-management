import { mount } from "./route.utils";
import { Route } from './route.interface';
import { Router } from 'express';

describe("route utils",()=>{
    describe("mount",()=>{
        it("should bind controller function to the controller",()=>{
            expect.assertions(1);
            const mockController = {
                someFunctionName:function (){
                    expect(this).toBe(mockController);
                },
            };
            const someRoutes:Route[] =[ 
                {
                    controllerFunctionName:"someFunctionName",
                    path:'/',
                    method:"GET",
                }
             ];
            const router = Router();

            const spy = spyOn(router,"get").and.callFake((path,handler)=>{
                handler();
            });

            mount(mockController,someRoutes,router);
        });
        it("should mount controllerFunction to the given path using the given method in lowercase",()=>{
            const mockController = {
                someFunctionName(){

                },
                someOtherFunction(){},
            };
            const someRoutes:Route[]=[
                {
                    controllerFunctionName:"someFunctionName",
                    path:'/',
                    method:"GET",
                },
                {
                    controllerFunctionName:"someOtherFunction",
                    path:'/:id',
                    method:"POST",
                }
            ];
            const router = Router();

            expect.assertions(someRoutes.length);
            someRoutes.forEach(route => {
                    spyOn(router,(route.method.toLowerCase() as "get"|"post"|"put"|"delete")).and.callFake((path,handler)=>{
                    expect(path).toBe(route.path);
                });
            });

            mount(mockController,someRoutes,router);
            
        });
        
    })
});