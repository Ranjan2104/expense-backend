import * as Model from "../models";
import getMessage from "../i18";
import * as UtilsHelper from "../helpers/utils.helper";
import { IResponseObject } from "../helpers/utils.interface";

import { sendMail } from "../services/Mail";
import express from "express";
import _ from "lodash";

export async function verifyToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const _resData: IResponseObject = UtilsHelper.responseObject();
  try {
    let token: any =
      req.headers.Authorization ||
      req.headers.authorization ||
      req.headers["x-access-token"];

    if (!token) {
      _.assign(_resData, {
        msgCode: "512",
        msg: getMessage("512", "en"),
        status: "error",
        statusCode: 403,
      });
      return UtilsHelper.cRes(res, _resData);
    }

    const tokenArr = token.split(" ");
    token = tokenArr[1];

    // here lean() function must NOT be used as in User schema virtual field is defined
    const user = await Model.User.findOne({
      accessToken: token,
      status: { $ne: 9 },
    });
    if (!user) {
      _.assign(_resData, {
        msgCode: "542",
        msg: getMessage("542", "en"),
        status: "error",
        statusCode: 403,
      });
      return UtilsHelper.cRes(res, _resData);
    }

    next();
  } catch (err: any) {
    _.assign(_resData, {
      statusCode: 500,
      status: "error",
      msg: err.message,
    });
    return UtilsHelper.cRes(res, _resData);
  }
}

//verify JWT Auth token for web middleware
export async function verifyAuthToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const _resData: IResponseObject = UtilsHelper.responseObject();
  try {
    next();
  } catch (err: any) {
    let _msg: string;
     _msg = "Invalid Access token.";
    _.assign(_resData, {
      statusCode: 403,
      status: "error",
      msg: _msg,
    });
    return UtilsHelper.cRes(res, _resData);
  }
}

