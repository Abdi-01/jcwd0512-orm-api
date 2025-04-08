import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getExpenseList = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const expenses = await prisma.expenses.findMany();
    res.status(200).send(expenses);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
export const getExpenseDetail = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const expense = await prisma.expenses.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!expense) {
      throw { message: "Expense not found" };
    }

    res.status(200).send(expense);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
export const createExpense = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const newExpense = await prisma.expenses.create({
      data: { ...req.body, date: new Date(req.body.date) },
    });

    res.status(201).send(newExpense);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
export const updateExpense = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const updateExpense = await prisma.expenses.update({
      where: { id: parseInt(req.params.id) },
      data: { ...req.body, date: new Date(req.body.date) },
    });

    res.status(200).send(updateExpense);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const deleteExpense = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    await prisma.expenses.delete({
      where: { id: parseInt(req.params.id) },
    });

    res.status(200).send({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
