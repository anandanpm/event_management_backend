import { DataSource } from "typeorm";
import { User } from "../models/User";
import {Event} from '../models/Event';
import { Ticket } from "../models/Ticket";
import { Booking } from "../models/Booking";

export const AppDataSource = new DataSource({ 
    type:"mongodb",
    url:process.env.MONGODB_URL,
    logging:true,
    entities:[User,Event,Ticket,Booking],
  })