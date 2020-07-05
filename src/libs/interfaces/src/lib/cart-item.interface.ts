export interface ICartItem{
    readonly _id:string;
    readonly unit?:string;
    readonly price:number;
    readonly discount:number;
    readonly quantity:number;
    readonly name:string;
}