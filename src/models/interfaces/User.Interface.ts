import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  firstName:String;
  lastName:String;
  mobileNo:String;
  email:String;
  password:String;

}
