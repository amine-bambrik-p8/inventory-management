export enum Role {
    ADMIN = "ADMIN",
    INVENTORY = "INVENTORY",
    CHECKOUT = "CHECKOUT",
}

export const roles = Object.keys(Role).map(key=>Role[key]);