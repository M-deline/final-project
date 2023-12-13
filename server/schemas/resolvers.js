
const { AuthenticationError } = require("apollo-server-express");

const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("Error creating user");
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

    saveCity: async (_, { userId, cityId }) => {

      try {
     
          return User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { savedCities: cityId } },
            { new: true, runValidators: true }
          );
        
      
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