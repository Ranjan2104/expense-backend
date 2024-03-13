import { Router } from "express";
import indexController from "./IndexController";

const _router: Router = Router();

const _openRoutes = function () {
	_router.get('/get-response', indexController.getResponse);
};

const _routes = function () {
	_openRoutes();

	return _router; 
};

export default _routes();     