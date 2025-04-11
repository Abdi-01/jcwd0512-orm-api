import nodemailer from "nodemailer";
import handlebars from "handlebars";
import path from "path";
import fs from "fs";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_SENDER,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const sendEmail = async (
  emailTo: string,
  subject: string,
  content?: string | null,
  data?: { email: string; token: string }
) => {
  try {
    const templatePath = path.join(__dirname, "../templates", "register.hbs");
    const templateSource = fs.readFileSync(templatePath, "utf-8");
    const compileTemplate = handlebars.compile(templateSource);
    const generateHTML = compileTemplate(data);

    await transporter.sendMail({
      from: process.env.MAIL_SENDER,
      to: emailTo,
      subject,
      html: content || generateHTML,
    });
  } catch (error) {
    throw error;
  }
};
