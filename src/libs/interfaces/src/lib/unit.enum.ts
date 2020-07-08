export enum Unit {
    KG="KG",
    L="L",
    M="M",
    P="P",
}

export const units = Object.keys(Unit).map(key=>Unit[key]);
