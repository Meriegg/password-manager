// Types
import { NextApiRequest, NextApiResponse } from "next";
import * as ts from "../../../types/index";

// Token validation
import { verifyToken } from "../../../server-utils/verifyToken";

// Models
import User from "../../../models/User";

// Decryption
import { decrypt } from "../../../server-utils/encryption";

// Database
import connectToDb from "../../../server-utils/conntectToDb";

connectToDb();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Verify jwt token
    const { isValid, decoded } = verifyToken(req.cookies.xToken);
    if (!isValid) return res.status(401).json({ message: "Unauthorized!" });

    // Get the password idx
    const passwordIdx: number = req.body.idx;

    // Find the user in the database
    const dbUser = await User.findById(decoded?.id);
    if (!dbUser) return res.status(404).json({ message: "User not found!" });

    // Find the password
    const dbPassword: ts.UserPassword = dbUser.passwords.find(
      (password: ts.UserPassword) => password.idx === passwordIdx
    );

    // Decrypt the password
    const decryptedPassword = decrypt(dbPassword.password);

    res.status(200).json({
      password: decryptedPassword,
      message: "Password found successfully!",
      status: 200,
    });
  } catch (error) {
    console.error(error);
  }
};
