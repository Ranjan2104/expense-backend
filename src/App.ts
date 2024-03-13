import 'dotenv/config';
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import * as APIs from "./apis/index";
import BaseApp from "./middleware/BaseApp";
import { connectDb } from "./services/MongoDb";

class App extends BaseApp {
	constructor() {
		super();

		connectDb();

		APIs.mount(this.app)
		
		this.catchError();
	}

	/**
	 * Catch Errors
	 */
	private catchError() {
		//allow cors
		// this.app.use(cors());


		// catch 404 and forward to error handler
		this.app.use((req: Request, res: Response, next: NextFunction) => {
			next(createHttpError(404));
		})
		
		// error handler
		this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
			// set locals, only providing error in development
			res.locals.message = err.message;
			res.locals.error = req.app.get('env') === 'development' ? err : {};

			// render the error
			res.status(err.status || 500);
			next();
		});
	}

 
}

export default new App().app;
