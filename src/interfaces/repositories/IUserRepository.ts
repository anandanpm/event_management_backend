import { IUser } from "../IUser";

export interface IUserRepository{
    findById(id:string):Promise<IUser | null>;
    findByEmail(email:string):Promise<IUser | null>;
    create(user:IUser):Promise<IUser>;
    update(id:string, user:Partial<IUser>):Promise<IUser | null>;
}