export interface IProductEntry {
    readonly _id?: string;
    dates?:{    
        dateOfManufacturing: Date;
        dateOfExpiration: Date;
    }
    boughtPrice: number;
    price: number;
    discount?: number;
    quantityInfo:{
        readonly soldQuantity?: number;
        checkedInQuantity: number;
    },
    readonly quantity?:number
}