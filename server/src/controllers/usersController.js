const createError = require("http-errors");
const User = require("../models/User");

const { successResponse } = require("./responseController");
const mongoose = require("mongoose");
const { findWithId } = require("../services/findItem");
const deleteImage = require("../helper/deleteImage");
const { createJWT } = require("../helper/jsonwebtoken");

const createUser = async (req, res, next) => {
  try {
    const {name,email,password,phone,address} = req.body
    const userExists = await User.exists({email:email})
    if(userExists){
      throw createError(409,'user with this email already exists. Please sign in')
    }
    const jwtActivationKey = process.env.JWT_ACTIVATION_KEY
    const token = createJWT({name,email,password,phone,address},jwtActivationKey,"10m")
    const newUser = {
      name,
      email,
      password,
      address,
      phone,
    };
    
    return successResponse(res,{
      statusCode:200,
      message:"user was created successfully",
      payload:{token}
    })
  } catch (error) {
    next(error);
  }
};
const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const searchRegExp = new RegExp(".*" + search + ".*", "i");
    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    };
    const options = { password: 0 };
    const user = await User.find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit);
    const count = await User.find(filter).countDocuments();
    if (!user) throw createError(404, "user not found");
    return successResponse(res, {
      statusCode: 200,
      message: "user were returned successfully",
      payload: {
        user,
        pagination: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    next();
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(User, id, options);

    return successResponse(res, {
      statusCode: 200,
      message: "user found",
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(User, id, options);

    const userImagePath = user.image;
    deleteImage(userImagePath)
    await User.findByIdAndDelete({ _id: id, isAdmin: false });

    return successResponse(res, {
      statusCode: 200,
      message: "user was deleted succesfully",  
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { getUsers, createUser, getUserById, deleteUser };
