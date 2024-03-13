// import { Response } from "express";
// import { IResponseObject } from "./utils.interface";
// import { isValidObjectId } from "mongoose";
// import * as utils from "node:util"
// // const DOMParser = require('dom-parser');


// // import AWS from 'aws-sdk'
// // import sharp from 'sharp'

// import { CustomValidator} from "joi";
// const  mongoose = require('mongoose');

// const responseObject = (): IResponseObject => {
// 	return {
// 		statusCode: 200,
// 		status: "success",
// 		msgCode: "", // default empty msgCode
// 		msg: "",
// 		data: null
// 	};
// }


// /**
//  * Send response
//  */
// const cRes = (res: Response, data: any) => {
// 	return res.status(data.statusCode).json(data);
// }

// /**
//  * Generate random number
//  */
// const generateRandomNumber = (length: number) => {
// 	return Math.floor((10 ** (length-1)) + Math.random() * (9 * 10 ** (length-1)))
// }

// const isValidObjectIdString = (id: string): boolean => {
// 	return isValidObjectId(id);
// }

// const clone = (data: any): any => {
// 	return JSON.parse(JSON.stringify(data));
// }

// const JoiCheckValidObjectId = (value: any, helpers: any): CustomValidator<any> => {
// 	if (!isValidObjectId(value)) {
// 		throw new Error(`Invalid Id provided.`);
// 	}
// 	return value;
// }

// export function getBucketUrl(folder: string) {
// 	let _bucketURL: string = (process.env.S3_BUCKET_URL as string);
// 	return _bucketURL += folder;
// }

// //generate random 4 digit otp number
// export async function generateOTP() {
// 	let otp = await Math.floor(100000 + Math.random() * 900000);
// 	return otp;
// }

 


// /**
//  * Wrap the give id in MongoDb ObjectId
//  * @param Hex String id
//  * @return MongoDb ObjectId
//  */
// const ObjectId = (id: string)  => {

// 	return mongoose.Types.ObjectId(id)
// }

// /**
//  * Get New MongoDb ObjectId
//  * @return MongoDb ObjectId
//  */
// const getNewObjectId = () => {
// 	return new mongoose.Types.ObjectId();
// }

// /**
//  * Round off the given value for the given decimalPlace
//  * @param value
//  * @param decimalPlace
//  */
// const Round = (value: number, decimalPlace: number = 0) => {
// 	let placesNum = Math.pow(10, decimalPlace);
// 	value *= placesNum;
// 	return (Math.round(value)/placesNum);
// }

// const logObj = function(data: any, depth = 5) {
// 	console.log(utils.inspect(data, false, depth));
// }

// export {
// 	responseObject,
// 	cRes,
// 	generateRandomNumber,
// 	isValidObjectIdString,
// 	clone,
// 	JoiCheckValidObjectId,
// 	ObjectId,
// 	getNewObjectId,
// 	Round,
// 	logObj
// }
import { Response } from "express";
import { IResponseObject } from "./utils.interface";
import { isValidObjectId } from "mongoose";
import * as utils from "node:util"

import { CustomValidator} from "joi";
const  mongoose = require('mongoose');

const responseObject = (): IResponseObject => {
	return {
		statusCode: 200,
		status: "success",
		msgCode: "", // default empty msgCode
		msg: "",
		data: null
	};
}


/**
 * Send response
 */
const cRes = (res: Response, data: any) => {
	return res.status(data.statusCode).json(data);
}

/**
 * Generate random number
 */
const generateRandomNumber = (length: number) => {
	return Math.floor((10 ** (length-1)) + Math.random() * (9 * 10 ** (length-1)))
}

const isValidObjectIdString = (id: string): boolean => {
	return isValidObjectId(id);
}

const clone = (data: any): any => {
	return JSON.parse(JSON.stringify(data));
}

const JoiCheckValidObjectId = (value: any, helpers: any): CustomValidator<any> => {
	if (!isValidObjectId(value)) {
		throw new Error(`Invalid Id provided.`);
	}
	return value;
}

export function getBucketUrl(folder: string) {
	let _bucketURL: string = (process.env.S3_BUCKET_URL as string);
	return _bucketURL += folder;
}

//generate random 4 digit otp number
export async function generateOTP() {
	let otp = await Math.floor(100000 + Math.random() * 900000);
	return otp;
}

 

 
/**
 * Wrap the give id in MongoDb ObjectId
 * @param Hex String id
 * @return MongoDb ObjectId
 */
const ObjectId = (id: string)  => {

	return mongoose.Types.ObjectId(id)
}

/**
 * Get New MongoDb ObjectId
 * @return MongoDb ObjectId
 */
const getNewObjectId = () => {
	return new mongoose.Types.ObjectId();
}

/**
 * Round off the given value for the given decimalPlace
 * @param value
 * @param decimalPlace
 */
const Round = (value: number, decimalPlace: number = 0) => {
	let placesNum = Math.pow(10, decimalPlace);
	value *= placesNum;
	return (Math.round(value)/placesNum);
}

const logObj = function(data: any, depth = 5) {
	console.log(utils.inspect(data, false, depth));
}

const JoiCheckValidName = (value: any): CustomValidator<any> => {
	let regex = /^[A-Za-z\s\-']+$/;
	if(regex.test(value)) {
		return value;
	}
	throw new Error(`Invalid name provided.`)
}

const JoiCheckValidMobile = (value: any): CustomValidator<any> => {
	let regex = /^[6-9]\d{9}$/
	if(regex.test(value)) {
		return value;
	}
	throw new Error(`Invalid mobile number provided.`)
}

const JoiCheckValidEmail = (value: any): CustomValidator<any> => {
	let regex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
	if(regex.test(value)) {
		return value;
	}
	throw new Error(`Invalid email provided.`)
}

const JoiCheckValidPassword = (value: any): CustomValidator<any> => {
	let regex = /^\d{6}$/
	if(regex.test(value)) {
		return value;
	}
	throw new Error(`Invalid password type provided.`)
}




export {
	responseObject,
	cRes,
	generateRandomNumber,
	isValidObjectIdString,
	clone,
	JoiCheckValidObjectId,
	ObjectId,
	getNewObjectId,
	Round,
	logObj,
	JoiCheckValidName,
	JoiCheckValidMobile,
	JoiCheckValidEmail,
	JoiCheckValidPassword
}
