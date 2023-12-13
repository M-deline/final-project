
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

    me: async (parent, { userId }) => {
      
        return User.findOne({ _id: userId });
    
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

    removeCity: async (_, { userId, cityId }) => {

      try {
       
          const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { savedCities: cityId  } },
            { new: true }
          );
          return updatedUser;
        
        
      } catch (error) {
        console.error(error);
        throw new AuthenticationError("Error removing City");
      }
    },
  },
};
module.exports = resolvers;