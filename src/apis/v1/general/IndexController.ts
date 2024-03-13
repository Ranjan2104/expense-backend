import * as express from 'express'
import * as UtilsHelper from "../../../helpers/utils.helper";
import { IResponseObject } from "../../../helpers/utils.interface";
import BaseController from '../../../helpers/BaseController';
import _ from 'lodash';
import * as Model from "../../../models"
import getMessage from '../../../i18';

class IndexController extends BaseController {

	constructor() {
		super();

		// bind all the methods here
		this.getResponse = this.getResponse.bind(this);
	}
	/**
	 * getResponse
	 */
	public async getResponse(req: express.Request, res: express.Response): Promise<void | any>  {
		const _resData: IResponseObject = UtilsHelper.responseObject();
		try {
			
			 
			_.assign(_resData, {
				data: null,
				msg: getMessage("1000", "en"),
				msgCode: 1000
			})
		}
		catch (err: any) {
			_.assign(_resData, {
				statusCode: 500,
				status: "error",
				msg: err.message
			});

			this.logErrors(err, "Error in IndexController.getQuote");
		}
		return this.sendResponse(res, _resData);
	}

}

const indexController = new IndexController();

export default indexController;
