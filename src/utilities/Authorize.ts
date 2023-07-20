import { headers } from "next/headers";
import jwt from "jsonwebtoken";

const Authorize = async () => {
  const headersList = headers();
  const token = headersList.get("authorization");

  let verified = false;
  if (!!token && !!process.env.JWT_SECRET) {
    if (jwt.verify(token, process.env.JWT_SECRET)) {
      verified = true;
    } else {
      throw new Error("1 Invalid Token");
    }
  } else {
    throw new Error("2 Invalid Token");
  }

  if (verified) {
    const { userId } = jwt.decode(token) as any;
    return userId;
  } else {
    throw new Error("3 Invalid Token");
  }
};

export default Authorize;
