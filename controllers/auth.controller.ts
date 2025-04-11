import { Request, Response } from "express";
import prisma from "../config/prisma";
import { hash, genSalt, compare } from "bcrypt";
import { createToken } from "../utils/createToken";
import { transporter } from "../utils/emailSender";
export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    // - memeriksa apakah data unik yang dibawa sudah ada ?
    const existingAccount = await prisma.accounts.findUnique({
      where: { email: req.body.email },
    });

    if (existingAccount) {
      throw new Error("Email has been used");
    }

    const salt = await genSalt(10);
    const hashNewPassword = await hash(req.body.password, salt);
    const newAccount = await prisma.accounts.create({
      data: {
        email: req.body.email,
        password: hashNewPassword,
      },
    });

    const token = createToken({
      id: newAccount.id,
    });
    await transporter.sendMail({
      from: process.env.MAIL_SENDER,
      to: req.body.email,
      subject: "Register",
      html: `
      <h1>Verify account</h1>
      <a href="http://localhost:3000/verify?tkn=${token}">Verify Now</a>
      `,
    });

    return res.status(200).send({
      success: true,
      message: "Register success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export const signIn = async (req: Request, res: Response): Promise<any> => {
  try {
    const account = await prisma.accounts.findUnique({
      where: { email: req.body.email },
    });

    if (!account) {
      throw "Invalid email";
    }

    const isValidPassword = await compare(req.body.password, account.password);

    if (!isValidPassword) {
      throw "Invalid password";
    }

    return res.status(200).send({
      email: account.email,
      token: createToken({
        id: account.id,
      }),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export const keepLogin = async (req: Request, res: Response): Promise<any> => {
  try {
    //
    console.log(res.locals.data.id);
    const account = await prisma.accounts.findUnique({
      where: { id: res.locals.data.id },
    });

    return res.status(200).send({
      email: account?.email,
      token: createToken({ id: account?.id }),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export const verifyAccount = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const verify = await prisma.accounts.update({
      data: {
        isVerified: true,
      },
      where: { id: res.locals.data.id },
    });

    return res.status(200).send("Your account is VERIFIED NOW");
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
