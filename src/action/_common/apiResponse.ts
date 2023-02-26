export const apiResponse = (data: ResponseDataType) => {
  if (data.statusCode === 200) {
    console.info("API response:%o", data);
  } else {
    console.error("API response:%o", data);
  }

  return {
    statusCode: data.statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Headers":
        "Origin,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,locale",
      "Access-Control-Allow-Methhods": "POST,GET,OPTIONS",
    },
    body: data.body,
  };
};

export type ResponseDataType = {
  statusCode: number;
  body: string;
};
