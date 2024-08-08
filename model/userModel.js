import userSchema from "../schema/userSchema.js";

// create user
export const createUser = (userObj) => {
  return userSchema(userObj).save();
};

// update user
export const updateUser = (filter, updateUser) => {
  return userSchema.findOneAndUpdate(filter, updateUser, { new: true });
};

// Find User by email
export const findUserByEmail = (email) => {
  return userSchema.findOne({ email });
};
