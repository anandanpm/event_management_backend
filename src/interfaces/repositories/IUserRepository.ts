import { IUser, IUserDTO } from "../IUser";

export interface IUserRepository{
    findById(id:string):Promise< IUserDTO| null>;
    findByEmail(email:string):Promise<IUserDTO | null>;
    create(user:IUser):Promise<IUserDTO>;
    update(data:Partial<IUser>):Promise< IUserDTO | null>;
}