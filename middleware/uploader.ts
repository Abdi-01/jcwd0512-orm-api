import multer from "multer";
import path from "path";
import { Request } from "express";

export const uploader = (dirName?: string | null, prefixName?: string) => {
  // define main directory path/location
  const mainDir = path.join(__dirname, "../public");
  console.log("check mainDir location", mainDir);

  // configure storage multer
  const configFileStore = multer.diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      callback: (error: Error | null, destination: string) => void
    ) => {
      const fileDestination = dirName ? mainDir + dirName : mainDir;
      callback(null, fileDestination);
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      callback: (error: Error | null, destination: string) => void
    ) => {
      console.log("FILE INFO :", file);

      const existName = file.originalname.split(".");
      console.log(existName);
      // Get extention file
      const ext = existName[existName.length - 1];

      //  define newName
      const newName = `${prefixName || "MEDIA"}${Date.now()}.${ext}`;
      callback(null, newName);
    },
  });

  return multer({ storage: configFileStore });
};
