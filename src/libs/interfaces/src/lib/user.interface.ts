import { Role } from './role.enum';

export interface IUser {
    readonly _id?: string;
    username: string;
    password?: string;
    firstName: string;
    lastName: string;
    role: Role;
    picture?: string;
}