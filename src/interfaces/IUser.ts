import { ObjectId } from "mongodb";

export interface IUser{
    _id?: ObjectId;
    name: string;
    email: string;
    password: string;
    role:string
}

export interface IUserDTO {
  _id?: ObjectId;
  name: string;
  email: string;
  role: string; 
}