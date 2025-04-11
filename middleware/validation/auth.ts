import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const regisValidation = [
  body("email").notEmpty().isEmail().withMessage("Email is required"),
  body("password")
    .notEmpty()
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 0,
      minUppercase: 0,
    })
    .withMessage(
      "Min. Password 6 character, min 1 lowercase and min 1 numbers"
    ),
  (req: Request, res: Response, next: NextFunction): any => {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(400).send({
        success: false,
        error: errorValidation,
      });
    }
    next();
  },
];
