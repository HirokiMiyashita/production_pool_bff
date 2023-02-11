import { apiResponse } from "../_common/helper/apiResponse";

const handler = async () => {
  return await action();
};

const action = () => {
  return apiResponse({
    statusCode: 200,
    body: "BFF_テストです.",
  });
};

export { handler, action };
