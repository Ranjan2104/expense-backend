import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import * as UtilsHelper from "../../../helpers/utils.helper";
import _ from "lodash";


import getMessage from "../../../i18";

const Validators: any = {

  addUserValid: Joi.object({
    firstName: Joi.string().required().custom(UtilsHelper.JoiCheckValidName),
    lastName: Joi.string().required().custom(UtilsHelper.JoiCheckValidName),
    mobileNo: Joi.string().required().custom(UtilsHelper.JoiCheckValidMobile),
    email: Joi.string().required().custom(UtilsHelper.JoiCheckValidEmail),
    password: Joi.string().required().custom(UtilsHelper.JoiCheckValidPassword),
  }),
 
  loginValid: Joi.object({
    mobileNo: Joi.string().required().custom(UtilsHelper.JoiCheckValidMobile),
    password: Joi.string().required().custom(UtilsHelper.JoiCheckValidPassword),
  }),
};

export default function Validator(func: string) {
  return async function Validator(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const validated = await Validators[func].validateAsync(req.body, {
        abortEarly: false,
      });
      req.body = validated;
      next();
    } catch (err: any) {
      let _er: any = {};
      if (err.isJoi) {
        err.details.forEach((d: any) => {
          let _key: string = d.context.key;
          _er[_key] = d.message;
        });
      }

      let _resData = UtilsHelper.responseObject();
      _resData.status = "error";
      _resData.statusCode = 400;
      _resData.msg = getMessage("511", "en");
      _resData.msgCode = "511";
      _resData.data = _er;

      return UtilsHelper.cRes(res, _resData);
    }
  };
}
