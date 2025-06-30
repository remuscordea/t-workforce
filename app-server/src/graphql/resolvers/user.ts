import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IResolvers } from "@graphql-tools/utils";
import UserModel from "../../models/User";
import {
  registerSchema,
  loginSchema,
  LoginInput,
  RegisterInput,
} from "../../validators/user";
import { requireAuth } from "../../utils/auth";
import { validateAgainstSchema } from "../../utils/validation";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

const userResolvers: IResolvers = {
  Query: {
    me: async (_, __, context) => {
      // Ensure the user is authenticated
      const authUser = requireAuth(context.user);

      try {
        const userData = await UserModel.findById(authUser.id);

        if (!userData) {
          console.warn("User not found!");
          throw new Error("User not found");
        }

        return userData;
      } catch (error: any) {
        console.error("Error fetching user data:", error.message);
        throw new Error("Error fetching user data");
      }
    },

    getUsers: async () => {
      try {
        const users = await UserModel.find();
        return users;
      } catch (error: any) {
        console.error("Error fetching users:", error.message);
        throw new Error("Error fetching users");
      }
    },

    getUserById: async (_, { id }) => {
      try {
        const user = await UserModel.findById(id);
        if (!user) {
          console.warn("User not found by ID:", id);
          throw new Error("User not found");
        } else {
          return user;
        }
      } catch (error: any) {
        console.error("Error fetching user by ID:", error.message);
        throw new Error("Error fetching user by ID");
      }
    },
  },

  Mutation: {
    register: async (_, { input }) => {
      // Validate the input using the schema
      const parsed = validateAgainstSchema(input, registerSchema);
      const { name, email, password, role } = parsed.data as RegisterInput;

      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        throw new Error("Email already in use");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await UserModel.create({
        name,
        email,
        password: hashedPassword,
        role: role || "candidate",
      });

      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });

      return { token, user };
    },

    login: async (_, { input }) => {
      // Validate the input using the schema
      const parsed = validateAgainstSchema(input, loginSchema);
      const { email, password } = parsed.data as LoginInput;

      const user = await UserModel.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return { token, user };
    },
  },
};

export default userResolvers;
