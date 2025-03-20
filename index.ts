import express, { Application, Request, Response } from "express";
import cors from "cors";
import expenseRouter from "./routers/expense.router";
import db from "./config/db";

const PORT: number = 2066;

const app: Application = express();

app.use(cors());
app.use(express.json());

// check db connection
db.connect((err, client, release) => {
  if (err) {
    return console.log("Error connection db", err);
  }

  console.log("Success connection");
  // release();
});

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("<h1>Expense API</h1>");
});

app.use("/expense", expenseRouter);

app.listen(PORT, () => {
  console.log(`API RUNNING at http://localhost:${PORT}`);
});
