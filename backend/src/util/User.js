import jwt from "jsonwebtoken";
import { PaymentModel } from "../models";

/**
 * Middleware to Verify Token provided by the front end client for student type user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const verifyToken = async (req, res, next) => {
  try {
    // check header or url parameters or post parameters for token
    const token = req.headers["authorization"];
    if (!token || token === undefined) {
      return res.status(404).json({
        message: "Token is not provided, or wrong token",
        status: false,
      });
    }

    const withoutBearerToken = token.split(" ")[1];
    // verifies secret and checks exp
    // eslint-disable-next-line prefer-arrow-callback
    jwt.verify(
      withoutBearerToken,
      process.env.JWT_SECRET,
      async function (err, decoded) {
        if (err)
          return res
            .status(401)
            .json({ auth: false, message: "Failed to authenticate token." });

        // if everything is good, save to request for use in other routes
        req.email = decoded.email;
        req.id = decoded.id;
        console.log("req.id", req.id)
        next();
      }
    );
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong - ${error}`,
    });
  }
};

/**
 * Middleware to Verify Admin Token provided by the super admin
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const verifyAdminToken = async (req, res, next) => {
  try {
    // check header or url parameters or post parameters for token
    const token = req.headers["authorization"];
    if (!token || token === undefined) {
      return res.status(404).json({
        message: "Token is not provided, or wrong token",
        status: false,
      });
    }

    const withoutBearerToken = token.split(" ")[1];
    // verifies secret and checks exp
    // eslint-disable-next-line prefer-arrow-callback
    jwt.verify(
      withoutBearerToken,
      process.env.JWT_SECRET,
      async function (err, decoded) {
        if (err)
          return res
            .status(401)
            .json({ auth: false, message: "Failed to authenticate token." });

        if (!decoded.isAdmin) {
          return res.status(403).json({
            auth: false,
            message: "Forbidden Request, Something went wrong",
          });
        }
        req.email = decoded.email;
        req.id = decoded.id;
        next();
      }
    );
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong - ${error}`,
    });
  }
};

/**
 * Middleware to Verify the subscription of an user/student
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const checkSubscription = async (req, res, next) => {
  try {
    const { id } = req;
    if (!id) {
      return res.status(400).json({ message: "Something is not correct" });
    }
    // getting current date for checking the subscription
    const currentDate = new Date();
    const userSubscription = await PaymentModel.findOne({
      userId: id,
      expiredAt: { $gt: currentDate },
    });
    if (!userSubscription) {
      return res.status(404).json({ message: "No subscription found" });
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong - ${error}`,
    });
  }
};
