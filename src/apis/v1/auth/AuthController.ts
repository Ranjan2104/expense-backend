import * as express from 'express'
import * as UtilsHelper from "../../../helpers/utils.helper";
import { IResponseObject } from "../../../helpers/utils.interface";
import BaseController from '../../../helpers/BaseController';
import _ from 'lodash';
import getMessage from "../../../i18";
import * as Model from "../../../models"
import bcrypt from 'bcrypt'

class AuthController extends BaseController {

	constructor() {
		super();

		this.addUser = this.addUser.bind(this);
		this.login = this.login.bind(this);


	}

	public async addUser(req: express.Request, res: express.Response): Promise<void | any> {
		const _resData: IResponseObject = UtilsHelper.responseObject();
		try {

			await Model.User.create(req.body)

			_.assign(_resData, {
				data: null,
				msgCode: "1001",
				msg: getMessage("1001", "en")
			})

		} catch (err: any) {
			console.log(err)
			_.assign(_resData, {
				statusCode: 500,
				status: "error",
				msg: err.message
			});

			this.logErrors(err, "Error in AuthController.addUser");
		}

		return this.sendResponse(res, _resData);
	}

	public async login(req: express.Request, res: express.Response): Promise<void | any> {
		const _resData: IResponseObject = UtilsHelper.responseObject();
		try {

			const user = await Model.User.findOne({mobileNo: req.body.mobileNo}, { password: 1 }).lean();

			if(!user) {
				_.assign(_resData, {
					statusCode: 404,
					status: "error",
					data: null,
					msgCode: "1002",
					msg: getMessage("1002", "en")
				})
			}else if(user.password && ( await bcrypt.compare(req.body.password, user.password.toString()) ) ){
				_.assign(_resData, {
					data: null,
					msgCode: "1003",
					msg: getMessage("1003", "en")
				})
			}else {
				_.assign(_resData, {
					statusCode: 401,
					status: "error",
					data: null,
					msgCode: "1004",
					msg: getMessage("1004", "en")
				})
			}
			
		} catch (err: any) {
			console.log(err)
			_.assign(_resData, {
				statusCode: 500,
				status: "error",
				msg: err.message
			});

			this.logErrors(err, "Error in AuthController.login");
		}

		return this.sendResponse(res, _resData);
	}
 
}

const authController = new AuthController();

export default authController;