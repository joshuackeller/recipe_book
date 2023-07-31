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
      return null
    }
  } else {
    return null
  }

  if (verified) {
    const { userId } = jwt.decode(token) as any;
    return userId;
  } else {
    return null
  }
};

export default Authorize;
