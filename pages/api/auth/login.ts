import User from "../../../models/User";

// Security
import bcrypt from "bcrypt";
import { encrypt, decrypt } from "../../../server-utils/encryption";

// Types
import { NextApiResponse, NextApiRequest } from "next";

// Db
import connectToDb from "../../../server-utils/conntectToDb";

// Jwt
import jwt from "jsonwebtoken";

// Cookies
import { setCookies } from "cookies-next";

// Prod
import { isInProd } from "../../../prodConfig";

connectToDb();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Get the jwt secret
    const JWT_SECRET = process.env.JWT_SECRET;
    if (JWT_SECRET === undefined)
      return res
        .status(500)
        .json({ message: "Something went wrong on our end!" });

    // Get the form data
    const formData = req.body;

    // Check if there is an existing user
    const existingUser = await User.findOne({
      $or: [{ username: formData.username }, { email: formData.email }],
    });
    if (!existingUser)
      return res.status(404).json({
        message: "User does not exist!",
      });

    // Decrypt The password
    const decryptedPass = decrypt(existingUser.password);

    // Check if passwords match
    const doPasswordsMatch = await bcrypt.compare(
      formData.password,
      decryptedPass
    );
    if (!doPasswordsMatch)
      return res.status(401).json({ message: "Password may be incorrect!" });

    // Create the jwt token
    const token = jwt.sign(
      { id: existingUser._id, username: existingUser.username },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    setCookies("xToken", token, {
      httpOnly: true,
      secure: isInProd,
      req,
      res,
    });

    res.status(200).json({ message: "Logged in sucessfully!", status: 200 });
  } catch (error) {
    console.error(error);
  }
};
