import { LoginModel, UserModel } from "../../models";
import { Messages, encryptPassword, comparePassword, emailSubjects } from "../../common";
import jwt from "jsonwebtoken";
import sendEmail from "../../util/email/sendEmail";
import crypto from "crypto";
import bcrypt from "bcryptjs";
// const { User } = require('../models');


/**
 * Login API
 */
// console.log(LoginModel,"loginmodel");
// const login = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Find the user in the database
//     console.log(LoginModel.findOne)
//     const user = await LoginModel.findOne({ where: { username } });

//     if (user && user.comparePassword(password)) {
//       res.status(200).json({ message: 'Login successful' });
//     } else {
//       res.status(401).json({ message: 'Invalid credentials' });
//     }
//   } catch (err) {
//     res.status(500).send('Internal Server Error');
//     console.error('Error finding user:', err);
//   }
// };










// const login = async (req, res) => {
//   const { username, password } = req.body;

//   // Perform database query to check if the user exists
//   const query = `SELECT * FROM login WHERE username = '${username}' AND password ='${password}`;
//   db.query(query, [username, password], (err, result) => {
//     if (err) {
//       res.status(500).send('Internal Server Error');
//       throw err;
//     }

//     if (result.length > 0) {
//       res.status(200).json({ message: 'Login successful' });
//     } else {
//       res.status(401).json({ message: 'Invalid credentials' });
//     }
//   });
// };


const login = async (req, res) => {
  try {
    const {
      body: { email, password, isAdmin },
    } = req;
    const user = await UserModel.findOne(
      { email },
      {
        firstName: 1,
        lastName: 1,
        email: 1,
        phone: 1,
        provider: 1,
        sub: 1,
        status: 1,
        password: 1,
        role: 1
      }
    );
    if (!user) {
      return res.status(404).json({
        message: Messages.EmailDoesNotExists,
      });
    }
    if (user.status === "Inactive") {
      return res.status(400).json({
        message: Messages.UserIsInactive,
      });
    }
    const isPasswordMatched = await comparePassword(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        message: Messages.EmailPasswordNotMatched,
        status: false,
      });
    }
    // Adding user id and email for future reference
    const access = {
      id: user._id,
      email: user.email,
      isAdmin
    };

    const token = jwt.sign(access, process.env.JWT_SECRET, {
      expiresIn: 172800,
    });
    return res.status(200).json({
      message: Messages.LoginSuccessful,
      token: token,
      user: user,
      expiresIn: 172800,
    });
  } catch (error) {
    return res.status(500).json({
      message: Messages.SomethingWrong,
    });
  }
};

/**
 * Sign up request for User
 * @param {*} req
 * @param {*} res
 * @returns
 */
const signup = async (req, res) => {
  try {
    const {
      body: { firstName, lastName, email, phone, password, role },
    } = req;
    const user = await UserModel.findOne({ email }, { _id: 1 });
    if (user) {
      return res.status(400).json({
        message: Messages.AlreadyExist.replace(":item", "User"),
      });
    }
    const hashedPassword = encryptPassword(password);
    const createdUser = await UserModel.create({
      firstName,
      lastName,
      phone,
      email,
      role: role || "USER",
      password: hashedPassword,
    });
    const access = {
      id: createdUser.id,
      email: createdUser.email,
    };
    const token = jwt.sign(access, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });
    return res.status(200).json({
      message: Messages.AddedSuccessfully.replace(":item", "User"),
      token: token,
      data: createdUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: Messages.SomethingWrong,
    });
  }
};

/**
 * Forgot Password request for User
 * @param {*} req
 * @param {*} res
 * @returns
 */
