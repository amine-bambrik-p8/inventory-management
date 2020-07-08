export enum SortDirection{
    ASCENDING=1,
    DECENDING=-1,
}
export interface IFilter {
    page?:number;
    search?:string;
    sortBy?:string;
    sortDirection?:SortDirection;
    size?:number;
}