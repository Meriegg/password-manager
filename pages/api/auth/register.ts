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
    if (existingUser)
      return res.status(400).json({
        message:
          "User already exists, Try changing your username or your email!",
      });

    // Hash the password
    const hashedPass = await bcrypt.hash(formData.password, 12);

    // Encrypt the password
    const encryptedPass = encrypt(hashedPass);

    // Create a new user
    const newUser = new User({
      username: formData.username,
      password: encryptedPass,
      email: formData.email,
    });

    // Save the user
    await newUser.save();

    // Create the jwt token
    const token = jwt.sign(
      { id: newUser._id, username: formData.username },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    setCookies("xToken", token, { req, res, httpOnly: true, secure: isInProd });

    res
      .status(200)
      .json({ message: "Account created sucessfully!", status: 200 });
  } catch (error) {
    console.error(error);
  }
};
