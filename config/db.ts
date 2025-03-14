import fs from "fs";

export const accessDB = (collection: string) => {
  return JSON.parse(fs.readFileSync("./db.json").toString())[collection];
};

export const updateDB = (collection: string, newData: any) => {
  const data = {
    ...JSON.parse(fs.readFileSync("./db.json").toString()),
    [collection]: newData,
  };
  fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));
  return true;
};
