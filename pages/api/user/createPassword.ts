import User from "../../../models/User";

// Types
import { NextApiRequest, NextApiResponse } from "next";

// Jwt validation
import { verifyToken } from "../../../server-utils/verifyToken";

// Encryption
import { encrypt } from "../../../server-utils/encryption";

// Database
import conntectToDb from "../../../server-utils/conntectToDb";

conntectToDb();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Verify jwt token
    const { isValid, decoded } = verifyToken(req.cookies.xToken);
    if (!isValid)
      return res.status(401).json({ message: "You are not logged in!" });

    // Get the form data
    const formData = req.body;

    // Find the user in the database
    const dbUser = await User.findById(decoded?.id);
    if (!dbUser)
      return res.status(404).json({ message: "Could not find user!" });

    // Encrypt the data
    const encryptedUsername = encrypt(formData.username);
    const encryptedWebsite = encrypt(formData.website);
    const encryptedPassword = encrypt(formData.password);

    // Create the password
    dbUser.passwords.push({
      username: encryptedUsername,
      website: encryptedWebsite,
      password: encryptedPassword,
      idx: dbUser.passwords.length + 1,
    });

    // Save the changes
    await dbUser.save();

    res
      .status(200)
      .json({ message: "Password created sucessfully!", status: 200 });
  } catch (error) {
    console.error(error);
  }
};
