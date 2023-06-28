/** @format */

const Yup = require("yup");
import { Messages } from "../common";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const signup = {
  firstName: Yup.string().required(
    Messages.Required.replace(":item", "First name")
  ),
  lastName: Yup.string().required(
    Messages.Required.replace(":item", "Last name")
  ),
  email: Yup.string()
    .trim()
    .required(Messages.Required.replace(":item", "Email"))
    .email(Messages.InvalidEmail),
  password: Yup.string()
    .required(Messages.Required.replace(":item", "Password"))
    .min(8, Messages.PasswordMin),
  phone: Yup.string().matches(phoneRegExp, Messages.PhoneNumberNotValid),
};

const forgotPassword = {
  email: Yup.string()
    .trim()
    .required(Messages.Required.replace(":item", "Email"))
    .email(Messages.InvalidEmail),
};
const resetPassword = {
  password: Yup.string()
    .required(Messages.Required.replace(":item", "Password"))
    .min(8, Messages.PasswordMin),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
};
const updateProfile = {
  firstName: Yup.string()
    .trim()
    .required(Messages.Required.replace(":item", "Firstname"))
    .min(2, Messages.StringMinMessage.replace(":item", "Firstname")),
  lastName: Yup.string()
    .trim()
    .required(Messages.Required.replace(":item", "Lastname"))
    .min(2, Messages.StringMinMessage.replace(":item", "Lastname")),
  email: Yup.string()
    .trim()
    .required(Messages.Required.replace(":item", "Email"))
    .email(Messages.InvalidEmail),
  // phone: Yup.string().matches(phoneRegExp, Messages.PhoneNumberNotValid),
};

module.exports = {
  signup,
  forgotPassword,
  resetPassword,
  updateProfile,
};
