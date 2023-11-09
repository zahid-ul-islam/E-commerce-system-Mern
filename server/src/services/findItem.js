const createError = require("http-errors");
const mongoose = require("mongoose");


const findWithId = async (Model,id, options={}) => {
  try {
    
    const item = await Model.findById(id, options);
    if (!item) {
      throw createError(404, `${Model.modelName} not found with this id`);
    }
    return item;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(400, "Invalid item Id"));
    }
    throw error;
  }
};

module.exports = { findWithId };
