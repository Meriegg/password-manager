import User from "../../../models/User";

// Types
import { NextApiRequest, NextApiResponse } from "next";
import * as ts from "../../../types";

// Token validation
import { verifyToken } from "../../../server-utils/verifyToken";

// Database
import connectToDb from "../../../server-utils/conntectToDb";

connectToDb();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Verify token
    const { isValid, decoded } = verifyToken(req.cookies.xToken);
    if (!isValid) return res.status(401).json({ message: "Unauthorized!" });

    // Find the user in db
    const dbUser = await User.findById(decoded?.id);
    if (!dbUser)
      return res.status(404).json({ message: "Could not find user!" });

    // Get the idx
    const idx = req.body.idx;

    // Filter the passwords
    const filterPasswords = (passwords: Array<ts.UserPassword>) => {
      let filteredPasswords: Array<ts.UserPassword> = [];

      passwords.forEach((password) => {
        if (password.idx !== idx) {
          filteredPasswords.push(password);
        }
      });

      return filteredPasswords;
    };

    dbUser.passwords = filterPasswords(dbUser.passwords);

    // Save the changes
    await dbUser.save();

    res
      .status(200)
      .json({ message: "Password deleted sucessfully!", status: 200 });
  } catch (error) {
    console.error(error);
  }
};
