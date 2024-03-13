import * as express from 'express'
import * as UtilsHelper from "../../../helpers/utils.helper";
import { IResponseObject } from "../../../helpers/utils.interface";
import BaseController from '../../../helpers/BaseController';
import _ from 'lodash';
import getMessage from "../../../i18";
class AuthController extends BaseController {

	constructor() {
		super();

		// bind all the methods here
		this.register = this.register.bind(this);
		this.login = this.login.bind(this);

	}


 

	/*
	 * Method to register user
	 */

	public async register(req: express.Request, res: express.Response): Promise<void | any> {
		const _retData: IResponseObject = UtilsHelper.responseObject();
		try {
			const reqBody = req.body

			const _data = "";

			_.assign(_retData, {
				data: _data,
				msgCode: "103",
				msg: getMessage("103", "en")
			})

		} catch (err: any) {
			console.log(err)
			_.assign(_retData, {
				statusCode: 500,
				status: "error",
				msg: err.message
			});

			this.logErrors(err, "Error in AuthController.register");
		}

		return this.sendResponse(res, _retData);
	}
 
 

	/*
	 * Method to login user
	 */
	public async login(req: express.Request, res: express.Response): Promise<void | any> {
		const _retData: IResponseObject = UtilsHelper.responseObject();
		try {
			const reqBody = req.body

		}
		catch (err: any) {
			console.log(err)
			_.assign(_retData, {
				statusCode: 500,
				status: "error",
				msg: err.message
			});

			this.logErrors(err, "Error in AuthController.login");
		}
		return this.sendResponse(res, _retData);
	}
 
}

const authController = new AuthController();

export default authController;