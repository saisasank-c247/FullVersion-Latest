/** @format */

import { UserModel } from "../../models";
import { Messages, encryptPassword, comparePassword } from "../../common";

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
      error: Messages.SomethingWrong,
    });
  }
};

export default {
  changePassword,
};
