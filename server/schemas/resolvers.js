
const { AuthenticationError } = require("apollo-server-express");

const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (_parent, _args, context) => {
        if (context.user) {

            try {
              const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
              return userData;
            } catch (error) {
              console.error(error);
              throw new AuthenticationError("Error fetching user data");
            }
        }
      throw new AuthenticationError("No user found. Please login or register");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {

      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error(error);
        throw new AuthenticationError("Error creating user");
      }
    },
    login: async (_parent, { email, password }) => {

    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect Password");
      }

      const token = signToken(user);
      return { token, user };
    } catch (error) {
      console.error(error);
      throw new AuthenticationError("Error during login");
    }
  },

    saveCity: async (_, { input }, context) => {

    try {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedCities: input } },
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError("Please login or register");
    } catch (error) {
      console.error(error);
      throw new AuthenticationError("Error saving City");
    }
  },

  removeCity: async (_, { CityId }, context) => {

    try {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedCities: { CityId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Please login or register");
    } catch (error) {
      console.error(error);
      throw new AuthenticationError("Error removing City");
  }
},
  },
};
module.exports = resolvers;