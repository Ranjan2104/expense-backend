import { Application } from "express";
import AuthRouter from "./auth";
import IndexRouter from "./general"

export function mount(app: Application): void {
	app.use("/v1", IndexRouter);
	app.use("/v1/auth", AuthRouter);
}
