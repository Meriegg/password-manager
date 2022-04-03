// Types
import { NextApiRequest, NextApiResponse } from "next";

// Cookies
import { removeCookies } from "cookies-next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    removeCookies("xToken", { req, res });

    res.status(200).json({ message: "Logged out successfully!", status: 200 });
  } catch (error) {
    console.error(error);
  }
};
