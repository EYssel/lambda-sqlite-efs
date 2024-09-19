import * as fs from "node:fs";

const EFS_PATH = process.env.EFS_PATH;

export const handler = (event: any) => {
  console.log("Hello World! ", {event});
//   fs.writeFileSync(EFS_PATH + "/123.txt", "1\n2\n3");
    const file = fs.readFileSync(EFS_PATH + "/123.txt", "utf8");

    console.log(JSON.stringify({file}));
};