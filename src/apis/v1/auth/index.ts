import { Router } from "express";
import authController from "./AuthController";
import Validator from "./validators";

const _router: Router = Router();

const _openRoutes = function () {
 
	 _router.post('/register', Validator("userRegisterValidation"), authController.register);

	 _router.post('/login', Validator("loginValidation"), authController.login);


};

const _routes = function () {
	_openRoutes();

	return _router;
};

export default _routes();