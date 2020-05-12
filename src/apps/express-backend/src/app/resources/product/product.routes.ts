import { crudRoutes } from '../../utils/crud/crud.routes';
import { Route } from '../../utils/crud/route.interface';

export const productRoutes: Route[]=[
    ...crudRoutes,
    {
        controllerFunctionName:"addThumbnail",
        method:'POST',
        path:"/:productId/upload-thumbnail/:id",
    },
    {
        controllerFunctionName:"removeThumbnail",
        method:'DELETE',
        path:"/:productId/remove-thumbnail/:id",
    },
]
