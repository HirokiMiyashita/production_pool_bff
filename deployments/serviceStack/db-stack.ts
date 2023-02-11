// import { StackProps } from "aws-cdk-lib";
// import * as fs from "fs";
// import * as pg from "pg";

// export interface DBProps extends StackProps {
//   stage: string;
//   secretJson?: any;
// }

// export class DBStack {
//   async initDatebase(props: DBProps) {
//     const parsedJson = props.secretJson;
//     const client = new pg.Client({
//       user: "postgres",
//       password: "admin1111",
//       host: parsedJson.host,
//       database: "crm",
//       port: parsedJson.port,
//     });

//     try {
//       await client.connect();
//       await client.query(
//         fs.readFileSync("./deployments/ddl/user.sql").toString()
//       );
//     } catch (error) {
//       throw error;
//     } finally {
//       await client.end();
//     }
//   }
// }
