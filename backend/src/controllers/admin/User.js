/** @format */

import { UserModel } from "../../models";
import { Messages } from "../../common";

/**
 * Users List data request
 * @param {*} req
 * @param {*} res
 * @returns
 */
const list = async (req, res) => {
  try {
    const {
      query: { name, status, email, page = 1, limit = 5 },
    } = req;

    const skip = (page - 1) * parseInt(limit);
    const query = [
      {
        $project: {
          fullName: { $concat: ["$firstName", " ", "$lastName"] },
          email: 1,
          phone: 1,
          status: 1,
          createdAt: 1,
          role: 1
        },
      },
      { $sort: { createdAt: -1 } },
      { $match: { role: { $regex: "USER" } } }
    ];

    if (name) {
      query.push({
        $match: {
          fullName: { $regex: name.trim(), $options: "i" },
        },
      });
    }
    if (status) {
      query.push({
        $match: { status: { $eq: status } },
      });
    }
    if (email) {
      query.push({
        $match: { email: { $regex: email.trim(), $options: "i" } },
      });
    }

    query.push({
      $skip: skip,
    });

    query.push({
      $limit: parseInt(limit),
    });
    const users = await UserModel.aggregate(query);
    const totalCount = await UserModel.aggregate([
      ...query.slice(0, -2),
      {
        $count: "total",
      },
    ]);

    return res.status(200).json({
      status: true,
      message: Messages.ItemFetchedSuccess.replace(":item", "Users"),
      data: users,
      totalCount: totalCount[0]?.total,
      page,
      totalPages: Math.ceil(totalCount[0]?.total / limit),
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * User status request for active or inactive
 * @param {*} req
 * @param {*} res
 * @returns
 */
const updateStatus = async (req, res) => {
  try {
    const {
      query: { id },
      body: { status },
    } = req;
    const user = await UserModel.findOne({ _id: id }, { email: 1 });
    if (!user) {
      return res.status(404).json({
        message: Messages.ItemNotFound.replace(":item", "User"),
      });
    }
    await UserModel.updateOne(
      { _id: id },
      {
        $set: {
          status,
        },
      }
    );
    return res.status(200).json({
      message: Messages.UpdateStatusSuccess.replace(":item", "User"),
    });
  } catch (error) {
    return res.status(500).json({ error: Messages.SomethingWrong });
  }
};

/**
 * User delete data request
 * @param {*} req
 * @param {*} res
 * @returns
 */
const deleteUser = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    if (!id)
      return res.status(404).json({
        message: Messages.ItemIdIsMissing.replace(":item", "User Id"),
      });
    const user = await UserModel.findById({ _id: id }, { _id: 1 });
    if (!user) {
      return res.status(404).json({
        message: Messages.ItemNotFound.replace(":item", "User"),
        status: false,
      });
    }
    await UserModel.deleteOne({ _id: id });
    return res.status(200).json({
      status: true,
      message: Messages.ItemDeletedSuccess.replace(":item", "User"),
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default {
  list,
  updateStatus,
  deleteUser,
};
