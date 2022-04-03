// Verify token
import { verifyToken } from "../../../server-utils/verifyToken";

// Ts
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Get the cookie
    const acessToken = req.cookies.xToken;

    // Verify the token's validity
    const { isValid, decoded, message } = verifyToken(acessToken);
    if (!isValid) return res.status(401).json({ isValid, message });

    res.status(200).json({ isValid, decoded, status: 200 });
  } catch (error) {
    console.error(error);
  }
};
