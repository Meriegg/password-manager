import jwt from "jsonwebtoken";

// Types
import * as ts from "../types/index";
interface ReturnProps {
  isValid: boolean;
  message?: string;
  decoded?: ts.JwtToken;
}

export const verifyToken = (token: string): ReturnProps => {
  try {
    // Get the jwt secret
    const JWT_SECRET = process.env.JWT_SECRET;
    if (JWT_SECRET === undefined) throw "Cannot read jwt secret";

    // Verify if the token exists
    if (!token) return { isValid: false, message: "Token does not exist!" };

    // Verify the validity of the token
    const decoded: any = jwt.verify(token, JWT_SECRET);

    // Check expiration
    if (Date.now() >= decoded.exp * 1000) {
      return { isValid: false, message: "Token is outdated!" };
    }

    return { isValid: true, decoded: decoded };
  } catch (error) {
    console.error(error);
    return {
      isValid: false,
      message: "Token may be invalid",
    };
  }
};
