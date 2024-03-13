import mongoose from "mongoose";
import { Connection } from "mongoose";


// import { AdminUser, GlobalSetting, User, AppVersion } from "../models";

const _db: Connection = mongoose.connection;

export async function connectDb(): Promise <void | any> {
	let conn: string = process.env.MONGODB_URI as string;
	await mongoose.set('strictQuery',false)
	await mongoose.connect(conn);
}

export async function closeDb(): Promise <void | any> {
	await _db.close();
}

_db.on('connected', (): void => {
	console.info('mongoose:connected - connected to MongoDB successfully. -- ', new Date);
});

mongoose.connection.on('disconnected', (): void => {
	console.info('mongoose:disconnected - disconnected from MongoDB successfully.');
});

// mongoose.set('debug', true);

mongoose.connection.on('error', (error): void => {
	console.info('mongoose:error - could not connect to MongoDB due to an error: ', error);
	_db.close()
		.then(() => {
			console.info('mongoose:error - MongoDB connection closed successfully.');
		})
		.catch((connectionError) => {
			console.info('mongoose:error - could not close MongoDB connection due to an error ', connectionError);
		});
});
