import { buildSchema } from "graphql";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const schema = buildSchema(`
  type User {
    id: ID!
    username: String!
    createdAt: String
    updatedAt: String
  }

  type Query {
    users: [User!]!
  }

  type RegisterResult {
    success: Boolean!
    message: String!
    user: User
  }

  type Mutation {
    registerUser(username: String!, password: String!): RegisterResult!
  }
`);

export const root = {
  users: async () => {
    const docs = await User.find().sort({ createdAt: -1 }).lean();
    return docs.map((d) => ({
      id: d._id.toString(),
      username: d.username,
      createdAt: d.createdAt ? new Date(d.createdAt).toISOString() : null,
      updatedAt: d.updatedAt ? new Date(d.updatedAt).toISOString() : null,
    }));
  },
  registerUser: async ({ username, password }) => {
    if (!username || !password) {
      return { success: false, message: "username y password requeridos", user: null };
    }
    const existing = await User.findOne({ username }).lean();
    if (existing) {
      return { success: false, message: "Usuario ya existe", user: null };
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed });
    const saved = await user.save();
    return {
      success: true,
      message: "Usuario creado",
      user: {
        id: saved._id.toString(),
        username: saved.username,
        createdAt: saved.createdAt ? new Date(saved.createdAt).toISOString() : null,
        updatedAt: saved.updatedAt ? new Date(saved.updatedAt).toISOString() : null,
      },
    };
  },
};
