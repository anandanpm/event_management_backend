import { DataSource } from "typeorm";
import { User } from "../models/User";
import {Event} from '../models/Event';
import { Ticket } from "../models/Ticket";

export const AppDataSource = new DataSource({ 
    type:"mongodb",
    url:process.env.MONGODB_URL||'mongodb://localhost:27017/event_management',
    logging:true,
    entities:[User,Event,Ticket],
  })