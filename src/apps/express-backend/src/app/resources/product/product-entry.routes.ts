import { Route } from '../../utils/route.interface';

export const productEntryRoutes: Route[]=[
    {
        controllerFunctionName:"createOne",
        method:"GET",
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
