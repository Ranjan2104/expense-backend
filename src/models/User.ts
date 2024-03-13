import { Schema, model } from "mongoose";
import { IUser } from "./interfaces";
import bcrypt from 'bcrypt'

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true },
    mobileNo: { type: String, trim: true, required: true, unique: true },
    email: { type: String, trim: true, required: true, unique: true},
    password: { type: String, trim: true, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function  (next) {

	if (this.isModified('password')) {

		this.password = await bcrypt.hash(this.password.toString(), 10);

	} else {
		next();
	}
});

const User = model<IUser>("User", userSchema, "User");

export default User;
