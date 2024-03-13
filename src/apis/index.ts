import { Application, Request, Response, NextFunction,  } from "express";
import _ from "lodash";
import * as UtilsHelper from "../helpers/utils.helper";
import * as apisV1 from "./v1";

export function mount(app: Application): void {
	apisV1.mount(app);
	app.get("/", defaultRoute);
}

const defaultRoute = (req: Request, res: Response) => {
	let _retData = UtilsHelper.responseObject();

	_.assign(_retData, {
		msg: "Node backend API is running ..."
	});

	return UtilsHelper.cRes(res, _retData);
}