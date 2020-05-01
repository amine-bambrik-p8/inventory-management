
export interface Route{
    controllerFunctionName: string;
    path: string;
    method: "GET"|"POST"|"PUT"|"DELETE";
}