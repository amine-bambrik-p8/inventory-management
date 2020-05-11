import { Route } from './route.interface';

export const crudRoutes: Route[] = [
    {
        controllerFunctionName: "createOne",
        path:"/",
        method:"POST"
    },
    {
        controllerFunctionName: "updateOne",
        path:"/:id",
        method:"PUT",
    },
    {
        controllerFunctionName:"readOne",
        path:"/:id",
        method:"GET",
    },
    {
        controllerFunctionName:"readMany",
        path:"/",
        method:"GET",
    },
    {
        controllerFunctionName:"deleteOne",
        path:"/:id",
        method:"DELETE",
    },
];