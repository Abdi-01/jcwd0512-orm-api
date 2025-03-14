import { Router } from "express";
import {
  createExpense,
  deleteExpense,
  getExpenseDetail,
  getExpenseList,
  updateExpense,
} from "../controllers/expense.controller";

const route = Router();

route.get("/list", getExpenseList);
route.get("/:id", getExpenseDetail);
route.post("/", createExpense);
route.patch("/:id", updateExpense);
route.delete("/:id", deleteExpense);

export default route;
