import User from "../../../models/User";

// Types
import { NextApiRequest, NextApiResponse } from "next";
import * as ts from "../../../types/index";

// Verify token
import { verifyToken } from "../../../server-utils/verifyToken";

// Decryption
import { decrypt } from "../../../server-utils/encryption";

// Database
import connectToDb from "../../../server-utils/conntectToDb";

connectToDb();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Verify token
    const { isValid, decoded } = verifyToken(req.cookies.xToken);
    if (!isValid) return res.status(401).json({ message: "Not authorized!" });

    // Get user from db
    const dbUser = await User.findById(decoded?.id);
    if (!dbUser)
      return res.status(404).json({ message: "Could not find user!" });

    // Get the passwords and decrypt them
    let decryptedPasses: Array<ts.UserPassword> = [];

    // Hide the password
    const hidePass = (pass: string) => {
      let hiddenPass: string = "";

      const splitPass = pass.split("");

      splitPass.forEach((letter) => {
        hiddenPass += "•";
      });

      return hiddenPass;
    };

    dbUser.passwords.forEach((pass: ts.UserPassword) => {
      decryptedPasses.push({
        idx: pass.idx,
        username: decrypt(pass.username),
        website: decrypt(pass.website),
        password: hidePass(decrypt(pass.password)),
      });
    });

    return res.status(200).json({
      passwords: decryptedPasses,
      status: 200,
      message: "Passwords retrieved sucessfully!",
    });
  } catch (error) {
    console.error(error);
  }
};
