export interface IProductEntry {
    readonly _id?: string;
    dates?:{    
        dateOfManufacturing: Date;
        dateOfExpiration: Date;
    }
    boughtPrice: Number;
    price: Number;
    discount?: Number;
    quantityInfo:{
        readonly soldQuantity?: Number;
        checkedInQuantity: Number;
    },
    readonly quantity?:Number
}