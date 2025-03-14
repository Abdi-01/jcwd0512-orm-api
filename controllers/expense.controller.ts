import { Request, Response } from "express";
import { accessDB, updateDB } from "../config/db";

export const getExpenseList = (req: Request, res: Response): any => {
  try {
    const data = accessDB("tracker");
    if (req.query.category) {
      const filter = data.filter((e: any) => e.category === req.query.category);
      const total = filter.reduce(
        (amount: number, expense: any) => amount + expense.nominal,
        0
      );
      return res.status(200).send({
        total,
        result: filter,
      });
    }

    let totalIncome = 0;
    let totalExpense = 0;
    data.forEach((val: any) => {
      if (val.type === "income") {
        totalIncome += val.nominal;
      } else if (val.type === "expence") {
        totalExpense += val.nominal;
      }
    });
    return res.status(200).send({
      income: totalIncome,
      expense: totalExpense,
      result: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
export const getExpenseDetail = (req: Request, res: Response) => {
  try {
    const selectedData = accessDB("tracker").filter(
      (e: any) => e.id == req.params.id
    );
    if (selectedData.length === 0) {
      throw { message: "Data not found" };
    }
    res.status(200).send(selectedData[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
export const createExpense = (req: Request, res: Response) => {
  try {
    const data = accessDB("tracker");
    data.push(req.body);
    const update = updateDB("tracker", data);
    res.status(201).send({
      message: "Add data success",
      success: update,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
export const updateExpense = (req: Request, res: Response) => {
  try {
    const data = accessDB("tracker");
    const idx = data.findIndex((e: any) => e.id == req.params.id);
    data[idx] = { ...data[idx], ...req.body };
    const update = updateDB("tracker", data);
    res.status(201).send({
      message: "Update data success",
      success: update,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const deleteExpense = (req: Request, res: Response) => {
  try {
    //
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
