import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../constants/statusCodes";

export const protect = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const refreshToken = req.cookies?.refreshToken;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      // Try verifying access token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      req.user = decoded;
      return next();
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        // Access token expired - try refresh token
        if (!refreshToken) {
          return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Session expired. Please log in again." });
        }

        try {
          const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as JwtPayload;
          const newAccessToken = jwt.sign(
            { id: decodedRefresh.id },
            process.env.JWT_SECRET!,
            { expiresIn: "15m" }
          );

          // Optionally attach new access token in header for frontend to pick up
          res.setHeader("x-new-access-token", newAccessToken);

          // Attach user info to request
          req.user = { id: decodedRefresh.id };
          return next();
        } catch (refreshErr) {
          return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Refresh token invalid. Please log in again." });
        }
      }

      // Other token error
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid token." });
    }
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "No token provided." });
  }
};
