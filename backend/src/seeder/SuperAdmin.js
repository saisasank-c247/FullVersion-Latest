import { encryptPassword } from "../common/password";

const { AdminModel, UserModel } = require("../models");

const addSuperAdmin = async () => {
  try {
    const superAdminData = await UserModel.find({
      email: "admin@lmsbank.com",
    });
    if (superAdminData.length === 0) {
      UserModel.create({
        firstName: "Super",
        lastName: "Admin",
        email: "admin@lmsbank.com",
        role: "ADMIN",
        password: encryptPassword("Admin@123"),
      });
    }
    console.log("Admin Already added");
  } catch (error) {
    console.log("Error -", error.message);
  }
};

export default { addSuperAdmin };
