import { crudRoutes } from '../../utils/crud/crud.routes';
import { Route } from '../../utils/crud/route.interface';

export const supplierRoutes: Route[]=[
    ...crudRoutes,
    {
        controllerFunctionName:"setPicture",
        method:'POST',
        path:"/:id/upload-picture",
    },
    {
        controllerFunctionName:"removePicture",
        method:'DELETE',
        path:"/:id/remove-picture",
    },
]
