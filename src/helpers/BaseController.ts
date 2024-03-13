import * as express from 'express';
import { IResponseObject } from "./utils.interface";
import * as UtilsHelper from "./utils.helper";


export default class BaseController {

	/**
	 * Method to send response
	 */
	public sendResponse(res: express.Response, data: IResponseObject) {
		return UtilsHelper.cRes(res, data);
	}


	public logErrors(err: Error, msg: string) {
		console.log("--------------------");
		console.log("=== ", msg, " ===");
		console.log(err);
		console.log("--------------------");
	}

}