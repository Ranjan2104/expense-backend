import { Schema, model } from "mongoose";
import { IUser } from "./interfaces";

// Free User schema corresponding to the document interface.
const BatchSchema = new Schema<IUser>(
  {
    name: { type: String}
  },
  {
    timestamps: true,
  }
);

// Creating a Model.
const User = model<IUser>("User", BatchSchema, "User");

export default User;
