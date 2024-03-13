import { Router } from "express";
import authController from "./AuthController";
import Validator from "./validators";

const _router: Router = Router();

const _openRoutes = function () {

	/* 
		/v1/auth
	*/ 
 
	 _router.post('/add-user', Validator("addUserValid"), authController.addUser);

	 _router.post('/login', Validator("loginValid"), authController.login);


};

const _routes = function () {
	_openRoutes();

	return _router;
};

export default _routes();