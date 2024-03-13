import * as express from 'express';
import { IResponseObject } from "./utils.interface";
import * as UtilsHelper from "./utils.helper";
const FCM = require("fcm-node");
let serverKey: any;

 class PushNotificationController {

	/**
	 * Method to send PushNotification
	 */
	public sendPushNotification(payload: any, token: any) {
		serverKey = process.env.FCM_SERVER_KEY

		const fcm = new FCM(serverKey);
		console.log('token===================', token);
		let message = this.formatDataForPushNotification(payload, token);
		fcm.send(message, (err: any, response: any) => {
			if (err) {
				console.log(JSON.stringify(err), 'Error Sending Push Notification');
				console.log(`Push Error - ${message?.notification.body}`)
				console.log('pusherror=========>', err);
				return err;
			} else {
				console.log(`Push Sent - ${message?.notification.body}`)
				return response;
			}
		});
	}

	public formatDataForPushNotification(payload: any, token: any) {
		return {
			to: token,
			content_available: true,
			data: payload["data"] || {},
			notification: {
				title: payload["title"] || "IFAS",
				body:  payload["body"],
				sound: "default",
				force: true,
				badge: 1,
			},
			priority: "high"
		};
	}

	public contentValue(cn: any) {
		return cn.replace(/\${(\w+)}/, "$1");
	}

	public replaceContent(content: any, obj: any) {
		let ctx: any = content;
		var idx = ctx.match(new RegExp(/\${\w+}/g));
		if (idx && idx.length > 0) {
			idx.map((val: any, id: any) => {
				ctx = ctx.replace(/\${(\w+)}/, obj[this.contentValue(idx[id])]);
				return val;
			});
		}
		return ctx;
	}

	/**
	 * Method to send PushNotification
	 */
	public  sendBulkPushNotification(payload: any, token: any) {
		const chunk_size = 500;
		let groups = token.map(function (e: any, i: any) {
			return i % chunk_size === 0 ? token.slice(i, i + chunk_size) : null;
		}).filter(function (e: any) { return e; });
		let regTokens;
		for (regTokens in groups) {
			for (let i = 0; i < groups[regTokens].length; i++) {
				console.log(groups[regTokens][i])
				this.sendPushNotification(payload, groups[regTokens][i])
			}
		}
	}
}


const pushNotificationController = new PushNotificationController();

export default pushNotificationController;