const requestForgotPassword = async (req, res) => {
  try {
    const {
      body: { email },
    } = req;
    const user = await UserModel.findOne(
      { email },
      { _id: 1, firstName: 1, lastName: 1 }
    );
    if (!user) {
      return res.status(404).json({
        message: Messages.EmailDoesNotExists,
      });
    }

    let resetToken = crypto.randomBytes(32).toString("hex");
    console.log("resetToken", resetToken)
    const hash = await bcrypt.hash(resetToken, Number(10));
    // Set token and reset time in db
    await UserModel.updateOne(
      { email: email },
      { $set: { passwordResetToken: hash, passwordResetAt: Date.now() } }
    );
    const link = `${process.env.FRONT_APP_URL}/reset-password?token=${resetToken}&id=${user._id}`;
    // Send email function
    sendEmail(
      email,
      emailSubjects.ForgotPassword,
      { name: user.firstName ?? "Student", link: link },
      "./template/requestResetPassword.handlebars"
    );
    return res.status(200).json({
      status: true,
      message: Messages.PasswordResetLink,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const {
      body: { userId, token, password, confirmPassword },
    } = req;
    const getUser = await UserModel.findById(
      { _id: userId },
      { email: 1, passwordResetToken: 1, firstName: 1 }
    );
    console.log("getUser", getUser)
    if (!getUser) {
      return res.status(404).json({
        message: Messages.InvalidOrExpiredToken,
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: Messages.ConfirmPassword,
      });
    }

    const isValid = await comparePassword(token, getUser.passwordResetToken);
    if (!isValid) {
      return res.status(404).json({
        message: Messages.InvalidOrExpiredToken,
      });
    }
    const hashedPassword = encryptPassword(password);
    await UserModel.updateOne(
      { _id: userId },
      {
        $set: {
          password: hashedPassword,
          passwordResetToken: null,
          passwordResetAt: null,
        },
      }
    );
    sendEmail(
      getUser.email,
      emailSubjects.ResetPassword,
      {
        name: getUser.firstName ?? "Student",
      },
      "./template/resetPassword.handlebars"
    );
    return res.status(200).json({
      message: Messages.PasswordRestSuccess,
    });
  } catch (error) {
    return res.status(500).json({
      message: Messages.SomethingWrong,
    });
  }
};

const verifyResetPasswordToken = async (req, res) => {
  try {
    const {
      query: { userId, token },
    } = req;
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({
        status: false,
        message: Messages.InvalidOrExpiredToken,
      });
    }
    const userToken = await UserModel.findOne(
      { _id: userId },
      { passwordResetToken: 1, passwordResetAt: 1 }
    );
    // comparing provided token from stored in db
    const isValid = await comparePassword(
      token,
      userToken?.passwordResetToken || ""
    );
    if (!isValid) {
      return res.status(404).json({
        message: Messages.InvalidOrExpiredToken,
      });
    }
    // setting expire time for the token
    const expireTime = new Date();
    expireTime.setHours(expireTime.getHours() - 24);
    // checking if expire time is less than the time when forgot password request sent
    if (
      userToken &&
      new Date(expireTime).valueOf() >=
      new Date(userToken.passwordResetAt).valueOf()
    ) {
      return res.status(404).json({
        message: Messages.InvalidOrExpiredToken,
      });
    }

    if (userToken === null || userToken === "") {
      return res.status(404).json({
        status: false,
        message: Messages.InvalidOrExpiredToken,
      });
    }

    return res.status(200).json({
      status: true,
      message: Messages.TokenVerified,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * Change password request
 * @param {*} req
 * @param {*} res
 */
const changePassword = async (req, res) => {
  try {
    const {
      body: { newPassword, confirmPassword, oldPassword },
      id: userId,
    } = req;
    console.log("USERDSSSS", newPassword, confirmPassword, oldPassword, userId)
    const user = await UserModel.findById({ _id: userId }, { password: 1 });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: Messages.UserNotFound,
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: Messages.ConfirmPassword,
      });
    }
    // encrypting password for saving into the database
    const encryptedPassword = encryptPassword(newPassword);

    const pass = await comparePassword(oldPassword, user.password);

    if (!pass) {
      return res.status(400).json({
        message: Messages.OldPasswordNotMatch,
      });
    }
    const passwordExists = await comparePassword(newPassword, user.password);
    if (passwordExists) {
      return res.status(400).json({
        message: Messages.PassAlreadyExists,
      });
    }

    await UserModel.updateOne(
      {
        _id: userId,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      message: Messages.UpdateSuccess.replace(":item", "Password"),
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getProfileDetails = async (req,res) =>{
  console.log(req.id);
  const {
    body: { email, password, isAdmin },
  } = req;
  const user = await UserModel.findOne(
    { id },
    {
      firstName: 1,
      lastName: 1,
      email: 1,
      phone: 1,
      provider: 1,
      sub: 1,
      status: 1,
      password: 1,
      role: 1
    }
  );
}

export default {
  login,
  signup,
  requestForgotPassword,
  resetPassword,
  verifyResetPasswordToken,
  changePassword,
  getProfileDetails
}