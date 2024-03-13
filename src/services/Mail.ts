import * as nodemailer from "nodemailer";

export async function sendMail(sendTo: any, sub: any, text: any, html: any, attachments:any) {
	const transportOptions: any = {
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT,
		secure: true,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS
		}
	}

	let transporter: any = nodemailer.createTransport(transportOptions);

	  transporter.verify(function(error: any, success: any) {
	 	if (error) {
				console.log('transporter.verify', transporter.verify,);
	 				console.log(error);
	 	} else {
	 				console.log('Email Server is ready to take our messages');
	 	}
	 });



	var mailOptions:any = {
    from: process.env.MAIL_FROM_ADDRESS,
    to: sendTo,
		subject: sub,
		text: text,
		html: html,

	}
	if (Array.isArray(attachments) && attachments.length > 0){
		mailOptions.attachments = attachments;
	}

  const data = await transporter.sendMail(mailOptions);
	return data.messageId
}

export async function sendMaiLFromCallbackEmailId(sendTo: any, sub: any, text: any, html: any, attachments:any) {
	const transportOptions: any = {
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT,
		secure: true,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.Call_Expert_SMTP_PASS
		}
	}

	console.log("pass: process.env.Call_Expert_SMTP_PASS",process.env.Call_Expert_SMTP_PASS)

	let transporter: any = nodemailer.createTransport(transportOptions);

	  transporter.verify(function(error: any, success: any) {
	 	if (error) {
				console.log('transporter.verify', transporter.verify,);
	 				console.log(error);
	 	} else {
	 				console.log('Email Server is ready to take our messages');
	 	}
	 });



	var mailOptions:any = {
    from: process.env.Call_Expert_Mail_Address,
    to: sendTo,
		subject: sub,
		text: text,
		html: html,

	}
	if (Array.isArray(attachments) && attachments.length > 0){
		mailOptions.attachments = attachments;
	}

  const data = await transporter.sendMail(mailOptions);
	return data.messageId
}