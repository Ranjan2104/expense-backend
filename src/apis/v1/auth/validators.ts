import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import * as UtilsHelper from "../../../helpers/utils.helper";
import _ from "lodash";


import getMessage from "../../../i18";

const Validators: any = {

  userRegisterValidation: Joi.object({
   
  }),

 

  loginValidation: Joi.object({
    
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

      let _retData = UtilsHelper.responseObject();
      _retData.status = "error";
      _retData.statusCode = 400;
      _retData.msg = getMessage("511", "en");
      _retData.msgCode = "511";
      _retData.data = _er;

      return UtilsHelper.cRes(res, _retData);
    }
  };
}
