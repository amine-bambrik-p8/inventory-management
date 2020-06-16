import { Route } from '../../utils/crud/route.interface';

export const productEntryRoutes: Route[]=[
    {
        controllerFunctionName:"readMany",
        method:"GET",
        path:"/"
    },
    {
        controllerFunctionName:"setMainEntry",
        method:"POST",
        path:"/:id"
    },
    {
        controllerFunctionName:"createOne",
        method:"POST",
        path:"/",
    },
    {
        controllerFunctionName:"deleteOne",
        method:"DELETE",
        path:"/:id",
    },
    {
        controllerFunctionName:"updateOne",
        method:"PUT",
        path:"/:id",
    }
]
