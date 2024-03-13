import express, { Application } from "express";
import helmet from "helmet";
import compression from "compression";
import logger from "morgan";
export default class BaseApp {
	public app: Application;

	constructor() {
		this.app = express();
		this.loadRequiredMiddlewares();
	}

	/**
	 * Method to load all the required middlewares
	 */
	private loadRequiredMiddlewares() {

		this.loadCompression();

		this.loadHelmetProtections();

		// this.loadCORS();

		this.loadDebug();

		this.loadParser();

	 
	}

	/**
	 * Use the Helmet to protect app from some well-known web vulnerabilities by setting HTTP headers appropriately.
	 */
	private loadHelmetProtections() {
		this.app.use(helmet({ crossOriginEmbedderPolicy: false, originAgentCluster: true }))
		this.app.use(helmet.contentSecurityPolicy({
			useDefaults: true,
			directives: {
				"img-src": ["'self'", "https: data:",'*.ifas-dev.s3.ap-south-1.amazonaws.com']
			}
		}));
		this.app.disable('x-powered-by');
	}

	/**
	 * Compress all HTTP responses
	 */
	private loadCompression() {
		this.app.use(compression());
	}

	/**
	 * Add CORS settings
	 */
	// private loadCORS() {
	// 	this.app.use(cors({
	// 		origin: '*',
	// 		allowedHeaders: ["Content-Type", "Accept", "User-Agent", "Cache-Control", "Authorization"]
	// 	}));
	// }

	/**
	 * Logging to console
	 */
	private loadDebug() {
		this.app.use(logger('dev'));
	}

	/**
	 * Load body parser
	 */
	private loadParser() {
		this.app.use(express.json());

		// for parsing application/x-www-form-urlencoded
		this.app.use(express.urlencoded({ extended: true }));
	}

}