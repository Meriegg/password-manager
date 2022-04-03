// Models
import User from "../../../models/User";

// Types
import { NextApiRequest, NextApiResponse } from "next";

// Token validation
import { verifyToken } from "../../../server-utils/verifyToken";

// Crypto
import { encrypt, decrypt } from "../../../server-utils/encryption";
import bcrypt from "bcrypt";

// Database
import connectToDb from "../../../server-utils/conntectToDb";

connectToDb();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Verify jwt token
    const { isValid, decoded } = verifyToken(req.cookies.xToken);
    if (!isValid) return res.status(401).json({ message: "Not authorized!" });

    // Get the form data
    const formData = req.body;

    // Find user in database
    const dbUser = await User.findById(decoded?.id);
    if (!dbUser)
      return res
        .status(404)
        .json({ message: "Could not find user in database!" });

    // Decrypt the password
    const decryptedPassword = decrypt(dbUser.password);

    // Match the passwords
    const doPasswordsMatch = await bcrypt.compare(
      formData.oldPassword,
      decryptedPassword
    );
    if (!doPasswordsMatch)
      return res.status(401).json({ message: "Incorrect password!" });

    // Encrypt and hash the new password
    const hashedPass = await bcrypt.hash(formData.newPassword, 12);
    const encryptedPass = encrypt(hashedPass);

    // Set the new password
    dbUser.password = encryptedPass;

    // Save the changes
    await dbUser.save();

    res
      .status(200)
      .json({ message: "Password changed sucessfully!", status: 200 });
  } catch (error) {
    console.error(error);
  }
};
