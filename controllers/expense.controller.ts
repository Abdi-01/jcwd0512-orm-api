import { Request, Response } from "express";
import db from "../config/db";
// import { accessDB, updateDB } from "../config/db";

export const getExpenseList = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    let filter: string[] = [];
    if (Object.keys(req.query).length) {
      filter = Object.keys(req.query).map((e: any) => {
        if (e === "startDate") {
          return `date >= '${req.query[e]}'`;
        } else if (e === "endDate") {
          return `date <= '${req.query[e]}'`;
        } else {
          return `${e} = '${req.query[e]}'`;
        }
      });
    }

    const result = await db.query(
      `select * from expenses ${
        filter.length ? `where ${filter.join(" AND ")}` : ""
      };`
    );

    const amount = await db.query(
      `select type, sum(nominal) as amount from expenses ${
        filter.filter((e: any) => !e.includes("type")).length
          ? `where ${filter
              .filter((e: any) => !e.includes("type"))
              .join(" AND ")}`
          : ""
      } group by type;`
    );

    return res.status(200).send({
      amount: amount.rows,
      result: result.rows,
    });
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
    const result = await db.query(
      `select * from expenses where id=${req.params.id}`
    );
    if (!result.rows.length) {
      throw "Data not found";
    }
    return res.status(200).send(result.rows[0]);
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
    const { title, nominal, type, category, date } = req.body;
    const result = await db.query(
      `insert into expenses (title, nominal, type, category, date) values
      ('${title}', ${nominal}, '${type}', '${category}', '${date}');`
    );
    console.log(result);
    if (result.rowCount === 0) {
      throw "Add data failed";
    }
    res.status(201).send({
      message: "Add data success",
      success: true,
    });
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
    const newValue = Object.keys(req.body).map(
      (e: any) => `${e}='${req.body[e]}'`
    );
    const result = await db.query(
      `update expenses set ${newValue.join(",")} where id = ${req.params.id}`
    );
    if (result.rowCount === 0) {
      throw "Update data failed";
    }
    console.log(result);
    return res.status(200).send({
      message: "Update data success",
      success: true,
    });
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
    const result = await db.query(
      `delete from expenses where id = ${req.params.id};`
    );

    if (result.rowCount === 0) {
      throw "Delete data failed";
    }

    return res.status(200).send({
      message: "Delete data success",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
