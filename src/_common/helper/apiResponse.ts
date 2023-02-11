import { ResponseDataType } from "./interface/testInterface";

export const apiResponse = (data: ResponseDataType) => {
  if (data.statusCode === 200) {
    console.debug("API response:%o", data);
  } else {
    console.error("API response:%o", data);
  }
  return {
    statusCode: data.statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": false,
      "Access-Control-Allow-Headers":
        "Origin,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,locale",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    },
    body: data.body,
  };
};
