import express from "express";
import { hashPassword } from "../utility/bcryptHelper.js";
import { newUserValidation } from "../middleware/validationMiddleware/userValidation.js";
import { createUser } from "../model/userModel.js";
import { v4 as uuidv4 } from "uuid";
import { buildErrorResponse } from "../utility/responseHelper.js";

const userRouter = express.Router();

// CREATE USER | POST | SIGNUP
userRouter.post("/", newUserValidation, async (req, res) => {
  try {
    // hash the password
    const { password } = req.body;

    const encryptedPassword = hashPassword(password);

    // create user in db
    const user = await createUser({
      ...req.body,
      password: encryptedPassword,
    });

    // if user is created, send verification email
    if (user?._id) {
      const secureID = uuidv4();
      // store this id in session storage against user email
      const session = await createSession({ token: secureID, userEmail: user.email });
      if (session?._id) {
        // create verification link and send verification email
        const verificationUrl = `${process.env.CLIENT_ROOT_URL}/verify-email?e=${user.email}&id=${secureID}`;

        // now send an email
        sendVerificationLinkEmail(user, verificationUrl);
      }
    }
  } catch (error) {
    if (error.code === 11000) {
      error.message = "user with this email already exists!!";
    }
    buildErrorResponse(res, error.message);
  }
});
export default userRouter;
